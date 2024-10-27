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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-[#692a23] rounded-lg shadow-lg p-8 max-w-lg w-full mx-4">
        <header className="flex justify-end">
          <button
            className="text-slate-200 hover:text-slate-300"
            onClick={() => state(false)}
          >
            ✕
          </button>
        </header>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-slate-200">
              Nombre
              <input
                name="nombre"
                title="Nombre"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label className="block text-slate-200">
              Email
              <input
                name="email"
                title="Email"
                type="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label className="block text-slate-200">
              Mensaje
              <textarea
                name="mensaje"
                title="Mensaje"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#DDAA58] text-white px-4 py-2 rounded-md hover:bg-[#af833b]"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
