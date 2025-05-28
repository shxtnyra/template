import React from 'react';
import './AlbumCard.css';
import cover from '../../assets/album_cover.png'; 

const AlbumCard = ({ album }) => {
  return (
    <li className="album-card">
      <img 
        src={album.image?.['#text'] || cover} 
        alt={album.name} 
        className="album-cover"
      />
      <h3 className="album-title">{album.name}</h3>
      <p className="album-artist">{album.artist}</p>
    </li>
  );
};

export default AlbumCard;