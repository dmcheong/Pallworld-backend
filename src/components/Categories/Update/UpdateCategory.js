import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateCategory = () => {
    const { id } = useParams(); // Récupère l'ID depuis l'URL
    const [name, setName] = useState(''); // Stocke le nom de la catégorie
    const [error, setError] = useState(null); // Gestion des erreurs
    const [loading, setLoading] = useState(true); // Gestion du chargement
    const navigate = useNavigate(); // Redirection

    // Récupérer les informations de la catégorie lors du chargement
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/category/${id}`)
            .then(response => {
                setName(response.data.name); // Remplit le champ avec le nom récupéré
                setLoading(false);
            })
            .catch(() => {
                setError('Erreur lors de la récupération de la catégorie');
                setLoading(false);
            });
    }, [id]);

    // Fonction pour gérer la soumission du formulaire de mise à jour
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name.trim()) {
            setError('Le nom de la catégorie est requis');
            return;
        }

        axios.put(`${process.env.REACT_APP_API_URL}/api/category/${id}`, { name })
            .then(() => {
                toast.success('Catégorie mise à jour avec succès', { autoClose: 2000 });

                // Redirection après 2 secondes vers la page des catégories
                setTimeout(() => {
                    navigate('/categories');
                }, 2000);
            })
            .catch(() => {
                setError('Erreur lors de la mise à jour de la catégorie');
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-gray-100">
            <div className="bg-white p-12 rounded-xl shadow-lg max-w-3xl w-full transform transition duration-300 hover:shadow-2xl">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800">
                    Mettre à jour la catégorie
                </h1>

                {/* Afficher un message de chargement */}
                {loading && <p className="text-center text-gray-600">Chargement...</p>}

                {/* Formulaire de mise à jour */}
                {!loading && (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                        {/* Champ pour le nom de la catégorie */}
                        <div className="relative mb-6">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value); // Met à jour le nom au fur et à mesure
                                    setError(null);
                                }}
                                className="block w-full p-6 text-lg text-gray-900 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 peer"
                                placeholder="Nom de la catégorie"
                            />
                        </div>

                        {/* Bouton de soumission */}
                        <button 
                            type="submit" 
                            className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-lg sm:text-xl font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-md"
                        >
                            Mettre à jour
                        </button>
                    </form>
                )}

                {/* Affichage des erreurs s'il y en a */}
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                {/* Toast Container pour les notifications */}
                <ToastContainer />
            </div>
        </div>
    );
};

export default UpdateCategory;
