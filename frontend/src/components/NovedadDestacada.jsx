import React from "react";
import blogImage from "../img/portadas/blog_image.png";

export default function NovedadDestacada({ novedadUrl }) {
    return (
        <a
            href={novedadUrl}
            className="col-span-7 lg:col-span-4 row-span-3 md:my-4 bg-[#3c3228] md:rounded-lg overflow-hidden relative group shadow-blog-main"
        >
            <img
                src={blogImage}
                alt="Noticia principal"
                className="w-full h-full object-cover brightness-50 scale-110 group-hover:scale-100 transition-transform duration-500"
            />
            <div className="absolute bottom-10 left-3 right-3 md:left-9 text-left">
                <span className="rye-regular text-sm uppercase tracking-wide text-[#af8946]">
                    Investigación
                </span>
                <h2 className="rye-regular text-[#CDA053] text-2xl lg:text-3xl mt-2">
                    Descomponiendo el Proceso de Diseño: El Estilo Fileteo
                </h2>
                <p className="line-clamp-3 inria-sans-regular text-sm text-[#FEFFEB] mt-2 lg:block">
                    Lorem ipsum dolor sit amet consectetur. Amet malesuada quis nunc fermentum. Condimentum a commodo.
                </p>
            </div>
        </a>
    );
}
