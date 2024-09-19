import React, { useState } from 'react';
import './ForgotPass.css';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Message de succès
        setError('');
      } else {
        setError(data.message || 'Erreur lors de la réinitialisation du mot de passe');
        setMessage('');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer plus tard.');
      setMessage('');
    }
  };

  return (
    <div className="forgot-pass-container">
      <form className="forgot-pass-form" onSubmit={handleSubmit}>
        <h2>Mot de passe oublié</h2>
        <p>Veuillez entrer votre adresse e-mail pour réinitialiser votre mot de passe.</p>
        <input
          type="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Envoyer la demande</button>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPass;