import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListImages.css";

const ListImages = ({ userId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchImages();
  }, [userId, currentPage]);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:3005/api/generated-images/${userId}?page=${currentPage}&limit=10`
      );
      setImages(response.data.images);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Erreur lors de la récupération des images générées.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="list-images-container">
      <h2 className="title">Liste des images générées</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : images.length === 0 ? (
        <p>Aucune image générée trouvée pour cet utilisateur.</p>
      ) : (
        <div>
          <div className="image-grid">
            {images.map((image) => (
              <div key={image._id} className="image-item">
                <img
                  src={image.imageUrl}
                  alt="Generated"
                  className="generated-image"
                />
                <p className="prompt">{image.promptUsed}</p>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Précédent
            </button>
            <span>
              Page {currentPage} sur {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListImages;
