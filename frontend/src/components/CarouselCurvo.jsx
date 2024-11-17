import React, { useState, useEffect } from "react";
import Curso from "./Curso";

export default function CarouselCurvo() {
    // Dependiendo el tamaño de la pantalla se van a mostrar entre 5-8 cursos en simultaneo.
    // Desde md (768) - 2xl(1536) o xl (1280)
    const [screenSize, setScreenSize] = useState("desktop");
    const [currentIndex, setCurrentIndex] = useState(0);

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

    return (
        <>
            <div
                className="relative w-full max-w-4xl mx-auto overflow-hidden select-none"
            >
                <ul className="flex h-60 gap-2 mt-24 transition-transform ease-out duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    <li className={"" + widthSize}>
                        <Curso />
                    </li>
                    <li className={"" + widthSize}>
                        <Curso />
                    </li>
                    <li className={"" + widthSize}>
                        <Curso />
                    </li>
                    <li className={"" + widthSize}>
                        <Curso />
                    </li>
                    <li className={"" + widthSize}>
                        <Curso />
                    </li>
                    <li className={"" + widthSize}>
                        <Curso />
                    </li>
                    <li className={"" + widthSize}>
                        <Curso />
                    </li>
                    <li className={"" + widthSize}>
                        <Curso />
                    </li>
                </ul>
            </div>
        </>
    )
};