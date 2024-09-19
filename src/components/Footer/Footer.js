import React from 'react';
import logo from '../assets/logos/logo-rect.png';

const Footer = () => {
  return (
    <footer className="text-black py-8 bg-gray-100">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        {/* Left side - Logo */}
        <div className="text-center sm:text-left">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-auto max-h-20 sm:max-h-28 w-auto mx-auto sm:mx-0 mb-4 transition-transform duration-300 hover:scale-105" 
          />
        </div>

        {/* Right side - Address */}
        <div className="text-center sm:text-right">
          <ul>
            <li className="flex items-center justify-center sm:justify-end">
              <span>12 Rue Anatole France, 92000 Nanterre, France</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-8">
        <hr className="my-4" />
        <div className="flex justify-center sm:justify-between items-center text-center sm:text-left">
          <p className="pt-2 font-semibold">&copy; 2024 Palworld E-shop. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
