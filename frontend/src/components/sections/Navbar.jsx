import React, { useState, useEffect } from "react";
import logo from "../../img/logos/logoNavbar.png";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true); // Controla la visibilidad de la navbar
  const [lastScrollY, setLastScrollY] = useState(0); // Guarda la última posición del scroll
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Controla el estado del sidebar

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50)
        setShowNavbar(false); // Ocultar la navbar al hacer scroll hacia abajo
      else setShowNavbar(true); // Mostrar la navbar al hacer scroll hacia arriba

      setLastScrollY(currentScrollY);
    };

    // Añade el evento de scroll
    window.addEventListener("scroll", handleScroll);

    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Función para alternar el estado del sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Función para manejar el desplazamiento a secciones de forma suave
  const handleSmoothScroll = (event, sectionId) => {
    event.preventDefault(); // Evita el comportamiento predeterminado de redireccionamiento
    const section = document.querySelector(sectionId); // Selecciona la sección con el ID
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* <div className="relative h-24 -z-10 bg-[#8F272A]"></div> */}
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full h-24 z-20 bg-[#3c3228]/50 backdrop-blur-sm transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="flex items-center justify-between px-4 py-2">
          {/* Logo */}
          <a href="/">
            <img className="h-16 transition-transform duration-300 hover:scale-110" src={logo} alt="Logo Navbar" />
          </a>

          {/* Botón Hamburguesa (visible solo en mobile) */}
          <button
            className="block md:hidden text-[#CDA053] focus:outline-none"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Opciones de Navegación (visible en desktop) */}
          <ul className="hidden md:flex items-center gap-5 rye-regular text-xl text-[#CDA053]">
            <li>
              <a href="/historia" className="nav-link">
                Historía
                <span className="underline-img"></span>
              </a>
            </li>
            <li>
              <a
                href="#academia"
                className="nav-link"
                onClick={(e) => handleSmoothScroll(e, "#academia")}
              >
                Academia
                <span className="underline-img"></span>
              </a>
            </li>
            <li>
              <a href="/" className="nav-link">
                Tienda
                <span className="underline-img"></span>
              </a>
            </li>
            <li>
              <a href="/novedades" className="nav-link">
                Novedades
                <span className="underline-img"></span>
              </a>
            </li>
            <li>
              <a
                href="#galería"
                className="nav-link"
                onClick={(e) => handleSmoothScroll(e, "#galería")}
              >
                Galería
                <span className="underline-img"></span>
              </a>
            </li>
          </ul>

        </div>
      </nav>

      {/* Sidebar (visible en mobile cuando se abre el menú hamburguesa) */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 max-w-sm bg-[#3c3228] text-[#FEFFEB] z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Botón para cerrar el Sidebar */}
        <button
          className="absolute top-4 right-4 text-[#CDA053] focus:outline-none"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Opciones del Sidebar */}
        <ul className="flex flex-col items-start gap-6 mt-16 px-6 text-lg rye-regular">
          <li><a href="/historia" onClick={toggleSidebar}>Historía</a></li>
          <li><a href="#academia" onClick={(e) => {
            toggleSidebar();
            handleSmoothScroll(e, "#academia");
          }}>Academia</a></li>
          <li><a href="/" onClick={toggleSidebar}>Tienda</a></li>
          <li><a href="/novedades" onClick={toggleSidebar}>Novedades</a></li>
          <li><a href="#galería" onClick={(e) => {
            toggleSidebar();
            handleSmoothScroll(e, "#galería");
          }}>Galería</a></li>
        </ul>
      </div>

      {/* Overlay (cierra el sidebar al hacer clic fuera de él) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
