import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import PdfDownloadComponent from "./PdfDownloadComponent.jsx";

export const pdfDownloadExtension = Node.create({
  name: "pdfDownload",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      url: {
        default: "",
      },
      title: {
        default: "Descargar PDF",
      },
    };
  },

  // Tag de la etiqueta HTML por la cual es invocado o llamado desde la herramienta del editor
  // input expected: <render-pdf url="${url}" title="${title}"/>
  parseHTML() {
    return [
      {
        tag: "render-pdf",
      },
    ];
  },

  // Metodo que renderiza y devuelve, junto con los atributos asociados.
  // output expected: <button className={"relative w-full border-2 backdrop-blur-sm border-[#CDA053] text-[#CDA053] font-bold afacad-bold py-3 px-6 text-lg rounded-full shadow-xl md:text-2xl md:rounded-3xl md:py-1 md:px-12 transition-all duration-300 ease-in-out brightness-100 enabled:hover:scale-105 enabled:hover:brightness-125 enabled:active:scale-95 disabled:brightness-50 disabled:hover:cursor-not-allowe"} type={"button"} onClick={()=> pdfDownloader(pdf.link, pdf.title)} disabled={false}> {}
  // Este método se utiliza para serializar el nodo a HTML para guardarlo en la BD.
  renderHTML({ HTMLAttributes }) {
    return [
      "button",
      mergeAttributes(HTMLAttributes, {
        class:
          "relative w-full border-2 backdrop-blur-sm border-[#CDA053] text-[#CDA053] font-bold afacad-bold py-3 px-6 text-lg rounded-full shadow-xl md:text-2xl md:rounded-3xl md:py-1 md:px-12 transition-all duration-300 ease-in-out brightness-100 enabled:hover:scale-105 enabled:hover:brightness-125 enabled:active:scale-95 disabled:brightness-50",
        type: "button",
        "data-pdf-url": HTMLAttributes.url,
        "data-pdf-title": HTMLAttributes.title,
      }),
      HTMLAttributes.title, // El contenido interno del botón será el título, por ejemplo "Descargar PDF"
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(PdfDownloadComponent);
  },
});
