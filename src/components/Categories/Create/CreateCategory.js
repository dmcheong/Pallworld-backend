import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!categoryName.trim()) {
      setError("Le nom de la catégorie ne peut pas être vide.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:3005/api/category", {
        name: categoryName,
      });
      setCategoryName("");
      navigate("/categories");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Erreur: ${err.response.data.message}`);
      } else {
        setError(
          "Erreur lors de la création de la catégorie. Veuillez réessayer."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-gray-100">
      <div className="bg-white p-12 rounded-xl shadow-lg max-w-3xl w-full transform transition duration-300 hover:shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800">
  Liste des Catégories
</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div className="relative mb-6">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              disabled={loading}
              className="block w-full p-6 text-lg text-gray-900 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 peer"
              placeholder=" " // Important to leave a placeholder with space
            />
            <label
              htmlFor="categoryName"
              className="absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-4 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-purple-500"
            >
              Nom de la catégorie
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-lg sm:text-xl font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-md"
          >
            {loading ? "Création en cours..." : "Créer"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-6 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default CreateCategory;
