import React from 'react';

const ManchaTexto = () => {
    return (
      <div className="relative w-64 h-64">
        {/* Forma de la mancha */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
        >
          <path
            fill="#FFD700"
            d="M43.4,-66.2C54.8,-55.6,58.3,-37.6,60.3,-21.2C62.4,-4.7,62.9,9.9,55.2,19.6C47.6,29.3,31.9,34,19.1,41.8C6.2,49.7,-3.8,60.8,-14.9,62.5C-26.1,64.2,-38.3,56.6,-44.9,46.2C-51.5,35.8,-52.6,22.5,-59.3,7.9C-65.9,-6.8,-78.1,-22,-77,-33.7C-75.9,-45.3,-61.4,-53.4,-47.8,-63.8C-34.2,-74.1,-17.1,-86.7,-0.5,-86.2C16.1,-85.7,32.1,-72.8,43.4,-66.2Z"
            transform="translate(100 100)"
          />
        </svg>
        {/* Texto dentro de la mancha */}
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <p className="text-gray-800 font-bold">
            Aquí va el texto sobre la historia del filete porteño.
          </p>
        </div>
      </div>
    );
  };
  
  export default ManchaTexto;