import Button from "../components/Button";
import NovedadDestacada from "../components/NovedadDestacada";
import Novedad from "../components/Novedad";
import destacadaImage from "../img/portadas/blog_image.png";
import novedadImage1 from "../img/portadas/club2.jpg";
import novedadImage2 from "../img/portadas/club7.jpg";
import novedadImage3 from "../img/portadas/club9.jpg";

export default function NovedadesPage() {
    const novedadesTitles = {
        destacada: "Descomponiendo el Proceso de Diseño: El Estilo Fileteo",
        sec1: "Mate cosmico",
        sec2: "Evolución porteña",
        sec3: "El Tango y El Filete"
    };

    const getBlogImage = (image) => {

        switch (image) {
            case 0:
                return destacadaImage
            case 1:
                return novedadImage1
            case 2:
                return novedadImage2
            case 3:
                return novedadImage3

            default:
                return null
        }
    }

    const novedadesRef = [
        {
            id: 0,
            title: `${novedadesTitles.destacada}`,
            image: getBlogImage(0),
            introduction: `Viste, 'el que mucho abarca, poco aprieta', 
      y me pasó como el otro día. Quise hacer mil cosas 
      a la vez, pero terminé con más quilombo que un perro con dos colas. 
      Pensé que 'no por mucho madrugar amanece más temprano', 
      pero mirá, a las 7 de la mañana ya me había dado cuenta de que estaba 
      más perdido que una vaca en un tambo. `,
            video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            additionalText: "Este es un texto adicional para el primer contenido.",
            quote: "El éxito es la suma de pequeños esfuerzos repetidos día tras día. - Robert Collier",
            url: `./${novedadesTitles.destacada}`
        },
        {
            id: 1,
            title: `${novedadesTitles.sec1}`,
            image: getBlogImage(1),
            introduction: `Viste, 'el que mucho abarca, poco aprieta', 
      y me pasó como el otro día. Quise hacer mil cosas 
      a la vez, pero terminé con más quilombo que un perro con dos colas. 
      Pensé que 'no por mucho madrugar amanece más temprano', 
      pero mirá, a las 7 de la mañana ya me había dado cuenta de que estaba 
      más perdido que una vaca en un tambo. `,
            video: "https://www.youtube.com/watch?v=JLobOX2zMfM",
            additionalText: "Este es un texto adicional para el primer contenido.",
            quote: "El éxito es la suma de pequeños esfuerzos repetidos día tras día. - Robert Collier",
            url: `./${novedadesTitles.sec1}`
        },
        {
            id: 2,
            title: `${novedadesTitles.sec2}`,
            image: getBlogImage(2),
            introduction: `Viste, 'el que mucho abarca, poco aprieta', 
      y me pasó como el otro día. Quise hacer mil cosas 
      a la vez, pero terminé con más quilombo que un perro con dos colas. 
      Pensé que 'no por mucho madrugar amanece más temprano', 
      pero mirá, a las 7 de la mañana ya me había dado cuenta de que estaba 
      más perdido que una vaca en un tambo. `,
            video: "https://www.youtube.com/watch?v=c0bIl_KZwr0",
            additionalText: "Este es un texto adicional para el primer contenido.",
            quote: "El éxito es la suma de pequeños esfuerzos repetidos día tras día. - Robert Collier",
            url: `./${novedadesTitles.sec2}`
        },
        {
            id: 3,
            title: `${novedadesTitles.sec3}`,
            image: getBlogImage(3),
            introduction: `Viste, 'el que mucho abarca, poco aprieta', 
      y me pasó como el otro día. Quise hacer mil cosas 
      a la vez, pero terminé con más quilombo que un perro con dos colas. 
      Pensé que 'no por mucho madrugar amanece más temprano', 
      pero mirá, a las 7 de la mañana ya me había dado cuenta de que estaba 
      más perdido que una vaca en un tambo. `,
            video: "https://www.youtube.com/watch?v=U0M3l45-xAw",
            additionalText: "Este es un texto adicional para el primer contenido.",
            quote: "El éxito es la suma de pequeños esfuerzos repetidos día tras día. - Robert Collier",
            url: `./${novedadesTitles.sec3}`
        },
    ];

    return (
        <section className="w-full bg-[#8F272A] py-24 md:py-36">
            {/* Contenedor principal */}
            <div className="grid grid-cols-7 grid-rows-3 gap-4 lg:gap-6 w-full md:w-11/12 md:justify-self-center h-96 lg:h-[80vh]">
                {/* Noticia principal */}
                <NovedadDestacada novedadUrl={novedadesRef[0].url} content={novedadesRef[0]} />
                {/* Noticias secundarias para desktop */}
                <div className="hidden lg:flex flex-col col-span-3 row-span-3 gap-6">
                    {novedadesRef.filter((news) => news.id !== 0).map((news) => (
                        <Novedad novedadUrl={news.url}
                            content={news}
                            mobile={false} />
                    ))}
                </div>
            </div>

            {/* Noticias secundarias para mobile (slider) */}
            <div className="flex lg:hidden overflow-x-scroll gap-4 p-4">
                {novedadesRef.filter((news) => news.id !== 0).map((news) => (
                    <Novedad novedadUrl={news} content={news} mobile={true} />
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
