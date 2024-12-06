import React from 'react';

export default function InfoMancha() {
  return (
    <div className="relative w-96 h-[30rem] justify-items-center overflow-hidden">
      {/* Mancha de fondo */}
      <svg className="absolute z-10" width="390" height="459" viewBox="0 0 390 456" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_722_30)">
          <path d="M211.396 32.0132C152.177 24.6055 179.692 59.7922 64.8421 73.3728C-3.94826 81.5071 -118.146 160.148 -148.513 237.048C-193.66 351.376 -255.074 357.237 87.9124 395.802C430.899 434.368 201.195 345.058 322.781 250.561C444.367 156.064 270.615 39.4209 211.396 32.0132Z" fill="#8F272A" />
        </g>
        <defs>
          {/* Definimos el área de recorte */}
          <clipPath id="clipPath">
            <path d="M211.396 32.0132C152.177 24.6055 179.692 59.7922 64.8421 73.3728C-3.94826 81.5071 -118.146 160.148 -148.513 237.048C-193.66 351.376 -255.074 357.237 87.9124 395.802C430.899 434.368 201.195 345.058 322.781 250.561C444.367 156.064 270.615 39.4209 211.396 32.0132Z" fill="#8F272A" />
          </clipPath>
          <filter id="filter0_d_722_30" x="-209.5" y="0.5" width="630" height="455" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dx="15" dy="10" />
            <feGaussianBlur stdDeviation="20.25" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_722_30" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_722_30" result="shape" />
          </filter>
        </defs>
      </svg>

      {/* Contenedor de texto con recorte en base al clip path de la forma (para respetar dimensiones de la mancha*/}
      <div
        className="absolute z-20 overflow-y-scroll h-[30rem] pl-2 text-sm"
        style={{
          clipPath: "url(#clipPath)",
          WebkitClipPath: "url(#clipPath)", // Para soporte en navegadores basados en Webkit
        }}
      >
        {/* Contenido textual de la mancha */}
        <article className="text-[#FEFFEB] inria-sans-regular">
          <h1 className="rye-regular text-[#CDA053] relative mb-4 mt-20 ml-16">
            Historia del Filete Porteño
          </h1>
          <p className='pr-14'>
            El filete porteño es mucho más que un estilo decorativo; es una
            tradición que llevo en cada trazo y cada espiral, algo que, de
            alguna manera, siento que he vivido en carne propia. Esta historia
            empieza en las calles de Buenos Aires, a fines del Siglo XIX cuando
            los carros de los inmigrantes comenzaron a llenarse de color y de
            formas únicas...
            <br />
            <br />
          </p>
          <p className='pr-28 mb-5'>
            Con los años, el filete y los fileteadores fuimos evolucionando,
            buscando siempre nuevos soportes donde plasmar la identidad
            Argentina y así pasamos a decorar también los colectivos que
            atravesaban la ciudad. Pero en 1964, un cambio importante nos obligó
            a adaptarnos...
            <br />
            <br />
          </p>
          <p className='pr-14'>
            Hoy, el fileteado porteño es reconocido como Patrimonio Cultural
            Inmaterial de la Humanidad por la UNESCO. Es un arte que representa
            la historia, la resistencia y la creatividad de Buenos Aires...
          </p>
        </article>
      </div>
    </div>
  );
}
