import { useState } from "react";
import portadaEsencial from "../../img/cursos/cursoEsencial.jpg";
import portadaLetras from "../../img/cursos/letrasPorteñas.jpg";
import portadaMembresia from "../../img/cursos/membresia.webp";
import Carousel from "../Carousel";
import Button from "../Button";

export default function Academia() {
    // Estado inicial con cursos
    const cursos = [
        {
            titulo: "Curso esencial",
            duracion: "8 módulos",
            descripcion: "Te voy a enseñar paso a paso y desde cero a que pintes tu primer cuadro fileteado listo para colgar en la pared, vamos a recorrer la historia del Filete y te voy a mostrar los materiales, elementos, herramientas y soportes que se usan en la técnica tradicional, te voy a guiar para que puedas componer tus propias obras y pintarlas con el método de los 5 pasos para darle vida a tus diseños!",
            imagenes: [portadaEsencial],
            link: "https://elclubdelfilete.tiendup.com/curso/el-club-del-filete",
        },
        {
            titulo: "Letras Porteñas",
            duracion: "4 módulos",
            descripcion: "Aprende paso a paso y desde cero como realizar tus propias letras fileteadas con el método de Los 3 pilares. Te voy a guiar por un proceso paso a paso comprobado donde vas a aprender a manejar la estructura, los recursos y el color, para poder crear tus tipografías y darle la identidad que estás buscando. Además tendrás el bonus para armar palabras y frases!",
            imagenes: [portadaLetras],
            link: "https://elclubdelfilete.tiendup.com/curso/3-pilares-de-las-letras-fileteadas",
        },
        {
            titulo: "Membresía",
            duracion: "",
            descripcion: "Bienvenidx a la Membresía del Club del Filete, dentro vas a encontrar el acceso a todos los cursos y las clases gratuitas de instagram! También tendrás acceso a la comunidad de Artistas Latinoamericanos y a la bolsa de trabajo donde podrás ofrecer tus obras al mercado internacional.",
            imagenes: [portadaMembresia],
            link: "https://elclubdelfilete.tiendup.com/page/paginapreinscripcion",
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
            className="flex flex-col relative bg-gradient-to-b from-[#8F272A] to-[#222121] w-full h-[110vh] md:min-h-[70rem] rounded-t-3xl py-20 lg:pt-32 shadow-academia gap-24 md:gap-11 lg:gap-0 md:rounded-t-[3rem] md:pt-24 transition-transform duration-300 -translate-y-12 "
        >
            {/* <h2 className="hamston text-[#CDA053] text-3xl text-center">ACADEMIA</h2> */}
            <article className="flex flex-col min-h-[21.5rem] gap-8 w-4/5  ml-auto mr-auto md:items-start md:gap-5">

                <h2 className="hamston text-[#CDA053] text-3xl text-center uppercase">{currentCurso.titulo}</h2>
                <div className="w-4/5 md:mt-14 md:w-full">
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