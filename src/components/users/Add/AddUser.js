import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addUser.css";

const AddUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    codePostal: "",
    credits: 0,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Utilisé pour rediriger après l'inscription

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:3005/api/users", {
        // URL de ton API backend
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(
          "Utilisateur créé avec succès ! Veuillez vérifier votre email."
        );

        // Redirige l'utilisateur vers la page de vérification avec l'email dans l'URL
        navigate(`users/verifyuser?email=${formData.email}`);
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.error || "Erreur lors de la création de l'utilisateur."
        );
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setErrorMessage("Erreur lors de la création de l'utilisateur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      <input
        type="text"
        name="codePostal"
        placeholder="Postal Code"
        value={formData.codePostal}
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Création..." : "Add User"}
      </button>
    </form>
  );
};

export default AddUser;
