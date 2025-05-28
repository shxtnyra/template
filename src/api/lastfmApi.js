const API_KEY = '5578ecbce8442480bab5741400e050ec';
const API_URL = 'https://ws.audioscrobbler.com/2.0/';


export const fetchData = async (method, params = {}) => {
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
};

export const getTopArtists = async (limit = 12) => {
  const data = await fetchData('chart.gettopartists', { limit });

  return data?.artists?.artist.map(artist => ({
    ...artist,
    image: artist.image?.find(img => img.size === 'extralarge')?.['#text'] ||
           artist.image?.find(img => img.size === 'large')?.['#text'] ||
           artist.image?.find(img => img.size === 'medium')?.['#text'] ||
           'https://via.placeholder.com/200x200?text=No+Image',
  })) || [];
};

export const getTopTracks = async (limit = 12) => {
  const data = await fetchData('chart.gettoptracks', { limit });
  return data?.tracks?.track || [];
};

export const getTrackTags = async (artistName, trackName) => {
  const data = await fetchData('track.gettoptags', { artist: artistName, track: trackName });
  return data?.toptags?.tag || [];
};

export const getArtistTags = async (artistName) => {
  const data = await fetchData('artist.gettoptags', { artist: artistName });
  return data?.toptags?.tag || [];
};

export const getTopTracksWithTags = async (limit = 12) => {
  const data = await fetchData('chart.gettoptracks', { limit });
  const tracks = data?.tracks?.track || [];

  const tracksWithTags = await Promise.all(
    tracks.map(async track => {
      const tags = await getTrackTags(track.artist.name, track.name);
      return {
        ...track,
        tags, // массив тегов
        image: track.image?.find(img => img.size === 'medium')?.['#text'] ||
               'https://via.placeholder.com/64x64?text=No+Cover'
      };
    })
  );

  return tracksWithTags;
};

export const getTopArtistsWithTags = async (limit = 12) => {
  const data = await fetchData('chart.gettopartists', { limit });
  const artists = data?.artists?.artist || [];

  const artistsWithTags = await Promise.all(
    artists.map(async artist => {
      const tags = await getArtistTags(artist.name);
      return {
        ...artist,
        tags,
        image: artist.image?.find(img => img.size === 'extralarge')?.['#text'] ||
               artist.image?.find(img => img.size === 'large')?.['#text'] ||
               artist.image?.find(img => img.size === 'medium')?.['#text']
      };
    })
  );

  return artistsWithTags;
};

/** Для поисковика артистов и треков */
export const searchArtists = async (query, limit = 5) => {
  const data = await fetchData('artist.search', { artist: query, limit });
  return data?.results?.artistmatches?.artist || [];
};

export const searchAlbums = async (query, limit = 8) => {
  const data = await fetchData('album.search', { album: query, limit });
  return data?.results?.albummatches?.album || [];
};

export const searchTracks = async (query, limit = 4) => {
  const data = await fetchData('track.search', { track: query, limit });
  return data?.results?.trackmatches?.track || [];
};
