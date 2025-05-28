import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { searchArtists, searchAlbums, searchTracks } from '../../api/lastfmApi';
import ArtistCard from '../../components/ArtistCard/ArtistCard';
import AlbumCard from '../../components/AlbumCard/AlbumCard';
import TrackItem from '../../components/TrackItem/TrackItem';
import './SearchPage.css';

const SearchTabs = ({ query }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabList = [
    { label: 'Топ-результаты', path: `/search?q=${encodeURIComponent(query)}` },
    { label: 'Исполнители', path: `/search/artists?q=${encodeURIComponent(query)}` },
    { label: 'Альбомы', path: `/search/albums?q=${encodeURIComponent(query)}` },
    { label: 'Треки', path: `/search/tracks?q=${encodeURIComponent(query)}` },
  ];

  return (
    <div className="results-tabs">
      {tabList.map(tab => (
        <button
          key={tab.label}
          className={location.pathname + location.search === tab.path ? 'active' : ''}
          onClick={() => navigate(tab.path)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

/* Возможно стоило всё разделить на компоненты, но я не уверен */
const TopResults = ({ results }) => (
  <>
    <section className="artists-section">
      <h2>Исполнители</h2>
      <div className="artists-grid">
        {results.artists.slice(0, 6).map(artist => (
          <ArtistCard key={artist.mbid || artist.name} artist={artist} />
        ))}
      </div>
    </section>
    <section className="albums-section">
      <h2>Альбомы</h2>
      <ul className="albums-grid">
        {results.albums.slice(0, 6).map(album => (
          <AlbumCard key={album.mbid || album.name} album={album} />
        ))}
      </ul>
    </section>
    <section className="tracks-section">
      <h2>Треки</h2>
      <ul className="tracks-list">
        {results.tracks.slice(0, 6).map(track => (
          <TrackItem key={`${track.artist}-${track.name}`} track={track} />
        ))}
      </ul>
    </section>
  </>
);

const ArtistsTab = ({ results }) => (
  <section className="artists-section">
    <h2>Исполнители</h2>
    <div className="artists-grid">
      {results.artists.map(artist => (
        <ArtistCard key={artist.mbid || artist.name} artist={artist} />
      ))}
    </div>
  </section>
);

const AlbumsTab = ({ results }) => (
  <section className="albums-section">
    <h2>Альбомы</h2>
    <ul className="albums-grid">
      {results.albums.map(album => (
        <AlbumCard key={album.mbid || album.name} album={album} />
      ))}
    </ul>
  </section>
);

const TracksTab = ({ results }) => (
  <section className="tracks-section">
    <h2>Треки</h2>
    <ul className="tracks-list">
      {results.tracks.map(track => (
        <TrackItem key={`${track.artist}-${track.name}`} track={track} />
      ))}
    </ul>
  </section>
);

const SearchPage = () => {
  const [results, setResults] = useState({
    artists: [],
    albums: [],
    tracks: [],
  });
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const [artists, albums, tracks] = await Promise.all([
          searchArtists(query),
          searchAlbums(query),
          searchTracks(query)
        ]);
        setResults({ artists, albums, tracks });
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  if (loading) {
    return <div className="loading">Loading results...</div>;
  }

  return (
    <div className="search-results">
      <h1>Результаты поиска "{query}"</h1>
      <SearchTabs query={query} />
      <Routes>
        <Route index element={<TopResults results={results} />} />
        <Route path="artists" element={<ArtistsTab results={results} />} />
        <Route path="albums" element={<AlbumsTab results={results} />} />
        <Route path="tracks" element={<TracksTab results={results} />} />
      </Routes>
    </div>
  );
};

export default SearchPage;