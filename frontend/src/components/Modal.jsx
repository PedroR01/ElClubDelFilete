import React, { useState, useEffect } from "react";
import Button from "./Button";
import logoIntro from "../img/logos/logoIntro.png";
import separador from "../img/misc/separador.png";

export default function Modal({ state }) {
  const estadoInicial = {
    nombre: "",
    email: "",
    mensaje: "",
  };

  const [contactInfo, setContactInfo] = useState(estadoInicial);
  const [canSend, setCanSend] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    setContactInfo({ ...contactInfo, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSend) {
      setCanSend(false); // Desactivar el envío temporalmente
      const valuesForm = contactInfo;
      const ok = checkData(valuesForm);
      if (ok) {
        sendData(valuesForm);
        state(false); // Cerrar el modal solo si los datos son válidos
      } else {
        console.log("Form not sent");
        setCanSend(true);
      }
    } else {
      console.log("You can't send now");
    }
  };

  const sendData = ({nombre, email, mensaje}) => {
    console.log("Form sent");
  }
 
  const checkData = ({nombre, email, mensaje}) => {
    console.log(nombre, email, mensaje);
    const onlyLetters = (str) => /^[A-Za-z]+$/.test(str);
    const checkEmail = (str) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(str);
    const checkDesc = (str) => str.length <= 200;

    return onlyLetters(nombre) && checkEmail(email) && checkDesc(mensaje);
  }

  useEffect(() => {
    // Iniciar el temporizador al montar el componente
    const interval = setInterval(() => {
      setCanSend(true);  // Habilitar el envío de correo después de 30 segundos
    }, 30000);  // 30,000 ms = 30 segundos
  
    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);
  return (
    (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-[#181818] bg-opacity-55 text-white w-[90%] max-w-lg rounded-lg shadow-lg relative">
          {/* Icono de cierre */}
          <button
            className="absolute top-4 right-4 text-white hover:text-[#CDA053] focus:outline-none"
            onClick={() => state(false)}
          >
            ✖
          </button>

          {/* Contenido del modal */}
          <div className="p-6">
            {/* Logo y adornos */}
            <div className="flex justify-center items-center relative mb-4">
              <img className="absolute translate-y-10" src={separador} alt="Adorno logo" />
              <img
                src={logoIntro}
                alt="El Club del Filete"
                className="h-16 md:h-40 md:pb-16 object-contain"
              />
              <div className="absolute right-0 h-6 w-16 bg-contain bg-no-repeat"></div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-[#FEFFFB]"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    className="w-full mt-1 p-2 bg-[#FEFFFB] text-black rounded border border-[#CDA053] focus:ring-[#CDA053] focus:outline-none"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#FEFFFB]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full mt-1 p-2 bg-[#FEFFFB] text-black rounded border border-[#CDA053] focus:ring-[#CDA053] focus:outline-none"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="descripcion"
                  className="block text-sm font-medium text-[#FEFFFB]"
                >
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  rows="4"
                  className="w-full mt-1 p-2 bg-[#FEFFFB] text-black rounded border border-[#CDA053] focus:ring-[#CDA053] focus:outline-none"
                  onChange={handleChange}
                ></textarea>
              </div>

              <Button text={"Enviar"} btnType={"submit"} />
            </form>
          </div>
        </div>
      </div>
    ));
}
