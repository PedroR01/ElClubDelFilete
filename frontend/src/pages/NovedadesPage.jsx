import { Helmet } from "react-helmet-async";
import { useNovedadesFetch } from "../hooks/useNovedadesFetch";
import BlogPortrait from "../components/BlogPortrait";
import BlogSkeletonLoader from "../components/skeleton-loaders/BlogSkeletonLoader";

export default function NovedadesPage() {
    const { novedades, novedadesTest, loading, error } = useNovedadesFetch();

    // Hay una featured que es la que más llama la atención al entrar ==> featured_pos = 1
    // Al recibir todas las novedades hay que seleccionar las 4 principales que se muestran a lo primero, y el resto por ahora mostrarlas con un filtro basado en las últimas subidas.

    // const encontrarDestacadaPrincipal = () => (
    //     novedades.find((novedad) => novedad.featured_pos === 1)
    // )
    // const destacadaPrincipal = encontrarDestacadaPrincipal();

    return (
        <>
            <Helmet>
                <title>Novedades</title>
                <meta
                    name="description"
                    content="¡Mantenete al tanto de las noticias y recursos del Filete Porteño de la mano de El Club del Filete!"
                />
                <link rel="canonical" href="/novedades" />
            </Helmet>
            <section className="w-full bg-[#8F272A] py-24 md:py-36 grid gap-28">
                {loading ? (<div className="grid grid-cols-7 grid-rows-3 gap-4 lg:gap-6 w-full md:w-11/12 md:justify-self-center h-96 lg:h-[80vh]">
                    <BlogSkeletonLoader orientation="main" />
                    <div className="hidden lg:flex flex-col col-span-3 row-span-3 gap-6">
                        {[...Array(3)].map((_, index) => (
                            <BlogSkeletonLoader orientation="horizontal" key={index} />
                        ))}
                    </div>
                </div>)
                    :
                    (error ? (<><h1>Error al cargar novedades:</h1><h4>{error}</h4></>) : <>
                        <div className="grid grid-cols-7 grid-rows-3 gap-4 lg:gap-6 w-full md:w-11/12 md:justify-self-center h-96 lg:h-[80vh]">
                            <BlogPortrait content={novedades[0]} orientation="main" />
                            <div className="hidden lg:flex flex-col col-span-3 row-span-3 gap-6">
                                {novedades.filter((news) => news.featured_pos !== 1).map((news, newsKey) => (
                                    <article className="grid h-1/3" key={newsKey} >
                                        <BlogPortrait
                                            content={news}
                                            orientation="horizontal"
                                        />
                                    </article>

                                ))}
                            </div>
                        </div>
                        <section className="w-11/12 mx-auto">
                            <h2>Más vistas</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {novedadesTest.filter((news) => news.featured_pos !== 1).map((news, newsKey) => (
                                    <article className="grid" key={newsKey} >
                                        <BlogPortrait
                                            content={news}
                                            orientation="vertical"
                                        />
                                    </article>

                                ))}
                            </div>
                        </section>

                        {/* Noticias secundarias para mobile (slider) */}
                        {/* <div className="flex lg:hidden overflow-x-hide gap-4 p-4">
                    {novedades.filter((news) => news.featured_pos !== 1).map((news, _) => (
                        <Novedad content={news} mobile={true} key={_} />
                    ))}
                </div>

                <div className="justify-self-center mt-32">
                    <Button
                        text="Ver Más"
                        btnType={"button"}
                        bgColor="bg-[#DDAA58]"
                        textColor="text-[#8B2A1F]"
                        state={true}
                    />
                </div> */}
                    </>)}

            </section>
        </>
    );
}
