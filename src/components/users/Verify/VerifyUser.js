import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyUser = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Extraire l'email ou le token depuis l'URL
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  useEffect(() => {
    const verifyUserAccount = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/users/verifyuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }), // On envoie l'email ou le token au backend
        });

        if (response.ok) {
          setMessage('Votre email a été vérifié avec succès. Vous pouvez maintenant vous connecter.');
          // Redirection vers la page de connexion après 3 secondes
          setTimeout(() => navigate('/users/signin'), 3000);
        } else {
          setMessage('Le lien de vérification est invalide ou a expiré.');
        }
      } catch (error) {
        setMessage('Une erreur est survenue lors de la vérification.');
      }
    };

    verifyUserAccount();
  }, [email, navigate]);

  return (
    <div>
      <h2>Vérification de l'email</h2>
      <p>{message}</p>
    </div>
  );
};

export default VerifyUser;
