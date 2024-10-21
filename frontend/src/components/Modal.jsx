import React, { useState } from "react";

export default function Modal() {
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

  const handleSubmit = () => {
    console.log("Form sent");
  };

  return (
    <div className="bg-[#8B2A1F] max-h-[50%]">
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <label>
              Nombre
              <input
                name="nombre"
                title="Nombre"
                type="text"
                defaultValue={""}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Email
              <input
                name="email"
                title="Email"
                type="text"
                defaultValue={""}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Mensaje
              <input
                name="mensaje"
                title="Mensaje"
                type="text"
                defaultValue={""}
                onChange={handleChange}
              />
            </label>
          </li>
        </ul>
        <button type="submit"></button>
      </form>
    </div>
  );
}
