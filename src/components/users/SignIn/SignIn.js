import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importer Link pour la navigation
import './SignIn.css'; // Importez le fichier CSS pour la mise en forme

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    localCart: [], // Ajoutez un panier local si nécessaire
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Pour rediriger après une connexion réussie

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3005/api/users/signin', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Connexion réussie !', data);
        // Stocker le token dans le localStorage ou une autre méthode de gestion d'authentification
        localStorage.setItem('token', data.token);

        // Rediriger l'utilisateur vers une page après la connexion
        navigate('/dashboard'); // Changez l'URL selon votre application
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Erreur lors de la connexion.');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setErrorMessage('Une erreur est survenue lors de la connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <h2>Connexion</h2>
      <form className="signin-form" onSubmit={handleSubmit}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input 
          type="email" 
          name="email" 
          placeholder="Adresse e-mail" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Mot de passe" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      {/* Ajouter un lien vers la page "Mot de passe oublié" */}
      <div className="forgot-password-link">
        <Link to="/users/forgotpass">Mot de passe oublié ?</Link>
      </div>
    </div>
  );
};

export default SignIn;
