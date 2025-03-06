import { Helmet } from "react-helmet-async";
import { useNovedadesFetch } from "../hooks/useNovedadesFetch";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from '../context/AuthContextFunct';
import BlogPortrait from "../components/BlogPortrait";
import BlogSkeletonLoader from "../components/skeleton-loaders/BlogSkeletonLoader";
import Button from "../components/Button";
import { BellRingIcon } from "lucide-react";
import { motion } from "framer-motion";
import ErrorPage from "./ErrorPage";



export default function NovedadesPage() {
    const { novedades, loading, error, tags } = useNovedadesFetch();
    //const { novedades, loading, error } = useContext(AuthContext); // Accedes al valor de isAuthenticated

    // Función que maneja la redirección al presionar el botón
    const { isAuthenticated } = useContext(AuthContext); // Obtenemos el estado de autenticación
    const navigate = useNavigate(); // Usamos el hook para navegación
    const handleRedirect = () => {
        navigate('/añadirBlog', { state: { tags: tags } }); // Redirige a la página del "administrador"
    };

    const encontrarDestacadaPrincipal = () => (
        novedades.find((novedad) => novedad.featured_pos === 1)
    )
    const destacadaPrincipal = encontrarDestacadaPrincipal();

    return (
        <>
            {/* Encabezado SEO */}
            <Helmet>
                <title>Novedades</title>
                <meta
                    name="description"
                    content="¡Mantenete al tanto de las noticias y recursos del Filete Porteño de la mano de El Club del Filete!"
                />
                <link rel="canonical" href="/novedades" />
            </Helmet>
            {/* Contenido con estados de: Carga - Error - Contenido recibido */}
            <section className="w-full bg-[#8F272A] py-24 md:py-36 grid gap-32">
                {loading ? (<div className="grid grid-cols-7 grid-rows-3 gap-4 lg:gap-6 w-full md:w-11/12 md:justify-self-center h-96 lg:h-[80vh]">
                    <BlogSkeletonLoader orientation="main" />
                    <div className="hidden lg:flex flex-col col-span-3 row-span-3 gap-6">
                        {[...Array(3)].map((_, index) => (
                            <BlogSkeletonLoader orientation="horizontal" key={index} />
                        ))}
                    </div>
                </div>)
                    :
                    (error ? (<ErrorPage />) : <>
                        <section className="w-screen">
                            <motion.div
                                initial={{ x: -200, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="flex flex-row w-11/12 justify-self-center gap-12 my-10 md:mb-10"
                            >
                                <h1 className="allura-regular text-[#CDA053] text-5xl sm:text-6xl leading-[1.10] tracking-wide">Destacadas</h1>
                                <div className="content-center">
                                    {isAuthenticated ? (
                                        <Button
                                            text="Añadir Novedad"
                                            btnType={"button"}
                                            bgColor="bg-[#DDAA58]"
                                            textColor="text-[#8B2A1F]"
                                            event={handleRedirect}
                                            state={false}
                                            contentSizeMobile={"py-1 px-0 text-base"}
                                        />
                                    ) : <Button
                                        icon={<BellRingIcon />}
                                        text={"Suscribirse"}
                                        btnType={"button"}
                                        bgColor="bg-[#DDAA58]"
                                        textColor="text-[#8B2A1F]"
                                        event={() => (1)}
                                        state={true}
                                    />}
                                </div>
                            </motion.div>

                            <div
                                className="grid gap-4 w-full md:w-11/12 md:justify-self-center grid-cols-1 lg:grid-cols-7 lg:grid-rows-3 h-auto lg:h-[73vh]"
                            >
                                {/* Novedad principal (main) */}
                                <div className="lg:col-span-4 lg:row-span-3">
                                    <BlogPortrait content={destacadaPrincipal} orientation="main" tags={tags} />
                                </div>

                                {/* Contenedor de las novedades secundarias */}
                                <div
                                    className="flex flex-row gap-8 md:gap-4 overflow-x-auto lg:flex-col lg:overflow-y-auto lg:col-span-3 lg:row-span-3 py-12 lg:pt-4 lg:pb-12"
                                >
                                    {novedades
                                        .filter((news) => news.featured_pos > 1)
                                        .map((news, newsKey) => (
                                            <article
                                                key={newsKey}
                                                className="shrink-0 w-64 lg:w-auto  lg:h-[30%]"
                                            >
                                                <BlogPortrait content={news} orientation="horizontal" tags={tags} />
                                            </article>
                                        ))}
                                </div>
                            </div>
                        </section>

                        <section className="w-11/12 mx-auto">
                            <h2 className="allura-regular text-[#CDA053] text-6xl leading-[1.10] tracking-wide capitalize">
                                Recientes
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mt-8">
                                {novedades
                                    .filter((news) => news.featured_pos === null)
                                    .map((news, newsKey) => (
                                        <article className="border-2 border-[#802326] rounded-3xl" key={newsKey}>
                                            <BlogPortrait content={news} orientation="vertical" tags={tags} />
                                        </article>
                                    ))}
                            </div>
                        </section>


                    </>)}
            </section>
        </>
    );
}
