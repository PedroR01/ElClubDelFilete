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
      coverImage: null,
      content: "",
      pdfLink: "",
      videoLink: "",
      contentImages: [],
      featured_pos: null,
      bucket_folder_url: ""
    },
  });

  const [customCategory, setCustomCategory] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const maxChar = 200;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("tag", data.tag);
    formData.append("description", data.description);
    formData.append("content", data.content);
    formData.append("pdfLink", data.pdfLink);
    formData.append("videoLink", data.videoLink);

    if (isFeatured)
      formData.append("featured_pos", data.featured_pos);

    // 📌 Agregar la imagen de portada
    if (data.coverImage) {
      formData.append("coverImage", data.coverImage);
    }

    // 📌 Agregar imágenes adicionales (si se permite múltiples imágenes)
    data.contentImages.forEach((img, index) => {
      formData.append(`contentImages[${index}]`, img);
    });

    try {
      const response = await fetch("http://localhost:3001/api/blogs", {
        method: "POST",
        body: formData,
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

    } catch (error) {
      console.error("Error:", error);
    }

    console.log("Datos del formulario (formData):", formData);
    console.log("Datos del formulario (crudo):", data);
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
          render={(field) => (<TextEditor blogContent={field} onChange={(htmlContent) => handleChange(htmlContent)} />)}
          defaultValue=""
        />
        {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}

        <label className="block mt-4 font-semibold text-[#CDA053]">PDF - Link Google Drive:</label>
        <input type="url" {...register("pdfLink")} className="p-2 w-full bg-transparent text-[#FEFFFB] rounded border border-[#cda05377] placeholder-transparent focus:ring-[#CDA053] focus:outline-none" />

        <label className="block mt-4 font-semibold text-[#CDA053]">Video/s - Link (YouTube):</label>
        <input type="url" {...register("videoLink")} className="p-2 w-full bg-transparent text-[#FEFFFB] rounded border border-[#cda05377] placeholder-transparent focus:ring-[#CDA053] focus:outline-none" />

        <label className="block mt-4 font-semibold text-[#CDA053]">Imágenes del contenido (.jpg, máx. 500KB total):</label>
        <ImageUploader
          onChange={(image) => setValue("coverImage", image)}
          multiple={true}
        />

        <div className="my-10">
          <Button text={"Enviar"} btnType={"submit"} state={false} />
        </div>

      </form>
    </>
  );
};
