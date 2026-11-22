/* Public metadata only. API credentials stay in GitHub Actions. */
const CHANNEL_URL = 'https://www.youtube.com/@ltpevangile';
const PAGE_SIZE = 9;
const videoText = (text, vars) => window.ltpeI18n?.t(text, vars) || text;
const videoLocale = () => window.ltpeI18n?.locale || 'fr-BE';
let teachings = [];
let visibleCount = PAGE_SIZE;
const normalizeText = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
function escapeHTML(value) {
  return String(value || '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );
}
function videoURL(id) {
  return `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;
}
function formatDuration(value = '') {
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(value);
  if (!m) return '';
  return [
    m[1],
    m[1] ? String(Number(m[2] || 0)).padStart(2, '0') : String(Number(m[2] || 0)),
    String(Number(m[3] || 0)).padStart(2, '0'),
  ]
    .filter((v) => v !== undefined)
    .join(':');
}
function createSermonCard(video) {
  if (!/^[a-zA-Z0-9_-]{11}$/.test(video.id)) return '';
  const title = escapeHTML(video.title),
    duration = formatDuration(video.duration);
  const date = new Date(video.publishedAt).toLocaleDateString(videoLocale(), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return `<article class="sermon-card"><a class="sermon-thumbnail" href="${videoURL(video.id)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(videoText('Regarder : {title}', { title: video.title }))}"><img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="" loading="lazy"><span class="play-button" aria-hidden="true">▶</span>${duration ? `<span class="video-duration">${duration}</span>` : ''}</a><div class="sermon-info"><h4 data-no-translate><a href="${videoURL(video.id)}" target="_blank" rel="noopener noreferrer">${title}</a></h4><p class="sermon-date">${escapeHTML(date)}</p></div></article>`;
}

// Descriptions contain the weekly programme, so they cannot identify a video's type.
const CATEGORY_TERMS = {
  culte: ['culte', 'cultes', 'service', 'services', 'celebration', 'dienst', 'diensten'],
  etude: [
    'etude',
    'etudes',
    'etude biblique',
    'etudes bibliques',
    'bible study',
    'bible studies',
    'bijbelstudie',
  ],
  priere: ['priere', 'prieres', 'prayer', 'prayers', 'gebed', 'gebeden', 'intercession'],
};

function searchCategory(query) {
  return (
    Object.keys(CATEGORY_TERMS).find((category) => CATEGORY_TERMS[category].includes(query)) || ''
  );
}

function teachingCategory(video) {
  const title = normalizeText(video.title).trim();
  if (/^(?:culte|service|dienst)\b/.test(title)) return 'culte';
  if (/\b(?:etudes?|bijbelstudie)\b|\bbible stud(?:y|ies)\b/.test(title)) return 'etude';
  if (/\b(?:prieres?|prayers?|gebed|gebeden|intercession)\b/.test(title)) return 'priere';
  if (/\b(?:cultes?|celebration|diensten?)\b/.test(title)) return 'culte';
  return '';
}

function filteredTeachings(videos, search = '', category = '', sort = 'newest') {
  const query = normalizeText(search).trim();
  const requestedCategory = searchCategory(query);

  return videos
    .filter((video) => {
      const title = normalizeText(video.title);
      const type = teachingCategory(video);
      const matchesSearch = requestedCategory
        ? type === requestedCategory
        : query.split(/\s+/).every((word) => title.includes(word));

      return matchesSearch && (!category || type === category);
    })
    .sort(
      (a, b) => (sort === 'oldest' ? 1 : -1) * (new Date(a.publishedAt) - new Date(b.publishedAt))
    );
}
function renderTeachings() {
  const container = document.getElementById('teachings-container');
  if (!container) return;
  const matches = filteredTeachings(
    teachings,
    document.getElementById('search-input').value,
    document.getElementById('filter-select').value,
    document.getElementById('sort-select').value
  );
  container.innerHTML = matches.length
    ? matches.slice(0, visibleCount).map(createSermonCard).join('')
    : `<p class="video-status">${videoText('Aucun enseignement ne correspond à votre recherche.')}</p>`;
  document.getElementById('results-status').textContent = videoText(
    '{shown} sur {total} enseignements',
    { shown: Math.min(visibleCount, matches.length), total: matches.length }
  );
  document.getElementById('load-more-btn').hidden = visibleCount >= matches.length;
  document.getElementById('load-less-btn').hidden =
    visibleCount <= PAGE_SIZE || matches.length <= PAGE_SIZE;
}
async function initializeYouTube() {
  const container =
    document.getElementById('teachings-container') || document.getElementById('sermons-container');
  if (!container) return;
  container.innerHTML = '<p class="video-status" role="status">Chargement des prédications…</p>';
  try {
    const response = await fetch(window.ltpeSiteURL('data/youtube-videos.json'), {
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error('Catalogue indisponible');
    const data = await response.json();
    teachings = (Array.isArray(data.videos) ? data.videos : []).filter(
      (v) =>
        v &&
        /^[a-zA-Z0-9_-]{11}$/.test(v.id) &&
        typeof v.title === 'string' &&
        v.title.trim() &&
        Number.isFinite(Date.parse(v.publishedAt))
    );
    if (!teachings.length) throw new Error('Catalogue vide');
    teachings.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    if (document.getElementById('sermons-container')) {
      container.innerHTML = teachings.slice(0, 3).map(createSermonCard).join('');
      return;
    }
    const latest = teachings[0],
      iframe = document.getElementById('latest-video');
    iframe.src = `https://www.youtube-nocookie.com/embed/${latest.id}`;
    iframe.hidden = false;
    document.getElementById('latest-title').setAttribute('data-no-translate', '');
    document.getElementById('latest-description').setAttribute('data-no-translate', '');
    document.getElementById('latest-title').textContent = latest.title;
    document.getElementById('latest-description').textContent = (latest.description || '').slice(
      0,
      240
    );
    document.getElementById('latest-date').textContent = new Date(
      latest.publishedAt
    ).toLocaleDateString(videoLocale());
    document.getElementById('latest-link').href = videoURL(latest.id);
    for (const id of ['search-input', 'filter-select', 'sort-select'])
      document
        .getElementById(id)
        .addEventListener(id === 'search-input' ? 'input' : 'change', () => {
          visibleCount = PAGE_SIZE;
          renderTeachings();
        });
    document.getElementById('load-more-btn').addEventListener('click', () => {
      visibleCount += PAGE_SIZE;
      renderTeachings();
    });
    document.getElementById('load-less-btn').addEventListener('click', () => {
      visibleCount = Math.max(PAGE_SIZE, visibleCount - PAGE_SIZE);
      renderTeachings();
      const visibleCards = container.querySelectorAll('.sermon-card');
      visibleCards[visibleCards.length - 1]?.scrollIntoView({ block: 'nearest' });
      const remainingButton = document.getElementById('load-less-btn');
      (remainingButton.hidden ? document.getElementById('load-more-btn') : remainingButton).focus({
        preventScroll: true,
      });
    });
    renderTeachings();
  } catch {
    container.innerHTML = `<div class="video-status"><p>Retrouvez toutes nos prédications et nos directs sur la chaîne LTPE.</p><a href="${CHANNEL_URL}/videos" target="_blank" rel="noopener noreferrer">Voir les enseignements sur YouTube →</a></div>`;
    const iframe = document.getElementById('latest-video');
    if (iframe) {
      iframe.hidden = true;
      const placeholder = document.createElement('div');
      placeholder.className = 'latest-placeholder';
      placeholder.innerHTML = `<a href="${CHANNEL_URL}/videos" target="_blank" rel="noopener noreferrer">▶ Regarder les messages de LTPE</a>`;
      iframe.parentElement.appendChild(placeholder);
    }
  }
}
if (window.LTPE_BUILD) {
  window.ltpeYouTubeReady = initializeYouTube();
} else {
  document.addEventListener('DOMContentLoaded', initializeYouTube);
}

document.addEventListener('ltpe:languagechange', () => {
  if (!teachings.length) return;
  const home = document.getElementById('sermons-container');
  if (home) home.innerHTML = teachings.slice(0, 3).map(createSermonCard).join('');
  else {
    renderTeachings();
    document.getElementById('latest-date').textContent = new Date(
      teachings[0].publishedAt
    ).toLocaleDateString(videoLocale());
  }
});
