import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/*" element={<SearchPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;