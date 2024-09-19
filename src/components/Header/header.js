import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logos/logo-rect.png'; 

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/signin');
  };

  return (
    <header className={`border-b sticky top-0 bg-white text-black z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-4 flex flex-col items-center">
        {/* Logo centered */}
        <div className="flex justify-center mb-2">
          <Link to="/homePage">
            <img
              src={logo}
              alt="Logo"
              className={`transition-all duration-300 mx-auto ${isScrolled ? 'h-12 sm:h-16' : 'h-16 sm:h-20'}`}
            />
          </Link>
        </div>

        {/* Navigation Links below the logo */}
        <nav className="flex flex-wrap justify-center space-x-6 font-semibold text-gray-700 tracking-wide">
          <Link to="/categories/add" className="text-sm sm:text-base hover:text-sky-600 transition duration-300">
            Gestion Catégories
          </Link>
          <Link to="/produit/add" className="text-sm sm:text-base hover:text-sky-600 transition duration-300">
            Gestion Produits
          </Link>
          <Link to="/users" className="text-sm sm:text-base hover:text-sky-600 transition duration-300">
            Gestion utilisateurs
          </Link>
          <Link to="/orders" className="text-sm sm:text-base hover:text-sky-600 transition duration-300">
            Orders
          </Link>
        </nav>

        {/* Cart Section */}
        <div className="flex items-center justify-end mt-4">
          {isAuthenticated && (
            <Link to="/panier" className="relative">
              <FaShoppingCart className="text-gray-600 hover:text-black transition duration-300" />
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className="sm:hidden" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="sm:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <Link to="/categories/add" className="block text-gray-700 hover:text-sky-600 transition duration-300" onClick={toggleMobileMenu}>
                Gestion Catégories
              </Link>
            </li>
            <li>
              <Link to="/produit/add" className="block text-gray-700 hover:text-sky-600 transition duration-300" onClick={toggleMobileMenu}>
                Gestion Produits
              </Link>
            </li>
            <li>
              <Link to="/users" className="block text-gray-700 hover:text-sky-600 transition duration-300" onClick={toggleMobileMenu}>
                Gestion utilisateurs
              </Link>
            </li>
            <li>
              <Link to="/orders" className="block text-gray-700 hover:text-sky-600 transition duration-300" onClick={toggleMobileMenu}>
                Orders
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
