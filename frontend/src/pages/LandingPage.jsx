import React from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Galeria from "../components/sections/Galeria";
import logoIntro from "../img/logos/logoIntro.png";
import { useState } from "react";
import CursoPage from "./CursoPage";
import Academia from "../components/sections/Academia";


export default function LandingPage() {
    const [modal, setModal] = useState(false);
    const [infoCurso, setInfoCurso] = useState(null);

    const openContactModal = () => {
        setModal(true);
    };

    const openCurso = (curso) => {
        setInfoCurso(curso);
        console.log(curso);
    };

    return (
        <div className="overflow-x-hidden overscroll-x-none pb-8">
            {infoCurso ? <CursoPage onClick={(navigation) => openCurso(navigation)} /> : <>
                <section className="flex relative w-full justify-center md:justify-normal md:left-32 md:-bottom-28 intro-bg">
                    <div className="flex flex-col w-4/5 items-center pt-40 pb-28 justify-center md:justify-normal md:items-start flex-nowrap md:w-3/5 gap-8">
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
                <Academia handleClickEvent={openCurso} />
                <section id="galería" className="pt-20">
                    <h2 className="rye-regular text-[#2B1F12] text-3xl text-center mb-8">GALERÍA</h2>
                    {/* SECCIÓN GALERIA */}
                    <Galeria />
                </section>
            </>
            }

        </div>
    );
}