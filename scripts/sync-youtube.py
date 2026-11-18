"""Refresh public metadata. API credentials never enter the public files."""
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]

def api(resource, **params):
    params['key'] = os.environ['YOUTUBE_API_KEY']
    try:
        with urlopen('https://www.googleapis.com/youtube/v3/' + resource + '?' + urlencode(params), timeout=30) as response:
            return json.load(response)
    except HTTPError as error:
        # Report only the HTTP status and a short API reason, never the request URL.
        reason = 'unknown'
        try:
            candidate = json.load(error).get('error', {}).get('errors', [{}])[0].get('reason', '')
            if candidate and candidate.isascii() and candidate.isalnum():
                reason = candidate[:80]
        except (ValueError, IndexError, AttributeError):
            pass
        raise RuntimeError(f'YouTube HTTP {error.code}: {reason}') from None
    except URLError:
        raise RuntimeError('Connexion réseau à YouTube impossible.') from None

def sync():
    if not os.environ.get('YOUTUBE_API_KEY'):
        raise RuntimeError('Secret manquant.')
    channels = api('channels', part='contentDetails', forHandle='ltpevangile').get('items', [])
    if not channels:
        raise RuntimeError('Chaîne introuvable.')
    playlist = channels[0]['contentDetails']['relatedPlaylists']['uploads']
    videos, token = [], ''
    for _ in range(10):  # Up to 500 uploads.
        page = api('playlistItems', part='contentDetails', playlistId=playlist, maxResults=50, pageToken=token)
        ids = [item['contentDetails']['videoId'] for item in page.get('items', [])]
        if ids:
            details = api('videos', part='snippet,contentDetails,status', id=','.join(ids))
            for video in details.get('items', []):
                if video.get('status', {}).get('privacyStatus') != 'public':
                    continue
                snippet = video['snippet']
                if snippet.get('liveBroadcastContent') == 'upcoming':
                    continue
                videos.append({'id':video['id'], 'title':snippet['title'], 'description':snippet['description'], 'publishedAt':snippet['publishedAt'], 'duration':video['contentDetails']['duration']})
        token = page.get('nextPageToken', '')
        if not token:
            break
    if not videos:
        raise RuntimeError('Catalogue vide ; données précédentes conservées.')
    videos = list({v['id']: v for v in videos}.values())
    videos.sort(key=lambda v: v['publishedAt'], reverse=True)
    output = ROOT / 'data' / 'youtube-videos.json'
    temporary = output.with_suffix('.tmp')
    temporary.write_text(json.dumps({'updatedAt':datetime.now(timezone.utc).isoformat(), 'channelHandle':'@ltpevangile', 'videos':videos}, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    temporary.replace(output)
    print(f'{len(videos)} vidéos synchronisées.')

if __name__ == '__main__':
    try:
        sync()
    except RuntimeError as error:
        print(str(error), file=sys.stderr)
        print('Catalogue précédent conservé.', file=sys.stderr)
        sys.exit(1)
    except (KeyError, ValueError):
        print('Synchronisation échouée. Vérifier le secret, YouTube Data API v3, les restrictions et le réseau. Catalogue précédent conservé.', file=sys.stderr)
        sys.exit(1)
