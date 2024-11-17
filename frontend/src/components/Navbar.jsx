import React from "react";
import logo from "../img/logoNavbar.png";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full max-h-24 z-10 bg-[#3c3228]/50">
      <ul className="flex items-center justify-center">
        <li className="py-2 mx-auto">
          <a href="/"><img className="h-16" src={logo} alt="" /></a>
        </li>
        <li className="flex gap-5 mx-auto rye-regular text-xl text-[#CDA053]">
          <button>Cursos</button>
          <button>Galería</button>
          <button><a href="/blog">Blog</a></button>
        </li>
      </ul>
    </nav>
  );
}
