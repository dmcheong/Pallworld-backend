import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetail = () => {
  const { userId } = useParams();  // Extraire userId de l'URL
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/${userId}`);
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des commandes.');
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [userId]);

  if (loading) {
    return <p className="text-center text-blue-500">Chargement...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-blue-500 mb-6">Détails de la commande</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">Aucune commande trouvée.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border-b border-gray-200 mb-4 pb-4">
            <h2 className="text-lg font-semibold text-gray-800">Commande ID: {order._id}</h2>
            <div className="mt-2">
              <p><span className="font-medium">Nom :</span> {order.userId?.firstName} {order.userId?.lastName}</p>
              <p><span className="font-medium">Email :</span> {order.userId?.email}</p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-800">Articles commandés :</h3>
              <ul className="mt-2 space-y-2">
                {order.items.map((item, index) => (
                  <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-md">
                    <p><span className="font-medium">Produit :</span> {item.productId ? item.productId.name : 'Produit non trouvé'}</p>
                    <p><span className="font-medium">Quantité :</span> {item.quantity}</p>
                    <p><span className="font-medium">Prix :</span> {item.price} €</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <p className="text-lg font-semibold">Montant Total: {order.totalAmount} €</p>
              <p className="text-gray-600">Date de création : {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderDetail;
