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
            className="flex flex-col relative bg-gradient-to-b from-[#8F272A] to-[#2f0c0d] w-full h-[110vh] md:min-h-[70rem] rounded-t-3xl pt-20 lg:pt-32 shadow-academia gap-24 md:gap-11 lg:gap-0 md:rounded-t-[3rem] md:pt-24 transition-transform  -translate-y-5 "
        >
            <svg
                className="hidden absolute md:block inset-0 object-cover  transition-transform -translate-y-24 ease-in-out duration-300 delay-150 rotate-6 h-auto md:rotate-0 md:translate-y-0 md:top-4 -z-10 md:-left-5 md:w-[800px]  scale-110 lg:w-[840px] lg:translate-x-10 xl:w-[905px] 2xl:w-[1108px] "
                viewBox="0 0 1108 1056"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g filter="url(#filter0_d_861_17)">
                    <path
                        d="M632 62.5004C865.21 6.4911 1195.5 -29.5 1044.5 280C883.916 609.143 656.5 801 504.5 961C334.439 1123.01 6.99992 959.5 6.99992 748.5C-8.81365 515.129 -80.0094 343.554 -45.5917 214.998C-42.6248 203.916 -40.1151 192.318 -38.5943 180.947C2.66724 -127.561 402.993 117.5 632 62.5004Z"
                        fill="#2f0c0d"
                    />
                </g>
                <defs>
                    <filter
                        id="filter0_d_861_17"
                        x="-79.8762"
                        y="0.800781"
                        width="1187.53"
                        height="1054.83"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="12.5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_861_17"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_861_17"
                            result="shape"
                        />
                    </filter>
                </defs>
            </svg>
            {/* <h2 className="hamston text-[#CDA053] text-3xl text-center">ACADEMIA</h2> */}
            <article className="course-animation flex flex-col min-h-[21.5rem] gap-8 w-4/5  ml-auto mr-auto md:items-start md:gap-5">

                <h2 className="title hamston text-[#CDA053] text-3xl text-center uppercase">{currentCurso.titulo}</h2>
                <div className="w-4/5 md:mt-14 md:w-full">
                    <span className="text-base montserrat-normal text-[#fefffba7]">{currentCurso.duracion}</span>
                    <p className="course-desription text-base montserrat-normal text-[#FEFFFB] w-full">{currentCurso.descripcion}</p>
                    <div className="mt-12"></div>
                    <Button text={"Acceder"} btnType={"button"} event={() => onConfirmRedirect(currentCurso.link)} />
                </div>
            </article>
            <div className="carousel-animation md:mt-16">
                <Carousel images={cursos.map((curso) => curso.imagenes[0])} clickHandler={(index) => handleCursoChange(index)} />
            </div>


        </section>
    );
}