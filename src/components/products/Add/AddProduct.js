import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [characteristics, setCharacteristics] = useState("");
  const [price, setPrice] = useState(""); // Allow empty string
  const [discountPrice, setDiscountPrice] = useState("");
  const [isPromo, setIsPromo] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState([""]); // Start with one input for image URLs
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState([]);
  const [customizationOptions, setCustomizationOptions] = useState([{ position: "", customizationSize: [] }]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch available categories from backend
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/category`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories", error);
      });
  }, []);

  // Handle adding a new image input
  const handleAddImage = () => {
    setImages([...images, ""]); // Add an empty input for a new image
  };

  // Handle customization option updates
  const handleCustomizationChange = (index, field, value) => {
    const updatedOptions = [...customizationOptions];
    if (field === "position") {
      updatedOptions[index].position = value;
    } else {
      updatedOptions[index].customizationSize = value.split(",").map((size) => size.trim());
    }
    setCustomizationOptions(updatedOptions);
  };

  // Form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation du prix et des autres champs
    const parsedPrice = parseFloat(price); // Ensure price is parsed correctly
    if (!name || isNaN(parsedPrice) || parsedPrice < 0 || quantity <= 0 || !category) {
      setError("Merci de remplir tous les champs obligatoires avec des valeurs valides.");
      return;
    }

    // Gestion du prix réduit si la promo est active
    if (isPromo && (!discountPrice || discountPrice <= 0 || discountPrice >= parsedPrice)) {
      setError("Le prix réduit doit être inférieur au prix normal.");
      return;
    }

    // Préparation des données du produit pour l'API
    const productData = {
      name,
      description,
      characteristics,
      price: parsedPrice,
      discountPrice: isPromo ? discountPrice : null,
      isPromo,
      quantity,
      images,
      colors: colors.split(",").map((color) => color.trim()), // Séparation des couleurs par virgules
      sizes,
      customizationOptions,
      category: [category], // Une seule catégorie sélectionnée
    };

    // Log des données envoyées au backend
    console.log("Données du produit avant l'envoi :", productData);

    // Envoi des données à l'API pour ajouter le produit
    axios.post(`${process.env.REACT_APP_API_URL}/api/products`, productData)
      .then((response) => {
        console.log("Réponse de l'API :", response.data);
        toast.success("Produit ajouté avec succès", { autoClose: 2000 });
        setError(null);

        // Réinitialisation des champs après l'ajout
        setName("");
        setDescription("");
        setCharacteristics("");
        setPrice(""); // Autoriser une chaîne vide comme valeur initiale
        setDiscountPrice("");
        setIsPromo(false);
        setQuantity(1);
        setImages([""]); // Réinitialiser à un champ d'URL d'image
        setColors("");
        setSizes([]);
        setCustomizationOptions([{ position: "", customizationSize: [] }]);
        setCategory("");

        // Redirection après succès de l'ajout
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
              required
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
              required
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
              required
            />
          </div>

          {/* Price */}
          <div className="sm:col-span-2">
            <label className="block text-gray-700 mb-2 font-semibold">Prix (en euros)</label>
            <input
              type="text" // Changed to text to allow empty string
              value={price}
              onChange={(e) => setPrice(e.target.value)} // Keep string value temporarily
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Entrez le prix du produit"
              required
            />
          </div>

          {/* Discount Price */}
          {isPromo && (
            <div className="sm:col-span-2">
              <label className="block text-gray-700 mb-2 font-semibold">Prix réduit (optionnel)</label>
              <input
                type="number"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(Number(e.target.value))}
                min="0"
                step="0.01"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Entrez le prix réduit du produit"
              />
            </div>
          )}

          {/* Quantity */}
          <div className="sm:col-span-2">
            <label className="block text-gray-700 mb-2 font-semibold">Quantité</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Entrez la quantité de produit"
              required
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
            <label className="block text-gray-700 mb-2 font-semibold">URL des images</label>
            {images.map((image, index) => (
              <input
                key={index}
                type="url"
                value={image}
                onChange={(e) => {
                  const updatedImages = [...images];
                  updatedImages[index] = e.target.value;
                  setImages(updatedImages);
                }}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mb-3"
                placeholder="Entrez l'URL de l'image"
              />
            ))}
            <button
              type="button"
              onClick={handleAddImage}
              className="mt-2 text-purple-600 hover:underline"
            >
              Ajouter une autre image
            </button>
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
              required
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
            <label className="block text-gray-700 mb-2 font-semibold">Options de personnalisation</label>
            {customizationOptions.map((option, index) => (
              <div key={index} className="flex flex-col mb-3">
                <input
                  type="text"
                  placeholder="Position"
                  value={option.position}
                  onChange={(e) => handleCustomizationChange(index, "position", e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mb-2"
                />
                <input
                  type="text"
                  placeholder="Tailles personnalisables (séparées par des virgules)"
                  value={option.customizationSize.join(", ")}
                  onChange={(e) => handleCustomizationChange(index, "customizationSize", e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setCustomizationOptions([...customizationOptions, { position: "", customizationSize: [] }])}
              className="mt-2 text-purple-600 hover:underline"
            >
              Ajouter une option de personnalisation
            </button>
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
