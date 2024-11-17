import React, { useEffect } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Galeria from "../components/Galeria";
import logoIntro from "../img/logoIntro.png";
import { useState } from "react";
import Slider from "../components/Slider";
import logoNavbar from "../img/logoNavbar.png";
import logoBlog from "../img/blog_image.png";
import Curso from "./CursoPage";


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
        <>
            {infoCurso ? <Curso onClick={(navigation) => openCurso(navigation)} /> : <> <section className="flex min-h-screen w-full pt-24 bg-[#8B2A1F]  justify-center">
                {/* SECCIÓN INICIAL */}
                <ul className="justify-center space-y-16 columns-1 md:columns-2">
                    <li className="text-wb-center">
                        <img
                            src={logoIntro}
                            alt="Logo club del filete"
                            className="h-60 w-60 md:h-96 md:w-96 lg:h-[30rem] lg:w-[30rem] object-cover mb-4"
                        />
                        <Button
                            text="Contáctame"
                            bgColor={"bg-[#bd8a33] "}
                            textColor={"text-[#FEFFEB] "}
                            event={openContactModal}
                        />
                    </li>
                    <li>
                        <iframe
                            className="w-full h-80 drop-shadow-lg md:h-96"
                            src="https://www.youtube.com/embed/PN4xt9RuV-Y"
                            title="Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </li>
                    <li className="space-y-4 ml-10 mr-10">
                        <h2 className="rye-regular text-[#bd8a33] text-3xl">Sobre el club</h2>
                        <p className="inria-serif-bold text-[#FEFFEB] text-xl tracking-wide leading-normal">Lorem ipsum dolor sit amet consectetur. Amet malesuada quis nunc fermentum. Condimentum a commodo fringilla sit gravida porta. Proin a bibendum fringilla sed sit cursus mi ac elit. Facilisis sem et potenti lectus augue at.</p>
                    </li>
                </ul>
            {modal && (<Modal state={(e) => setModal(e)} />)}
            </section>
                {/* SECCIÓN CURSOS */}
                <section className="bg[#FEFFEB]">
                    <h2 className="rye-regular text-[#bd8a33] text-3xl">CURSOS MENSUALES</h2>
                    <ul>
                        <li>
                            <h4 className="text-[#bd8a33] text-xl">Tabla de elementos</h4>
                            <Slider images={[logoBlog, logoIntro, logoNavbar]} clickHandler={(imgClicked) => openCurso(imgClicked)} />
                        </li>
                        <li>
                            <h4 className="text-[#bd8a33] text-xl">Cintas y banderas</h4>
                            <Slider images={[logoBlog, logoIntro, logoNavbar]} clickHandler={(imgClicked) => openCurso(imgClicked)} />

                        </li>
                    </ul>

                </section>


                {/* SECCIÓN GALERIA */}
                <Galeria/>
                <section className="bg[#47321B]">
                    <img className="forma-imagen" src={logoBlog} alt="" />
                </section></>}

        </>
    );
}