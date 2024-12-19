import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logoIntro from "../../img/logos/logoIntro.png";

export default function Navbar() {
  const [activeRoute, setActiveRoute] = useState("");
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation(); // Obtener la ruta actual

  useEffect(() => {
    setActiveRoute(location.pathname); // Actualiza la ruta activa al cambiar la URL
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50)
        setShowNavbar(false);
      else setShowNavbar(true);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSmoothScroll = (event, sectionId) => {
    event.preventDefault();
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Condicionar si las rutas deben estar habilitadas o no
  const isHomePage = location.pathname === "/";

  return (
    <>
      <nav
        className={`fixed top-0 w-full min-h-[10%] z-20 bg-[#3c3228]/50 backdrop-blur-sm transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="flex items-center justify-between px-4 lg:px-24 py-2 lg:py-4">
          <a href="/">
            <img
              className="h-16 transition-transform duration-300 hover:scale-110"
              src={logoIntro}
              alt="Logo Navbar"
            />
          </a>

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

          <ul className="hidden md:flex items-center gap-5 rye-regular text-base text-[#CDA053]">
            <li>
              <a
                href="#academia"
                className={`nav-link ${isHomePage ? "" : "pointer-events-none brightness-75"
                  }`}
                onClick={(e) => isHomePage && handleSmoothScroll(e, "#academia")}
              >
                Academia
                <span className="underline-img"></span>
              </a>
            </li>
            <li>
              <a
                href="#galería"
                className={`nav-link ${isHomePage ? "" : "pointer-events-none brightness-75"
                  }`}
                onClick={(e) => isHomePage && handleSmoothScroll(e, "#galería")}
              >
                Galería
                <span className="underline-img"></span>
              </a>
            </li>
            <li>
              <a href="/historia" className={`nav-link ${activeRoute === "/historia" ? "brightness-125 scale-125" : ""}`}>
                Historía
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
              <a href="/novedades" className={`nav-link ${activeRoute === "/novedades" ? "brightness-125 scale-125" : ""}`}>
                Novedades
                <span className="underline-img"></span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className={`fixed top-0 right-0 h-full w-2/3 max-w-sm bg-[#222121] text-[#FEFFEB] z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
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

        <ul className="flex flex-col items-start gap-6 mt-16 px-6 text-base rye-regular">
          <li>
            <a
              href="#academia"
              className={`${isHomePage ? "" : "pointer-events-none brightness-75"}`}
              onClick={(e) => isHomePage && handleSmoothScroll(e, "#academia")}
            >
              Academia
            </a>
          </li>
          <li>
            <a
              href="#galería"
              className={`${isHomePage ? "" : "pointer-events-none brightness-75"}`}
              onClick={(e) => isHomePage && handleSmoothScroll(e, "#galería")}
            >
              Galería
            </a>
          </li>
          <li>
            <a href="/historia" onClick={toggleSidebar}>
              Historía
            </a>
          </li>
          <li>
            <a href="/" onClick={toggleSidebar}>
              Tienda
            </a>
          </li>
          <li>
            <a href="/novedades" onClick={toggleSidebar}>
              Novedades
            </a>
          </li>
        </ul>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
