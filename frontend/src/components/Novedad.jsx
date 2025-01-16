import { Link } from 'react-router-dom';

export default function Novedad({ novedadUrl, mobile, content, contentKey }) {
    return (
        !mobile ?
            (<Link
                to={novedadUrl} // Redirige a la página de destino
                state={{ content }}
                className="flex items-center h-1/3 bg-[#3c3228] rounded-lg overflow-hidden shadow-blog-sec group hover:scale-105 transition-transform duration-500"
            >
                {/* Contenedor de la imagen */}
                <div className="h-full w-2/5 flex-shrink-0 relative">
                    <img
                        src={content.image}
                        alt={content.title}
                        className="w-full h-full object-cover brightness-75" // Se asegura de llenar el contenedor sin distorsionar
                    />
                </div>

                {/* Contenido textual */}
                <div className="flex flex-col justify-center px-8 my-4 text-left text-[#FEFFEB]">
                    <span className="hamston text-sm w-fit uppercase tracking-wide text-[#CDA053] p-1 border-2 rounded-lg border-[#CDA053] brightness-90 mb-4">
                        {content.tag}
                    </span>
                    <h3 className="hamston text-[#CDA053] text-lg lg:text-base mt-2 leading-tight">
                        {content.title}
                    </h3>
                    <p className="inria-sans-regular text-sm mt-2 line-clamp-3">
                        {content.description}
                    </p>
                </div>
            </Link>) : (<Link
                to={novedadUrl} // Redirige a la página de destino
                state={{ content }}
                className="flex-shrink-0 w-[80%] bg-[#933033] rounded-3xl overflow-hidden shadow-lg flex flex-col"
            >
                <div className="relative w-full h-48">
                    <img
                        src={content.image}
                        alt={content.title}
                        className="w-full h-full object-cover brightness-75"
                    />
                </div>

                <div className="p-4 flex flex-col gap-2">
                    <span className="hamston text-sm uppercase tracking-wide text-[#CDA053] p-1 border-2 rounded-lg border-[#CDA053] brightness-90">
                        {content.tag}
                    </span>
                    <h2 className="hamston text-[#CDA053] text-xl leading-tight">
                        {content.title}
                    </h2>
                    <p className="line-clamp-3 inria-sans-regular text-[#FEFFEB] text-sm leading-relaxed">
                        {content.description}
                    </p>
                </div>
            </Link>)
    );
}
