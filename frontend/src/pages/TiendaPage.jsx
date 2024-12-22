import Button from "../components/Button";
import pincelesFondo from "../img/tienda/fondoTienda.jpeg";

export default function TiendaDeSoluciones() {
    return (
        <div className="bg-[#8F272A] min-h-screen font-sans pt-28">
            <header className="p-4 text-center">
                <h1 className="text-4xl font-semibold text-[#CDA053]">
                    Bienvenidos a la Tienda del Club del Filete!
                </h1>
                <p className="text-xl mt-2 text-[#FEFFFB]">
                    ¡Tenemos todo lo que necesitas y hacemos envíos a todo el Mundo!
                </p>
                <span className="text-base font-semibold text-[#CDA053]">
                    elclubdelfilete@gmail.com
                </span>
            </header>

            <main className="max-w-6xl mx-auto py-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {/* Columna 1: Cards */}
                    <div className="space-y-8">
                        <ProductCard
                            title="Pinceles Carnevale"
                            description="Pinceles de alta calidad para tus proyectos artísticos."
                            email="elclubdelfilete@gmail.com"
                        />
                        <ProductCard
                            title="Pinceles Tigre Serie 803"
                            description="Precisión y durabilidad en cada trazo con los pinceles Tigre."
                            email="elclubdelfilete@gmail.com"
                        />
                    </div>

                    {/* Columna 2: Imagen */}
                    <div className="hidden md:flex justify-center items-center">
                        <img
                            src={pincelesFondo}
                            alt="Pinceles tienda"
                            className="h-auto w-48 rounded-lg shadow-xl"
                        />
                    </div>

                    {/* Columna 3: Cards */}
                    <div className="space-y-8">
                        <ProductCard
                            title="Esmalte al Agua 130ml"
                            description="Colores rojo, amarillo, azul, blanco y negro para todo tipo de superficies."
                            email="elclubdelfilete@gmail.com"
                        />
                        <ProductCard
                            title="Barniz al Agua 130ml"
                            description="Protege y da acabado a tus proyectos con nuestro barniz."
                            email="elclubdelfilete@gmail.com"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

function ProductCard({ title, description, email }) {
    const handleEmailClick = () => {
        // Redirige al cliente de correo con el mail predefinido
        window.location.href = `mailto:${email}`;
    };

    return (
        <div className="bg-[#222121] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-[#FEFFFB]">{title}</h2>
            <p className="text-[#FEFFFB]/85 my-2">{description}</p>
            <Button text={"Consultar"} btnType={"button"} event={handleEmailClick} />
        </div>
    );
}