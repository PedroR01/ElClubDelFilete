import React, { useState, useEffect } from 'react';
import slide from "../img/iconos/slide.png";

export default function Slider({ images, clickHandler}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(null); // Utilizado para poder deslizar el slider
  const [smallScreen, setSmallScreen] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false); // Estado para rastrear si se está deslizando

  const prevSlide = () => {
    // Evitar índices menores a 0
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  const nextSlide = () => {
    // Evitar avanzar más allá del límite
    if (currentIndex < images.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Manejo del inicio del deslizamiento 
  const handlePointerDown = (e) => {
    setStartX(e.clientX || e.touches[0].clientX); // Guarda la posición inicial del dedo o mouse
    setIsSwiping(false); // Resetear el estado de swipe
  };

  // Manejo del movimiento del deslizamiento
  const handlePointerMove = (e) => {
    if (startX === null) return; // Si no se movió, retorna

    const currentX = e.clientX || e.touches[0].clientX;
    const diffX = startX - currentX;

    // Si el usuario deslizó más de 50px, consideramos que es un swipe
    if (Math.abs(diffX) > 10) {
      setIsSwiping(true);
    }

    if (diffX > 50) { // Deslizar hacia la izquierda (siguiente)
      nextSlide();
      setStartX(null); // Restablece el punto de inicio
    } else if (diffX < -50) { // Deslizar hacia la derecha (anterior)
      prevSlide();
      setStartX(null); // Restablece el punto de inicio
    }
  };

  // Resetea el estado al finalizar el deslizamiento
  const handlePointerUp = () => {
    setStartX(null);
  };

  useEffect(() => {
    // Función para verificar la resolución
    const checkResolution = () => {
      setSmallScreen(window.innerHeight <= 844 && window.innerWidth <= 390);
    };

    // Ejecutar la verificación al cargar y al redimensionar la ventana
    checkResolution();
    window.addEventListener("resize", checkResolution);

    // Limpiar el listener cuando el componente se desmonte
    return () => window.removeEventListener("resize", checkResolution);
  }, []);

  // Creo eventHandlers si estoy en móvil para activarlos si la pantalla es de móvil
  const eventHandlers = smallScreen
    ? {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onTouchStart: handlePointerDown,
      onTouchMove: handlePointerMove,
      onTouchEnd: handlePointerUp,
    }
    : {};

  // Función para manejar el clic en la imagen, se ejecuta solo si no hay swipe
  const handleImageClick = (image) => {
    if (!isSwiping && clickHandler) {
      clickHandler(image);
    }
  };

  return (
    <div
      className="relative w-full max-w-7xl mx-auto overflow-hidden select-none"
    >
      <div
        className="flex transition-transform ease-out duration-300 gap-4"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <button
            key={index}
            className="w-[20%] flex-shrink-0  aspect-[3.5/5] rounded-3xl overflow-hidden transition duration-300 hover:scale-110 hover:z-10"
            style={{
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)' // Personalización de sombra
            }}
            onClick={() => handleImageClick(image)}
          >
            <img
              className="w-full h-full object-cover rounded-3xl"
              src={image}
              draggable="false"
              alt={`Slide ${index}`}
            />
          </button>
        ))}
      </div>
      
    </div>
  );
}

/*
Los eventos de Pointer en React son una forma moderna y versátil de manejar interacciones con múltiples tipos de dispositivos de entrada (mouse, pantalla táctil, lápiz óptico).

onPointerDown: Se activa cuando el usuario empieza a interactuar con el elemento, como cuando toca la pantalla táctil, hace clic o presiona con un lápiz óptico. Aquí, onPointerDown={handlePointerDown} llama a handlePointerDown al comenzar la interacción, para registrar la posición inicial del deslizamiento.

onPointerMove: Se activa cuando el usuario mueve su dedo, lápiz o mouse mientras está presionando sobre el elemento. Aquí, onPointerMove={handlePointerMove} ejecuta handlePointerMove durante el deslizamiento para medir la distancia y dirección del movimiento.

onPointerUp: Se activa cuando el usuario termina de interactuar, es decir, cuando suelta el dedo o el botón del mouse. onPointerUp={handlePointerUp} ejecuta handlePointerUp para limpiar el estado y evitar movimientos accidentales.

Eventos Touch
Los eventos Touch son específicos para dispositivos táctiles, como teléfonos y tablets. Estos eventos son similares a los de Pointer, pero se limitan a interacciones de pantalla táctil.

onTouchStart: Es equivalente a onPointerDown, pero solo se activa en dispositivos táctiles. onTouchStart={handlePointerDown} llama a handlePointerDown al tocar la pantalla, registrando la posición inicial del deslizamiento.

onTouchMove: Similar a onPointerMove, pero solo se activa en dispositivos táctiles. onTouchMove={handlePointerMove} ejecuta handlePointerMove mientras el dedo se desliza en la pantalla, midiendo la distancia y dirección.

onTouchEnd: Se activa cuando el usuario termina el deslizamiento en dispositivos táctiles, similar a onPointerUp. onTouchEnd={handlePointerUp} llama a handlePointerUp para restablecer el estado cuando el dedo deja de presionar la pantalla.
*/