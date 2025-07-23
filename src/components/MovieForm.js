import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { FiX } from 'react-icons/fi';
import { useMovieContext } from '../context/MovieContext';

const MovieForm = () => {
  const { 
    showForm, 
    setShowForm, 
    currentMovie, 
    handleFormSubmit 
  } = useMovieContext(); // ✅ Removed unused setCurrentMovie

  const [formData, setFormData] = useState({
    title: '',
    overview: '',
    release_date: '',
    poster_url: '',
    backdrop_url: '',
    director: '',
    budget: '',
    revenue: '',
    runtime: '',
    tagline: '',
    genres: '',
    trailerUrl: '',
    vote_average: 7.0
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentMovie) {
      setFormData({
        title: currentMovie.title || '',
        overview: currentMovie.overview || '',
        release_date: currentMovie.release_date || '',
        poster_url: currentMovie.poster_path?.startsWith('http') ? currentMovie.poster_path : '',
        backdrop_url: currentMovie.backdrop_path || '',
        director: currentMovie.director || '',
        budget: currentMovie.budget || '',
        revenue: currentMovie.revenue || '',
        runtime: currentMovie.runtime || '',
        tagline: currentMovie.tagline || '',
        genres: currentMovie.genres?.join(', ') || '',
        trailerUrl: currentMovie.trailerUrl || '',
        vote_average: currentMovie.vote_average || 7.0
      });
    } else {
      setFormData({
        title: '',
        overview: '',
        release_date: '',
        poster_url: '',
        backdrop_url: '',
        director: '',
        budget: '',
        revenue: '',
        runtime: '',
        tagline: '',
        genres: '',
        trailerUrl: '',
        vote_average: 7.0
      });
    }
    setErrors({});
  }, [currentMovie, showForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.overview.trim()) newErrors.overview = 'Overview is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const submissionData = {
      ...formData,
      genres: formData.genres.split(',').map(g => g.trim()).filter(g => g),
      budget: Number(formData.budget) || 0,
      revenue: Number(formData.revenue) || 0,
      runtime: Number(formData.runtime) || 0,
      vote_average: Number(formData.vote_average) || 0,
      poster_path: formData.poster_url || null,
      backdrop_path: formData.backdrop_url || null
    };

    handleFormSubmit(submissionData);
  };

  return (
    <Modal show={showForm} onHide={() => setShowForm(false)} centered className="dark-modal" size="lg">
      <Modal.Header className="bg-dark text-white border-secondary">
        <Modal.Title>{currentMovie ? 'Edit Movie' : 'Add New Movie'}</Modal.Title>
        <Button variant="link" onClick={() => setShowForm(false)} className="text-white">
          <FiX size={24} />
        </Button>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Title*</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                  placeholder="Enter movie title"
                  className="bg-dark text-white border-secondary"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tagline</Form.Label>
                <Form.Control
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="Enter movie tagline"
                  className="bg-dark text-white border-secondary"
                />
              </Form.Group>

              <FloatingLabel label="Overview*" className="mb-3">
                <Form.Control
                  as="textarea"
                  name="overview"
                  value={formData.overview}
                  onChange={handleChange}
                  style={{ height: '150px' }}
                  isInvalid={!!errors.overview}
                  placeholder="Enter movie description"
                  className="bg-dark text-white border-secondary"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.overview}
                </Form.Control.Feedback>
              </FloatingLabel>

              <Form.Group className="mb-3">
                <Form.Label>Genres</Form.Label>
                <Form.Control
                  type="text"
                  name="genres"
                  value={formData.genres}
                  onChange={handleChange}
                  placeholder="Comedy, Action, Drama"
                  className="bg-dark text-white border-secondary"
                />
                <Form.Text className="text-muted">
                  Separate genres with commas
                </Form.Text>
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Release Date</Form.Label>
                <Form.Control
                  type="date"
                  name="release_date"
                  value={formData.release_date}
                  onChange={handleChange}
                  className="bg-dark text-white border-secondary"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Director</Form.Label>
                <Form.Control
                  type="text"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  placeholder="Director's name"
                  className="bg-dark text-white border-secondary"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Runtime (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  name="runtime"
                  value={formData.runtime}
                  onChange={handleChange}
                  placeholder="120"
                  className="bg-dark text-white border-secondary"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Budget</Form.Label>
                <Form.Control
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="100000000"
                  className="bg-dark text-white border-secondary"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Revenue</Form.Label>
                <Form.Control
                  type="number"
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleChange}
                  placeholder="500000000"
                  className="bg-dark text-white border-secondary"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Rating (0-10)</Form.Label>
                <Form.Range
                  min="0"
                  max="10"
                  step="0.1"
                  name="vote_average"
                  value={formData.vote_average}
                  onChange={handleChange}
                  className="border-secondary"
                />
                <div className="d-flex justify-content-between">
                  <small>0</small>
                  <span className="fw-bold">{formData.vote_average}</span>
                  <small>10</small>
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Trailer YouTube URL</Form.Label>
                <Form.Control
                  type="text"
                  name="trailerUrl"
                  value={formData.trailerUrl}
                  onChange={handleChange}
                  placeholder="https://youtube.com/watch?v=..."
                  className="bg-dark text-white border-secondary"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Poster Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="poster_url"
                  value={formData.poster_url}
                  onChange={handleChange}
                  placeholder="https://example.com/poster.jpg"
                  className="bg-dark text-white border-secondary"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Backdrop Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="backdrop_url"
                  value={formData.backdrop_url}
                  onChange={handleChange}
                  placeholder="https://example.com/backdrop.jpg"
                  className="bg-dark text-white border-secondary"
                />
              </Form.Group>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="outline-secondary" onClick={() => setShowForm(false)} className="me-2">
              Cancel
            </Button>
            <Button variant="danger" type="submit">
              {currentMovie ? 'Update Movie' : 'Add Movie'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MovieForm;
