import { useState, useContext, useEffect  } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/Authcontext'
export default function Login () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!username || !password  ) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    sendData({username, password} );
  };
  const [imagenesUrls, setImagenesUrls] = useState([]);

  useEffect(() => {
    // Llamada al backend para obtener las URLs de las imágenes
    const buscarImagenes = async () =>{
    const response = await fetch('http://localhost:3001/api/storage', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if(!response.ok){
      throw new Error( 'Error al traer img');
    }
    const data = await response.json(); 
    setImagenesUrls(data.imagenesUrls)
  }
  buscarImagenes()
  }, []);

  const sendData = async ({ username, password }) => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });
      
  
      if (!response.ok) {
        const errorData = await response.json();  // Lee la respuesta JSON de error
        setIsAuthenticated(false);
        throw new Error(errorData.error || 'Error al enviar el formulario');  // Usa el mensaje de error que se pasó
      }
      setIsAuthenticated(true);
      const data = await response.json();  // Asumiendo que el servidor responde con JSON
      navigate('/novedades')
    } catch (error) {
      setIsAuthenticated(false);
      console.error('Error al enviar el mensaje:', error.message);
    }
  };

    return (
      <div className="bg-[#8F272A] min-h-screen font-sans pt-28">
        <div className="max-w-sm bg-gradient-to-t from-white to-[#f4f7fb] rounded-3xl p-8 pt-20 border-4 border-white shadow-[0_30px_30px_-20px_rgba(133,189,215,.87)] m-5  mx-auto">
          <div className="text-center font-extrabold text-3xl text-[#1089D3]">Sign In</div>
          
          <form onSubmit={handleSubmit} class="mt-5 mx-auto">
            <input required class="w-full bg-white border-none p-4 rounded-2xl mt-4 shadow-[0_10px_10px_-5px_#cff0ff] border-transparent focus:outline-none focus:border-[#12B1D1]" type="email" name="email" id="email" onChange={(e) => setUsername(e.target.value)} placeholder="E-mail"/>
            <input required class="w-full bg-white border-none p-4 rounded-2xl mt-4 shadow-[0_10px_10px_-5px_#cff0ff] border-transparent focus:outline-none focus:border-[#12B1D1]" type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            
            <span class="block mt-2 ml-2 text-xs text-[#0099FF]">
              <a href="#">Forgot Password ?</a>
            </span>
            
            <button class="w-full bg-gradient-to-r from-[#1089D3] to-[#12B1D1] text-white p-4 mt-5 rounded-2xl cursor-pointer shadow-[0_20px_10px_-15px_rgba(133,189,215,.87)] transition-all duration-200 ease-in-out hover:scale-105 active:scale-95" type="submit" >
              Sign in
            </button>
          </form>
          <span class="block text-center mt-4 text-xs">
            <a href="#" class="text-[#0099ff]">Learn user licence agreement</a>
          </span>
        </div>
        <div className="imagenes-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
       {imagenesUrls.map((imagen, index) => (
        <img
          key={index}
          src={imagen.publicUrl} // Utilizamos la URL pública obtenida
          alt={`Imagen ${index + 1}`} // Texto alternativo para accesibilidad
          className="w-full h-auto object-cover rounded-md" // Estilos de Tailwind CSS
        />
        ))}
        </div>
        </div>
      )
}