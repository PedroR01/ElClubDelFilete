import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import TextEditor from "../components/TextEditor";
import Button from "../components/Button";
import ImageUploader from "../components/ImageUploader";

export default function BlogUploadForm() {
  const { title } = useParams(); // Obtiene el ID de la URL
  const { state } = useLocation(); // Accede a los datos pasados a través del 'state'
  const { novedad } = state || {};  // Extrae los datos de la novedad
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    getValues
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
  const maxChar = 200;
  // Lógica para cargar datos si estamos en modo edición
  useEffect(() => {
    if (title) {
      // Aquí puedes hacer la llamada al backend para obtener los datos del blog
      fetchBlogData(); // Suponiendo que fetchBlogData es una función para obtener los datos
    }
  }, [novedad,title]);
  const fetchBlogData = async () => {
    try {
      if (novedad) {
        setValue("title", novedad.title);
        setValue("tag", novedad.tag);
        setValue("description", novedad.description);
        setValue("content", novedad.content_sections); // O novedad.content_sections si corresponde
        setValue("featured_pos", novedad.featured_pos);
        setValue("coverImage", novedad.bucket_folder_url + "/portrait"); // Usar la URL de la imagen de portada
        setValue("contentImages", novedad.contentImages || []); // Si no hay imágenes, asigna un arreglo vacío
        setIsFeatured(novedad.featured_pos > 0); // Si la posición es mayor que 0, se considera como destacada
    }
      
    } catch (error) {
      console.error("Error al obtener los datos del blog:", error);
    }
  };


  const handleChange = (htmlContent) => {
    setValue("content", htmlContent);
  }

  const onSubmit = async (data) => {
    try {
      const blogData = {
        title: data.title,
        tag: data.tag,
        description: data.description,
        content_sections: data.content,
        featured_pos: isFeatured ? data.featured_pos : null,
        bucket_folder_url: ""
      };

      const formData = new FormData();
      // Dependiendo de la cantidad de imagenes total a subir, va a variar en como se cargan las imagenes, ya que se usan endpoints distintos si hay más de 1 imagen por subir.

      //  Agregar la imagen de portada si es la única
      if (data.coverImage && (data.contentImages.length === 0)) {
        formData.append("image", data.coverImage);
        formData.append("imgName", "portrait");
      }
      //  Agregar multiples imagenes dependiendo de cantidad y tipo (portada + contenido || portada + contenido (>1))
      else if ((data.coverImage && (data.contentImages.length > 0))) {
        const renamedCoverImg = new File([data.coverImage], `portrait`, { type: data.coverImage.type });
        formData.append("images", renamedCoverImg);
        if (data.contentImages.length > 1) {
          data.contentImages.forEach((img, index) => {
            const renamedFile = new File([img], `blogImg${index}`, { type: img.type });

            formData.append("images", renamedFile); // El nombre debe ser el mismo que espera el backend
          });
        } else {
          const renamedContentImg = new File([data.contentImages], "blogImg0", { type: data.contentImages[0].type });
          formData.append("images", renamedContentImg);
        }
      }

      formData.append("folderName", data.title);
      console.log("FormData:", Array.from(formData.entries()));
      // console.log("FormData: ", Array.from(formData.entries()));
      const oldTitle = title;
      const oldFolderName = title;
      const imgEndpoint = data.contentImages.length > 0 ? "storage/test/array" : "storage/test";
      const imgCompleteEndpoint = title ? `${imgEndpoint}/${oldFolderName}` : imgEndpoint;
      console.log(imgEndpoint);
      const method = title ? "PUT" : "POST";
      const url = title ? `http://localhost:3001/api/blogs/test/${oldTitle}` : "http://localhost:3001/api/blogs/test";
      const responseImgUpload = await fetch(`http://localhost:3001/api/${imgCompleteEndpoint}`, {
        method: method,
        body: formData
      });
      const resultImg = await responseImgUpload.json();

      if (!responseImgUpload.ok) {
        throw new Error(`Error en la subida de imágenes: ${resultImg.message || "Error desconocido"}`);
      } else {
        console.log(resultImg);
        blogData.bucket_folder_url = resultImg.url;
        const responseDataUpload = await fetch(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blogData)
        });
        const resultData = await responseDataUpload.json();

        if (!responseDataUpload.ok) {
          const imagenEliminar = {
            folderName: data.title
          }
          const responseImgDelete = await fetch("http://localhost:3001/api/storage", {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imagenEliminar)
          });
          if (responseImgDelete.ok)
            console.log("Imagen eliminada con exito");
          throw new Error(`Error en la subida de imágenes: ${responseDataUpload.message || "Error desconocido"}`);
        } else {
          console.log("Img Result: ", resultImg);
          console.log("Data Result: ", resultData);
        }
      }
      console.log("Formulario enviado con éxito:", blogData);
    } catch (error) {
      console.error("Error:", error.message);
    }
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
      <select {...register("tag", { required: "Selecciona una categoría" })} className="p-2 w-full bg-transparent text-[#FEFFFB] rounded border border-[#cda05377] placeholder-transparent focus:ring-[#CDA053] focus:outline-none">
        <option value="" className="bg-[#2D2B35] text-[#FEFFFB]">Selecciona una categoría</option>
        <option value="Investigacion" className="bg-[#2D2B35] text-[#FEFFFB]">Investigación</option>
        <option value="Mentalidad" className="bg-[#2D2B35] text-[#FEFFFB]">Mentalidad</option>
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
      <ImageUploader onChange={(image) => setValue("coverImage", image)} multiple={false} defaultImage={watch("coverImage")} />

      <label className="block mt-4 font-semibold text-[#CDA053]">Contenido:</label>
      <Controller
        name="content"
        control={control}
        rules={{ required: "El contenido es obligatorio" }}
        render={() => (<TextEditor blogContent={watch("content")} onChange={(htmlContent) => handleChange(htmlContent)}
          images={watch("contentImages")} />)}
      />
      {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}

      <label className="block mt-4 font-semibold text-[#CDA053]">Imágenes del contenido (.jpg, máx. 500KB total):</label>
      <ImageUploader
        onChange={(image) => setValue("contentImages", image)}
        multiple={true}
      />

      <div className="my-10">
        <Button text={"Enviar"} btnType={"submit"} state={false} />
      </div>
    </form>
  );
}
