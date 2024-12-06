import React from "react";
import historiaBg from "../img/historia/fondo.png"

export default function Historia() {

    return (
        <div className="relative">
            {/* Imagen de fondo */}
            <img src={historiaBg} alt="fondo" className=""/>

            {/* Texto para la primera mancha */}
            <div className="absolute top-[7%] left-[53%] text-white text-center w-1/3">
                <h2 className="text-lg font-bold mb-10">Historia del Filete</h2>
                <p class="whitespace-pre-line mb-8">
                    El filete porteño es mucho más que un estilo decorativo; es una tradición que llevo en cada trazo y cada espiral, algo que, de alguna manera, siento que he vivido en carne propia. Esta historia empieza en las calles de Buenos Aires, a fines del Siglo XIX cuando los carros de los inmigrantes comenzaron a llenarse de color y de formas únicas. Con pinceladas audaces y detalles vibrantes, esos primeros fileteadores, en su mayoría trabajadores de origen humilde, lograron que cada carro reflejara algo propio en medio de una ciudad que no paraba de crecer. Así, nacía el filete, un arte popular que se hizo símbolo de identidad en Buenos Aires y más tarde en Latinoamérica.
                </p>
            </div>
            
            {/* Texto para la segunda mancha */}
            <div className="absolute top-[45%] left-[27%] text-white text-center">
                <h2 className="text-lg font-bold">Biografía Cristian</h2>
            </div>
            
            {/* Texto para la tercera mancha */}
            <div className="absolute top-[80%] left-[68%] text-white text-center">
                <h2 className="text-lg font-bold">Más sobre el filete...</h2>
            </div>
        </div>
    )
}


