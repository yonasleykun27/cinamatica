import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { fetchMovies } from '../services/tmdb';
import { useNavigate } from 'react-router-dom';

const MovieContext = createContext();

export function useMovieContext() {
  return useContext(MovieContext);
}

export function MovieProvider({ children }) {
  const [localMovies, setLocalMovies] = useState(() => {
    const saved = localStorage.getItem('localMovies');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map(movie => {
        if (!movie.hasOwnProperty('isCustom')) {
          return { ...movie, isCustom: true };
        }
        return movie;
      });
    }
    return [];
  });

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [error, setError] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('localMovies', JSON.stringify(localMovies));
  }, [localMovies]);

  const loadMovies = useCallback(async (query = '') => {
    try {
      setLoading(true);
      setError('');

      const apiMovies = await fetchMovies(query);

      const combinedMovies = [
        ...localMovies,
        ...apiMovies.filter(apiMovie =>
          !localMovies.some(localMovie => localMovie.id === apiMovie.id)
        )
      ];

      setMovies(combinedMovies);
    } catch (err) {
      setError('Failed to load movies. Please try again later.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  }, [localMovies]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]); // ✅ Add loadMovies as dependency

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== '') {
        loadMovies(searchQuery);
      } else {
        loadMovies();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, loadMovies]); // ✅ Add loadMovies as dependency

  const handleAddMovie = () => {
    setCurrentMovie(null);
    setShowForm(true);
  };

  const handleEditMovie = (movie) => {
    setCurrentMovie(movie);
    setShowForm(true);
  };

  const handleDeleteMovie = (id) => {
    const isLocalMovie = localMovies.some(movie => movie.id === id);

    if (isLocalMovie) {
      setLocalMovies(prev => prev.filter(movie => movie.id !== id));
      setMovies(prev => prev.filter(movie => movie.id !== id));
    }
  };

  const handleFormSubmit = (movieData) => {
    if (currentMovie) {
      const isLocal = localMovies.some(movie => movie.id === currentMovie.id);

      if (isLocal) {
        const updatedLocalMovies = localMovies.map(movie =>
          movie.id === currentMovie.id ? { ...movie, ...movieData } : movie
        );
        setLocalMovies(updatedLocalMovies);

        setMovies(prev =>
          prev.map(movie =>
            movie.id === currentMovie.id ? { ...movie, ...movieData } : movie
          )
        );
      }
    } else {
      const newMovie = {
        ...movieData,
        id: Date.now(),
        isCustom: true
      };

      setLocalMovies(prev => [...prev, newMovie]);
      setMovies(prev => [...prev, newMovie]);
      navigate(`/movie/${newMovie.id}`);
    }

    setShowForm(false);
    setCurrentMovie(null);
  };

  const playTrailer = (url) => {
    setTrailerUrl(url);
    setShowTrailer(true);
  };

  const value = {
    movies,
    loading,
    error,
    searchQuery,
    showForm,
    currentMovie,
    trailerUrl,
    showTrailer,
    setSearchQuery,
    setShowForm,
    setCurrentMovie,
    setShowTrailer,
    handleAddMovie,
    handleEditMovie,
    handleDeleteMovie,
    handleFormSubmit,
    playTrailer,
    loadMovies
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}
