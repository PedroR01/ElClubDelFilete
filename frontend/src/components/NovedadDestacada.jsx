import React from "react";
import blogImage from "../img/portadas/blog_image.png";

export default function NovedadDestacada() {
    return (
        <button
            type="button"
            className="group relative flex flex-col h-[90%] overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
            <article className="relative flex flex-col h-full">
                {/* Imagen con filtro directamente aplicado */}
                <img
                    className="w-full h-full object-cover bg-[#CDA053] brightness-50 group-hover:brightness-75 transition-all duration-300"
                    src={blogImage}
                    alt="Representación del estilo Fileteado"
                />

                {/* Texto siempre visible */}
                <div className="absolute bottom-10 left-9 text-left">
                    <span className="rye-regular text-[#CDA053] text-sm uppercase tracking-wide">
                        Investigación
                    </span>
                    <h2 className="rye-regular text-[#CDA053] text-xl lg:text-2xl mt-2 leading-tight">
                        Descomponiendo el Proceso de Diseño: El Estilo Fileteo
                    </h2>
                    <p className="inria-sans-regular text-[#FEFFEB] text-sm mt-2">
                        Lorem ipsum dolor sit amet consectetur. Amet malesuada quis nunc fermentum. Condimentum a commodo.
                    </p>
                </div>
            </article>
        </button>
    );
}
