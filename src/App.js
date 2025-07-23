import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import MovieDetailPage from './pages/MovieDetailPage';
import TrailerModal from './components/TrailerModal';
import './App.css';

function App() {
  return (
    <MovieProvider>
      <div className="app-container d-flex flex-column min-vh-100">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="*" element={<MovieList />} />
        </Routes>
        <MovieForm />
        <TrailerModal />
      </div>
    </MovieProvider>
  );
}

export default App;