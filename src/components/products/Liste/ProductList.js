import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEllipsisV, FaPlus, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const navigate = useNavigate();
  const limit = 8; // Number of products per page

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]); // Re-fetch products when the page changes

  useEffect(() => {
    if (!searchTerm.trim()) {
      fetchProducts(currentPage); // Reset when search term is cleared
      return;
    }
    const filteredProducts = products.filter((product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
  }, [searchTerm]);

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products?page=${page}&limit=${limit}`
      );
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setError(null);
    } catch (error) {
      setError("Erreur lors de la récupération des produits.");
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

  const handleEditProduct = (productId) => {
    navigate(`/produit/update/${productId}`);
  };

  const handleDeleteProduct = async (productId) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer!",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/api/products/${productId}`);
          Swal.fire("Supprimé!", "Le produit a été supprimé.", "success");
          fetchProducts(currentPage); // Refresh the product list
        } catch (error) {
          Swal.fire("Erreur!", "Erreur lors de la suppression du produit.", "error");
        }
      }
    });
  };

  // Pagination Handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-gray-100">
      <div className="bg-white p-12 rounded-xl shadow-lg max-w-4xl w-full transform transition duration-300 hover:shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Liste des Produits</h1>
          <div className="relative group">
            <button
              className="bg-purple-500 text-white p-3 rounded-full shadow-md hover:bg-purple-600 transition-all"
              onClick={() => navigate("/produit/add")}
            >
              <FaPlus />
            </button>
            <span className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Ajouter un produit
            </span>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="flex justify-center items-center w-full mb-8">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-3/4 p-4 border-2 border-purple-500 rounded-lg bg-gray-50 text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          />
          <button
            type="button"
            onClick={resetSearch}
            className="ml-4 py-2 px-4 bg-gray-200 text-black rounded-lg shadow-lg hover:bg-gray-300 transition-transform transform hover:translate-y-[-2px]"
          >
            Réinitialiser
          </button>
        </form>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {loading ? (
          <p className="text-center text-gray-600">Chargement...</p>
        ) : (
          <>
            <ul className="list-none p-0 mt-4">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <li
                    key={product._id}
                    className="p-4 mb-3 bg-white border border-gray-200 rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition-shadow relative"
                    onClick={() => navigate(`/produit/details/${product._id}`)}
                  >
                    <span className="text-purple-700 cursor-pointer">
                      {product.name || "Nom non disponible"} - {product.price ? `${product.price} €` : "Prix non disponible"}
                    </span>
                    <div className="relative">
                      <button
                        className="text-gray-700 hover:text-black focus:outline-none"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents navigation
                          toggleMenu(index);
                        }}
                      >
                        <FaEllipsisV />
                      </button>
                      {openMenuIndex === index && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-10">
                          <button
                            onClick={() => handleEditProduct(product._id)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
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
                <p className="text-center text-gray-600">Aucun produit trouvé.</p>
              )}
            </ul>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-8">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="p-3 bg-gray-200 rounded-full shadow-lg hover:bg-gray-300 transition-all"
              >
                <FaArrowLeft />
              </button>
              <span className="mx-4 text-lg text-gray-700">
                Page {currentPage} sur {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-3 bg-gray-200 rounded-full shadow-lg hover:bg-gray-300 transition-all"
              >
                <FaArrowRight />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
