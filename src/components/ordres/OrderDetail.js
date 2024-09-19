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

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/orders/${orderId}`); // Fetch order details by ID
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des détails de la commande.');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <p className="text-center">Chargement...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        className="flex items-center mb-6 text-blue-500 hover:text-blue-600"
        onClick={() => navigate('/orders')} // Navigate to the orders list
      >
        <FaArrowLeft className="mr-2" /> 
      </button>

      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Détails de la commande</h1>

      {order && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Commande ID: {order._id}</h2>

          <h3 className="text-xl font-semibold mb-2">Utilisateur:</h3>
          <p>
            Nom: {order.userId ? `${order.userId.firstName} ${order.userId.lastName}` : 'Utilisateur non trouvé'}<br />
            Email: {order.userId ? order.userId.email : 'Non disponible'}
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Articles:</h3>
          <ul className="list-disc list-inside">
            {order.items && order.items.length > 0 ? (
              order.items.map((item, index) => (
                <li key={index}>
                  {item.productId
                    ? `${item.productId.name} - Quantité: ${item.quantity}`
                    : 'Produit non trouvé'}
                </li>
              ))
            ) : (
              <li>Aucun article trouvé</li>
            )}
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Montant total: {order.totalAmount} €</h3>

          <h3 className="text-xl font-semibold mt-6 mb-2">Adresse de Livraison:</h3>
          {order.shippingAddress ? (
            <p>
              {order.shippingAddress.name}<br />
              {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            </p>
          ) : (
            <p>Adresse non disponible</p>
          )}

          <h3 className="text-xl font-semibold mt-6 mb-2">Date de Création:</h3>
          <p>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Date non disponible'}</p>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
