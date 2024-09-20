import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Importing the back arrow icon

const OrderDetails = () => {
  const { orderId } = useParams(); // Get order ID from the URL
  const navigate = useNavigate(); // Hook to navigate between routes
  const [order, setOrder] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch order details when component mounts
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`); // Fetch order details by ID
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des détails de la commande.');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // Loading and error handling
  if (loading) {
    return <p className="text-center">Chargement...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  // Render order details once the data is available
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        className="flex items-center mb-6 text-blue-500 hover:text-blue-600"
        onClick={() => navigate('/orders')} // Navigate to the orders list
      >
        <FaArrowLeft className="mr-2" /> Retour aux commandes
      </button>

      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Détails de la commande</h1>

      {order && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Commande ID: {order._id}</h2>

          {/* User Info */}
          <h3 className="text-xl font-semibold mb-2">Utilisateur:</h3>
          <p>
            Nom: {order.userId ? `${order.userId.firstName} ${order.userId.lastName}` : 'Utilisateur non trouvé'}<br />
            Email: {order.userId ? order.userId.email : 'Non disponible'}
          </p>

          {/* Order Items */}
          <h3 className="text-xl font-semibold mt-6 mb-2">Articles commandés:</h3>
          <ul className="list-disc list-inside">
            {order.items && order.items.length > 0 ? (
              order.items.map((item, index) => (
                <li key={index} className="mb-4">
                  <div>
                    Produit: {item.productId ? item.productId.name : 'Produit non trouvé'} <br />
                    Quantité: {item.quantity} <br />
                    Prix: {item.price} € <br />
                    Couleur: {item.color ? item.color : 'Non spécifié'} <br />
                    Taille: {item.size ? item.size : 'Non spécifié'}
                  </div>
                  {item.customizationOptions && item.customizationOptions.length > 0 && (
                    <div className="mt-2">
                      <strong>Options de personnalisation:</strong>
                      <ul className="list-inside list-disc ml-4">
                        {item.customizationOptions.map((custom, customIndex) => (
                          <li key={customIndex}>
                            Position: {custom.position} <br />
                            Taille: {custom.customizationSize} <br />
                            Image: <a href={custom.imageUrl} target="_blank" rel="noopener noreferrer">Voir l'image</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <li>Aucun article trouvé</li>
            )}
          </ul>

          {/* Total Amount */}
          <h3 className="text-xl font-semibold mt-6 mb-2">Montant total: {order.totalAmount} €</h3>

          {/* Shipping Address */}
          <h3 className="text-xl font-semibold mt-6 mb-2">Adresse de livraison:</h3>
          {order.shippingAddress ? (
            <p>
              {order.shippingAddress.name}<br />
              {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            </p>
          ) : (
            <p>Adresse non disponible</p>
          )}

          {/* Created At */}
          <h3 className="text-xl font-semibold mt-6 mb-2">Date de création:</h3>
          <p>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Date non disponible'}</p>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
