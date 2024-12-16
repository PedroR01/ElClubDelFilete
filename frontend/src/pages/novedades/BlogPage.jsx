import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

export default function BlogPage() {
    const [novedadTitle, setNovedadTitle] = useState("");
    const location = useLocation();
    const { content } = location.state || {};
    const videoUrl = content.video; // "https://www.youtube.com/watch?v=PN4xt9RuV-Y"

    // Extraer el video ID de la URL de YouTube
    const videoId = videoUrl.split('v=')[1].split('&')[0];

    // Crear la URL de embed
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    function getTitle() {
        const pathname = window.location.pathname;

        // Dividir la URL por '/' y obtener el último segmento
        const segments = pathname.split('/');

        // El último segmento será el último ID, limpiado y decodificado
        const lastSegment = segments[segments.length - 1];
        const decodedId = decodeURIComponent(lastSegment);

        // Reemplazar '%20' con un espacio
        const cleanId = decodedId.replace(/%20/g, ' ');
        return cleanId;
    }

    useEffect(() => {
        setNovedadTitle(getTitle);
    }, []);

    console.log(content);

    return (
        <div className="w-full bg-[#8F272A] pt-24">
            <img
                className="absolute w-full h-80 left-0 -top-2 object-cover rounded-lg shadow-md brightness-50 md:scale-110"
                src={content.image}
                alt="Caratula de noticia destacada"
            />
            <article className="w-full max-w-3xl mx-auto px-4 ">
                {/* Imagen principal de la noticia */}
                <div className="relative mb-8">
                    <h1 className="flex items-center justify-center rye-regular text-[#CDA053] text-2xl md:text-4xl bg-black bg-opacity-50 py-4 px-6 z-10">
                        {novedadTitle}
                    </h1>
                </div>

                {/* Contenido de la noticia */}
                <section className="pt-28 pb-14">
                    <header>
                        <h2 className="text-2xl font-bold text-[#CDA053] mb-4">Introducción</h2>
                    </header>
                    <p className="text-lg text-[#FEFFEB] mb-6">
                        {content.introduction}
                    </p>

                    {/* Contenido multimedia, por ejemplo, un video */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-[#CDA053] mb-4">Video de la noticia</h3>
                        <div className="aspect-w-16 aspect-h-9 mb-4">
                            <iframe
                                className="w-full h-full rounded-lg shadow-md"
                                src={embedUrl}
                                title="Video de la noticia"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>

                    {/* Texto complementario */}
                    <div className="text-lg text-[#FEFFEB] mb-6">
                        <p>
                            {content.additionalText}
                        </p>
                    </div>

                    {/* Citas o testimonios */}
                    <blockquote className="border-l-4 border-[#CDA053] pl-4 italic text-lg text-[#FEFFEB] mb-6">
                        {content.quote}
                    </blockquote>

                    {/* Enlaces relacionados */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-[#CDA053] mb-4">Enlaces relacionados</h3>
                        <ul className="list-disc pl-6">
                            <li><a href="#link1" className="text-[#CDA053] hover:text-[#CC8F41] transition-colors">Enlace relacionado 1</a></li>
                            <li><a href="#link2" className="text-[#CDA053] hover:text-[#CC8F41] transition-colors">Enlace relacionado 2</a></li>
                            <li><a href="#link3" className="text-[#CDA053] hover:text-[#CC8F41] transition-colors">Enlace relacionado 3</a></li>
                        </ul>
                    </div>
                </section>
            </article>
        </div>

    );
}
