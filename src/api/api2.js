// Конфигурация API
const API_KEY = '5578ecbce8442480bab5741400e050ec'; // Замените на ваш ключ
const API_URL = 'https://ws.audioscrobbler.com/2.0/';

// DOM элементы
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-bar button');
const artistsGrid = document.querySelector('.artists-grid');
const tracksList = document.querySelector('.tracks-list');

// Функция для запроса к API
async function fetchData(method, params = {}) {
    const queryParams = new URLSearchParams({
        method,
        api_key: API_KEY,
        format: 'json',
        ...params
    });

    try {
        const response = await fetch(`${API_URL}?${queryParams}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Получение топ артистов
async function getTopArtists(limit = 12) {
    const data = await fetchData('chart.gettopartists', { limit });
    return data?.artists?.artist || [];
}

// Получение топ треков
async function getTopTracks(limit = 12) {
    const data = await fetchData('chart.gettoptracks', { limit });
    return data?.tracks?.track || [];
}

// Поиск артистов
async function searchArtists(query, limit = 12) {
    const data = await fetchData('artist.search', { artist: query, limit });
    return data?.results?.artistmatches?.artist || [];
}

// Получение тегов трека
async function getTrackTags(artist, track) {
    const data = await fetchData('track.getInfo', { artist, track });
    return data?.track?.toptags?.tag || [];
}

// Отображение артистов
function displayArtists(artists, container) {
    container.innerHTML = artists.map(artist => {
        // Берём medium-изображение
        const imageObj = artist.image?.find(img => img.size === 'extralarge') || artist.image?.find(img => img.size === 'large') || artist.image?.find(img => img.size === 'medium');
        const image = (imageObj && imageObj['#text']) ? imageObj['#text'] : 'https://via.placeholder.com/200x200?text=No+Image';
        const artistUrl = artist.url || '#';

        // Теги (жанры) — если есть, иначе пусто
        let tagsHtml = '';
        if (artist.tags && Array.isArray(artist.tags) && artist.tags.length) {
            tagsHtml = artist.tags.slice(0, 3).map(tag =>
                `<a class="tag-link" href="https://www.last.fm/tag/${encodeURIComponent(tag.name)}" target="_blank">${tag.name}</a>`
            ).join(' · ');
        } else {
            tagsHtml = '';
        }

        return `
            <div class="artist-card">
                <div class="artist-image-wrap">
                    <a href="${artistUrl}" target="_blank">
                        <img class="artist-image" src="${image}" alt="${artist.name}">
                    </a>
                </div>
                <h3 class="artist-name">
                    <a href="${artistUrl}" target="_blank">${artist.name}</a>
                </h3>
                <p class="tags">${tagsHtml}</p>
            </div>
        `;
    }).join('');
}

// Отображение треков
async function displayTracks(tracks, container) {
    // Для каждого трека получаем теги асинхронно
    const tracksWithTags = await Promise.all(tracks.map(async track => {
        const tags = await getTrackTags(track.artist.name, track.name);
        return { ...track, tags };
    }));

    container.innerHTML = tracksWithTags.map(track => {
        const imageObj = track.image?.find(img => img.size === 'medium');
        const image = (imageObj && imageObj['#text']) ? imageObj['#text'] : 'https://via.placeholder.com/64x64?text=No+Cover';
        const trackUrl = track.url || '#';
        const artistUrl = track.artist?.url || '#';
        const tagsHtml = Array.isArray(track.tags) && track.tags.length
            ? track.tags.slice(0, 3).map(tag =>
                `<a class="tag-link" href="https://www.last.fm/tag/${encodeURIComponent(tag.name)}" target="_blank">${tag.name}</a>`
              ).join(', ')
            : '';

        return `
            <div class="track-item">
                <img class="track-cover" src="${image}" alt="${track.name} cover">
                <div class="track-info">
                    <h3><a href="${trackUrl}" target="_blank">${track.name}</a></h3>
                    <p class="artist"><a href="${artistUrl}" target="_blank">${track.artist?.name || 'Unknown'}</a></p>
                    <p class="tags">${tagsHtml}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Инициализация страницы
async function initPage() {
    try {
        // Показываем заглушки загрузки
        artistsGrid.innerHTML = '<div class="loading">Loading artists...</div>';
        tracksList.innerHTML = '<div class="loading">Loading tracks...</div>';

        // Загружаем данные
        const [artists, tracks] = await Promise.all([
            getTopArtists(),
            getTopTracks()
        ]);

        // Отображаем данные
        displayArtists(artists, artistsGrid);
        displayTracks(tracks, tracksList);
    } catch (error) {
        console.error('Initialization error:', error);
        artistsGrid.innerHTML = '<div class="error">Failed to load artists</div>';
        tracksList.innerHTML = '<div class="error">Failed to load tracks</div>';
    }
}

// Обработчик поиска
searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query) {
        try {
            artistsGrid.innerHTML = '<div class="loading">Searching...</div>';
            const artists = await searchArtists(query);
            displayArtists(artists, artistsGrid);
        } catch (error) {
            console.error('Search error:', error);
            artistsGrid.innerHTML = '<div class="error">Search failed</div>';
        }
    }
});

// Обработчик нажатия Enter в поле поиска
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initPage);