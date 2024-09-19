import React, { useState } from "react";
import axios from "axios";
import "./CreateGeneratedImage.css";

const CreateGeneratedImage = () => {
  const [userId, setUserId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [promptUsed, setPromptUsed] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!userId || !imageUrl) {
      setError(
        "L'identifiant utilisateur et l'URL de l'image sont obligatoires."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3005/api/generated-images",
        {
          userId,
          imageUrl,
          promptUsed,
        }
      );
      setSuccess("Image générée et enregistrée avec succès !");
      setUserId("");
      setImageUrl("");
      setPromptUsed("");
    } catch (err) {
      setError("Erreur lors de l'enregistrement de l'image générée.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Créer une image générée</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="userId">Identifiant de l'utilisateur</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="form-input"
          required
        />

        <label htmlFor="imageUrl">URL de l'image</label>
        <input
          type="url"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="form-input"
          required
        />

        <label htmlFor="promptUsed">Prompt utilisé</label>
        <input
          type="text"
          id="promptUsed"
          value={promptUsed}
          onChange={(e) => setPromptUsed(e.target.value)}
          className="form-input"
        />

        <button type="submit" className="bg-yellow-700" disabled={loading}>
          {loading ? "Enregistrement..." : "Créer l'image"}
        </button>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default CreateGeneratedImage;
