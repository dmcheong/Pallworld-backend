import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [characteristics, setCharacteristics] = useState("");
  const [price, setPrice] = useState(50);
  const [discountPrice, setDiscountPrice] = useState("");
  const [isPromo, setIsPromo] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState([]);
  const [customizationOptions, setCustomizationOptions] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch categories from backend API
  useEffect(() => {
    axios
      .get("http://localhost:3005/api/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories", error);
      });
  }, []);

  // Form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation
    if (!name || price <= 0 || !quantity || quantity <= 0 || !category) {
      setError("Merci de remplir tous les champs obligatoires avec des valeurs valides.");
      return;
    }

    // Handle discount price if promo is active
    if (isPromo && (!discountPrice || discountPrice <= 0 || discountPrice >= price)) {
      setError("Le prix réduit doit être inférieur au prix normal.");
      return;
    }

    // Prepare product data for API
    const productData = {
      name,
      description,
      characteristics,
      price,
      discountPrice: isPromo ? discountPrice : null,
      isPromo,
      quantity,
      images,
      colors: colors.split(",").map((color) => color.trim()),
      sizes,
      customizationOptions: customizationOptions || null,
      category: [category],
    };

    // Send data to backend API to add product
    axios
      .post("http://localhost:3005/api/products", productData)
      .then(() => {
        toast.success("Produit ajouté avec succès", { autoClose: 2000 });
        setError(null);

        // Reset form fields
        setName("");
        setDescription("");
        setCharacteristics("");
        setPrice(50);
        setDiscountPrice("");
        setIsPromo(false);
        setQuantity("");
        setImages([]);
        setColors("");
        setSizes([]);
        setCustomizationOptions("");
        setCategory("");

        // Redirect to product page
        setTimeout(() => {
          navigate("/produit");
        }, 2000);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du produit", error);
        setError("Erreur lors de l'ajout du produit.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-gray-100">
      <div className="bg-white p-12 rounded-xl shadow-lg max-w-4xl w-full transform transition duration-300 hover:shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800">
          Ajouter un produit
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Product name */}
          <div className="sm:col-span-2">
            <label className="block text-gray-700 mb-2 font-semibold">Nom du produit</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Entrez le nom du produit"
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="block text-gray-700 mb-2 font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Entrez la description du produit"
            />
          </div>

          {/* Characteristics */}
          <div className="sm:col-span-2">
            <label className="block text-gray-700 mb-2 font-semibold">Caractéristiques</label>
            <textarea
              value={characteristics}
              onChange={(e) => setCharacteristics(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Entrez les caractéristiques du produit"
            />
          </div>

          {/* Price */}
          <div className="sm:col-span-2">
            <label className="block text-gray-700 mb-2 font-semibold">Prix (en euros)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0.01"
              step="0.01"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Entrez le prix du produit"
            />
          </div>

          {/* Discount Price */}
          <div className="sm:col-span-2">
            <label className="block text-gray-700 mb-2 font-semibold">Prix réduit (optionnel)</label>
            <input
              type="number"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              min="0"
              step="0.01"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Entrez le prix réduit du produit"
            />
          </div>

          {/* Quantity */}
          <div className="sm:col-span-2">
            <label className="block text-gray-700 mb-2 font-semibold">Quantité</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Entrez la quantité de produit"
            />
          </div>

          {/* Colors */}
          <div className="sm:col-span-2">
            <label className="block text-gray-700 mb-2 font-semibold">Couleurs (séparées par des virgules)</label>
            <input
              type="text"
              value={colors}
              onChange={(e) => setColors(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Entrez les couleurs disponibles"
            />
          </div>

          {/* Image URLs */}
          <div className="sm:col-span-2">
            <label className="block text-gray-700 mb-2 font-semibold">URL des images (séparées par des virgules)</label>
            <input
              type="text"
              value={images.join(", ")}
              onChange={(e) => setImages(e.target.value.split(",").map((url) => url.trim()))}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Entrez les URL des images"
            />
          </div>

          {/* Sizes */}
          <div className="sm:col-span-2">
            <label className="block text-gray-700 mb-2 font-semibold">Tailles disponibles</label>
            <select
              multiple
              value={sizes}
              onChange={(e) => setSizes([...e.target.selectedOptions].map((option) => option.value))}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="2XL">2XL</option>
            </select>
          </div>

          {/* Category */}
          <div className="sm:col-span-2">
            <label className="block text-gray-700 mb-2 font-semibold">Catégorie</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Customization Options */}
          <div className="sm:col-span-2">
            <label className="block text-gray-700 mb-2 font-semibold">Options de personnalisation (optionnel)</label>
            <textarea
              value={customizationOptions}
              onChange={(e) => setCustomizationOptions(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Entrez les options de personnalisation"
            />
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-md"
            >
              Ajouter le produit
            </button>
          </div>

          {/* Error Display */}
          {error && <p className="text-red-500 mt-4 sm:col-span-2">{error}</p>}
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default AddProduct;
