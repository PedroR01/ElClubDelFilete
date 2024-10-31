import React, { useState } from 'react';
import momo from "../img/momo.jpeg";
import momo2 from "../img/momo2.jpeg";

function Galeria() {
  const obras = [
    { id: 1, nombre: 'Jaime', titulo: 'bla bla bla', descripcion: 'Descripción del proceso de trabajo, curso u opinión.', pieza: 'Descripción de la pieza.', imagen: momo},
    { id: 2, nombre: 'Nombre Alumno 2', titulo: 'Título de la Obra 2', descripcion: 'Descripción del proceso de trabajo, curso u opinión.', pieza: 'Descripción de la pieza.', imagen: momo2}
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-orange-950 overflow-hidden shadow-lg">
      <div className="flex">
        <div className="w-1/3 p-4 bg-yellow-200">
          <h3 className="text-lg font-bold">{obras[currentIndex].nombre}</h3>
          <h4 className="text-xl font-semibold">{obras[currentIndex].titulo}</h4>
          <p className="mt-2">{obras[currentIndex].descripcion}</p>
          <p className="mt-2 font-semibold">Pieza:</p>
          <p>{obras[currentIndex].pieza}</p>
        </div>
        <img src={obras[currentIndex].imagen} alt={`Obra ${currentIndex + 1}`} className="w-2/3 object-cover" />
      </div>

      <button onClick={() => setCurrentIndex((prevIndex) => prevIndex === 0 ? obras.length - 1 : prevIndex - 1)} className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 bg-opacity-50 text-white rounded-full">
        &#10094;
      </button>
      <button onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % obras.length)} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 bg-opacity-50 text-white rounded-full">
        &#10095;
      </button>
    </div>
  );
}

export default Galeria;
