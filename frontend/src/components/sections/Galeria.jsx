import alumno1 from "../../img/portadas/club1.jpg";
import alumno2 from "../../img/portadas/club6.jpg";
import alumno3 from "../../img/portadas/club3.jpg";
import alumno4 from "../../img/portadas/club4.jpg";
import alumno5 from "../../img/portadas/club7.jpg";
import alumno6 from "../../img/portadas/club8.jpg";

import Button from "../Button";

import { useState } from "react";

export default function Galeria() {
  const [imagenes, setImagenes] = useState([
    { id: 1, src: alumno1, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
    { id: 2, src: alumno2, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
    { id: 3, src: alumno3, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
    { id: 4, src: alumno4, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
    { id: 5, src: alumno5, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
    { id: 6, src: alumno6, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  ]);
  const [verMas, setVerMas] = useState(false);

  // Función para cargar más imágenes
  const cargarMasImagenes = () => {
    setVerMas(true);
    const nuevasImagenes = [
      { id: 5, src: alumno5, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
      { id: 6, src: alumno6, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
    ];
    setImagenes([...imagenes, ...nuevasImagenes]);
  };

  return (
    <section className="">
      {/* Grilla principal */}
      <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}>
        {imagenes.slice(0, 4).map((img) => (
          <div key={img.id} className="relative group">
            <img
              src={img.src}
              alt={img.titulo}
              className="w-full border-solid border-2 border-black"
            />
            <div className="absolute inset-0 bg-black bg-opacity-55 transition-opacity flex flex-col justify-end">
              <p className="rye-regular absolute top-2 left-2 text-[#CDA053] text-xs p-1 rounded">
                {img.autor}
              </p>
              <p className="absolute bottom-1 left-1 text-[#FEFFEB] text-sm p-2 rounded w-3/4 rye-regular">
                {`"${img.titulo}"`}
              </p>
            </div>
          </div>
        ))}
        {/* Imágenes parcialmente visibles */}
        {!verMas &&
          imagenes.slice(4, 6).map((img, index) => (
            <div
              key={img.id}
              className={`relative group overflow-hidden ${index === 0 ? "col-span-1" : "col-span-1"
                }`}
            >
              <img
                src={img.src}
                alt={img.titulo}
                className="w-full border-solid border-2 border-black"
              />
              <div className="absolute inset-0 bg-black bg-opacity-55 transition-opacity flex flex-col justify-end">

              </div>
            </div>
          ))}
      </div>

      {/* Grilla extendida */}
      {verMas && (
        <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 `}>
          {imagenes.slice(4).map((img) => (
            <div key={img.id} className="relative group">
              <img
                src={img.src}
                alt={img.titulo}
                className="w-full border-solid border-2 border-black"
              />
              <div className="absolute inset-0 bg-black bg-opacity-55 transition-opacity flex flex-col justify-end">
                <p className="rye-regular absolute top-2 left-2 text-[#CDA053] text-xs p-1 rounded">
                  {img.autor}
                </p>
                <p className="absolute bottom-1 left-1 text-[#FEFFEB] text-sm p-2 rounded w-3/4 rye-regular">
                  {`"${img.titulo}"`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Botón Ver más */}
      {imagenes.length < 20 && (
        <div className="flex justify-center relative z-20 mt-4">
          <div
            className={`absolute bottom-[-30px] w-full flex justify-center translate-y-0
        transition-all duration-500 ease-in-out pt-6 pb-6`}
          >
            <Button
              text={"Ver más"}
              btnType={"button"}
              event={cargarMasImagenes}
              className="py-2 px-6 text-sm bg-gray-800 text-white rounded"
            />
          </div>
        </div>
      )}

    </section>
  );
}
