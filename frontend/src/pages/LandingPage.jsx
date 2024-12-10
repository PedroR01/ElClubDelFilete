import React, { useEffect } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Galeria from "../components/Galeria";
import logoIntro from "../img/logos/logoIntro.png";
import { useState } from "react";
import Slider from "../components/Slider";
import logoNavbar from "../img/logos/logoNavbar.png";
import logoBlog from "../img/portadas/blog_image.png";
import Curso from "./CursoPage";
import introClubGif from "../img/introClubGif.gif";
import CarouselCurvo from "../components/CarouselCurvo";


export default function LandingPage() {
    const [modal, setModal] = useState(false);
    const [infoCurso, setInfoCurso] = useState(null);

    const openContactModal = () => {
        setModal(true);
    };

    useEffect(() => {
        console.log("Renderización por modal/curso");
        console.log(modal);
    }, [modal]);

    const openCurso = (curso) => {
        setInfoCurso(curso);
        console.log(curso);
    };

    return (
        <div className="overflow-x-hidden overscroll-x-none pb-8">
            {infoCurso ? <Curso onClick={(navigation) => openCurso(navigation)} /> : <>
                <div className="absolute bg-black w-full h-[62%] -z-[5] md:-top-20 md:h-auto">
                    <img className="w-full h-full opacity-40 md:h-auto" src={introClubGif} alt="" />
                </div>
                <section className="flex relative w-full py-24 justify-center md:justify-normal md:left-32 md:-bottom-28">
                    {/* SECCIÓN INICIAL */}
                    <div className="flex flex-col w-4/5 items-center  justify-center md:justify-normal md:items-start flex-nowrap md:w-3/5 gap-8">
                        <img
                            src={logoIntro}
                            alt="Logo club del filete"
                            className="h-40 w-44 md:h-64 md:w-72 object-cover mb-4"
                        />
                        <p className="inria-sans-regular text-[#FEFFEB] text-sm tracking-wide leading-normal  md:text-xl md:leading-10 md:tracking-wider md:w-2/3">Lorem ipsum dolor sit amet consectetur. Amet malesuada quis nunc fermentum. Condimentum a commodo fringilla sit gravida porta. </p>
                        <Button
                            text="Contactame"
                            bgColor={"bg-[#bd8a33] "}
                            textColor={"text-[#FEFFEB] "}
                            event={openContactModal}
                        />

                    </div>
                    {modal && (<Modal state={(e) => setModal(e)} />)}
                </section>
                {/* SECCIÓN CURSOS */}
                <section id="academia" className="flex flex-col bg-[#FEFFEB] rounded-3xl pt-8 mt-8 shadow-academia gap-9 md:rounded-[4rem] md:pt-24 md:mt-44">
                    <h2 className="rye-regular text-[#2B1F12] text-3xl text-center">ACADEMÍA</h2>
                    <ul className="flex flex-col gap-16">
                        <li>
                            <h4 className="rye-regular text-[#2B1F12] text-lg md:text-xl ml-6 md:ml-16">Introducción al Filete</h4>
                            <CarouselCurvo />
                        </li>
                        <li>
                            <h4 className="rye-regular text-[#2B1F12] text-lg md:text-xl ml-6  md:ml-16">Últimos lanzamientos</h4>
                            <Slider images={[logoBlog, logoIntro, logoNavbar]} clickHandler={(imgClicked) => openCurso(imgClicked)} />
                        </li>
                        <li>
                            <h4 className="rye-regular text-[#2B1F12] text-lg md:text-xl ml-6  md:ml-16">Estudiantes avanzados</h4>
                            <CarouselCurvo />
                        </li>
                    </ul>

                </section>

                <h2 id="galería" className="rye-regular text-[#2B1F12] text-3xl text-center mt-20">GALERÍA</h2>
                {/* SECCIÓN GALERIA */}
                <Galeria />
            </>}

        </div>
    );
}