import React from "react";
import blogImage from "../img/portadas/blog_image.png";

export default function NovedadSecundaria() {
    return (
        <button
            type="button"
            className="group flex flex-row items-center overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
            <article className="relative flex w-full h-full">
                {/* Imagen con filtro directamente aplicado */}
                <img
                    className="w-2/5 h-auto aspect-7_4 object-cover bg-[#af8946] brightness-50 group-hover:brightness-75 transition-all duration-300"
                    src={blogImage}
                    alt="Representación del estilo Fileteado"
                />
                {/* Contenedor del texto */}
                <div className="ml-3 flex flex-col justify-center text-left py-3">
                    <span className="rye-regular text-[#af8946] text-sm uppercase tracking-wide">
                        Investigación
                    </span>
                    <h2 className="rye-regular text-[#af8946] text-xl lg:text-base mt-2 leading-tight">
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
