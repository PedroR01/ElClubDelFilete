import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from '../context/Authcontext'; // Importamos el contexto de autenticación
export default function BlogPortrait({ content, orientation = "vertical" }) {
    const { isAuthenticated } = useContext(AuthContext); // Obtenemos el estado de autenticación
    let containerStyle = "absolute bottom-10 left-3 right-3 md:left-9";
    if (orientation === "vertical")
        containerStyle = "flex flex-col justify-center px-8 my-4";
    else if (orientation === "horizontal")
        containerStyle = "flex flex-col justify-center px-8 my-2";

    function handleEdit(title) {
        // Handle the edit action (like opening a modal or redirecting to the edit page)
        console.log("Editing noveltie with id:", title);
        // You can use a redirect, for example:
        // window.location.href = `/edit/${id}`;
      }
      
    return (
        <Link
            to={`./${content.title}`} // Redirige a la página de destino
            state={{ content }}
            className={`${orientation === "vertical" ? "" : "flex"} col-span-7 lg:col-span-4 row-span-3 md:my-4 bg-[#3c3228] md:rounded-lg overflow-hidden relative group shadow-blog-main`}
        >
            {isAuthenticated && (
                <Link to={`/añadirBlog/${content.title}`} 
                state={{ novedad: content }}  // Pasa el objeto 'content' completo
                className={`
                absolute z-10 ${orientation === "main" ? "top-4 right-4" : "top-3 right-3"} 
                px-3 py-1 bg-blue-600 text-white rounded-lg border-2 border-red-500 
                text-sm shadow-md hover:bg-blue-700 transition
                `}>
                Editar
              </Link>
            )}
            {orientation === "main" ? (<img
                src={content.bucket_folder_url + "/portrait"}
                alt={content.title}
                className="w-full h-full object-cover brightness-50 scale-110 group-hover:scale-100 transition-transform duration-500"
            />) : (orientation === "horizontal" ? (<div className="h-full w-2/5 flex-shrink-0 relative">
                <img
                    src={content.bucket_folder_url + "/portrait"}
                    alt={content.title}
                    className="w-full h-full object-cover brightness-75" // Se asegura de llenar el contenedor sin distorsionar
                />
            </div>) : (<div className="w-full h-2/5 flex-shrink-0 relative">
                <img
                    src={content.bucket_folder_url + "/portrait"}
                    alt={content.title}
                    className="w-full h-full object-cover brightness-75" // Se asegura de llenar el contenedor sin distorsionar
                />
            </div>))}

            <div className={`${containerStyle} text-left`}>
                <span className="hamston text-sm uppercase tracking-wide text-[#CDA053] p-1 border-2 rounded-lg border-[#CDA053] brightness-90">
                    {content.tag}
                </span>

                {orientation === "main" ? (<h2 className="mt-3 leading-tight">
                    {content.title}
                </h2>) : (<h5 className="mt-3 leading-tight">
                    {content.title}
                </h5>)}

                <p className="line-clamp-3 inria-sans-regular text-sm text-[#FEFFEB] mt-2 lg:block">
                    {content.description}
                </p>
            </div>
        </Link>
    );
}
