import { Helmet } from "react-helmet-async";
import ProductCard from "../components/ProductCard";
// import Button from "../components/Button";
// import pincelesFondo from "../img/tienda/fondoTienda.jpeg";
// import listaPrecios from "../img/tienda/listaPrecios2024.jpg"
import  Hidroesmaltes from "../img/tienda/hidroesmaltes.jpg"
import  PincelesTigre from "../img/tienda/pincelesTigre.jpg"
import  PincelesCarnavale from "../img/tienda/pincelesCarnavale.jpg"
export default function TiendaPage() {
    const formattedDescriptions = [`Pinceles Carnevale de pelo largo y virola chata
    Nº 1 - $5.700 (USD 6)
    Nº 2 - $6.200 (USD 6,5)
    Nº 4 - $6.500 (USD 7)
    Nº 6 - $7.100 (USD 7,5)
    Nº 10 - $9.000 (USD 9)
    Juego Completo Nº 1, 2, 4, 6, 10 - 
    $32.000 (USD 34)`,`Juego de pinceles Tigre Serie 803, 6 unidades $9.000` , 
    `Hidroesmalte por 130cc, colores rojo, amarillo, azul, blanco y negro. $5.000 c/u
    Barniz al agua por 130cc $6.000 c/u`];
    
    const handleEmailClick = () => {
        // Redirige al cliente de correo con el mail predefinido
        window.location.href = `mailto:elclubdelfilete@gmail.com`;
    };

    return (
        <>
            <Helmet>
                <title>Tienda</title>
                <meta
                    name="description"
                    content="¡Encargá piezas y/o materiales para tus propios filetes!"
                />
                <link rel="canonical" href="/tienda" />
            </Helmet>
            <div className="bg-[#24222B] min-h-screen pt-28">
                <header className="p-4 text-center">
                    <h1 className="allura-regular">
                        ¡Bienvenidos a la Tienda del Club del Filete!
                    </h1>
                    <p className="text-xl mt-2">
                        ¡Tenemos todo lo que necesitas y hacemos envíos a todo el Mundo!<br />
                        {/* Hacé tu pedido directamente a nosotros <span className="font-semibold text-[#CDA053]">elclubdelfilete@gmail.com</span> */}
                    </p>
                    {/*<div className="w-fit justify-self-center mt-6">
                        <Button text={"Consultar Precios"} btnType={"button"} event={handleEmailClick} />
                    </div>*/}
                </header>

                <main className="max-w-6xl mx-auto py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
                        {/* Columna 1: Cards */}
                        <div className="space-y-8">
                            <ProductCard
                                title="Pinceles Carnevale"
                                description={formattedDescriptions[0]}
                                imageSrc={PincelesCarnavale}
                                onClickEvent={handleEmailClick}
                                
                            />
                        </div>
                        <div className="space-y-8">
                        <ProductCard
                                title="Pinceles Tigre Serie 803"
                                description={formattedDescriptions[1]}
                                imageSrc={PincelesTigre}
                                onClickEvent={handleEmailClick}
                            />
                        </div>

                        {/* Columna 2: Imagen */}
                        {/*
                        <div className="hidden md:flex justify-center items-start">
                            <img
                                src={listaPrecios}
                                alt="Pinceles tienda"
                                className="h-auto w-auto rounded-lg shadow-xl"
                            />
                        </div>
                            */}
                        {/* Columna 3: Cards */}
                        <div className="space-y-8">
                            <ProductCard
                                title="Hidroesmaltes, Barniz al agua"
                                description={formattedDescriptions[2]}
                                imageSrc={Hidroesmaltes}
                                onClickEvent={handleEmailClick}
                            />{/*
                            <ProductCard
                                title="Barniz al Agua 130ml"
                                description="Protege y da acabado a tus proyectos con nuestro barniz."
                                imageSrc={pincelesFondo}
                                onClickEvent={handleEmailClick}
                            />*/}
                        </div>
                        
                    </div>
                </main>
            </div>
        </>
    );
}