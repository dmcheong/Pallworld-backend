import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Modifier les informations de l'utilisateur</h1>

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
                  className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
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
                  className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
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
                  className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
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
                  className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
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
                  className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
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
                  className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
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
                  className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
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
                  className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
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
                  className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
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
                  className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
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
