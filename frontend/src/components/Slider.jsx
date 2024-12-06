import React, { useState, useEffect } from 'react';
import slide from "../img/iconos/slide.png";

export default function Slider({ images, clickHandler }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(null); // Utilizado para poder deslizar el slider
  const [smallScreen, setSmallScreen] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false); // Estado para rastrear si se está deslizando

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
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
      className="relative w-full max-w-4xl mx-auto overflow-hidden select-none"
      {...eventHandlers}
    >
      <div
        className="flex transition-transform ease-out duration-300 gap-8"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <button
            key={index}
            className="w-1/4 h-1/2 flex-shrink-0 md:h-[50%] aspect-[3/4]"
            onClick={() => handleImageClick(image)}
          >
            <img
              className="w-full h-full object-cover"
              src={image}
              draggable="false"
              alt={`Slide ${index}`}
            />
          </button>
        ))}
      </div>

      {/* Botones de navegación */}
      {!smallScreen && (
        <>
          <button
            aria-label="Next"
            className="flex absolute top-1/2 right-0 w-9 h-9 z-10 ml-5 items-center justify-center rounded-full bg-[#FFFBF2]
             border-2 border-black button-shadow 
             transition duration-300 ease-in-out hover:-translate-x-2 
             hover:bg-[#D1C1B4] hover:button-shadow active:bg-[#FFDD6A] 
             hover:shadow-lg active:shadow-none"
            onClick={nextSlide}
          >
            <img className="w-[25%]" src={slide} alt="right slide" />
          </button>
          <button
            aria-label="Previous"
            className="flex absolute top-1/2 left-0 w-9 h-9 z-10 ml-5 items-center justify-center rounded-full bg-[#FFFBF2]
             border-2 border-black
             transition duration-300 ease-in-out hover:-translate-x-2 
             hover:bg-[#D1C1B4] hover:button-shadow active:bg-[#FFDD6A] 
             hover:shadow-lg active:shadow-none"
            onClick={prevSlide}
          >
            <img className="w-[25%] rotate-180" src={slide} alt="left slide" />
          </button>
        </>
      )}

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={() => setCurrentIndex(index)}
          />
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