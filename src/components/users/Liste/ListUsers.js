import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; // Importing the icons
import { useNavigate } from 'react-router-dom'; // For navigation
import Swal from 'sweetalert2'; // For the confirmation dialog
import 'sweetalert2/dist/sweetalert2.min.css'; // Import SweetAlert2 CSS

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate(); // Hook to navigate between routes

  // Fetch users from the backend
  useEffect(() => {
    axios
      .get('http://localhost:3005/api/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Erreur lors de la récupération des utilisateurs:', error));
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowDetails(!showDetails); // Toggle the visibility of user details
  };

  const handleEditUser = (userId) => {
    navigate(`/users/update/${userId}`); // Navigate to the update page
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Display a confirmation dialog using SweetAlert2
      const result = await Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Cette action est irréversible !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Oui, supprimer !',
        cancelButtonText: 'Annuler',
      });

      // If the user confirms deletion
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3005/api/users/${userId}`);
        // Refresh the list of users after deletion
        setUsers(users.filter(user => user._id !== userId));

        // Display a success message
        Swal.fire('Supprimé!', 'L\'utilisateur a été supprimé.', 'success');
      }
    } catch (error) {
      Swal.fire('Erreur!', 'Erreur lors de la suppression de l\'utilisateur.', 'error');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Liste des Utilisateurs</h1>

      <div className="mb-8">
        <table className="table-auto w-full text-left bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleUserClick(user)}
              >
                <td className="border px-4 py-2">{user._id}</td>
                <td className="border px-4 py-2">{user.firstName} {user.lastName}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 text-center flex justify-center items-center space-x-2">
                  {/* Edit Icon */}
                  <FaEdit
                    className="text-blue-500 hover:text-blue-600 cursor-pointer"
                    size={20}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents opening the details
                      handleEditUser(user._id);
                    }}
                  />
                  {/* Delete Icon */}
                  <FaTrashAlt
                    className="text-gray-500 hover:text-gray-600 cursor-pointer"
                    size={20}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents opening the details
                      handleDeleteUser(user._id); // Trigger delete confirmation
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Only display the user details if a user is selected */}
      {selectedUser && showDetails && <UserDetails user={selectedUser} />}
    </div>
  );
};

// A component to display detailed user information
const UserDetails = ({ user }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Détails de l'utilisateur</h2>
      <p><strong>Nom complet:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Téléphone:</strong> {user.phone}</p>
      <p><strong>Adresse:</strong> {user.address}, {user.city}, {user.country}, {user.codePostal}</p>
      <p><strong>Vérifié:</strong> {user.isVerified ? 'Oui' : 'Non'}</p>
      <p><strong>Crédits:</strong> {user.credits}</p>
      <p><strong>ID:</strong> {user._id}</p>
    </div>
  );
};

export default UserList;
