import Button from "../components/Button";
import NovedadDestacada from "../components/NovedadDestacada";
import Novedad from "../components/Novedad";
import destacadaImage from "../img/novedades/generandoHA.jpg";
import novedadImage1 from "../img/novedades/humildeGuia.jpg";
import novedadImage2 from "../img/novedades/filetePatrimonioUNESCO.jpg";
import novedadImage3 from "../img/novedades/pincelesParaFiletear.jpg";

export default function NovedadesPage() {
    const novedadesTitles = {
        destacada: "Generando el Hábito Artístico: Beneficios para el Bienestar",
        sec1: "Humilde guia para Redes Sociales",
        sec2: "Filete Patrimonio Cultural Inmaterial de la Humanidad",
        sec3: "¡Pinceles para filetear!"
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
            description: "Beneficios del Arte en las personas",
            image: getBlogImage(0),
            introduction: `¿Te sientes atrapado en la rutina, con poco tiempo para ti y una montaña de estrés acumulado? A veces, la vida diaria se convierte en una lista interminable de tareas, y esa carga se refleja en nuestro estado de ánimo, energía y bienestar. El estrés y la ansiedad no solo nos agotan, sino que nos alejan de lo que realmente importa: sentirnos bien y disfrutar de cada día. Pero, ¿y si existiera una manera de cambiar eso? ¿Qué pasaría si pudieras encontrar una actividad que te ayude a liberar tensiones, reconectar contigo y llenar tu vida de color y significado? Practicar el arte tiene ese poder. No solo te permite expresarte, sino que activa una serie de cambios químicos en tu cerebro que transforman tu salud mental, física y emocional.
            El arte no necesita grandes habilidades ni conocimientos para ofrecer sus beneficios. En este PDF, te mostraré cómo la práctica artística puede convertirse en tu refugio diario, ayudándote a reducir el estrés, mejorar tu estado de ánimo y reconectarte con tu creatividad. Con ejercicios simples, crearás un hábito artístico que puede cambiar la forma en la que experimentas la vida, acercándote a una versión de ti más plena, más tranquila y, sobre todo, más feliz.`,
            sections: [{
                title: "Los Efectos del Arte en el Cerebro: Cómo el Arte Cambia nuestra Química",
                content: "Cuando nos sumergimos en una actividad artística, se producen cambios en el cerebro que tienen efectos positivos en nuestra salud mental y emocional.",
                list: {
                    type: "unordered",
                    items: [
                        "Liberación de Dopamina y Serotonina: Estas son conocidas como las 'hormonas de la felicidad'. La dopamina se libera cuando creamos algo, dándonos una sensación de logro, mientras que la serotonina mejora el estado de ánimo y reduce la ansiedad. Cuando practicamos arte, estas hormonas nos ayudan a sentirnos satisfechos y calmados.",
                        "Aumento de la Neuroplasticidad: El arte activa múltiples áreas del cerebro, promoviendo algo llamado 'neuroplasticidad'. Esto significa que el cerebro se vuelve más flexible y capaz de aprender cosas nuevas. Así, practicar arte no solo mejora la creatividad, sino que también ayuda a resolver problemas con mayor facilidad.",
                        "Reducción del Estrés: Cuando pintamos o realizamos una actividad artística, se reduce la producción de cortisol, la hormona del estrés. Esta disminución del estrés nos ayuda a sentirnos más tranquilos y a disfrutar del momento presente."
                    ]
                }
            }, {
                title: "Ejercicios Prácticos para Desarrollar el Hábito Artístico",
                content: "Aquí tienes algunos ejercicios diarios para cultivar el hábito artístico y experimentar sus beneficios en tu bienestar:",
                list: {
                    type: "unordered",
                    items: [
                        "Ejercicio de Inicio de Día (5 minutos): Tómate cinco minutos cada mañana para dibujar o pintar algo sencillo, sin preocuparte por el resultado. Puede ser algo tan simple como líneas, figuras o colores. La idea es comenzar el día de forma creativa y sin presión.",
                        "Refugio de Paz al Final del Día (10 minutos): Al terminar tu jornada, dedica diez minutos a una actividad artística que te relaje, como hacer trazos o pintar de forma libre. Este ejercicio te ayudará a soltar el estrés acumulado y a reconectar contigo mismo.",
                        "Captura un Recuerdo Positivo (5-10 minutos): Cada día, piensa en un momento que te haya hecho sentir bien, por pequeño que sea (una sonrisa, una conversación, una buena comida). Dedica unos minutos a dibujar o pintar algo que te recuerde ese momento. Este ejercicio no solo mejora el estado de ánimo, sino que ayuda a valorar las cosas positivas del día a día.",
                        "Dibuja tu Estado de Ánimo (5 minutos): Al final del día, dedica cinco minutos a plasmar en un dibujo o pintura cómo te sientes. No hace falta que sea algo detallado o figurativo; puedes expresar tus emociones con colores, formas o trazos sueltos. Este ejercicio te ayudará a liberar emociones y a ser consciente de tus estados de ánimo.",
                        "Explora Nuevas Formas y Texturas (10 minutos): Dedica diez minutos al día a experimentar con diferentes materiales o técnicas. Puede ser algo tan simple como usar papel de colores, lápices, o hacer trazos con distintos grosores. Este ejercicio estimula la creatividad y te permite descubrir nuevas maneras de expresión."
                    ]
                }
            },
            {
                content: "Cada uno de estos ejercicios es una oportunidad para desconectar del estrés, reconectar contigo mismo y construir un espacio de calma y creatividad en tu día a día."
            }
            ],
            url: `./${novedadesTitles.destacada}`
        },
        {
            id: 1,
            title: `${novedadesTitles.sec1}`,
            description: "Material de texto descargable orientado a servir como una humilde guía para potenciar el uso de tus redes como artista",
            image: getBlogImage(1),
            introduction: `Te comparo una guia para que puedas maximizar tus redes como artista ¡Espero esta info te sea tan útil como lo fué para mi!`,
            url: `./${novedadesTitles.sec1}`,
            pdf: `https://drive.google.com/file/d/1VnisZowLjsdBdhe4Fdi4GPoUi0QC8_5N/view?usp=sharing`
        },
        {
            id: 2,
            title: `${novedadesTitles.sec2}`,
            description: "¿Sabías que el Filete Porteño es Patrimonio Cultural Inmaterial de la Humanidad?",
            image: getBlogImage(2),
            sections: [
                {
                    title: "El Fileteado Porteño y la Declaración de la UNESCO",
                    content: "El *1 de diciembre de 2015*, el Filete Porteño fue declarado **Patrimonio Cultural Inmaterial de la Humanidad** por la UNESCO."
                },
                {
                    title: "¿Por qué la UNESCO lo reconoció como Patrimonio?",
                    list: {
                        type: "ordered",
                        items: [
                            "Representa *valores culturales e históricos* únicos.",
                            "Ha sido transmitido de generación en generación.",
                            "Fomenta un sentido de *pertenencia e identidad* en la comunidad porteña y argentina.",
                            "Integra elementos de *arte popular*."
                        ]
                    },
                },
                {
                    title: "El impacto de la declaración",
                    content: "Este reconocimiento internacional tuvo varios efectos positivos:",
                    list: {
                        type: "unordered",
                        items: [
                            "*Mayor visibilidad internacional*, permitiendo eventos culturales fuera de Argentina.",
                            "Un *resurgimiento del interés* por aprender la técnica.",
                            "Protección de su valor cultural para futuras generaciones."
                        ]
                    }
                },
                {
                    content: "¡En el 2025 celebraremos los 10 años de la declaración!"
                }
            ],
            url: `./${novedadesTitles.sec2}`
        },
        {
            id: 3,
            title: `${novedadesTitles.sec3}`,
            description: "La historía e importancia en la elección del pincel para los trazos en el Filete Porteño",
            image: getBlogImage(3),
            sections: [{
                content: "El Filete Porteño es una técnica que está fuertemente relacionada a su herramienta principal que es el pincel de pelo largo, debido a que toda la iconografía está desarrollada en base a los trazos del pincel.\nHay de varios tipos y medidas, pero sin duda los mejores son los CARNEVALE, pinceles realizados por la familia Carnevale desde 1940, están hechos de pelo de oreja de vaca y manufacturados artesanalmente uno por uno!\nTe dejo una entrevista a Rolando Carnevale realizada en el marco del encuentro anual de Fileteadores!"
            }],
            video: "https://www.youtube.com/watch?v=T4HEagQGXwQ",
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
                    <Novedad novedadUrl={news.url} content={news} mobile={true} />
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
    );
}
