import React from 'react';
import MovieCard from './MovieCard';
import { useMovieContext } from '../context/MovieContext';
import Navbar from './Navbar';
import Footer from './Footer';

const MovieList = () => {
  const { movies, loading, error, searchQuery } = useMovieContext();

  if (loading) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="container py-5 text-center flex-grow-1">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading movies...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="container py-5 flex-grow-1">
          <div className="alert alert-danger">
            {error}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="container py-5 text-center flex-grow-1">
          <h2 className="text-white">No movies found</h2>
          <p className="text-white-50">Try a different search term</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container py-4 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-white">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Movies'}
          </h2>
        </div>
        
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
          {movies.map((movie) => (
            <div key={movie.id} className="col">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MovieList;