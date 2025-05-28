// Конфигурация API
const API_KEY = '5578ecbce8442480bab5741400e050ec'; 
const API_URL = 'https://ws.audioscrobbler.com/2.0/';

// DOM элементы
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.getElementById('search-btn');
const searchResultsContainer = document.getElementById('search-results-container');

// Функция для запроса к API
async function fetchData(method, params) {
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

// Поиск артистов
async function searchArtists(query) {
    const data = await fetchData('artist.search', {
        artist: query,
        limit: 12
    });

    if (data && data.results && data.results.artistmatches) {
        return data.results.artistmatches.artist;
    }
    return [];
}

// Получение популярных треков артиста
async function getTopTracks(artist) {
    const data = await fetchData('artist.gettoptracks', {
        artist,
        limit: 6
    });

    if (data && data.toptracks) {
        return data.toptracks.track;
    }
    return [];
}

// Получение популярных артистов
async function getTopArtists() {
    const data = await fetchData('chart.gettopartists', {
        limit: 12
    });

    if (data && data.artists) {
        return data.artists.artist;
    }
    return [];
}

// Получение популярных треков
async function getTopTracksGlobal() {
    const data = await fetchData('chart.gettoptracks', {
        limit: 12
    });

    if (data && data.tracks) {
        return data.tracks.track;
    }
    return [];
}

// Отображение результатов поиска
function displaySearchResults(artists) {
    searchResultsContainer.innerHTML = '';

    if (artists.length === 0) {
        searchResultsContainer.innerHTML = '<p>No artists found</p>';
        return;
    }

    artists.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.className = 'artist-card';
        artistCard.innerHTML = `
            <h3>${artist.name}</h3>
            <p class="tags">${artist.listeners} listeners</p>
        `;
        searchResultsContainer.appendChild(artistCard);
    });
}

// Отображение популярных артистов
async function displayTopArtists() {
    const artistsContainer = document.querySelector('.artists-grid');
    const artists = await getTopArtists();

    artistsContainer.innerHTML = '';
    artists.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.className = 'artist-card';
        artistCard.innerHTML = `
            <h3>${artist.name}</h3>
            <p class="tags">${artist.listeners} listeners</p>
        `;
        artistsContainer.appendChild(artistCard);
    });
}

// Отображение популярных треков
async function displayTopTracks() {
    const tracksContainers = document.querySelectorAll('.tracks-list');
    const tracks = await getTopTracksGlobal();

    // Очищаем первый контейнер с треками
    if (tracksContainers[0]) {
        tracksContainers[0].innerHTML = '';
        tracks.slice(0, 6).forEach(track => {
            const trackItem = document.createElement('div');
            trackItem.className = 'track-item';
            trackItem.innerHTML = `
                <h3>${track.name}</h3>
                <p class="artist">${track.artist.name}</p>
                <p class="tags">${track.listeners} listeners</p>
            `;
            tracksContainers[0].appendChild(trackItem);
        });
    }

    // Очищаем второй контейнер с треками
    if (tracksContainers[1]) {
        tracksContainers[1].innerHTML = '';
        tracks.slice(6, 12).forEach(track => {
            const trackItem = document.createElement('div');
            trackItem.className = 'track-item';
            trackItem.innerHTML = `
                <h3>${track.name}</h3>
                <p class="artist">${track.artist.name}</p>
                <p class="tags">${track.listeners} listeners</p>
            `;
            tracksContainers[1].appendChild(trackItem);
        });
    }
}

// Обработчик поиска
searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query) {
        const artists = await searchArtists(query);
        displaySearchResults(artists);
        
        // Прокрутка к результатам
        document.querySelector('.search-results').scrollIntoView({
            behavior: 'smooth'
        });
    }
});

// Загрузка данных при открытии страницы
window.addEventListener('DOMContentLoaded', () => {
    displayTopArtists();
    displayTopTracks();
});