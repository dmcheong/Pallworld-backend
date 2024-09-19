import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importer useParams et useNavigate
import './deleteUser.css';

const DeleteUser = () => {
  const { id } = useParams(); // Récupérer l'ID de l'URL
  const navigate = useNavigate(); // Utilisé pour rediriger après suppression

  // Fonction pour supprimer l'utilisateur
  const handleDelete = async () => {
    try {
      // Demande de confirmation de l'utilisateur avant suppression
      const userConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');

      if (userConfirmed) {
        // Appel API pour supprimer l'utilisateur
        const response = await fetch(`http://localhost:3005/api/users/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Utilisateur supprimé avec succès');
          navigate('/users'); // Redirection vers la liste des utilisateurs
        } else {
          const errorData = await response.json();
          alert(`Erreur lors de la suppression de l'utilisateur : ${errorData.message}`);
        }
      }
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', err);
      alert('Erreur lors de la suppression de l\'utilisateur.');
    }
  };

  return (
    <div className="delete-user-container">
      <h2>Suppression d'un utilisateur</h2>
      <p>ID de l'utilisateur : {id}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleDelete(); // Appel de la fonction de suppression lors de la soumission
        }}
      >
        <input type="text" value={id} disabled placeholder="ID de l'utilisateur" />
        <button type="submit" className="btn-delete-confirm">
          Supprimer l'utilisateur
        </button>
      </form>
    </div>
  );
};

export default DeleteUser;
