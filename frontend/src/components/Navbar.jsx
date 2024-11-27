import React, { useState, useEffect } from "react";
import logo from "../img/logoNavbar.png";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true); // Controla la visibilidad de la navbar
  const [lastScrollY, setLastScrollY] = useState(0); // Guarda la última posición del scroll

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50)
        setShowNavbar(false); // Ocultar la navbar al hacer scroll hacia abajo
      else
        setShowNavbar(true); // Mostrar la navbar al hacer scroll hacia arriba

      setLastScrollY(currentScrollY);
    };

    // Añade el evento de scroll
    window.addEventListener("scroll", handleScroll);

    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 w-full max-h-24 z-10 bg-[#3c3228]/50 transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <ul className="flex items-center justify-center">
        <li className="py-2 mx-auto">
          <a href="/">
            <img className="h-16" src={logo} alt="Logo Navbar" />
          </a>
        </li>
        <li className="flex gap-5 mx-auto rye-regular text-xl text-[#CDA053]">
          <button>
            <a href="/historia">Historía</a>
          </button>
          <button>
            <a href="/">Academia</a>
          </button>
          <button>
            <a href="/">Tienda</a>
          </button>
          <button>
            <a href="/novedades">Novedades</a>
          </button>
          <button>
            <a href="/">Galería</a>
          </button>
        </li>
      </ul>
    </nav>
  );
}
