import React from "react";
import { useNavigate } from "react-router-dom";
import hero from "../assets/logos/hero.jpg";
import logo from '../assets/logos/logo-rect.png'; 

const HomePage = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/"); 
  };

  return ( 
    <div>

      {/* Hero */}
      <section className="relative">
        <img 
          src={hero}
          alt="Hero" 
          className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] object-cover"
        />
      </section>

      {/* Contenu centré (logo et texte) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
       

        {/* Texte */}
        <h1 className="mt-8 text-white text-4xl font-bold text-center">
        </h1>
        <p className="mt-4 text-white text-lg text-center">
        </p>
      </div>
    </div>
  );
};

export default HomePage;
