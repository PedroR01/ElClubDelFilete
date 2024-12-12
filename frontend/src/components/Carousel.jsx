import React, { useState, useEffect } from 'react';

export default function Carousel({ images, clickHandler }) {
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
    <>
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
    </>
  );
}