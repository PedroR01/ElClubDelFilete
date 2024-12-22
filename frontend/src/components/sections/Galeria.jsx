import { useState } from "react";
import Button from "../Button";

import peralta from "../../img/galeria/adriana_peralta.png";
import arce_sucundun from "../../img/galeria/agustina_arce_sucundun.png";
import arce_lobo from "../../img/galeria/agustina_arce_lobo.png";
import astengo_ladronDeMisSueños from "../../img/galeria/astengo_ladronDeMisSueños.png";
import brenda_lita from "../../img/galeria/brenda_lita.png";
import candelaria_funes_yoHagoRavioles from "../../img/galeria/candelaria_funes_yoHagoRavioles.png";
import cecilia_oviedo_laCocaEsPalFernet from "../../img/galeria/cecilia_oviedo_laCocaEsPalFernet.png";
import clara_sanchez_laPicadita from "../../img/galeria/clara_sanchez_laPicadita.png";
import cukier_singer from "../../img/galeria/cukier_singer.png";
import elina_moncada_tango from "../../img/galeria/elina_moncada_tango.png";
import eugenia_olha_gladis from "../../img/galeria/eugenia_olha_gladis.png";
import fabian_segovia_indio from "../../img/galeria/fabian_segovia_indio.png";
import fabio_correa_andaACantarleAGardel from "../../img/galeria/fabio_correa_andaACantarleAGardel.png";
import graciela_chaile_puente from "../../img/galeria/graciela_chaile_puente.png";
import hector_villarino_bajoDeTobias from "../../img/galeria/hector_villarino_bajoDeTobias.png";
import hector_villarino_magicamenteMessi from "../../img/galeria/hector_villarino_magicamenteMessi.png";
import hidalgo_cambalanche from "../../img/galeria/hidalgo_cambalache.png";
import janet_mehl_mafalda from "../../img/galeria/janet_mehl_mafalda.png";
import jimena_silva_pasionArgentina from "../../img/galeria/jimena_silva_pasionArgentina.png";
import juanjo_miraballes_elFirulete from "../../img/galeria/juanjo_miraballes_elFirulete.png";


export default function Galeria() {
  const imagenes = [{ id: 1, src: peralta, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 2, src: arce_sucundun, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 3, src: arce_lobo, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 4, src: astengo_ladronDeMisSueños, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 5, src: brenda_lita, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 6, src: candelaria_funes_yoHagoRavioles, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 7, src: cecilia_oviedo_laCocaEsPalFernet, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 8, src: clara_sanchez_laPicadita, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 9, src: cukier_singer, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 10, src: elina_moncada_tango, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 11, src: eugenia_olha_gladis, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 12, src: fabian_segovia_indio, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 13, src: fabio_correa_andaACantarleAGardel, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 14, src: graciela_chaile_puente, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 15, src: hector_villarino_bajoDeTobias, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 2, src: hector_villarino_magicamenteMessi, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 3, src: hidalgo_cambalanche, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 4, src: janet_mehl_mafalda, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 5, src: jimena_silva_pasionArgentina, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  { id: 6, src: juanjo_miraballes_elFirulete, autor: "Pedro Pascal", titulo: "Recipientes de ánimos" },
  ]
  const [cantVisible, setCant] = useState(4);
  const [verMas, setVerMas] = useState(false);

  // Función para cargar más imágenes
  const cargarMasImagenes = () => {
    setVerMas(true);
    setCant((cantVisible) => cantVisible + 4);
  };

  return (
    <section className="">
      {/* Grilla principal */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {imagenes.slice(0, cantVisible).map((img) => (
          <div key={img.id} className="relative group overflow-hidden max-sm:h-[15vh] sm:h-[30vh] transition transform hover:scale-105">
            <img
              src={img.src}
              alt={img.titulo}
              className="w-full border-solid border-2 border-black object-fill"
            />
            <div className="absolute inset-0 bg-black bg-opacity-55 transition-opacity flex flex-col justify-end">
              <p className="rye-regular absolute top-2 left-2 text-[#CDA053] text-xs p-1 rounded">
                {img.autor}
              </p>
              <p className="absolute bottom-1 left-1 text-[#FEFFEB] text-sm p-2 rounded w-3/4 rye-regular">
                {`"${img.titulo}"`}
              </p>
            </div>
          </div>
        ))}
      </div>



      {/* Imágenes parcialmente visibles */}
      <div className="grid grid-cols-2 max-sm:h-[7vh] sm:h-[7vh] md:h-[10vh] lg:h-[12vh] xl:h-[15]">
        {imagenes.slice(cantVisible, cantVisible + 2).map((img) => (
          <div
            key={img.id}
            className="relative group overflow-hidden transition transform hover:scale-105"
          >
            <img
              src={img.src}
              alt={img.titulo}
              className="w-full border-solid border-2 border-black"
            />
            <div className="absolute inset-0 bg-black bg-opacity-55 transition-opacity flex flex-col justify-end"></div>
          </div>
        ))}
      </div>

      {/* Botón Ver más */}
      {cantVisible < 20 && (
        <div className="flex justify-center relative">
          <div
            className={`absolute bottom-[30px] w-full flex justify-center translate-y-0
        transition-all duration-500 ease-in-out`}
          >
            <Button
              text={"Ver más"}
              btnType={"button"}
              event={cargarMasImagenes}
              className="text-sm bg-gray-800 text-white rounded block"
            />
          </div>
        </div>
      )}

    </section>
  );
}