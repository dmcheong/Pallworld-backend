import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Icone de la flèche de retour

const UpdateUser = () => {
  const { id } = useParams(); // Récupère l'ID de l'utilisateur depuis l'URL
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    codePostal: '',
    credits: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les données d'un utilisateur spécifique
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3005/api/users/${id}`);
        const data = await response.json();
        if (response.ok) {
          setUserData(data); // Pré-remplit les champs avec les données de l'utilisateur
          setLoading(false);
        } else {
          setError('Utilisateur non trouvé');
          setLoading(false);
        }
      } catch (err) {
        setError('Erreur lors de la récupération des données utilisateur');
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // Fonction pour mettre à jour les informations utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3005/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Envoyer les données modifiées
      });

      if (response.ok) {
        navigate('/users'); // Rediriger après la mise à jour réussie
      } else {
        setError("Erreur lors de la mise à jour de l'utilisateur");
      }
    } catch (err) {
      setError("Erreur lors de la mise à jour de l'utilisateur");
    }
  };

  // Fonction pour gérer le changement dans les champs de formulaire
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-gray-100">
      <div className="bg-white p-12 rounded-xl shadow-lg max-w-4xl w-full transform transition duration-300 hover:shadow-2xl">
        {/* Flèche de retour et Titre */}
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => navigate('/users')} className="text-purple-600 hover:text-purple-800">
            <FaArrowLeft size={24} />
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center">
            Modifier les informations de l'utilisateur
          </h1>
          <div></div>
        </div>

        {loading ? (
          <p className="text-center">Chargement...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold">Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Prénom"
                  value={userData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Nom"
                  value={userData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-gray-700 font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={userData.password}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Téléphone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Téléphone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Pays</label>
                <input
                  type="text"
                  name="country"
                  placeholder="Pays"
                  value={userData.country}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Ville</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Ville"
                  value={userData.city}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-gray-700 font-semibold">Adresse</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Adresse"
                  value={userData.address}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Code Postal</label>
                <input
                  type="text"
                  name="codePostal"
                  placeholder="Code Postal"
                  value={userData.codePostal}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Crédits</label>
                <input
                  type="number"
                  name="credits"
                  placeholder="Crédits"
                  value={userData.credits}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Mettre à jour
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateUser;
