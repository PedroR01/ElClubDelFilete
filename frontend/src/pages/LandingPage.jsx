import { useEffect } from "react";
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

    // Bloquear/desbloquear el scroll al abrir/cerrar el modal
    useEffect(() => {
        if (modal) {
            document.body.style.overflow = "hidden"; // Bloquea el scroll
        } else {
            document.body.style.overflow = ""; // Restablece el scroll
        }

        // Limpieza al desmontar el componente
        return () => {
            document.body.style.overflow = "";
        };
    }, [modal])

    const openContactModal = () => {
        setModal(true);
    };

    const openCurso = (curso) => {
        setInfoCurso(curso);
        console.log(curso);
    };

    return (
        <div className="overflow-hidden">
            {infoCurso ? <CursoPage onClick={(navigation) => openCurso(navigation)} /> : <>

                <section className="flex relative intro justify-center md:justify-normal  md:min-h-[40rem]">
                    <div className="flex flex-col w-4/5 gap-8 items-center justify-center md:justify-normal md:items-start md:w-[70%] lg:w-3/5 md:mt-auto  md:mb-20 lg:mb-40 md:ml-20 lg:pt-28">

                        <h1 className="rye-regular text-[#CDA053] text-5xl text-center lg:mb-8">EL CLUB <span className="text-[#CDA053]">DEL FILETE</span></h1>
                        <p className="inria-sans-regular text-[#FEFFEB] text-base tracking-wide leading-normal  md:text-xl md:leading-10 md:tracking-wider md:w-3/4 lg:w-2/3">Lorem ipsum dolor sit amet consectetur. Amet malesuada quis nunc fermentum. Condimentum a commodo fringilla sit gravida porta. </p>
                        <Button
                            text={"Contactame"}
                            btnType={"button"}
                            event={() => openContactModal()}
                        />
                    </div>
                    {modal && (<Modal state={(e) => setModal(e)} />)}
                </section>
                <Academia />
                <section id="galería" className="pt-20 bg-[#222121]">
                    <h2 className="rye-regular text-[#CDA053] text-3xl text-center mb-8">GALERÍA</h2>
                    {/* SECCIÓN GALERIA */}
                    <Galeria />
                </section>
            </>
            }

        </div>
    );
}