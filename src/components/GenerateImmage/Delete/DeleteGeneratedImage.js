import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DeleteGeneratedImage.css"; // Importez le fichier CSS

const DeleteGeneratedImage = () => {
  const [userId, setUserId] = useState(""); // Id de l'utilisateur
  const [images, setImages] = useState([]); // Liste des images
  const [loading, setLoading] = useState(false); // État de chargement
  const [error, setError] = useState(null); // Gestion des erreurs
  const [success, setSuccess] = useState(null); // Message de succès

  // Fonction pour obtenir les images générées par un utilisateur
  const fetchGeneratedImages = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:3005/api/generated-images/${userId}`
      );
      setImages(response.data);
    } catch (error) {
      setError("Erreur lors de la récupération des images générées.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour supprimer une image par ID
  const handleDelete = async (imageId) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.delete(
        `http://localhost:3005/api/generated-images/${imageId}`
      );
      setSuccess("Image supprimée avec succès.");
      setImages(images.filter((image) => image._id !== imageId)); // Mettre à jour la liste après suppression
    } catch (error) {
      setError("Erreur lors de la suppression de l'image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-page-container">
      <h2 className="page-title">Supprimer une image générée</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchGeneratedImages();
        }}
        className="form-container"
      >
        <label htmlFor="userId">Identifiant de l'utilisateur :</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="form-input"
          required
        />
        <button type="submit" className="bg-yellow-700" disabled={loading}>
          {loading ? "Chargement..." : "Rechercher les images"}
        </button>
      </form>

      {/* Afficher les erreurs */}
      {error && <p className="error-message">{error}</p>}

      {/* Afficher les succès */}
      {success && <p className="success-message">{success}</p>}

      {/* Liste des images générées */}
      <div className="image-list">
        {images.map((image) => (
          <div key={image._id} className="image-item">
            <img
              src={image.imageUrl}
              alt="Generated"
              className="generated-image"
            />
            <p>
              {image.promptUsed
                ? `Prompt : ${image.promptUsed}`
                : "Aucun prompt utilisé"}
            </p>
            <button
              className="delete-button"
              onClick={() => handleDelete(image._id)}
              disabled={loading}
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteGeneratedImage;
