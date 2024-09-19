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
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || price < 0 || price > 100 || !quantity || !category) {
      setError("Veuillez remplir tous les champs requis correctement.");
      return;
    }

    if (quantity <= 0 || quantity % 2 !== 0) {
      setError("La quantité doit être un nombre pair et positif.");
      return;
    }

    const productData = {
      name,
      description,
      characteristics,
      price,
      quantity,
      images,
      colors: colors.split(",").map((color) => color.trim()), 
      sizes,
      category: [category], 
    };

    axios
      .post("http://localhost:3005/api/products", productData)
      .then(() => {
        toast.success("Produit ajouté avec succès", { autoClose: 2000 });
        setError(null);

        setName("");
        setDescription("");
        setCharacteristics("");
        setPrice(50);
        setQuantity("");
        setImages([]);
        setColors("");
        setSizes([]);
        setCategory("");

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
          Ajouter un Produit
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div className="sm:col-span-2">
            <label className="block text-gray-700 mb-2 font-semibold">
              Nom du Produit
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Entrez le nom du produit"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-gray-700 mb-2 font-semibold">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Entrez la description du produit"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-gray-700 mb-2 font-semibold">
              Caractéristiques
            </label>
            <textarea
              value={characteristics}
              onChange={(e) => setCharacteristics(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Entrez les caractéristiques du produit"
            />
          </div>

          {/* Slider pour le prix */}
          <div className="sm:col-span-2">
            <label className="block text-gray-700 mb-2 font-semibold">
              Prix du Produit (en euros)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full"
            />
            <p className="text-center text-gray-700 font-semibold mt-2">
              {price} €
            </p>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Quantité (pair et entre 0 et 100)
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="0"
              max="100"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Entrez la quantité"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Tailles (sélection multiple)
            </label>
            <select
              multiple
              value={sizes}
              onChange={(e) =>
                setSizes([...e.target.selectedOptions].map((option) => option.value))
              }
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

          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Catégorie
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-md"
            >
              Ajouter le produit
            </button>
          </div>

          {error && <p className="text-red-500 mt-4 sm:col-span-2">{error}</p>}
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default AddProduct;
