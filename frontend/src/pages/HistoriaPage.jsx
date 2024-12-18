import { useEffect } from "react";
import cristianPintando from "../img/portadas/club14.jpg";

export default function HistoriaPage() {

    useEffect(() => {
        // Intersection Observer para animaciones de entrada
        const elements = document.querySelectorAll(".animate-fade-in");

        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("opacity-100", "translate-y-0", "translate-x-0");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        elements.forEach((el) => observer.observe(el));
    }, []);

    return (
        <div className="w-full bg-[#2f0c0d] pt-24">
            <section className="flex w-full justify-between pb-40 lg:pb-[28rem] bg-[#8F272A] md:bg-transparent">
                <article className="relative flex flex-col z-10 top-11 md:top-20 lg:top-24 h-full items-center text-white md:pr-48 lg:pr-40 px-6">
                    <svg
                        className="absolute inset-0 object-cover  transition-transform -translate-y-24 ease-in-out duration-300 delay-150 rotate-6 md:rotate-0 md:translate-y-0 md:top-4 -z-10 md:-left-5 md:w-[800px] md:h-[900px] scale-110 lg:w-[948px] lg:h-[955px] 2xl:w-[1108px] 2xl:h-[1056px]"
                        viewBox="0 0 1108 1056"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g filter="url(#filter0_d_861_17)">
                            <path
                                d="M632 62.5004C865.21 6.4911 1195.5 -29.5 1044.5 280C883.916 609.143 656.5 801 504.5 961C334.439 1123.01 6.99992 959.5 6.99992 748.5C-8.81365 515.129 -80.0094 343.554 -45.5917 214.998C-42.6248 203.916 -40.1151 192.318 -38.5943 180.947C2.66724 -127.561 402.993 117.5 632 62.5004Z"
                                fill="#8F272A"
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
                    <h3
                        className="text-2xl md:mt-16 lg:text-4xl lg:mt-5 rye-regular text-[#CDA053] 2xl:text-5xl font-bold mb-6 text-center tracking-wider 
            opacity-0 animate-fade-in transition duration-700"
                    >
                        HISTORIA DEL FILETE PORTEÑO
                    </h3>

                    <p
                        className="text-lg montserrat-normal text-[#FEFFFB] lg:pt-14 md:text-xl leading-relaxed max-w-4xl opacity-0 md:translate-x-[50px] animate-fade-in transition duration-700"
                    >
                        El filete porteño es mucho más que un estilo decorativo; es una
                        <span className="text-[#CDA053]"> tradición </span> que llevo en cada trazo y cada espiral, algo que, de alguna
                        manera, siento que he vivido en carne propia. Esta historia empieza en
                        las calles de <span className="text-[#CDA053]"> Buenos Aires</span>, a fines del Siglo XIX cuando los carros de
                        los inmigrantes comenzaron a llenarse de color y de formas únicas. Con
                        los años, el filete y los fileteadores fuimos evolucionando, buscando
                        siempre nuevos soportes donde plasmar la <span className="text-[#CDA053]"> identidad Argentina</span> y así
                        pasamos a decorar también los colectivos que atravesaban la ciudad.
                        Pero en 1964, un cambio importante nos obligó a adaptarnos. Hoy, el
                        fileteado porteño es reconocido como Patrimonio Cultural Inmaterial de
                        la Humanidad por la UNESCO. Es un arte que <span className="text-[#CDA053]"> representa la historia, la
                            resistencia y la creatividad de Buenos Aires. </span>
                    </p>
                </article>

                <img
                    className="hidden object-cover md:block md:w-1/4 lg:w-1/3 2xl:w-5/12 2xl:mr-4 opacity-0 translate-y-[30px] animate-fade-in transition duration-1000"
                    src={cristianPintando}
                    alt="Cristian diseñando una pieza"
                />
            </section>

            <section className="flex w-full justify-between pb-40 lg:pb-80">
                <svg className="absolute -translate-y-[77px] md:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#2f0c0d" fillOpacity="1" d="M0,192L30,181.3C60,171,120,149,180,149.3C240,149,300,171,360,181.3C420,192,480,192,540,186.7C600,181,660,171,720,186.7C780,203,840,245,900,266.7C960,288,1020,288,1080,250.7C1140,213,1200,139,1260,101.3C1320,64,1380,64,1410,64L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
                <img className="hidden object-cover md:block md:w-1/4 md:ml-52" src={cristianPintando} alt="Cristian diseñando una pieza" />
                <article className="relative flex flex-col z-10 top-20 lg:top-24 h-full items-center text-white md:pl-48 lg:pl-40 px-6">

                    <h3 className="text-2xl md:mt-16 lg:text-4xl lg:mt-5 rye-regular text-[#CDA053] 2xl:text-5xl font-bold mb-6 text-center tracking-wider z-10">
                        HISTORIA DE CRIS
                    </h3>

                    <svg className="absolute inset-0 object-cover  scale-110 md:w-[1000px] md:h-[956px] lg:w-[1108px] lg:h-[1056px] lg:-top-2" viewBox="0 0 1188 1056" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_872_24)">
                            <path d="M475.656 62.5004C242.446 6.4911 -87.8436 -29.5 63.1564 280C223.74 609.143 451.156 801 603.156 961C773.217 1123.01 1100.66 959.5 1100.66 748.5C1116.47 515.129 1187.67 343.554 1153.25 214.998C1150.28 203.916 1147.77 192.318 1146.25 180.947C1104.99 -127.561 704.664 117.5 475.656 62.5004Z" fill="#8F272A" />
                        </g>
                        <defs>
                            <filter id="filter0_d_872_24" x="0" y="0.800781" width="1187.53" height="1054.83" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="4" />
                                <feGaussianBlur stdDeviation="12.5" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_872_24" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_872_24" result="shape" />
                            </filter>
                        </defs>
                    </svg>

                    <p className="text-lg montserrat-normal text-[#FEFFFB] pt-14 md:text-xl leading-relaxed max-w-4xl z-10 relative">
                        Que decirte de mi… Nací en el año 1985 un Martes 22 de Octubre bajo el
                        signo de Libra en un hospital público de la Ciudad de La Plata,
                        Provincia de Buenos Aires. Desde que tengo uso de razón uso el arte
                        como mi método de expresión y <span className="text-[#CDA053]"> cuando conocí al Filete Porteño fue amor a
                            primera vista,</span> en una sola técnica pictórica encontré todo lo que me
                        representaba: <span className="text-[#CDA053]"> oficio, identidad cultural, diseños complejos, retratos,
                            letras y trabajo,</span> este último fué de los elementos que más me llamó la
                        atención ya que siempre supe que para que esto funcione me tenia que dar
                        de comer, Si queres saber más sobre mi historia en la sección de
                        Novedades hablo un poco más profundo, pero creo que con esto ya sabes
                        por donde viene la mano.
                    </p>
                </article>

            </section>

            <section className="relative fixed-bg">
                <article className="mt-20 pt-20 text-center md:pt-40 md:text-left">
                    <h3 className="text-4xl rye-regular text-[#CDA053] md:text-6xl font-bold mb-6 lg:ml-20 tracking-wider z-10 brightness-100">El Club Del Filete</h3>
                    <p className="text-lg montserrat-normal text-[#FEFFFB] mt-14 md:text-xl leading-relaxed max-w-7xl  lg:ml-48 bg-[rgba(0,0,0,.7)] p-6 rounded-lg">El Club del Filete es una <span className="text-[#CDA053]">plataforma online de enseñanza que busca democratizar el acceso a la enseñanza del Filete Porteño,</span> aprovechando las ventajas de la virtualidad para llevar la identidad argentina a todos los rincones del mundo, tanto para los argentinos que se encuentran lejos de su tierra como para el resto del mundo que quiere conocer la Cultura Argentina.
                        La idea surge de la necesidad del público de aprender este arte, por eso me decidí a crear esta plataforma digital de enseñanza que ahora ya es una <span className="text-[#CDA053]">COMUNIDAD FILETEADORA</span></p>
                </article>
            </section>
        </div>
    );
}


