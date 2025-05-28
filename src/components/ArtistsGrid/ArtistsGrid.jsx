import React from 'react';
import './ArtistsGrid.css';
import cover from '../../assets/artist_cover.png'

const ArtistsGrid = ({ artists }) => {
  return (
    <div className="artists-grid-container">
      <div className="artists-grid">
        {artists.map((artist, index) => (
          <div key={artist.mbid || index} className="artist-cell">
            <div className="artist-image-container">
              <img 
                src={artist.image?.['#text'] || cover} 
                alt={artist.name} 
                className="artist-image"
              />
            </div>
            <h3 className="artist-name">{artist.name}</h3>
            <p className="artist-listeners">
              {artist.listeners || 0} {artist.listeners === 1 ? 'listener' : 'listeners'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistsGrid;