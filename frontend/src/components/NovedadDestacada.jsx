import { Link } from 'react-router-dom';

export default function NovedadDestacada({ novedadUrl, content }) {
    return (
        <Link
            to={novedadUrl} // Redirige a la página de destino
            state={{ content }}
            className="col-span-7 lg:col-span-4 row-span-3 md:my-4 bg-[#3c3228] md:rounded-lg overflow-hidden relative group shadow-blog-main"
        >
            <img
                src={content.image}
                alt="Noticia principal"
                className="w-full h-full object-cover brightness-50 scale-110 group-hover:scale-100 transition-transform duration-500"
            />
            <div className="absolute bottom-10 left-3 right-3 md:left-9 text-left">
                <span className="hamston text-sm uppercase tracking-wide text-[#CDA053] p-1 border-2 rounded-lg border-[#CDA053] brightness-90">
                    {content.tag}
                </span>
                <h2 className="hamston text-[#CDA053] text-2xl lg:text-3xl mt-3">
                    {content.title}
                </h2>
                <p className="line-clamp-3 inria-sans-regular text-sm text-[#FEFFEB] mt-2 lg:block">
                    {content.description}
                </p>
            </div>
        </Link>
    );
}
