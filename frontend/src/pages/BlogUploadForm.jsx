import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextEditor from "../components/TextEditor";
import Button from "../components/Button";
import ImageUploader from "../components/ImageUploader";
import serverUrl from '../components/utils/serverUrl';

export default function BlogUploadForm() {
  const { title } = useParams(); // Obtiene el ID de la URL
  const { state } = useLocation(); // Accede a los datos pasados a través del 'state'
  const { novedad, tags } = state || {};  // Extrae los datos de la novedad
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      tag: "",
      description: "",
      content: "",
      featured_pos: null,
      coverImage: null,
      contentImages: [],
    },
  });

  const [customCategory, setCustomCategory] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [imageFiles, setImageFiles] = useState([])
  const [isFetch, setIsFetch] = useState(false);
  const maxChar = 200;
  // Lógica para cargar datos si estamos en modo edición
  useEffect(() => {
    if (title) {
      // Aquí puedes hacer la llamada al backend para obtener los datos del blog
      fetchBlogData(); // Suponiendo que fetchBlogData es una función para obtener los datos
      setIsFetch(true);
    }
  }, []);
  useEffect(() => {
    if (isFetch) {
      const allImages = [getValues("coverImage"), ...(getValues("contenImages") || [])].filter(Boolean);
      allImages.forEach((imgUrl) => downloadImage(imgUrl))
      console.log("Resultado final" + imageFiles)
    }
  }, [isFetch]);

  const downloadImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl); // Solicita la imagen
      const blob = await response.blob(); // Convierte la respuesta en un Blob

      // Obtén el nombre del archivo de la URL (puedes cambiar esto según tu lógica)
      const fileName = imageUrl.split('/').pop();
      const decodifiedTitle = decodeURIComponent(fileName);

      // Crea un objeto File a partir del Blob
      const file = new File([blob], decodifiedTitle, { type: blob.type });

      setImageFiles((prevFiles) => [...prevFiles, file]);

      // console.log(file); // Muestra el archivo en la consola (opcional)
    } catch (error) {
      console.error('Error al descargar la imagen:', error);
    }
  };
  const fetchBlogData = async () => {
    try {
      if (novedad) {
        const imageUrls = await extractImageUrls(novedad.content_sections);
        setValue("title", novedad.title);
        setValue("tag", novedad.tag);
        setValue("description", novedad.description);
        setValue("content", novedad.content_sections);
        setValue("featured_pos", novedad.featured_pos);
        setValue("coverImage", novedad.bucket_folder_url + "/portrait"); // Usar la URL de la imagen de portada
        setValue("contentImages", imageUrls || []); // Si no hay imágenes en el cuerpo del contenido del blog, asigna un arreglo vacío
        setIsFeatured(novedad.featured_pos > 0); // Si la posición es mayor que 0, se considera como destacada (entre 1 y 4)
      }

    } catch (error) {
      console.error("Error al obtener los datos del blog:", error);
    }
  };

  const handleChange = (htmlContent) => {
    setValue("content", htmlContent);
  }

  const filterContentImagesFromHTML = (editorHTML, contentImages) => {
    if (!editorHTML) return contentImages; // Si no hay contenido, devolver igual.

    // Crear un elemento temporal para analizar el HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = editorHTML;

    // Obtener todas las imágenes dentro del HTML
    const imagesInEditor = Array.from(tempDiv.querySelectorAll("img")).map(img => ({
      src: img.getAttribute("src") || "",
      alt: img.getAttribute("alt") || ""
    }));

    // Filtrar contentImages conservando solo las que están en el editor
    const updatedContentImages = contentImages.filter(image => {
      if (typeof image === "string") {
        // Si es una URL, buscar si sigue existiendo en el editor
        return imagesInEditor.some(img => img.src === image);
      } else if (image instanceof File || image instanceof Blob) {
        // Asegurarnos de que image.name existe antes de comparar
        const fileName = image.name || "";
        return imagesInEditor.some(img => img.alt === fileName);
      }
      return false;
    });

    return updatedContentImages;
  };

  const isUrl = (input) => typeof input === "string" && /^https?:\/\//i.test(input);

  // Dependiendo de la cantidad de imagenes total a subir, va a variar en como se cargan las imagenes, ya que se usan endpoints distintos si hay más de 1 imagen por subir.
  const wrapImgData = (blogTitle, blogContent, coverImage, contentImages) => {
    const imgData = new FormData();
    const updatedImages = filterContentImagesFromHTML(blogContent, getValues("contentImages"));

    // Actualizar estado con imágenes filtradas antes de enviar
    setValue("contentImages", updatedImages);
    // Dependiendo de la cantidad de imagenes total a subir, va a variar en como se cargan las imagenes, ya que se usan endpoints distintos si hay más de 1 imagen por subir.
    contentImages = getValues("contentImages"); // Cuidado con esto
    //  Agregar la imagen de portada si es la única
    if (coverImage && (contentImages.length === 0)) {
      imgData.append("image", coverImage);
      imgData.append("imgName", "portrait");
    }
    // Agregar múltiples imágenes (portada + contenido)
    else if (coverImage && (contentImages.length > 0)) {
      let renamedCoverImg;

      if (isUrl(coverImage))
        imgData.append("images", coverImage);
      else {
        renamedCoverImg = new File([coverImage], "portrait", { type: coverImage.type });
        imgData.append("images", renamedCoverImg);
      }

      if (contentImages.length > 1) {
        contentImages.forEach((img, index) => {
          if (isUrl(img))
            imgData.append("images", img);
          else {
            const renamedFile = new File([img], `blogImg${index}`, { type: img.type });
            imgData.append("images", renamedFile);
          }
        });
      } else {
        const img = contentImages[0];

        if (isUrl(img))
          imgData.append("images", img);
        else {
          const renamedContentImg = new File([img], "blogImg0", { type: img.type });
          imgData.append("images", renamedContentImg);
        }
      }
    }
    imgData.append("folderName", blogTitle);

    return imgData;
  }

  //Función para extraer URLs del contenido html para content images en modo edición
  const extractImageUrls = async (blogContent) => {
    // Crear un parser para convertir el contenido HTML en un documento
    const parser = new DOMParser();
    const doc = parser.parseFromString(blogContent, "text/html");

    // Obtener todas las imágenes del contenido
    const images = doc.querySelectorAll("img");

    // Crear un array de las URLs de las imágenes
    const imageUrls = Array.from(images).map(img => img.src);

    // Retornar las URLs de las imágenes
    return imageUrls;
  };

  // Función async para reemplazar las URLs de las imágenes en el contenido HTML
  const replaceImageUrlsInContent = async (origContent, uploadedUrls) => {

    let content = origContent;

    // Usamos DOMParser para convertir el contenido HTML en un objeto DOM
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    // Obtenemos todas las imágenes del contenido HTML
    const images = doc.querySelectorAll('img');

    // Reemplazamos cada URL de las imágenes
    images.forEach((img, index) => {
      // Reemplazamos la URL de la imagen con el formato blogImg + número
      const newImgUrl = uploadedUrls + `/blogImg${index}`;
      img.src = newImgUrl; // Actualizamos el atributo src de la imagen
    });

    // Devolvemos el contenido HTML actualizado como string
    return doc.documentElement.outerHTML;
  };
  const cleanYoutubeVideos = async (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const videos =  doc.querySelectorAll("div[data-youtube-video]")
    videos.forEach((video) => {
      video.style.cursor = "auto";
  
      const iframe = video.querySelector("iframe");
      if (iframe) {
        iframe.style.pointerEvents = "auto"; // Habilita la interacción con el video
        iframe.style.cursor = "auto"; // Evita que el cursor sea "grab"
      }
  
      // Elimina el div superpuesto con cursor: grab
      const overlay = video.querySelector("div[style*='position: absolute']");
      if (overlay) {
        overlay.remove();
      }
    });
  
    return doc.documentElement.outerHTML;
  };
  

  // Los datos del formulario a enviar se dividen en 2 partes: Blog (texto y numero de prioridad) e Imagen (información completa de la imagen y codificada para guardarla correctamente en la BD).
  const onSubmit = async (data) => {
    try {
      // Desactiva el boton de submit, por lo menos hasta que se complete la solicitud o se produzca un error.
      setIsSubmit(true);

      const blogData = {
        title: data.title,
        tag: data.tag === "Otro" && customCategory !== "" ? customCategory : data.tag,
        description: data.description,
        content_sections: data.content,
        featured_pos: isFeatured ? data.featured_pos : null,
        bucket_folder_url: ""
      };

      const imgData = wrapImgData(data.title, data.content, data.coverImage, data.contentImages);

      // Distinción entre si el formulario es para subir uno nuevo o actualizar uno existente
      const oldTitle = encodeURIComponent(title || '');
      // En ambos casos se codifican en formato para URL ya que si poseen espacios, la URL no lo toma
      // Esta variable es necesaria para enviar la solicitud al endpoint y que reciba la query con el mismo nombre esperado. Revisar linea 82/83 del put en blogBucket.js "update/:oldFolderName".
      const oldFolderName = encodeURIComponent(oldTitle || '');

      // Creacion dinamica del endpoint para subir las imagenes al storage
      const getImgEndpoint = () => {
        /*const handleEndpoint = data.contentImages.length > 0 ? "storage/update/array" : "storage/update";
        const imgEndpoint = title ? `${handleEndpoint}/${oldFolderName}` : handleEndpoint;
        return imgEndpoint;
      }*/
        if (title) {
          const baseEndpoint = data.contentImages.length > 0
            ? "storage/update/array"
            : "storage/update";
          return `${baseEndpoint}/${oldFolderName}`;
        } else {
          // Si 'title' no existe o es vacío, se utiliza "storage" sin el "update".
          return data.contentImages.length > 0
            ? "storage/array"
            : "storage";
        }
      }

      const method = title ? "PUT" : "POST";
      const url = title ? `${serverUrl.produccion}/api/blogs/update/${oldTitle}` : `${serverUrl.produccion}/api/blogs`;
      // console.log(url)
      const responseImgUpload = await fetch(`${serverUrl.produccion}/api/${getImgEndpoint()}`, {
        method: method,
        body: imgData
      });

      const resultImg = await responseImgUpload.json();

      // Solo si la imagen se sube correctamente se procede a subir la info del blog
      if (!responseImgUpload.ok) {
        if (responseImgUpload.status === 409)
          throw new Error(`${resultImg.message}: ${resultImg.description}`)

        throw new Error(`Error en la subida de imágenes: ${resultImg.message || "Error desconocido"}`);
      } else {

        // console.log(resultImg);
        /* Si la imagen no fue cambiada, la URL ya contiene el nombre de la carpeta.
          En el frontend, se agrega "/portrait" automáticamente, por lo que aquí lo eliminamos 
          para evitar que la URL termine con "/portrait/portrait".
          Y en caso de que estemos en edición y haya cambiado la img, como no contiene ni portrait
          ni nada, no habrá inconvenientes con la inserción 
        */
        if (title) {
          blogData.bucket_folder_url = resultImg.url.replace(/\/?(portrait|blogImg\d+)$/, '');
        } else {
          blogData.bucket_folder_url = resultImg.url;
        }
        const modifiedHtml = await cleanYoutubeVideos(blogData.content_sections);
        blogData.content_sections = modifiedHtml;
        if (getValues("contentImages").length > 0) {
          const newHtml = await replaceImageUrlsInContent(blogData.content_sections, resultImg.url)
          blogData.content_sections = newHtml;
        }
        const responseDataUpload = await fetch(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blogData)
        });
        const resultData = await responseDataUpload.json();
        // Si falla el ingreso del blog, se elimina la imagen previamente subida.
        // Si falla el ingreso del blog, se elimina la imagen previamente subida.
        if (!responseDataUpload.ok) {

          // Hacer distinción entre el caso de editar (put) y el caso de crear (post)
          // En ambos casos hay que borrar la carpeta con las imagenes
          const imagenEliminar = {
            folderName: data.title
          }
          const responseImgDelete = await fetch(`${serverUrl.produccion}/api/storage`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imagenEliminar)
          });
          // if (responseImgDelete.ok)
          //   console.log("Imagen eliminada con exito");
          if (method === "PUT") {
            const imgDataBackup = new FormData();
            imgDataBackup.append("folderName", oldTitle);
            imageFiles.forEach((file) => imgDataBackup.append("images", file))
            const backUpEndPoint = data.contentImages.length > 1
              ? "storage/array"
              : "storage"
            // En el caso del PUT volvemos a cargar las imagenes que se encontraban previamente (gracias a un backup)
            const responseImgBackup = await fetch(`${serverUrl.produccion}/api/${backUpEndPoint}`, {
              method: "POST",
              body: imgDataBackup
            });
            // if (responseImgBackup.ok)
            //   console.log("Imagen/es restaurada/s con exito");

          }

          // Error cuando ya se encuentra el titulo ocupado.          
          if (resultData.status === 409) {
            setIsSubmit(false);
            throw new Error(`${resultData.message}: ${resultData.description}`)
          }


          throw new Error(`Error en la subida de imágenes: ${responseDataUpload.message || "Error desconocido"}`);
        }
        else {
          // console.log("Img Result: ", resultImg);
          // console.log("Data Result: ", resultData);
        }
      }
      // console.log("Formulario enviado con éxito:", blogData);
      navigate("/novedades");
    } catch (error) {
      console.error("Error:", error.message);
    }
    setIsSubmit(false);

  };
  const handleAddImage = (newImage) => {
    const currentImages = getValues("contentImages") || [];
    setValue("contentImages", [...currentImages, newImage]);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto my-28 p-4 rounded-lg shadow-lg">
      <label className="block font-semibold text-[#CDA053]">Título:</label>
      <input
        {...register("title", { required: "El título es obligatorio" })}
        placeholder="Título"
        className="p-2 w-full bg-transparent text-[#FEFFFB] rounded border border-[#cda05377] placeholder-transparent focus:ring-[#CDA053] focus:outline-none"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

      <label className="block mt-4 font-semibold text-[#CDA053]">Categoría:</label>
      <select
        {...register("tag", { required: "Selecciona una categoría" })}
        className="p-2 w-full bg-transparent text-[#FEFFFB] rounded border border-[#cda05377] placeholder-transparent focus:ring-[#CDA053] focus:outline-none"
      >
        <option value="" className="bg-[#2D2B35] text-[#FEFFFB]">Selecciona una categoría</option>

        {/* Verificación para evitar error si tags es undefined */}
        {(tags && Array.isArray(tags)) ? (
          tags.map(tag => (
            <option key={tag} value={tag} className="bg-[#2D2B35] text-[#FEFFFB]">{tag}</option>
          ))
        ) : (
          <option className="bg-[#2D2B35] text-[#FEFFFB]">No hay categorías disponibles</option>
        )}
        <option value="Otro" className="bg-[#2D2B35] text-[#FEFFFB]">Agregar otra</option>
      </select>
      {watch("tag") === "Otro" && (
        <input
          type="text"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          className="border border-[#cda05377] p-2 w-full rounded mt-2 bg-[#24222B] text-[#FEFFFB]"
          placeholder="Nueva categoría"
        />
      )}
      {errors.tag && <p className="text-red-500 text-sm">{errors.tag.message}</p>}

      <label className="block mt-4 font-semibold text-[#CDA053]">Descripción:</label>
      <textarea
        {...register("description", {
          required: "La descripción es obligatoria",
          maxLength: { value: maxChar, message: `Máximo ${maxChar} caracteres` },
        })}
        placeholder="Descripción (máximo 200 caracteres)"
        className="p-2 w-full h-32 bg-transparent text-[#FEFFFB] rounded border border-[#cda05377] placeholder-transparent focus:ring-[#CDA053] focus:outline-none"
        onChange={(e) => setCharCount(e.target.value.length)}
      />
      <p className="text-gray-600 text-sm">{charCount}/{maxChar}</p>
      {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

      <div className="flex gap-8">
        <label className="flex items-center gap-2 mt-4 font-semibold text-[#CDA053]">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          Noticia destacada
        </label>

        {/* Selección de prioridad (activa solo si el checkbox está marcado) */}
        <label className="flex items-center gap-2 mt-4 font-semibold text-[#CDA053]">
          Prioridad:
          <select
            value={watch("featured_pos") || 1} // Usamos el valor del formulario, por defecto 1 si no tiene valor
            onChange={(e) => setValue("featured_pos", Number(e.target.value))}
            disabled={!isFeatured}
            className={`p-2 bg-[#2D2B35] ${!isFeatured ? 'text-[#fefffb87] cursor-not-allowed' : ' text-[#FEFFFB] border'}`}
          >
            {[1, 2, 3, 4].map(num => (
              <option className="bg-[#2D2B35] text-[#FEFFFB]" key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="block mt-4 font-semibold text-[#CDA053]">Imagen de portada:</label>
      <ImageUploader onChange={(image) => setValue("coverImage", image)} multiple={false} initialImages={watch("coverImage") ? [watch("coverImage")] : []} />

      <label className="block mt-4 font-semibold text-[#CDA053]">Contenido:</label>
      <Controller
        name="content"
        control={control}
        rules={{ required: "El contenido es obligatorio" }}
        render={() => (<TextEditor blogContent={watch("content")} onChange={(htmlContent) => handleChange(htmlContent)} onAddImage={handleAddImage}
          images={watch("contentImages")} />)}
      />
      {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}

      <div className={`my-10 ${isSubmit ? "animate-pulse" : ""}`}>
        <Button text={"Enviar"} btnType={"submit"} state={isSubmit} />
      </div>
    </form>
  );
}
