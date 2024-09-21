import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`);
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des commandes.');
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  const handleOrderClick = (userId) => {
    navigate(`/orders/${userId}`); // Navigate to all orders by userId
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Liste de toutes les commandes</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : (
        <div className="mb-8">
          {orders.length === 0 ? (
            <p className="text-center text-gray-600">Aucune commande trouvée.</p>
          ) : (
            <table className="table-auto w-full text-left bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="px-4 py-2">ID Commande</th>
                  <th className="px-4 py-2">Articles</th>
                  <th className="px-4 py-2">Montant Total</th>
                  <th className="px-4 py-2">Adresse de Livraison</th>
                  <th className="px-4 py-2">Date de Création</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOrderClick(order.userId._id)} // Pass userId to fetch all orders by that user
                  >
                    <td className="border px-4 py-2">{order._id}</td>
                    <td className="border px-4 py-2">
                      <ul>
                        {order.items.map((item, index) => (
                          <li key={index}>
                            {item.productId
                              ? `${item.productId.name} (Quantité: ${item.quantity})`
                              : 'Produit non trouvé'}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border px-4 py-2">{order.totalAmount} €</td>
                    <td className="border px-4 py-2">
                      {order.shippingAddress
                        ? `${order.shippingAddress.name}, ${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}`
                        : 'Adresse non disponible'}
                    </td>
                    <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AllOrders;
