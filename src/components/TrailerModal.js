import React, { useRef, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { useMovieContext } from '../context/MovieContext';

const TrailerModal = () => {
  const { trailerUrl, showTrailer, setShowTrailer } = useMovieContext();
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!showTrailer && playerRef.current) {
      playerRef.current.getInternalPlayer()?.pause?.();
      setIsPlaying(false);
    }
  }, [showTrailer]);

  const handleClose = () => {
    setShowTrailer(false);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <Modal 
      show={showTrailer} 
      onHide={handleClose}
      centered
      size="lg"
      backdropClassName="trailer-backdrop"
    >
      <Modal.Header closeButton className="bg-dark text-white border-secondary">
        <Modal.Title>Movie Trailer</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark p-0">
        <div className="ratio ratio-16x9">
          {trailerUrl && (
            <ReactPlayer
              ref={playerRef}
              url={trailerUrl}
              width="100%"
              height="100%"
              controls
              playing={isPlaying}
              onPlay={handlePlay}
              config={{
                youtube: {
                  playerVars: { 
                    modestbranding: 1,
                    rel: 0 
                  }
                }
              }}
            />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TrailerModal;