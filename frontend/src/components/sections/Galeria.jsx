import { useState } from "react";
import Button from "../Button";

import alumno1 from "../../img/portadas/club1.jpg";
import alumno2 from "../../img/portadas/club2.jpg";
import alumno3 from "../../img/portadas/club3.jpg";
import alumno4 from "../../img/portadas/club4.jpg";
import alumno5 from "../../img/portadas/club5.jpg";
import alumno6 from "../../img/portadas/club6.jpg";
import alumno7 from "../../img/portadas/club7.jpg";
import alumno8 from "../../img/portadas/club8.jpg";
import alumno9 from "../../img/portadas/club9.jpg";
import alumno10 from "../../img/portadas/club10.jpg";
import alumno11 from "../../img/portadas/club11.jpg";
import alumno12 from "../../img/portadas/club12.jpg";
import alumno13 from "../../img/portadas/club13.jpg";
import alumno14 from "../../img/portadas/club14.jpg";
import alumno15 from "../../img/portadas/club15.jpg";

export default function Galeria() {
  const imagenes = [{ id: 1, src: alumno1, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 2, src: alumno2, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 3, src: alumno3, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 4, src: alumno4, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 5, src: alumno5, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 6, src: alumno6, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 7, src: alumno7, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 8, src: alumno8, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 9, src: alumno9, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 10, src: alumno10, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 11, src: alumno11, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 12, src: alumno12, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 13, src: alumno13, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 14, src: alumno14, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 15, src: alumno15, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 2, src: alumno2, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 3, src: alumno3, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 4, src: alumno4, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 5, src: alumno5, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 6, src: alumno6, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  ]
  const [cantVisible, setCant] = useState(4);
  const [verMas, setVerMas] = useState(false);

  // Función para cargar más imágenes
  const cargarMasImagenes = () => {
    setVerMas(true);
    setCant((cantVisible) => cantVisible + 4);
  };

  return (
    <section className="">
      {/* Grilla principal */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {imagenes.slice(0, cantVisible).map((img) => (
          <div key={img.id} className="relative group overflow-hidden max-sm:h-[15vh] sm:h-[30vh] transition transform hover:scale-105">
            <img
              src={img.src}
              alt={img.titulo}
              className="w-full border-solid border-2 border-black object-fill"
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



      {/* Imágenes parcialmente visibles */}
      <div className="grid grid-cols-2 max-sm:h-[7vh] sm:h-[7vh] md:h-[10vh] lg:h-[12vh] xl:h-[15]">
        {imagenes.slice(cantVisible, cantVisible + 2).map((img) => (
          <div
            key={img.id}
            className="relative group overflow-hidden transition transform hover:scale-105"
          >
            <img
              src={img.src}
              alt={img.titulo}
              className="w-full border-solid border-2 border-black"
            />
            <div className="absolute inset-0 bg-black bg-opacity-55 transition-opacity flex flex-col justify-end"></div>
          </div>
        ))}
      </div>

      {/* Botón Ver más */}
      {cantVisible < 20 && (
        <div className="flex justify-center relative">
          <div
            className={`absolute bottom-[30px] w-full flex justify-center translate-y-0
        transition-all duration-500 ease-in-out`}
          >
            <Button
              text={"Ver más"}
              btnType={"button"}
              event={cargarMasImagenes}
              className="text-sm bg-gray-800 text-white rounded block"
            />
          </div>
        </div>
      )}

    </section>
  );
}