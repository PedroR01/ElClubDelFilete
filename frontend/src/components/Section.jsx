import { Button } from "./Button";
import logo from '../img/Logo club filete.png'; 
import logo2 from '../img/Logo club v2.png'
import { Footer } from "./Footer";
export function Section({name, description}) {
    return (
        <div className="min-h-screen bg-[#8B2A1F] text-white relative">
        {/* Header */}
        <header className="bg-[#5D1A1F] h-16 flex items-center justify-between px-4 md:px-8">
          <img src={logo} alt="Logo" className="h-14 w-14 md:h-18 md:w-18" />
          <nav>
            <ul className="flex space-x-4 md:space-x-6 text-[#DDAA58] font-bold text-sm md:text-base">
              <Button text="Cursos"/>
              <Button text="Blog"/>
              <Button text="Galería"/>
            </ul>
          </nav>
        </header>
      
        {/* Contenido principal */}
        <div className="container mx-auto mt-8 px-4 flex">
          {/* Logo a la izquierda */}
          <div className="flex flex-col items-start w-1/3"> {/* Ocupa el 33.33% del contenedor */}
            <img 
              src={logo2} 
              alt="Logo club del filete" 
              className="h-80 w-80 md:h-96 md:w-96 lg:h-[30rem] lg:w-[30rem] object-cover mb-4" 
            />
            <div className="flex justify-center w-full"> {/* Para centrar el botón */}
              <Button text="Contacto" />
            </div>
          </div>
      
          {/* Sección para Video a la derecha */}
          <div className="flex-grow flex flex-col items-center w-2/3"> {/* Ocupa el resto del espacio */}
            {/* Video Embed */}
            <div className="mb-4">
              <iframe 
                className="w-full h-64 md:h-96"
                src="https://www.youtube.com/embed/PN4xt9RuV-Y" 
                title="Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
    
      </div>
      
    )
}