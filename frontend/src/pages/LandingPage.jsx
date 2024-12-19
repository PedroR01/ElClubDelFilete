import { useEffect } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Galeria from "../components/sections/Galeria";
import logoIntro from "../img/logos/logoIntro.png";
import { useState } from "react";
import CursoPage from "./CursoPage";
import Academia from "../components/sections/Academia";
import logoWP from "../img/logos/wp.png"

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
                    <div className="flex flex-col w-4/5 gap-8 items-center justify-center md:justify-normal md:items-start md:w-3/5 md:mt-auto  md:mb-20 lg:mb-40 md:ml-8 lg:pt-28">
                        <img
                            src={logoIntro}
                            alt="Logo club del filete"
                            className="h-40 w-fit md:h-48 lg:h-60 xl:h-64 object-cover mb-4"
                        />
                        <p className="inria-sans-regular text-[#FEFFEB] text-base tracking-wide leading-normal  md:text-xl md:leading-10 md:tracking-wider md:w-2/3">Lorem ipsum dolor sit amet consectetur. Amet malesuada quis nunc fermentum. Condimentum a commodo fringilla sit gravida porta. </p>
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

            {/*Logo de whapp*/}    
           
            <a href="https://wa.me/" target="_blank">
                <img src={logoWP} alt="WhatsApp" className="fixed bottom-7 right-7 w-14 h-14 rounded-full hover:scale-125 hover:shadow-xl transition transform"/>
            </a>

        </div>
    );
}