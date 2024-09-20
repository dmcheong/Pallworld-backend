import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaArrowLeft } from 'react-icons/fa';
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { productId } = useParams(); // Extract productId from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3005/api/products/${productId}`);
        setProduct(response.data);
        setError(null);
      } catch (error) {
        setError('Erreur lors de la récupération du produit.');
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const handleDeleteProduct = async () => {
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
          await axios.delete(`http://localhost:3005/api/products/${productId}`);
          Swal.fire('Supprimé!', 'Le produit a été supprimé.', 'success');
          navigate("/produit");
        } catch (error) {
          Swal.fire('Erreur!', "Erreur lors de la suppression du produit.", 'error');
        }
      }
    });
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!product) {
    return <p>Produit non trouvé.</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-gray-100">
      <div className="bg-white p-12 rounded-xl shadow-lg max-w-4xl w-full relative">
        <button
          className="absolute top-4 left-4 text-gray-600 hover:text-black"
          onClick={() => navigate("/produit")}
        >
          <FaArrowLeft size={24} />
        </button>
        <div className="absolute top-4 right-4 flex space-x-4">
          <button
            onClick={() => navigate(`/produit/update/${productId}`)}
            className="text-blue-600 hover:text-blue-800"
          >
            <FaEdit size={24} />
          </button>
          <button
            onClick={handleDeleteProduct}
            className="text-red-600 hover:text-red-800"
          >
            <FaTrashAlt size={24} />
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-8">{product.name}</h1>
        <p className="text-lg mb-4">Prix: {product.price} €</p>
        <p className="text-lg mb-4">Quantité: {product.quantity}</p>
        <p className="text-lg mb-4">Description: {product.description || "Aucune description disponible."}</p>
        {product.images && (
          <div className="mt-4">
            <img
              src={product.images[0]} // Display the first image of the product
              alt={product.name}
              className="rounded-lg w-1/2 h-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
