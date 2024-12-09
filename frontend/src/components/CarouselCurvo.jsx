import React, { useState, useEffect } from "react";
import slide from "../img/iconos/slide.png";
import curso1 from "../img/portadas/club1.jpg";



export default function CarouselCurvo() {
    const [screenSize, setScreenSize] = useState("desktop");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const maxSliders = 3;
    // Al ser 21 cursos, donde en version de escritorio se muestran de a 7 en simultaneo, el numero maximo de "vueltas" debe ser 3
    const cursos = Array.from({ length: 21 }, (_, i) => ({})); // Genera un array para pruebas

    const prevSlide = () => {
        let newIndex = 0;
        let sliderIndex = 0;
        if (currentIndex === 0) {
            //newIndex = cursos.length - 7;
            // habria que borrar el boton y no permitir que siga scrolleando para atras

        } else {
            newIndex = currentIndex - 1;
            sliderIndex = currentSlide - 7;
        }
        setCurrentIndex(newIndex);
        setCurrentSlide(sliderIndex);
    };

    const nextSlide = () => {
        let newIndex = 0;
        let sliderIndex = 0;
        if (currentIndex === (maxSliders - 1)) {
            //newIndex = cursos.length - 7;
            // habria que borrar el boton y no permitir que siga scrolleando para adelante
        } else {
            newIndex = currentIndex + 1;
            sliderIndex = currentSlide + 7;

        }
        setCurrentIndex(newIndex);
        setCurrentSlide(sliderIndex);
    };

    useEffect(() => {
        const checkResolution = () => {
            if (window.innerWidth >= 768 && window.innerWidth < 1024)
                setScreenSize("tablet");
            else if (window.innerWidth >= 1024 && window.innerWidth < 1280)
                setScreenSize("notebook");
            else if (window.innerWidth >= 1280)
                setScreenSize("desktop");
        };

        checkResolution();
        window.addEventListener("resize", checkResolution);

        return () => window.removeEventListener("resize", checkResolution);
    }, []);

    /*
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
    */

    const getCursoStyle = (index) => {
        const middleIndex = currentSlide + 3; // El índice central del carrusel
        const distanceFromMiddle = index - middleIndex;

        // Define transformaciones para los cursos según su posición
        if (distanceFromMiddle >= -1 && distanceFromMiddle <= 1) {
            return { transform: "scale(.9)", zIndex: 5 };
        } else if (distanceFromMiddle === -2) {
            return {
                transform: "perspective(600px) rotateY(8deg) scale(1)",
                zIndex: 3,
            };
        } else if (distanceFromMiddle === 2) {
            return {
                transform: "perspective(600px) rotateY(-8deg) scale(1)",
                zIndex: 3,
            };
        } else if (distanceFromMiddle === -3) {
            return {
                transform: "perspective(730px) rotateY(20deg) scale(1.1)",
                zIndex: 2,
            };
        } else if (distanceFromMiddle === 3) {
            return {
                transform: "perspective(730px) rotateY(-20deg) scale(1.1)",
                zIndex: 2,
            };
        }

        console.log(currentIndex)
    };
    // {`flex h-60 gap-4 transition-transform ease-out duration-500 transform translate-x-[-${currentIndex * 100}%]`}
    return (
        <div className="flex relative w-full mx-auto overflow-hidden">
            <div
                className="transform text-white bg-gray-800 bg-transparent py-2 focus:outline-none p-4 md:p-5 lg:p-6"
            >
                <ul
                    className={`flex h-60 gap-4 transition-transform ease-out duration-500`}
                    style={{
                        transform: `translateX(-${currentIndex * (100 / maxSliders)}%)`, // Mueve el carrusel a lo largo del eje horizontal según el currentIndex y la cantidad de vueltas máximas que puede dar (3)
                        width: `${100 * maxSliders}%`, // Define el ancho total del contenedor que contiene todos los cursos.
                    }}
                >
                    {cursos.map((_, index) => (
                        <li key={index}>
                            <button className="shadow-lg">
                                <img
                                    style={{
                                        ...getCursoStyle(index), // Aplica estilos dinámicos
                                    }} src={curso1} alt="" /></button>

                        </li>
                    ))}
                </ul>
            </div>

            <button
                aria-label="Next"
                className="flex absolute top-1/2 right-0 w-9 h-9 z-10 ml-5 items-center justify-center rounded-full bg-[#FFFBF2]
             border-2 border-black button-shadow 
             transition duration-300 ease-in-out hover:-translate-x-2 
             hover:bg-[#D1C1B4] hover:button-shadow active:bg-[#FFDD6A] 
             hover:shadow-lg active:shadow-none"
                onClick={nextSlide}
            >
                <img className="w-[25%]" src={slide} alt="right slide" />
            </button>
            <button
                aria-label="Previous"
                className="flex absolute top-1/2 left-0 w-9 h-9 z-10 ml-5 items-center justify-center rounded-full bg-[#FFFBF2]
             border-2 border-black
             transition duration-300 ease-in-out hover:-translate-x-2 
             hover:bg-[#D1C1B4] hover:button-shadow active:bg-[#FFDD6A] 
             hover:shadow-lg active:shadow-none"
                onClick={prevSlide}
            >
                <img className="w-[25%] rotate-180" src={slide} alt="left slide" />
            </button>
        </div>
    );
}
