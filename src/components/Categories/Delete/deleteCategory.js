import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fonction pour récupérer toutes les catégories
  const fetchCategories = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/category`)
      .then((response) => {
        setCategories(response.data);
        setError(null);
      })
      .catch(() => {
        setError('Erreur lors de la récupération des catégories');
      });
  };

  // Fonction pour supprimer une catégorie
  const handleDelete = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/category/${id}`)
        .then(() => {
          setSuccess('Catégorie supprimée avec succès');
          setError(null);
          fetchCategories(); // Actualiser la liste après suppression
        })
        .catch(() => {
          setError('Erreur lors de la suppression de la catégorie');
        });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-700">
          Supprimer une Catégorie
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        {categories.length > 0 ? (
          <ul className="space-y-4">
            {categories.map((category) => (
              <li
                key={category._id}
                className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <span className="text-lg font-semibold text-gray-700">
                  {category.name}
                </span>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="bg-yellow-700 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 mt-4">Aucune catégorie disponible.</p>
        )}
      </div>
    </div>
  );
};

export default DeleteCategory;
