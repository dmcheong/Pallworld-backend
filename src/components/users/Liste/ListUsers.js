import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit, FaSearch } from "react-icons/fa"; // Importing the icons, including search
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"; // Import SweetAlert2 CSS

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate(); // Hook to navigate between routes

  // Fetch users from the backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowDetails(!showDetails); // Toggle the visibility of user details
  };

  const handleEditUser = (userId) => {
    navigate(`/users/update/${userId}`); // Navigate to the update page
  };

  const handleDeleteUser = async (userId) => {
    try {
      const result = await Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Cette action est irréversible !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Oui, supprimer !",
        cancelButtonText: "Annuler",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3005/api/users/${userId}`);
        setUsers(users.filter((user) => user._id !== userId));
        Swal.fire("Supprimé!", "L'utilisateur a été supprimé.", "success");
      }
    } catch (error) {
      Swal.fire("Erreur!", "Erreur lors de la suppression de l'utilisateur.", "error");
    }
  };

  // Filtrer les utilisateurs par nom ou email
  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm) ||
    user.lastName.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center text-black w-full">Liste des Utilisateurs</h1>
        <div className="relative w-1/4">
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 pl-10 text-gray-800 border-2 border-purple-500 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
      </div>

      <div className="mb-8">
        <table className="table-auto w-full text-left bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleUserClick(user)}
              >
                <td className="border px-4 py-2">{user._id}</td>
                <td className="border px-4 py-2">{user.firstName} {user.lastName}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 text-center flex justify-center items-center space-x-2">
                  <FaEdit
                    className="text-blue-500 hover:text-blue-600 cursor-pointer"
                    size={20}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents opening the details
                      handleEditUser(user._id);
                    }}
                  />
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

      {selectedUser && showDetails && <UserDetails user={selectedUser} />}
    </div>
  );
};

// A component to display detailed user information
const UserDetails = ({ user }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">Détails de l'utilisateur</h2>
      <p><strong>Nom complet:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Téléphone:</strong> {user.phone}</p>
      <p><strong>Adresse:</strong> {user.address}, {user.city}, {user.country}, {user.codePostal}</p>
      <p><strong>Vérifié:</strong> {user.isVerified ? "Oui" : "Non"}</p>
      <p><strong>Crédits:</strong> {user.credits}</p>
      <p><strong>ID:</strong> {user._id}</p>
    </div>
  );
};

export default UserList;
