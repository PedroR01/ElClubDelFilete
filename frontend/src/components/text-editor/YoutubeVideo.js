import { Node } from "@tiptap/core";

export const YoutubeVideo = Node.create({
  name: "youtube",
  group: "block",
  draggable: true, // Permite arrastrar el video dentro del editor
  selectable: true,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: 640 },
      height: { default: 480 },
    };
  },

  parseHTML() {
    return [{
      tag: "div[data-youtube-video]",
      getAttrs: (dom) => {
        const iframe = dom.querySelector("iframe");
        return {
          src: iframe ? iframe.getAttribute("src") : null,
          width: iframe ? iframe.getAttribute("width") : 640,
          height: iframe ? iframe.getAttribute("height") : 480,
        };
      },
    }];
  },

  renderHTML({ node }) {
    return [
      "div",
      {
        "data-youtube-video": "",
        "contenteditable": "false",
        style: `
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 640px;
          aspect-ratio: 16 / 9;
          cursor: grab;
          position: relative;
        `,
      },
      [
        "iframe",
        {
          src: node.attrs.src,
          width: "100%",
          height: "100%",
          style: `
            width: 100%;
            height: 100%;
            border: none;
            pointer-events: auto; /* Habilita la reproducción */
          `,
          frameborder: "0",
          allowfullscreen: "true",
        },
      ],
      [
        "div",
        {
          style: `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            cursor: grab;
          `,
        },
      ],
    ];
  },

  addNodeView() {
    return ({ node }) => {
      const wrapper = document.createElement("div");
      wrapper.setAttribute("data-youtube-video", "");
      wrapper.contentEditable = "false";
      wrapper.style.display = "flex";
      wrapper.style.justifyContent = "center";
      wrapper.style.alignItems = "center";
      wrapper.style.width = "100%";
      wrapper.style.maxWidth = "640px";
      wrapper.style.aspectRatio = "16 / 9";
      wrapper.style.position = "relative";
      wrapper.style.cursor = "grab";

      const iframe = document.createElement("iframe");
      iframe.src = node.attrs.src;
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";
      iframe.style.pointerEvents = "auto"; // Permite interacción

      // Agregar capa para arrastrar sin bloquear el video
      const dragOverlay = document.createElement("div");
      dragOverlay.style.position = "absolute";
      dragOverlay.style.top = "0";
      dragOverlay.style.left = "0";
      dragOverlay.style.width = "100%";
      dragOverlay.style.height = "100%";
      dragOverlay.style.cursor = "grab";
      dragOverlay.style.background = "transparent";

      wrapper.draggable = true;
      dragOverlay.addEventListener("mousedown", (event) => {
        event.stopPropagation();
      });

      wrapper.appendChild(iframe);
      wrapper.appendChild(dragOverlay);

      return {
        dom: wrapper,
        update: (updatedNode) => {
          iframe.src = updatedNode.attrs.src;
          return true;
        },
      };
    };
  },
});

