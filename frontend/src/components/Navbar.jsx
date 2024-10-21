import React from "react";
import logo from "../img/logoNavbar.png";

export default function Navbar() {
  return (
    <nav className="sticky w-full max-h-24 bg-[#3c3228]/50">
      <ul className="flex items-center justify-center">
        <li className="py-2 mx-auto">
          <img className="h-16" src={logo} alt="" />
        </li>
        <div className="flex gap-5 mx-auto rye-regular text-xl text-[#CDA053]">
          <li>
            <button>Cursos</button>
          </li>
          <li>
            <button>Galería</button>
          </li>
          <li>
            <button>Blog</button>
          </li>
        </div>
      </ul>
    </nav>
  );
}
