import { Link } from 'react-router-dom';

export default function Novedad({ novedadUrl, mobile, content }) {
    return (
        !mobile ?
            (<Link
                to={novedadUrl} // Redirige a la página de destino
                state={{ content }}
                className="flex items-center h-1/3 bg-[#3c3228] rounded-lg overflow-hidden shadow-blog-sec group hover:scale-105 transition-transform duration-500"
            >
                <div className="h-full w-fit">
                    <img
                        src={content.image}
                        alt={content.title}
                        className="aspect-3_4 object-cover brightness-75 scale-110"
                    />
                </div>
                <div className="flex flex-col justify-center px-8 my-4 text-left text-[#FEFFEB]">
                    <span className="rye-regular text-[#af8946] text-sm uppercase tracking-wide mb-4">
                        Investigación
                    </span>
                    <h3 className="rye-regular text-[#CDA053] text-lg lg:text-base mt-2 leading-tight">
                        {content.title}
                    </h3>
                    <p className="inria-sans-regular text-sm mt-2 line-clamp-3">
                        Lorem ipsum dolor sit amet consectetur. Amet malesuada quis nunc fermentum. Condimentum a commodo.
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
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-4 flex flex-col gap-2">
                    <span className="rye-regular text-[#af8946] text-sm uppercase tracking-wide">
                        Investigación
                    </span>
                    <h2 className="rye-regular text-[#CDA053] text-xl leading-tight">
                        {content.title}
                    </h2>
                    <p className="line-clamp-3 inria-sans-regular text-[#FEFFEB] text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Amet malesuada quis nunc fermentum. Condimentum a commodo.
                    </p>
                </div>
            </Link>)
    );
}
