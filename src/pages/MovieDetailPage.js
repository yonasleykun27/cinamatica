import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiPlay, FiStar, FiClock, FiDollarSign, FiArrowLeft, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useMovieContext } from '../context/MovieContext';
import { getMovieDetails } from '../services/tmdb';
import TrailerModal from '../components/TrailerModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MovieDetailPage = () => {
  const { id } = useParams();
  const { movies, playTrailer, handleEditMovie, handleDeleteMovie } = useMovieContext();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        setError('');
        
        // First check if it's a custom movie
        const customMovie = movies.find(m => m.id === parseInt(id));
        
        if (customMovie) {
          setMovie(customMovie);
          setLoading(false);
          return;
        }
        
        // If not found in context, fetch from TMDB
        const movieData = await getMovieDetails(id);
        
        if (!movieData) {
          throw new Error('Movie not found');
        }
        
        // Format TMDB data to match our structure
        const formattedMovie = {
          id: movieData.id,
          title: movieData.title,
          overview: movieData.overview,
          release_date: movieData.release_date,
          poster_path: movieData.poster_path,
          backdrop_path: movieData.backdrop_path,
          vote_average: movieData.vote_average,
          tagline: movieData.tagline,
          runtime: movieData.runtime,
          genres: movieData.genres?.map(genre => genre.name) || [],
          director: movieData.credits?.crew?.find(
            member => member.job === 'Director'
          )?.name || 'N/A',
          budget: movieData.budget,
          revenue: movieData.revenue,
          trailerUrl: movieData.videos?.results?.find(
            video => video.site === 'YouTube' && video.type === 'Trailer'
          )?.key || ''
        };
        
        setMovie(formattedMovie);
      } catch (err) {
        setError('Failed to load movie details. Please try again later.');
        console.error('Movie details error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id, movies]);

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format runtime
  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  if (loading) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="text-center py-5 flex-grow-1">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-white">Loading movie details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="container py-5 text-center flex-grow-1">
          <div className="alert alert-danger">{error}</div>
          <button 
            className="btn btn-danger mt-3"
            onClick={() => navigate('/')}
          >
            <FiArrowLeft className="me-2" /> Back to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="container py-5 text-center flex-grow-1">
          <h2 className="text-white">Movie not found</h2>
          <button 
            className="btn btn-danger mt-3"
            onClick={() => navigate('/')}
          >
            <FiArrowLeft className="me-2" /> Back to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // Get poster URL for background
  const getPosterUrl = () => {
    if (movie.poster_path) {
      return movie.poster_path.startsWith('/') 
        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
        : movie.poster_path;
    }
    return 'https://via.placeholder.com/500x750?text=No+Image';
  };

  const posterUrl = getPosterUrl();

  // Handle trailer URL
  const getTrailerUrl = () => {
    if (!movie.trailerUrl) return null;
    
    // If it's already a full URL
    if (movie.trailerUrl.includes('youtube.com') || 
        movie.trailerUrl.includes('youtu.be') ||
        movie.trailerUrl.includes('vimeo.com')) {
      return movie.trailerUrl;
    }
    
    // If it's just a YouTube ID
    return `https://www.youtube.com/watch?v=${movie.trailerUrl}`;
  };

  const trailerUrl = getTrailerUrl();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <div className="movie-detail-page flex-grow-1" style={{ paddingTop: '0.5rem' }}>
        {/* Background image with blur effect */}
        <div className="background-image" style={{
          backgroundImage: `url(${posterUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -2,
          filter: 'blur(8px) brightness(0.4)',
          transform: 'scale(1.1)'
        }}></div>
        
        {/* Dark overlay */}
        <div className="overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          background: 'linear-gradient(to right, rgba(0,0,0,0.9) 20%, transparent 70%), linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 30%)'
        }}></div>

        {/* Content */}
        <div className="container py-3 py-md-4">
          <div className="row">
            <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
              <button 
                className="btn btn-outline-light mb-4"
                onClick={() => navigate('/')}
              >
                <FiArrowLeft className="me-2" /> Back to Movies
              </button>
              
              <div className="rounded overflow-hidden shadow-lg">
                <img 
                  src={posterUrl} 
                  alt={movie.title}
                  className="img-fluid rounded"
                />
              </div>
            </div>
            
            <div className="col-lg-8 col-xl-9">
              <h1 className="display-4 fw-bold mb-3 text-white">
                {movie.title} 
                {movie.release_date && movie.release_date.substring && (
                  <span className="fs-3 fw-normal"> ({movie.release_date.substring(0, 4)})</span>
                )}
              </h1>
              
              <div className="d-flex flex-wrap align-items-center mb-4">
                {movie.genres && movie.genres.length > 0 && (
                  <div className="d-flex flex-wrap me-4 mb-2">
                    {movie.genres.map((genre, index) => (
                      <span key={index} className="badge bg-danger me-2 mb-2">
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="d-flex flex-wrap">
                  {movie.runtime && (
                    <span className="d-flex align-items-center me-4 mb-2 text-white">
                      <FiClock className="me-1" /> {formatRuntime(movie.runtime)}
                    </span>
                  )}
                  
                  <span className="d-flex align-items-center me-4 mb-2 text-white">
                    <FiStar className="text-warning me-1" /> 
                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                  </span>
                </div>
              </div>
              
              <div className="d-flex flex-wrap gap-2 mb-4">
                {trailerUrl && (
                  <button 
                    className="btn btn-danger btn-lg d-flex align-items-center"
                    onClick={() => playTrailer(trailerUrl)}
                  >
                    <FiPlay className="me-2" size={24} /> Play Trailer
                  </button>
                )}
                
                {movie.isCustom && (
                  <>
                    <button 
                      className="btn btn-outline-light btn-lg d-flex align-items-center"
                      onClick={() => {
                        handleEditMovie(movie);
                        navigate('/');
                      }}
                    >
                      <FiEdit2 className="me-2" /> Edit
                    </button>
                    <button 
                      className="btn btn-outline-danger btn-lg d-flex align-items-center"
                      onClick={() => {
                        handleDeleteMovie(movie.id);
                        navigate('/');
                      }}
                    >
                      <FiTrash2 className="me-2" /> Delete
                    </button>
                  </>
                )}
              </div>
              
              {movie.tagline && (
                <p className="lead fst-italic mb-4 text-white">"{movie.tagline}"</p>
              )}
              
              <div className="mb-5">
                <h3 className="mb-3 text-white">Overview</h3>
                <p className="fs-5 text-white">{movie.overview || 'No overview available.'}</p>
              </div>
              
              <div className="row">
                <div className="col-md-6 col-lg-4 mb-4">
                  <h4 className="mb-3 text-white">Director</h4>
                  <p className="fs-5 text-white">{movie.director || 'N/A'}</p>
                </div>
                
                <div className="col-md-6 col-lg-4 mb-4">
                  <h4 className="mb-3 text-white">Budget</h4>
                  <p className="fs-5 d-flex align-items-center text-white">
                    <FiDollarSign className="me-2" /> {formatCurrency(movie.budget)}
                  </p>
                </div>
                
                <div className="col-md-6 col-lg-4 mb-4">
                  <h4 className="mb-3 text-white">Revenue</h4>
                  <p className="fs-5 d-flex align-items-center text-white">
                    <FiDollarSign className="me-2" /> {formatCurrency(movie.revenue)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      <TrailerModal />
    </div>
  );
};

export default MovieDetailPage;