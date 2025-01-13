import { useState } from 'react';

export default function Registro() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!username || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    sendData({username, password} );
  };

  const sendData = async ({ username, password }) => {
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      if (!response.ok) {
        const errorData = await response.json();  // Lee la respuesta JSON de error
        throw new Error(errorData.error || 'Error al enviar el formulario');  // Usa el mensaje de error que se pasó
      }
  
      const data = await response.json();  // Asumiendo que el servidor responde con JSON
      console.log('Usuario creado con ID:', data.id);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error.message);
    }
  };

  return (
    <div className="flex-grow max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-20 mb-14">
      <h1 className="text-2xl font-bold text-center mb-4">Registro</h1>

      {/* Error message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Field */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Nombre de usuario
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escribe tu nombre de usuario"
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escribe tu contraseña"
          />
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirmar contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirma tu contraseña"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-6 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition"
        >
          Registrar
        </button>
      </form>
    </div>

  );
}