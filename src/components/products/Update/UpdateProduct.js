import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const { id } = useParams(); // Récupérer l'ID du produit depuis l'URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null); // Pour stocker les données du produit
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les données du produit lors du chargement de la page
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Erreur lors de la récupération du produit.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Fonction pour gérer la soumission du formulaire de mise à jour
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    // Validate that price is a positive number
    if (product.price <= 0) {
      Swal.fire("Erreur", "Le prix doit être un nombre positif.", "error");
      return;
    }

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/products/${id}`, product);
      Swal.fire("Succès", "Le produit a été mis à jour avec succès", "success");
      navigate("/produit");
    } catch (error) {
      Swal.fire("Erreur", "Erreur lors de la mise à jour du produit", "error");
    }
  };

  // Gestion de la mise à jour des champs
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Gestion de la mise à jour des images
  const handleImageChange = (index, e) => {
    const updatedImages = [...product.images];
    updatedImages[index] = e.target.value;
    setProduct({ ...product, images: updatedImages });
  };

  return loading ? (
    <div className="text-center">Chargement...</div>
  ) : error ? (
    <div className="text-red-500 text-center">{error}</div>
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-gray-100">
      <div className="bg-white p-12 rounded-xl shadow-lg max-w-4xl w-full transform transition duration-300 hover:shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800">
          Mettre à jour le produit: {product.name}
        </h1>

        <form onSubmit={handleUpdateProduct} className="grid grid-cols-1 gap-6">
          {/* Nom du produit */}
          <div className="relative mb-6">
            <label className="block text-lg font-medium text-gray-700">Nom du Produit</label>
            <input
              type="text"
              name="name"
              value={product.name || ""}
              onChange={handleChange}
              className="block w-full p-6 text-lg text-gray-900 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Description */}
          <div className="relative mb-6">
            <label className="block text-lg font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={product.description || ""}
              onChange={handleChange}
              className="block w-full p-6 text-lg text-gray-900 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Prix */}
          <div className="relative mb-6">
            <label className="block text-lg font-medium text-gray-700">Prix</label>
            <input
              type="number"
              name="price"
              value={product.price || ""}
              onChange={handleChange}
              className="block w-full p-6 text-lg text-gray-900 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Quantité */}
          <div className="relative mb-6">
            <label className="block text-lg font-medium text-gray-700">Quantité</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity || ""}
              onChange={handleChange}
              className="block w-full p-6 text-lg text-gray-900 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Caractéristiques */}
          <div className="relative mb-6">
            <label className="block text-lg font-medium text-gray-700">Caractéristiques</label>
            <textarea
              name="characteristics"
              value={product.characteristics || ""}
              onChange={handleChange}
              className="block w-full p-6 text-lg text-gray-900 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Images */}
          <div className="relative mb-6">
            <label className="block text-lg font-medium text-gray-700">Images</label>
            {product.images.map((image, index) => (
              <input
                key={index}
                type="url"
                value={image || ""}
                onChange={(e) => handleImageChange(index, e)}
                className="block w-full p-6 text-lg text-gray-900 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mb-3"
              />
            ))}
          </div>

          {/* Catégorie */}
          <div className="relative mb-6">
            <label className="block text-lg font-medium text-gray-700">Catégorie</label>
            <select
              name="category"
              value={product.category[0]._id}
              onChange={handleChange}
              className="block w-full p-6 text-lg text-gray-900 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {product.category.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Couleurs */}
          <div className="relative mb-6">
            <label className="block text-lg font-medium text-gray-700">Couleurs</label>
            <input
              type="text"
              name="colors"
              value={product.colors.join(", ")}
              onChange={handleChange}
              className="block w-full p-6 text-lg text-gray-900 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Tailles */}
          <div className="relative mb-6">
            <label className="block text-lg font-medium text-gray-700">Tailles</label>
            <input
              type="text"
              name="sizes"
              value={product.sizes.join(", ")}
              onChange={handleChange}
              className="block w-full p-6 text-lg text-gray-900 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Options de personnalisation */}
          <div className="relative mb-6">
            <label className="block text-lg font-medium text-gray-700">Options de Personnalisation</label>
            {product.customizationOptions.map((option, index) => (
              <div key={index} className="mb-6">
                <label className="block font-medium text-gray-700">{option.position}</label>
                <input
                  type="text"
                  value={option.customizationSize.join(", ")}
                  onChange={(e) => handleImageChange(index, e)}
                  className="block w-full p-6 text-lg text-gray-900 border border-gray-300 rounded-lg appearance-none"
                  disabled
                />
              </div>
            ))}
          </div>

          {/* Bouton de soumission */}
          <div className="w-full">
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-lg sm:text-xl font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-md">
              Mettre à jour le produit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
