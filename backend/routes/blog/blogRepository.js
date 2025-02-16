import { AppError } from "../../errors/appError.js";
import supabase from "../supabaseClient.js";

const getBucketImgUrl = async (subcarpetas, urlImg) => {
  for (const carpeta of subcarpetas) {
    try {
      // Listar archivos dentro de la carpeta
      const { data: archivos, error: errorArchivos } = await supabase.storage
        .from("Novedades")
        .list(carpeta.name);

      if (errorArchivos) {
        console.error(
          `Error obteniendo archivos de ${carpeta.name}:`,
          errorArchivos
        );
        continue;
      }

      if (archivos.length > 0) {
        // Obtener la URL del primer archivo de la carpeta
        const { data: urlImage } = supabase.storage
          .from("Novedades")
          .getPublicUrl(`${carpeta.name}/${archivos[0].name}`);

        urlImg.push({
          carpeta: carpeta.name,
          url: urlImage,
        });
      } else
        throw new AppError(
          "Error obteniendo archivos",
          500,
          `Error al obtener las imagenes de la carpeta ${carpeta.name}`
        );
    } catch (e) {
      throw e;
    }
  }
  return {
    status: 200,
    message: "Imagenes de blogs obtenidas de forma éxitosa.",
    metaData: urlImg,
  };
};

export class BlogRepository {
  static async getAllBlogsInfo() {
    try {
      let { data: blogs, error } = await supabase.from("blogs").select("*");
      if (error)
        throw new AppError(
          error.code,
          500,
          "Error al intentar obtener información de los blogs."
        );
      return {
        status: 200,
        message: "Información de los blogs recuperada con éxito.",
        metaData: blogs,
      };
    } catch (e) {
      throw e;
    }
  }

  static async getAllBlogsImages() {
    const { data: subcarpetas, error: errorSubcarpetas } =
      await supabase.storage
        .from("Novedades") // Bucket 'Novedades'
        .list("");
    if (errorSubcarpetas)
      throw new AppError(
        errorSubcarpetas.code,
        500,
        "Error al obtener las imagenes de los blogs"
      );
    const urlImg = [];
    const data = await getBucketImgUrl(subcarpetas, urlImg);

    return data;
  }
  static async addImage(image, folderName, imgName, mimeType) {
    const { data, error } = await supabase.storage
      .from("Novedades")
      .upload(`${folderName}/${imgName}`, image, {
        cacheControl: "3600",
        contentType: mimeType,
        upsert: false,
      });
    if (error) {
      throw new AppError(
        "BadRequestError",
        400,
        "La imagen con dicho nombre ya existe"
      );
    }
    const { url } = await supabase.storage
      .from("Novedades")
      .getPublicUrl(`${folderName}/${imgName}`);
    return {
      status: 200,
      message: "Operación exitosa",
      url: url,
    };
  }

  static async addImageV2(imgName, folderName, fileBuffer, fileType) {
    const { data, error } = await supabase.storage
      .from("Novedades")
      .upload(`${folderName}/${imgName}`, fileBuffer, {
        contentType: fileType, // Usamos el tipo MIME
        upsert: false, // Permite reemplazar el archivo si ya existe
      });
    if (error) {
      return error;
    }
    return {
      status: 200,
      message: "Operación exitosa",
    };
  }

  static async addBlog(
    newTag,
    newTitle,
    newDescription,
    newIntroduction,
    newContent,
    newFeatured,
    newUrl
  ) {
    const { data, error } = await supabase
      .from("blogs")
      .insert([
        {
          tag: newTag,
          title: newTitle,
          description: newDescription,
          introduction: newIntroduction,
          content_sections: newContent,
          featured_pos: newFeatured,
          bucket_folder_url: newUrl,
        },
      ])
      .select();

    return { data, error };
  }
  static async deleteBlog(title) {
    const { data, error } = await supabase
      .from("blogs")
      .delete()
      .eq("title", title)
      .select();
    if (error)
      throw new AppError(error.code, error.status, "Error al eliminar el blog");
    else if (data.length === 0)
      throw new AppError("Not found", 404, "No se encontro el blog solicitado");
    return data;
  }
  static async deleteImage(folderName) {
    const { data, error } = await supabase.storage
      .from("Novedades")
      .list(folderName); // Obtiene la lista de archivos en 'folder'

    if (error)
      throw new AppError(error.code, error.status, "Error al eliminar el blog");
    else if (data.length === 0)
      throw new AppError(
        "Carpeta/imagen inexistente",
        404,
        "No se encontro la imagen solicitada"
      );
    if (data) {
      const filesToDelete = data.map((file) => `${folderName}/${file.name}`);
      if (filesToDelete.length > 0) {
        const { data: deleteData, error: deleteError } = await supabase.storage
          .from("Novedades")
          .remove(filesToDelete);
        if (deleteError) {
          return deleteError;
        }
        return deleteData;
      }
    }
  }

  static async addTestBlog(newContent) {
    const { data, error } = await supabase
      .from("test_blog")
      .insert({
        content_sections: newContent,
      })
      .select();
    if (error) console.log("Error: " + error.message);
    return { data, error };
  }

  static async addImageTest(image, folderName, imgName, mimeType) {
    const { data, error } = await supabase.storage
      .from("Novedades")
      .upload(`${folderName}/${imgName}`, image, {
        cacheControl: "3600",
        contentType: mimeType,
        upsert: false,
      });
    if (error) {
      console.log("Img Error: " + error.message);
      throw new AppError(
        "BadRequestError",
        400,
        "La imagen con dicho nombre ya existe"
      );
    }
    const { url } = await supabase.storage
      .from("Novedades")
      .getPublicUrl(`${folderName}/${imgName}`);
    return { data, error, url };
  }

  static async addMultipleImageTest(files, folderName) {
    // Subimos cada imagen de forma individual y obtenemos sus respuestas
    const uploads = await Promise.all(
      files.map(async (file) => {
        const { data, error } = await supabase.storage
          .from("Novedades")
          .upload(`${folderName}/${file.originalname}`, file.buffer, {
            cacheControl: "3600",
            contentType: file.mimetype,
            upsert: false,
          });

        if (error) {
          console.error(`Error al subir ${file.originalname}:`, error.message);
          throw new AppError(
            "BadRequestError",
            400,
            `Hubo un problema al subir la imagen: ${file.originalname}`
          );
        }

        return {
          data,
          url: supabase.storage
            .from("Novedades")
            .getPublicUrl(`${folderName}/${file.originalname}`),
        };
      })
    );

    return { data: uploads };
  }

  static async addMultipleImageTestFail(files, folderName) {
    const uploads = files.map((file) => ({
      path: `${folderName}/${file.originalname}`,
      file: file.buffer,
      options: {
        cacheControl: "3600",
        contentType: file.mimetype,
        upsert: false,
      },
    }));

    // Subimos todas las imágenes en una sola llamada
    const { data, error } = await supabase.storage
      .from("Novedades")
      .upload(uploads);

    if (error) {
      console.error("Error al subir imágenes:", error.message);
      throw new AppError(
        "BadRequestError",
        400,
        "Hubo un problema al subir las imágenes"
      );
    }

    // La devolución de las URLS aca creo que no hacen falta, porque ya la genero y guardo desde la img de la portada, que además es un campo obligatorio.
    // Obtener URLs en un solo paso
    // const urls = files.map((file) =>
    //   supabase.storage
    //     .from("Novedades")
    //     .getPublicUrl(`${folderName}/${file.originalname}`)
    // );

    return { data, error, urls };
  }
}
