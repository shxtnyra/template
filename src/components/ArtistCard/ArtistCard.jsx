import React from 'react';
import './ArtistCard.css';
import cover from '../../assets/artist_cover.png'; 

const ArtistCard = ({ artist }) => {
  return (
    <div className="artist-card">
      <div className="artist-image-wrap">
        <a href={artist.url} target="_blank" rel="noopener noreferrer">
          <img className="artist-image" src={artist.image?.['#text'] || cover} alt={artist.name} />
        </a>
      </div>
      <div className="name">
        <a href={artist.url} target="_blank" rel="noopener noreferrer">{artist.name}</a>
      </div>
      {artist.tags && (
          <div className="tags">
            {artist.tags.slice(0, 3).map((tag, idx) => (
              <a
                key={tag.name || idx}
                className="tag-link"
                href={`https://www.last.fm/tag/${encodeURIComponent(tag.name)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {tag.name}
              </a>
            )).reduce((prev, curr) => [prev, ', ', curr])}
          </div>
        )}
    </div>
  );
};

export default ArtistCard;