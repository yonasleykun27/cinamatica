import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiPlusCircle } from 'react-icons/fi';
import { useMovieContext } from '../context/MovieContext';

const Navbar = () => {
  const { setSearchQuery, handleAddMovie } = useMovieContext();
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isDetailPage = location.pathname.startsWith('/movie/');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setSearchQuery(value);
  };

  const handleAddClick = () => {
    navigate('/');
    handleAddMovie();
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center me-0 me-lg-4" to="/">
          <span className="text-danger fw-bold">CINEMATICA</span>
        </Link>
        
        {!isDetailPage && (
          <>
            <button 
              className="navbar-toggler" 
              type="button" 
              onClick={toggleMenu}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
              <div className="d-flex flex-column flex-lg-row flex-grow-1 my-3 my-lg-0 mx-lg-4">
                <div className="input-group mb-2 mb-lg-0 me-lg-3">
                  <span className="input-group-text bg-dark border-end-0 text-white">
                    <FiSearch />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-start-0"
                    placeholder="Search movies..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    style={{ minWidth: '150px' }}
                  />
                </div>
                
                <button 
                  className="btn btn-outline-danger d-flex align-items-center justify-content-center"
                  onClick={handleAddClick}
                >
                  <FiPlusCircle className="me-2" /> Add Movie
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;