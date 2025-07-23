import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';

const MovieCard = ({ movie }) => {
  // Function to handle image source
  const getImageSrc = () => {
    if (movie.poster_path && movie.poster_path.startsWith('/')) {
      return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    }
    if (movie.poster_path) {
      return movie.poster_path;
    }
    return "https://via.placeholder.com/300x450?text=No+Image";
  };

  return (
    <Link to={`/movie/${movie.id}`} className="text-decoration-none">
      <div className="movie-card position-relative overflow-hidden rounded">
        <div className="position-relative" style={{ paddingTop: '150%' }}>
          <img 
            src={getImageSrc()} 
            alt={movie.title}
            className="position-absolute top-0 start-0 w-100 h-100 object-cover"
          />
          
          <div className="movie-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-3">
            <div className="movie-info">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                  <FiStar className="text-warning me-1" />
                  <span className="text-white fw-bold">
                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                  </span>
                </div>
              </div>
              
              <h5 className="text-white mb-0">{movie.title}</h5>
              <p className="text-muted mb-0">
                {movie.release_date ? movie.release_date.substring(0, 4) : 'Year unknown'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;