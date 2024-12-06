import React, { useState, useEffect } from "react";
import Curso from "./Curso";
import slide from "../img/iconos/slide.png";
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
        <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
            <div
                className="flex gap-1 max-w-fit"
                style={{
                    perspective: "1200px",
                    perspectiveOrigin: "center",
                }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative w-[120px] h-[160px] overflow-hidden"
                        style={{
                            transformStyle: "preserve-3d",
                            position: "relative",
                            "&::after":
                                index === 0 || index === images.length - 1
                                    ? {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        bottom: 0,
                                        width: "100%",
                                        background:
                                            index === 0
                                                ? "linear-gradient(to left, rgba(0,0,0,0.4), transparent)"
                                                : "linear-gradient(to right, rgba(0,0,0,0.4), transparent)",
                                        pointerEvents: "none",
                                        zIndex: 1,
                                    }
                                    : {},
                        }}
                    >
                        <div
                            className="absolute inset-0 transform shadow-xl"
                            style={{
                                transform:
                                    index === 0
                                        ? "rotate3d(0, 1, 0, 40deg) scale(1.5)"
                                        : index === images.length - 1
                                            ? "rotate3d(0, 1, 0, -40deg) scale(1.5)"
                                            : "rotate3d(0, 1, 0, 5deg) scale(1.25)",
                                transformOrigin:
                                    index === 0
                                        ? "right center"
                                        : index === images.length - 1
                                            ? "left center"
                                            : "center center",
                                boxShadow:
                                    index === 0 || index === images.length - 1
                                        ? "0 15px 30px -8px rgba(0, 0, 0, 0.7)"
                                        : "0 15px 30px -8px rgba(0, 0, 0, 0.5)",
                                transition: "transform 0.3s ease-out",
                            }}
                        >
                            <img
                                src={image}
                                alt={`Landscape ${index + 1}`}
                                className="w-full h-full object-cover"
                                style={{
                                    backfaceVisibility: "hidden",
                                    filter:
                                        index === 0 || index === images.length - 1
                                            ? "brightness(0.9)"
                                            : "none",
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}