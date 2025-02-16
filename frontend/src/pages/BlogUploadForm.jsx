import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextEditor from "../components/TextEditor";
import Button from "../components/Button";
import ImageUploader from "../components/ImageUploader";

export default function BlogUploadForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: "",
      tag: "",
      description: "",
      content: "",
      featured_pos: null,
      bucket_folder_url: "",
      coverImage: null,
      contentImages: [],
    },
  });

  const [customCategory, setCustomCategory] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const maxChar = 200;

  const onSubmit = async (data) => {

    const blogData = {
      title: data.title,
      tag: data.tag,
      description: data.description,
      content_sections: data.content,
      featured_pos: null
    }
    if (isFeatured)
      blogData.featured_pos = data.featured_pos;

    const formData = new FormData();
    //  Agregar la imagen de portada
    if (data.coverImage) {
      formData.append("image", data.coverImage);
      formData.append("imgName", "portrait." + data.coverImage.name.split('.').pop().toLowerCase());
      formData.append("folderName", data.title);
    }

    //  Agregar imágenes adicionales (si se permite múltiples imágenes)
    data.contentImages.forEach((img, index) => {
      formData.append(`contentImages[${index}]`, img);
    });

    if (data.contentImages) {
      // Renombramiento de las imagenes en orden de subida para mostrarlas en el mismo orden
      data.contentImages.forEach((img, index) => {
        const format = img.name.split('.').pop().toLowerCase();
        const renamedFile = new File([img], `blogImg${index}.${format}`, { type: img.type });

        formData.append("images", renamedFile); // El nombre debe ser el mismo que espera el backend
      });
      formData.append("folderName", data.title);
      console.log(Array.from(formData.entries()));
    }

    try {
      // const responseTestArrayBlogImgUpload = await fetch("http://localhost:3001/api/storage/testArray", {
      //   method: "POST",
      //   body: testArrayImgFormData
      // });
      const responseTestBlogImgUpload = await fetch("http://localhost:3001/api/storage/test", {
        method: "POST",
        body: formData
      });
      const responseTestBlogDataUpload = await fetch("http://localhost:3001/api/blogs/test", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData)
      });
      if (!responseTestBlogDataUpload.ok)
        throw new Error("Error al enviar el formulario.");

      if (!responseTestBlogImgUpload.ok)
        throw new Error("Error al subir la imagen.");
      // const result = await responseTestBlogImgUpload.json(); // Intentar obtener mensaje detallado del backend
      // if (!responseTestArrayBlogImgUpload.ok)
      //   throw new Error(`Error ${responseTestBlogImgUpload.status}: ${result.message || "Error desconocido"}`);

    } catch (e) {
      console.error("Error:", e);
    }
    console.log("Datos del formulario (crudo):", blogData);
  };

  const handleChange = (htmlContent) => {
    setValue("content", htmlContent);
  }

  return (
    <>
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
        {watch("tag") === "custom" && (
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
            maxLength: {
              value: maxChar,
              message: `Máximo ${maxChar} caracteres`
            },
            onChange: (e) => setCharCount(e.target.value.length)
          })}
          placeholder="Descripción (máximo 200 caracteres)"
          className="p-2 w-full h-32 bg-transparent text-[#FEFFFB] rounded border border-[#cda05377] placeholder-transparent focus:ring-[#CDA053] focus:outline-none"
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
              defaultValue={1}
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


        <label className="block mt-4 font-semibold text-[#CDA053]">Imagen de portada (.jpg, máx. 500KB):</label>
        <ImageUploader
          onChange={(image) => setValue("coverImage", image)}
          multiple={false}
        />
        {errors.coverImage && <p className="text-red-500 text-sm">{errors.coverImage.message}</p>}

        <label className="block mt-4 font-semibold text-[#CDA053]">Contenido:</label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "La descripción es obligatoria" }}
          render={() => (<TextEditor blogContent={watch("content")} onChange={(htmlContent) => handleChange(htmlContent)} />)}
          defaultValue=""
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
    </>
  );
};
