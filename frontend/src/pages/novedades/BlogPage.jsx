import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Button from "../../components/Button";

export default function BlogPage() {
    const [novedadTitle, setNovedadTitle] = useState("");
    const location = useLocation();
    const { content } = location.state || {};

    useEffect(() => {
        setNovedadTitle(getTitle());
    }, []);

    const getVideoUrl = () => {
        if (!content?.video) return null; // Si no hay video, retorna null.
        const videoId = content.video.split('v=')[1]?.split('&')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    };

    const getTitle = () => {
        const pathname = window.location.pathname;
        const segments = pathname.split('/');
        const lastSegment = segments[segments.length - 1];
        const decodedId = decodeURIComponent(lastSegment);
        return decodedId.replace(/%20/g, ' ');
    };

    const downloadPDF = () => {
        if (!content?.pdf) return; // Si no hay PDF, no hacer nada.
        const extractDriveFileId = (driveLink) => {
            const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
            const match = driveLink.match(regex);
            return match ? match[1] : null;
        };
        const pdfId = extractDriveFileId(content.pdf);
        if (pdfId) {
            const downloadUrl = `https://drive.google.com/uc?export=download&id=${pdfId}`;
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.setAttribute("download", content.title || "document");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="w-full bg-[#8F272A] pt-24 min-h-screen">
            <article className="w-full max-w-3xl mx-auto px-4">
                {/* Imagen principal */}
                <img
                    className="absolute w-full h-72 left-0 -top-2 object-cover rounded-lg shadow-md brightness-50 md:scale-110"
                    src={content.image}
                    alt="Caratula de noticia destacada"
                />
                <div className="relative mb-8">
                    <h1 className="flex items-center justify-center rye-regular text-[#CDA053] text-2xl md:text-4xl bg-black bg-opacity-50 py-4 px-6 z-10">
                        {novedadTitle}
                    </h1>
                </div>

                {/* Contenido de la noticia */}
                <section className="pt-28 pb-14 px-6 md:px-0">
                    <p className="montserrat-normal text-base text-justify md:text-lg text-[#FEFFFB] mb-6">
                        {content.introduction}
                    </p>

                    {content.sections?.map((section, index) => (
                        <div key={index} className="mb-6">
                            <h3 className="rye-regular text-2xl font-bold tracking-wider text-center text-[#CDA053] mb-4 md:text-left">
                                {section.title}
                            </h3>
                            <p className="montserrat-normal text-base text-justify md:text-lg text-[#FEFFFB]">
                                {section.content}
                            </p>
                        </div>
                    ))}

                    {/* Renderizar video si está presente */}
                    {content.video && (
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#CDA053] mb-4">Video de la noticia</h3>
                            <div className="aspect-w-16 aspect-h-9 mb-4">
                                <iframe
                                    className="w-full h-full rounded-lg shadow-md"
                                    src={getVideoUrl()}
                                    title="Video de la noticia"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}

                    {/* Texto adicional si está presente */}
                    {content.additionalText && (
                        <div className="text-lg text-[#FEFFEB] mb-6">
                            <p>{content.additionalText}</p>
                        </div>
                    )}

                    {/* Citas o testimonios si están presentes */}
                    {content.quote && (
                        <blockquote className="border-l-4 border-[#CDA053] pl-4 italic text-lg text-[#FEFFEB] mb-6">
                            {content.quote}
                        </blockquote>
                    )}

                    {/* Enlaces relacionados si están presentes */}
                    {content.relatedLinks && (
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#CDA053] mb-4">Enlaces relacionados</h3>
                            <ul className="list-disc pl-6">
                                {content.relatedLinks.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.url} className="text-[#CDA053] hover:text-[#CC8F41] transition-colors">
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Botón para descargar PDF si está presente */}
                    {content.pdf && (
                        <Button text={"PDF"} btnType={"button"} event={downloadPDF} disabled={false} />
                    )}
                </section>
            </article>
        </div>
    );
}
