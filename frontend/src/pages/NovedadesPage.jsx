import React from "react";
import Button from "../components/Button";
import NovedadDestacada from "../components/NovedadDestacada";
import NovedadSecundaria from "../components/NovedadSecundaria";

export default function NovedadesPage() {
    const novedadesTitles = {
        destacada: "Descomponiendo el Proceso de Diseño: El Estilo Fileteo",
        sec1: "Mate cosmico",
        sec2: "Evolución porteña",
        sec3: "El Tango y El Filete"
    };
    const novedadesRef = [
        { id: 0, title: `${novedadesTitles.destacada}`, url: `/novedades/${novedadesTitles.destacada}` },
        { id: 1, title: `${novedadesTitles.sec1}`, url: `/novedades/${novedadesTitles.sec1}` },
        { id: 2, title: `${novedadesTitles.sec2}`, url: `/novedades/${novedadesTitles.sec2}` },
        { id: 3, title: `${novedadesTitles.sec3}`, url: `/novedades/${novedadesTitles.sec3}` },
    ];

    return (
        <section className="w-full bg-[#8F272A] pb-8 md:py-14">
            {/* Contenedor principal */}
            <div className="grid grid-cols-7 grid-rows-3 gap-4 lg:gap-6 w-full md:w-11/12 md:justify-self-center h-96 lg:h-[80vh]">
                {/* Noticia principal */}
                <NovedadDestacada novedadUrl={novedadesRef[0].url} />
                {/* Noticias secundarias para desktop */}
                <div className="hidden lg:flex flex-col col-span-3 row-span-3 gap-6">
                    {novedadesRef.filter((news) => news.id !== 0).map((news) => (
                        <NovedadSecundaria novedadUrl={news} mobile={false} />
                    ))}
                </div>
            </div>

            {/* Noticias secundarias para mobile (slider) */}
            <div className="flex lg:hidden overflow-x-scroll gap-4 p-4">
                {novedadesRef.filter((news) => news.id !== 0).map((news) => (
                    <NovedadSecundaria novedadUrl={news} mobile={true} />
                ))}
            </div>

            <div className="justify-self-center mt-32">
                <Button
                    text="Ver Más"
                    bgColor="bg-[#DDAA58]"
                    textColor="text-[#8B2A1F]"
                />
            </div>
        </section>
    );
}
