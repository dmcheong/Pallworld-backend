import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss"; 

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setDisplayedCategories(categories);
      return;
    }
    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedCategories(filteredCategories);
  }, [searchTerm, categories]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/category`);
      setCategories(response.data);
      setDisplayedCategories(response.data);
      setError(null);
    } catch (error) {
      setError("Erreur lors de la récupération des catégories.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const resetSearch = () => {
    setSearchTerm("");
  };

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleEditCategory = (categoryId) => {
    navigate(`/categories/update/${categoryId}`);
  };

  const handleDeleteCategory = async (categoryId) => {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/api/category/${categoryId}`);
          Swal.fire('Supprimé!', 'La catégorie a été supprimée.', 'success');
          fetchCategories(); 
        } catch (error) {
          Swal.fire('Erreur!', "Erreur lors de la suppression de la catégorie.", 'error');
        }
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-gray-100">
      <div className="bg-white p-12 rounded-xl shadow-lg max-w-4xl w-full transform transition duration-300 hover:shadow-2xl">
        {/* Titre centré et icône + */}
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center">
            Liste des Catégories
          </h1>
          {/* Icône + pour ajouter une nouvelle catégorie */}
          <div className="relative group ml-4">
            <button
              className="bg-purple-500 text-white p-3 rounded-full shadow-md hover:bg-purple-600 transition-all"
              onClick={() => navigate("/categories/add")}
            >
              <FaPlus />
            </button>
            {/* Tooltip au survol de l'icône */}
            <span className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Ajouter une catégorie
            </span>
          </div>
        </div>

        {/* Formulaire de recherche */}
        <form onSubmit={(e) => e.preventDefault()} className="flex justify-center items-center w-full mb-8">
          <input
            type="text"
            placeholder="Rechercher par nom de catégorie..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-3/4 p-4 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-800 shadow-inner focus:outline-none focus:border-purple-500 transition-all"
          />
          <button
            type="button"
            onClick={resetSearch}
            className="ml-4 py-3 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:translate-y-[-2px]"
          >
            Réinitialiser
          </button>
        </form>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {loading ? (
          <p className="text-center text-gray-600">Chargement...</p>
        ) : (
          <ul className="list-none p-0 mt-4 space-y-4">
            {displayedCategories.length > 0 ? (
              displayedCategories.map((category, index) => (
                <li
                  key={category._id}
                  className="p-4 bg-white border border-gray-300 rounded-lg shadow-md flex justify-between items-center hover:shadow-lg transition-shadow"
                >
                  <span className="text-gray-800">{category.name}</span>
                  <div className="relative">
                    <button
                      className="text-gray-700 hover:text-black focus:outline-none"
                      onClick={() => toggleMenu(index)}
                    >
                      <FaEllipsisV />
                    </button>
                    {openMenuIndex === index && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-10">
                        <button
                          onClick={() => handleEditCategory(category._id)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category._id)}
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                        >
                          Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-600">Aucune catégorie trouvée.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
