import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Galeria from "../components/sections/Galeria";
import { useState } from "react";
import Academia from "../components/sections/Academia";
import logoWP from "../img/logos/wp.png"

export default function LandingPage() {
    const [modal, setModal] = useState(false);

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

    return (
        <>
            <Helmet>
                <title>El Club del Filete - Inicio</title>
                <meta
                    name="description"
                    content="Explora el arte del fileteado porteño, sus orígenes, y la cálida comunidad de El Club del Filete."
                />
                <link rel="canonical" href="/" />
            </Helmet>
            <div className="overflow-hidden">
                <section className="flex relative intro justify-center md:justify-normal  md:min-h-[40rem]">
                    <div className="flex flex-col w-4/5 gap-8 items-center justify-center md:justify-normal md:items-start md:w-[70%] lg:w-3/5 md:mt-auto  md:mb-20 lg:mb-40 md:ml-20 lg:pt-28">

                        <h1 className="hamston text-[#CDA053] text-5xl text-center lg:mb-8">EL CLUB <span className="text-[#CDA053]">DEL FILETE</span></h1>
                        <p className="inria-sans-regular text-[#FEFFEB] text-base tracking-wide leading-normal  md:text-xl md:leading-10 md:tracking-wider md:w-3/4 lg:w-2/3">Bienvenidxs a la Primera Comunidad Online dedicada al Filete Porteño y al Arte Latinoamericano, donde nace la Primera Academia Virtual de Filete, llevando esta poderosa técnica a todos los rincones del Mundo.</p>
                        <Button
                            text={"Contactame"}
                            btnType={"button"}
                            event={() => openContactModal()}
                            state={false}
                        />
                    </div>
                    {modal && (<Modal state={(e) => setModal(e)} />)}
                </section>
                <Academia />
                <section id="galería" className="pt-20 bg-[#222121]">
                    <h2 className="hamston text-[#CDA053] text-3xl text-center mb-8">GALERÍA</h2>
                    {/* SECCIÓN GALERIA */}
                    <Galeria />
                </section>

                {/*Logo de whapp*/}

                <a href="https://wa.me/5492214959043" target="_blank">
                    <img src={logoWP} alt="WhatsApp" className="fixed opacity-60 bottom-7 right-7 w-14 h-14 rounded-full hover:scale-125 hover:shadow-xl hover:opacity-100 transition transform duration-700" />
                </a>

            </div>
        </>
    );
}