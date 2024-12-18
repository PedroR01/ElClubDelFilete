import Slider from "../components/Carousel";
import returnIcon from "../img/iconos/return.png";
import manchaFondo from "../img/misc/manchaFondo.png";
import florFondo from "../img/misc/florFondo.png";
import separador from "../img/misc/separador.png";
import imgCurso1 from "../img/portadas/club14.jpg";
import imgCurso2 from "../img/portadas/club16.jpg";
import imgCurso3 from "../img/portadas/club18.jpg";
import Button from "../components/Button";

export default function CursoPage({ onClick }) {

    // Advertencia de que lo va a redirigir a la tienda.
    const onConfirmRedirect = () => {

    }

    return (
        <>
            <section className="flex flex-wrap items-center justify-center bg-[#FEFFEB] pt-24 pb-24">
                <div className="w-3/4">
                    <button className="max-w-20" onClick={() => onClick(null)}><img src={returnIcon} alt="return button" /></button>
                    <ul className="space-y-9">
                        <li className="space-y-5">
                            <span className="inria-sans-regular-bold text-[#565552] text-xl tracking-wide leading-normal">Duración</span>
                            <h1 className="rye-regular text-[#bd8a33] text-3xl">Título</h1>
                            <p className="inria-sans-regular-regular text-[#565552] text-xl tracking-wide leading-normal">Lorem ipsum dolor sit amet
                                consectetur. Amet malesuada quis nunc fermentum. Condimentum a commodo fringilla sit gravida porta. Proin a bibendum fringilla sed sit cursus mi ac elit. Facilisis sem et potenti lectus augue at.</p>
                            <Button text={"Abrir"} bgColor={"bg-[#bd8a33] "} textColor={"text-[#FEFFEB] "} event={() => onConfirmRedirect()} />
                        </li>
                        <li>
                            <span className="inria-sans-regular-bold text-[#565552] text-xl tracking-wide leading-normal">Cursos relacionados</span>
                            <Slider images={[imgCurso1, imgCurso2, imgCurso3]} />
                        </li>
                    </ul>
                </div>
                <img className="absolute max-w-48 top-24 right-12 z-0" src={imgCurso1} alt="Imagen del curso actual" />
            </section>
            <img className="absolute max-w-32 top-0 right-0 z-0" src={manchaFondo} alt="Imagen del curso actual" />
            <img className="absolute max-w-32 right-0 -bottom-64" src={florFondo} alt="Imagen del curso actual" />
            <img className="absolute -bottom-80 w-full" src={separador} alt="Imagen del curso actual" />
        </>
    )
}