import React, { useState } from 'react';

function Galeria() {
  const obras = [
    { id: 1, nombre: 'Nombre Alumno 1', titulo: 'Título de la Obra 1', descripcion: 'Descripción del proceso de trabajo, curso u opinión.', pieza: 'Descripción de la pieza.', imagen: `${process.env.PUBLIC_URL}/img/logo192.png`},
    { id: 2, nombre: 'Nombre Alumno 2', titulo: 'Título de la Obra 2', descripcion: 'Descripción del proceso de trabajo, curso u opinión.', pieza: 'Descripción de la pieza.', imagen: `${process.env.PUBLIC_URL}/img/logo512.png` }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      <h2 className="text-center text-2xl font-bold my-4">Galería de Filete Porteño</h2>

      <div className="flex">
        <img src={obras[currentIndex].imagen} alt={`Obra ${currentIndex + 1}`} className="w-2/3 object-cover" />
        <div className="w-1/3 p-4 bg-yellow-200">
          <h3 className="text-lg font-bold">{obras[currentIndex].nombre}</h3>
          <h4 className="text-xl font-semibold">{obras[currentIndex].titulo}</h4>
          <p className="mt-2">{obras[currentIndex].descripcion}</p>
          <p className="mt-2 font-semibold">Pieza:</p>
          <p>{obras[currentIndex].pieza}</p>
        </div>
      </div>

      <button onClick={() => setCurrentIndex((prevIndex) => prevIndex === 0 ? obras.length - 1 : prevIndex - 1)} className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 bg-opacity-50 text-white rounded-full">
        &#10094;
      </button>
      <button onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % obras.length)} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 bg-opacity-50 text-white rounded-full">
        &#10095;
      </button>

      <div className="flex justify-center mt-4">
        {obras.map((_, index) => (
          <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 mx-1 rounded-full ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'}`}></button>
        ))}
      </div>
    </div>
  );
}

export default Galeria;
