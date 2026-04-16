/**
 * YouTube API Integration for LTPE Website
 * Fetches latest videos from the LTPE YouTube channel
 */

const YOUTUBE_CHANNEL_ID = 'UCCioWvOfX6j7x5PSINhU89w'; // Channel ID LTPE
const YOUTUBE_API_KEY = 'AIzaSyASvfGtRxGuoPgiEzk3efNvsJHpC9Gpod8'; // Clé API LTPE
const MAX_RESULTS = 12;

/**
 * Fetch videos from YouTube channel
 */
async function fetchYouTubeVideos(maxResults = MAX_RESULTS, pageToken = '') {
    try {
        const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&pageToken=${pageToken}&type=video`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            console.error('YouTube API Error:', data.error.message);
            return null;
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        return null;
    }
}

/**
 * Get video details including duration
 */
async function getVideoDetails(videoId) {
    try {
        const url = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoId}&part=contentDetails,statistics`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            return data.items[0];
        }
        
        return null;
    } catch (error) {
        console.error('Error fetching video details:', error);
        return null;
    }
}

/**
 * Format ISO 8601 duration to readable format
 */
function formatDuration(duration) {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = duration.match(regex);
    
    let hours = matches[1] ? parseInt(matches[1]) : 0;
    let minutes = matches[2] ? parseInt(matches[2]) : 0;
    let seconds = matches[3] ? parseInt(matches[3]) : 0;
    
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
    } else {
        return `${seconds}s`;
    }
}

/**
 * Create sermon card HTML
 */
function createSermonCard(video, details = null) {
    const videoId = video.id.videoId;
    const title = video.snippet.title;
    const description = video.snippet.description.substring(0, 100) + '...';
    const publishedAt = new Date(video.snippet.publishedAt).toLocaleDateString('fr-FR');
    const thumbnail = video.snippet.thumbnails.medium.url;
    
    let durationHtml = '';
    if (details && details.contentDetails) {
        const duration = formatDuration(details.contentDetails.duration);
        durationHtml = `<div style="position: absolute; bottom: 10px; right: 10px; background-color: rgba(0, 0, 0, 0.8); color: white; padding: 5px 10px; border-radius: 3px; font-size: 0.85rem;">${duration}</div>`;
    }
    
    return `
        <div class="sermon-card">
            <div class="sermon-thumbnail">
                <img src="${thumbnail}" alt="${title}">
                <div class="play-button">▶</div>
                ${durationHtml}
            </div>
            <div class="sermon-info">
                <h4>${title}</h4>
                <p>${description}</p>
                <p class="sermon-date">${publishedAt}</p>
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" class="btn-primary" style="display: inline-block; padding: 0.5rem 1rem; font-size: 0.9rem; margin-top: 0.5rem;">Regarder</a>
            </div>
        </div>
    `;
}

/**
 * Load and display latest sermons on homepage
 */
async function loadLatestSermons() {
    const container = document.getElementById('sermons-container');
    
    if (!container) return;
    
    container.innerHTML = '<p>Chargement des prédications...</p>';
    
    const data = await fetchYouTubeVideos(3);
    
    if (!data || !data.items) {
        container.innerHTML = '<p>Impossible de charger les prédications. Veuillez réessayer plus tard.</p>';
        return;
    }
    
    let html = '';
    for (const video of data.items) {
        const details = await getVideoDetails(video.id.videoId);
        html += createSermonCard(video, details);
    }
    
    container.innerHTML = html;
}

/**
 * Load latest video info for teachings page
 */
async function loadLatestVideoInfo() {
    const data = await fetchYouTubeVideos(1);
    
    if (!data || !data.items || data.items.length === 0) {
        return;
    }
    
    const video = data.items[0];
    const videoId = video.id.videoId;
    const title = video.snippet.title;
    const description = video.snippet.description;
    const publishedAt = new Date(video.snippet.publishedAt).toLocaleDateString('fr-FR');
    
    // Update iframe
    const iframe = document.getElementById('latest-video');
    if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0`;
    }
    
    // Update info
    const titleEl = document.getElementById('latest-title');
    if (titleEl) titleEl.textContent = title;
    
    const descEl = document.getElementById('latest-description');
    if (descEl) descEl.textContent = description.substring(0, 200) + '...';
    
    const dateEl = document.getElementById('latest-date');
    if (dateEl) dateEl.textContent = publishedAt;
}

/**
 * Load all teachings for teachings page
 */
async function loadAllTeachings(pageToken = '') {
    const container = document.getElementById('teachings-container');
    
    if (!container) return;
    
    if (!pageToken) {
        container.innerHTML = '<p>Chargement des enseignements...</p>';
    }
    
    const data = await fetchYouTubeVideos(MAX_RESULTS, pageToken);
    
    if (!data || !data.items) {
        container.innerHTML = '<p>Impossible de charger les enseignements. Veuillez réessayer plus tard.</p>';
        return;
    }
    
    let html = '';
    for (const video of data.items) {
        const details = await getVideoDetails(video.id.videoId);
        html += createSermonCard(video, details);
    }
    
    if (pageToken) {
        container.innerHTML += html;
    } else {
        container.innerHTML = html;
    }
    
    // Setup load more button
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn && data.nextPageToken) {
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.onclick = () => loadAllTeachings(data.nextPageToken);
    } else if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
}

/**
 * Initialize based on page
 */
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('index.html') || currentPage === '/') {
        loadLatestSermons();
    } else if (currentPage.includes('teachings.html')) {
        loadLatestVideoInfo();
        loadAllTeachings();
    }
});
