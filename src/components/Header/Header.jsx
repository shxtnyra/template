import React from 'react';
import './Header.css';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <header>
            <nav className="main-nav">
                <div className="logo">
                    <a href="/">last.fm</a>
                </div>
                <form className="search-bar" onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        placeholder="Поиск по исполнителям, трекам, альбомам..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">
                        <FaSearch />
                    </button>
                </form>
                <div className="user-menu">
                    <a href="#">Live</a>
                    <a href="#">Музыка</a>
                    <a href="#">Чарты</a>
                    <a href="#">События</a>
                </div>
            </nav>
        </header>
    );
};

export default Header;