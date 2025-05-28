import React, { useState, useEffect } from 'react';
import ArtistCard from '../../components/ArtistCard/ArtistCard';
import TrackItem from '../../components/TrackItem/TrackItem';
import './HomePage.css';
import { getTopArtists, getTopArtistsWithTags, getTopTracks, getTopTracksWithTags} from '../../api/lastfmApi'; // Adjust the import path as necessary

const HomePage = () => {
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistsData, tracksData] = await Promise.all([
          getTopArtistsWithTags(),
          getTopTracksWithTags()
        ]);
        setArtists(artistsData);
        setTracks(tracksData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <main className="container">
      <section className="music-section">
        <h1>Музыка</h1>
        
        <div className="section-block">
          <h2>Популярно сейчас</h2>
          <div className="artists-grid">
            {artists.map(artist => (
              <ArtistCard key={artist.mbid || artist.name} artist={artist} />
            ))}
          </div>
        </div>
        
        <div className="section-block">
          <h2>Популярные треки</h2>
          <div className="tracks-list">
            {tracks.map(track => (
              <TrackItem key={`${track.artist.name}-${track.name}`} track={track} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;