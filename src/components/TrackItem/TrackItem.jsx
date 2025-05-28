import React from 'react';
import './TrackItem.css';
import cover from '../../assets/track_cover.png'; // Placeholder image

const TrackItem = ({ track }) => {
  return (
    <div className="track-item">
      <img 
        className="track-cover" 
        src={track.image?.['#text'] || cover} 
        alt={`${track.name} cover`} 
      />
      <div className="track-info">
        <div className='title'>
          <a href={track.url} target="_blank" rel="noopener noreferrer">
            {track.name}
          </a>
        </div>
        <div className="artist">
          <a href={track.artist?.url} target="_blank" rel="noopener noreferrer">
            {track.artist?.name || 'Unknown'}
          </a>
        </div>
        {track.tags && (
          <div className="tags">
            {track.tags.slice(0, 3).map((tag, idx) => (
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
    </div>
  );
};

export default TrackItem;