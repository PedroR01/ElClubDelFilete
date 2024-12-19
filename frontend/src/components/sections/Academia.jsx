import { useState } from "react";
import logoNavbar from "../../img/portadas/club18.jpg";
import logoBlog from "../../img/portadas/blog_image.png";
import logoIntro from "../../img/portadas/club7.jpg";
import mateCurso from "../../img/misc/mateCosmico1.png"
import Carousel from "../Carousel";
import Button from "../Button";

export default function Academia() {
    // Estado inicial con cursos
    const cursos = [
        {
            titulo: "Curso de Blog",
            duracion: "4 semanas",
            descripcion: "Amet malesuada quis nunc fermentum. Condimentum a commodo fringilla sit gravida porta. Proin a bibendum fringilla sed sit cursus mi ac elit. Facilisis sem et potenti lectus augue at.",
            imagenes: [logoBlog, mateCurso],
            link: "/novedades",
        },
        {
            titulo: "Introducción al Diseño",
            duracion: "6 semanas",
            descripcion: "Curso básico sobre diseño gráfico e identidad visual.",
            imagenes: [logoIntro],
            link: "/novedades",
        },
        {
            titulo: "Desarrollo Web",
            duracion: "8 semanas",
            descripcion: "Crea sitios web modernos y funcionales.",
            imagenes: [logoNavbar],
            link: "/novedades",
        },
    ];
    const [currentCurso, setCurrentCurso] = useState(cursos[0]);

    const handleCursoChange = (index) => {
        setCurrentCurso(cursos[index]);
    };

    // Advertencia de que lo va a redirigir a la tienda.
    const onConfirmRedirect = (url) => {
        const userConfirmed = window.confirm(`Será redirigido a la página: ${url}. ¿Desea continuar?`);
        if (userConfirmed) {
            window.location.href = url;
        }
    }


    // bg-[#FEFFEB] text-[#2B1F12]
    return (
        <section
            id="academia"
            className="flex flex-col relative bg-[#222121] w-full h-[110vh] md:min-h-[70rem] rounded-t-3xl py-20 shadow-academia gap-24 md:gap-11 md:rounded-t-[3rem] md:pt-24 transition-transform duration-300 -translate-y-12"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(34, 33, 33, 1) 0%, rgba(34, 33, 33, 0.7) 20%, rgba(34, 33, 33, 0.7) 80%, rgba(34, 33, 33, 1) 100%), url(${currentCurso.imagenes[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
            {/* <h2 className="rye-regular text-[#CDA053] text-3xl text-center">ACADEMIA</h2> */}
            <article className="flex flex-col min-h-[21.5rem] gap-8 w-4/5  ml-auto mr-auto md:items-start md:gap-5">

                <h2 className="rye-regular text-[#CDA053] text-3xl text-center">{currentCurso.titulo}</h2>
                <img className="absolute h-40 -z-10 right-[3%] translate-y-4  rounded-full drop-shadow-2xl" src={currentCurso.imagenes[currentCurso.imagenes.length - 1]} alt="Fileteo de Curso Blog" />
                <div className="w-4/5 md:mt-14">
                    <span className="text-base montserrat-normal text-[#fefffba7]">{currentCurso.duracion}</span>
                    <p className="text-base montserrat-normal text-[#FEFFFB] w-full">{currentCurso.descripcion}</p>
                    <div className="mt-12"></div>
                    <Button text={"Acceder"} btnType={"button"} event={() => onConfirmRedirect(currentCurso.link)} />
                </div>
            </article>
            <div className="md:mt-16">
                <Carousel images={cursos.map((curso) => curso.imagenes[0])} clickHandler={(index) => handleCursoChange(index)} />
            </div>


        </section>
    );
}