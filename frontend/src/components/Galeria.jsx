
import alumno1 from "../img/portadas/club1.jpg";
import alumno2 from "../img/portadas/club6.jpg";
import alumno3 from "../img/portadas/club3.jpg";
import alumno4 from "../img/portadas/club4.jpg";
import alumno5 from "../img/portadas/club7.jpg";
import alumno6 from "../img/portadas/club8.jpg";

import Button from "../components/Button";

import React, { useState } from "react";

export default function Galeria (){
  // Lista de imágenes de ejemplo
  const [imagenes, setImagenes] = useState([
    { id: 1, src: alumno1, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
    { id: 2, src: alumno2, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
    { id: 3, src: alumno3, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
    { id: 4, src: alumno4, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  ]);

  // Función para cargar más imágenes (puedes personalizarla)
  const cargarMasImagenes = () => {
    const nuevasImagenes = [
      { id: 5, src: alumno5, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
      { id: 6, src: alumno6, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
    ];
    setImagenes([...imagenes, ...nuevasImagenes]);
  };

  return (
    <section className="bg-gradient-to-b from-gray-200 to-gray-300">
      <div className="grid grid-cols-2">

        {imagenes.map((img) => (
          
          <div key={img.id} className="relative group">
            <img src={img.src} alt={img.titulo} className="w-full border-solid border-2 border-black" />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end/ ">
              <p className="text-sm text-yellow-300 font-semibold">{img.autor}</p>
              <p className="text-white text-lg font-bold">{`"${img.titulo}"`}</p>
            </div>
          </div>
        ))}
      </div>
      <Button text={"Ver mas"} btnType={"button"} event={cargarMasImagenes}/> 
    </section>
  );
};
