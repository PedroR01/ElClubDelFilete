import React, { useState, useEffect } from "react";
import Curso from "./Curso";
import slide from "../img/slide.png";

export default function CarouselCurvo() {
    // Dependiendo el tamaño de la pantalla se van a mostrar entre 5-8 cursos en simultaneo.
    // Desde md (768) - 2xl(1536) o xl (1280)
    const [screenSize, setScreenSize] = useState("desktop");
    const [currentIndex, setCurrentIndex] = useState(0);
    const cursos = Array.from({ length: 21 }, (_, i) => ({
    })); // Genero un array de componentes curso para hacer la prueba

    const prevSlide = () => {
        const newIndex = currentIndex === 0 ? cursos.length - 7 : currentIndex - 1;
        setCurrentIndex(newIndex);
      };
    
      const nextSlide = () => {
        const newIndex = currentIndex === cursos.length - 7 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
      };

    useEffect(() => {
        const checkResolution = () => {
            if (window.innerWidth >= 768 && window.innerWidth < 1024)
                setScreenSize("tablet");
            else if (window.innerWidth >= 1024 && window.innerWidth < 1280)
                setScreenSize("notebook");
            else if (window.innerWidth >= 1280)
                setScreenSize("desktop");
        }

        checkResolution();
        window.addEventListener("resize", checkResolution);

        return () => window.removeEventListener("resize", checkResolution);
    }, []);

    let widthSize;
    // tablet = 5
    if (screenSize === "tablet")
        widthSize = "3/5";
    // notebook = 6/7
    else if (screenSize === "notebook")
        widthSize = "w-1/6";
    // desktop = 8
    else
        widthSize = "w-1/8";

    const handlePrevSlide = () => {
        setCurrentIndex(-1);
    }

    const handleNextSlide = () => {
        setCurrentIndex(1);
    }
    // relative w-full max-w-4xl mx-auto overflow-hidden select-none
    
    return (
        <>
            <div
                className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-gray-800 bg-transparent py-2 focus:outline-none p-4 md:p-5 lg:p-6"
            >
                <div  className="flex h-60 gap-2 mt-24 transition-transform ease-out duration-500"
                    style={{
                    transform: `translateX(-${currentIndex * (100 / 7)}%)`, // Mueve el carrusel a lo largo del eje horizontal según el currentIndex
                    width: `${(cursos.length / 7) * 100}%`, // Define el ancho total del contenedor que contiene todos los cursos. 
                    }}>                                    
                {cursos.map((curso, index) => (            
                <Curso key={index} style={{ flex: `0 0 ${100 / 7}%` }}/>
                /*
                está creando dinámicamente los cursos y representándolos con el 
                componente Curso cada vez que se ejecuta el mapeo sobre el array cursos.
                Cada curso tiene un estilo personalizado para 
                asegurarse de que ocupe un 1/7 del ancho del contenedor
                */
                ))}
                </div>
            </div>
            <>
            <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-gray-800 bg-transparent py-2
          focus:outline-none p-4 md:p-5 lg:p-6"
            onClick={prevSlide}
          >
                <img
                src={slide}
                alt="left slide"
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 -rotate-180"
                draggable="false"
                />
            </button>
            <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent focus:outline-none 
                        p-4 md:p-5 lg:p-6"
                onClick={nextSlide}
            >
                <img
                src={slide}
                alt="right slide"
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                draggable="false"
                />
            </button>
            </>
        </>
    )
};