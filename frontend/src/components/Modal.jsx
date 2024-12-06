import React, { useState } from "react";

export default function Modal({ state }) {
  const estadoInicial = {
    nombre: "",
    email: "",
    mensaje: "",
  };

  const [contactInfo, setContactInfo] = useState(estadoInicial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    setContactInfo({ ...contactInfo, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form sent");
    state(false); // Cerrar el modal al enviar el formulario
  };

  return (
    (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
        {/* Modal con fondo transparente y sombra gris */}
        <div className="bg-[#692a23] bg-opacity-60 rounded-2xl shadow-lg p-8 max-w-lg w-full mx-4 relative">
          {/* Botón de cierre */}
          <header className="absolute top-2 right-2">
            <button
              className="text-slate-200 hover:text-slate-300 text-2xl font-bold"
              onClick={() => state(false)}
            >
              ✕
            </button>
          </header>
  
          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contenedor para los campos de nombre y email */}
            <div className="flex gap-4">
              {/* Campo nombre */}
              <div className="flex-1">
                <label className="block text-slate-200 font-semibold text-lg">
                  Nombre
                  <input
                    name="nombre"
                    type="text"
                    className="mt-1 block w-full p-3 border-2 border-gray-300 rounded-md bg-white text-slate-700 focus:ring-2 focus:ring-[#DDAA58] focus:outline-none"
                    onChange={handleChange}
                  />
                </label>
              </div>
  
              {/* Campo email */}
              <div className="flex-1">
                <label className="block text-slate-200 font-semibold text-lg">
                  Email
                  <input
                    name="email"
                    type="email"
                    className="mt-1 block w-full p-3 border-2 border-gray-300 rounded-md bg-white text-slate-700 focus:ring-2 focus:ring-[#DDAA58] focus:outline-none"
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
  
            {/* Campo descripción (mensaje) */}
            <div>
              <label className="block text-slate-200 font-semibold text-lg">
                Descripción
                <textarea
                  name="mensaje"
                  className="mt-1 block w-full p-4 border-2 border-gray-300 rounded-md bg-white text-slate-700 focus:ring-2 focus:ring-[#DDAA58] focus:outline-none h-32"
                  onChange={handleChange}
                />
              </label>
            </div>
  
            {/* Botón de enviar */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#DDAA58] text-white px-6 py-3 rounded-md hover:bg-[#af833b] transition-all"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
  ));
}
