import { Helmet } from "react-helmet-async";
import { useNovedadesFetch } from "../hooks/useNovedadesFetch";
import Button from "../components/Button";
import NovedadDestacada from "../components/NovedadDestacada";
import Novedad from "../components/Novedad";

export default function NovedadesPage() {
    const { novedades, loading, error } = useNovedadesFetch();

    if (loading) return <p>Cargando novedades...</p>; // mostrar skeleton loading.
    if (error) return <p>Error al cargar novedades: {error}</p>;

    // Hay una featured que es la que más llama la atención al entrar ==> featured_pos = 1
    // Al recibir todas las novedades hay que seleccionar las 4 principales que se muestran a lo primero, y el resto por ahora mostrarlas con un filtro basado en las últimas subidas.

    const encontrarDestacadaPrincipal = () => (
        novedades.find((novedad) => novedad.featured_pos === 1)
    )
    const destacadaPrincipal = encontrarDestacadaPrincipal();

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
            <section className="w-full bg-[#8F272A] py-24 md:py-36">
                {/* Contenedor principal */}
                <div className="grid grid-cols-7 grid-rows-3 gap-4 lg:gap-6 w-full md:w-11/12 md:justify-self-center h-96 lg:h-[80vh]">
                    {/* Noticia principal */}
                    <NovedadDestacada content={destacadaPrincipal} />
                    {/* Noticias secundarias para desktop */}
                    <div className="hidden lg:flex flex-col col-span-3 row-span-3 gap-6">
                        {novedades.filter((news) => news.featured_pos !== 1).map((news, _) => (
                            <Novedad
                                content={news}
                                mobile={false}
                                key={_} />
                        ))}
                    </div>
                </div>

                {/* Noticias secundarias para mobile (slider) */}
                <div className="flex lg:hidden overflow-x-hide gap-4 p-4">
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
                </div>
            </section>
        </>
    );
}
