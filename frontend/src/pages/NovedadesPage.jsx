import React from "react";
import Button from "../components/Button";
import NovedadDestacada from "../components/NovedadDestacada";
import NovedadSecundaria from "../components/NovedadSecundaria";
import blogImage from "../img/portadas/blog_image.png";
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
    const novedadesContent = [
        {
          image: blogImage,
          title: "El título del primer contenido",
          introduction: `Viste, 'el que mucho abarca, poco aprieta', 
          y me pasó como el otro día. Quise hacer mil cosas 
          a la vez, pero terminé con más quilombo que un perro con dos colas. 
          Pensé que 'no por mucho madrugar amanece más temprano', 
          pero mirá, a las 7 de la mañana ya me había dado cuenta de que estaba 
          más perdido que una vaca en un tambo. `,
          video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          additionalText: "Este es un texto adicional para el primer contenido.",
          quote: "El éxito es la suma de pequeños esfuerzos repetidos día tras día. - Robert Collier"
        },
        {
            image: blogImage,
            title: "El título del primer contenido",
            introduction: `Viste, 'el que mucho abarca, poco aprieta', 
            y me pasó como el otro día. Quise hacer mil cosas 
            a la vez, pero terminé con más quilombo que un perro con dos colas. 
            Pensé que 'no por mucho madrugar amanece más temprano', 
            pero mirá, a las 7 de la mañana ya me había dado cuenta de que estaba 
            más perdido que una vaca en un tambo. `,
            video: "https://www.youtube.com/watch?v=Gs069dndIYk",
            additionalText: "Este es un texto adicional para el primer contenido 2.",
            quote: "El éxito es la suma de pequeños esfuerzos repetidos día tras día. - Robert Collier"
          },
          {
            image: blogImage,
            title: "El título del primer contenido 3",
            introduction: `Viste, 'el que mucho abarca, poco aprieta', 
            y me pasó como el otro día. Quise hacer mil cosas 
            a la vez, pero terminé con más quilombo que un perro con dos colas. 
            Pensé que 'no por mucho madrugar amanece más temprano', 
            pero mirá, a las 7 de la mañana ya me había dado cuenta de que estaba 
            más perdido que una vaca en un tambo. `,
            video: "https://www.youtube.com/watch?v=Gs069dndIYk",
            additionalText: "Este es un texto adicional para el primer contenido 3.",
            quote: "El éxito es la suma de pequeños esfuerzos repetidos día tras día. - Robert Collier"
          },
          {
            image: blogImage, 
            title: "El título del primer contenido 4",
            introduction: `Viste, 'el que mucho abarca, poco aprieta', 
            y me pasó como el otro día. Quise hacer mil cosas 
            a la vez, pero terminé con más quilombo que un perro con dos colas. 
            Pensé que 'no por mucho madrugar amanece más temprano', 
            pero mirá, a las 7 de la mañana ya me había dado cuenta de que estaba 
            más perdido que una vaca en un tambo. `,
            video: "https://www.youtube.com/watch?v=Gs069dndIYk",
            additionalText: "Este es un texto adicional para el primer contenido 4.",
            quote: "El éxito es la suma de pequeños esfuerzos repetidos día tras día. - Robert Collier"
          },
    ]
    return (
        <section className="w-full bg-[#8F272A] py-24 md:py-36">
            {/* Contenedor principal */}
            <div className="grid grid-cols-7 grid-rows-3 gap-4 lg:gap-6 w-full md:w-11/12 md:justify-self-center h-96 lg:h-[80vh]">
                {/* Noticia principal */}
                <NovedadDestacada novedadUrl={novedadesRef[0].url} novedad={novedadesContent[0]} />
                {/* Noticias secundarias para desktop */}
                <div className="hidden lg:flex flex-col col-span-3 row-span-3 gap-6">
                    {novedadesRef.filter((news) => news.id !== 0).map((news, index) => (
                        <NovedadSecundaria novedadUrl={novedadesRef[0].url} 
                        novedad={novedadesContent[index+1]}
                         mobile={false} />
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
