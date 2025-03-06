import { AppError } from "../../errors/appError.js";
import supabase from "../supabaseClient.js";

// Metodo para devolver la URL del archivo
const getFileUrl = async (folderName) => {
  const { data, error } = await supabase.storage
    .from("Novedades")
    .getPublicUrl(`${folderName}`);

  if (error) {
    console.log("Public file URL Error: " + error.message);
    throw new AppError(
      "BadRequestError",
      400,
      "No se que poner aca, pero fallo al conseguir la URL de la carpeta del blog."
    );
  }
  return { url: data.publicUrl };
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

  static async getSpecificBlog(title) {
    const { data, error } = await supabase
      .from("blogs")
      .select(
        "tag, title, description, content_sections, featured_pos, bucket_folder_url"
      )
      .eq("title", title); // Correct
    return { data, error };
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

    const getBucketImgUrl = async (subcarpetas, urlImg) => {
      for (const carpeta of subcarpetas) {
        try {
          // Listar archivos dentro de la carpeta
          const { data: archivos, error: errorArchivos } =
            await supabase.storage.from("Novedades").list(carpeta.name);

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

    const data = await getBucketImgUrl(subcarpetas, urlImg);

    return data;
  }

  static async addImage(image, imgName, folderName, mimeType, editing = false) {
    const isUrl = (input) =>
      typeof input === "string" && /^https?:\/\//i.test(input);
    const { data: existingFiles, error: listError } = await supabase.storage
      .from("Novedades")
      .list(folderName);
    if (listError && !existingFiles) {
      throw new AppError("InternalError", 500, "No se pudo insertar la imagen");
    }
    if(!editing && existingFiles && existingFiles.length > 0){
      console.log(existingFiles)
      console.log("Me fui en el post")
      throw new AppError("Ya existe novedad con ese título", 409, "Ya existe novedad con ese título")}
    if (existingFiles && existingFiles.length > 1) {
      const filesToDelete = existingFiles.filter(
        (file) => file.name !== imgName
      );
      if (filesToDelete.length > 0) {
        const pathsToDelete = filesToDelete.map(
          (file) => `${folderName}/${file.name}`
        );
        const { error: deleteError } = await supabase.storage
          .from("Novedades")
          .remove(pathsToDelete);
        if (deleteError) {
          console.error(
            "Error eliminando imágenes extra:",
            deleteError.message
          );
          throw new AppError(
            "InternalError",
            500,
            "Error eliminando imágenes extra"
          );
        }
      }
    }
    if (isUrl(image)) {
      return {
        url: image,
        message: "Imagen ya existente (URL recibida), no se realizó upload.",
      };
    }
    const { data, error } = await supabase.storage
      .from("Novedades")
      .upload(`${folderName}/${imgName}`, image, {
        cacheControl: "3600",
        contentType: mimeType,
        upsert: true,
      });
      console.log(error)
    if (error) {
      console.log("Img Error: " + error.message);
      throw new AppError(
        "BadRequestError",
        400,
        error.message
      );
    }

    const { url } = await getFileUrl(folderName);
    return { data, error, url };
  }

  static async addMultipleImage(files, folderName, editing = false) {
    // Subimos cada imagen de forma individual y obtenemos sus respuestas
    // 1. Listar los archivos existentes en la carpeta
    // Helper para identificar si el input es una URL.
    const isUrl = (input) =>
      typeof input === "string" && /^https?:\/\//i.test(input);

    // 1. Listar archivos existentes en la carpeta.
    const { data: existingFiles, error: listError } = await supabase.storage
      .from("Novedades")
      .list(folderName);
    if (listError) {
      console.error("Error listando imágenes:", listError.message);
      throw new AppError(
        "InternalError",
        500,
        "No se pudo obtener la lista de imágenes"
      );
    }
    if(!editing && existingFiles && existingFiles.length > 0){
      console.log("Me fui en el post")
      throw new AppError("Ya existe novedad con ese título", 409, "Ya existe novedad con ese título")}
    // 2. Extraer los nombres de los archivos que vienen en el array.
    const newFileNames = files
      .map((file) => {
        if (isUrl(file)) {
          // Extraer el nombre de la imagen de la URL.
          const parts = file.split("/");
          return parts.pop();
        } else if (file && file.originalname) {
          return file.originalname;
        }
        return null;
      })
      .filter((name) => name !== null);

    // 3. Determinar cuáles archivos existentes NO están en newFileNames.
    const filesToDelete = existingFiles.filter(
      (file) => !newFileNames.includes(file.name)
    );

    // 4. Eliminar los archivos que ya no están en la nueva lista.
    if (filesToDelete.length > 0) {
      const pathsToDelete = filesToDelete.map(
        (file) => `${folderName}/${file.name}`
      );
      const { error: deleteError } = await supabase.storage
        .from("Novedades")
        .remove(pathsToDelete);
      if (deleteError) {
        console.error("Error eliminando imágenes extra:", deleteError.message);
        throw new AppError(
          "InternalError",
          500,
          "Error eliminando imágenes extra"
        );
      }
    }
    const uploads = await Promise.all(
      files.map(async (file) => {
        if (isUrl(file)) {
          return { url: file, message: "Papi esta es una url" };
        }
        const { data, error } = await supabase.storage
          .from("Novedades")
          .upload(`${folderName}/${file.originalname}`, file.buffer, {
            cacheControl: "3600",
            contentType: file.mimetype,
            upsert: true,
          });

        if (error) {
          console.error(`Error al subir ${file.originalname}:`, error.message);
          throw new AppError(
            "BadRequestError",
            400,
            `Hubo un problema al subir la imagen: ${file.originalname}`
          );
        }

        return data;
      })
    );

    const { url } = await getFileUrl(folderName);
    return {
      data: uploads,
      url,
    };
  }

  static async addBlog(
    content,
    tag,
    title,
    description,
    featuredPos,
    bucketFolderUrl
  ) {
    const { data: novelties, error: err} = await supabase
    .from('blogs')
    .select()
    .eq('title', title)
    if(!err && Array.isArray(novelties) && novelties.length > 0)
        throw new AppError("Ya existe novedad con ese título", 409, "Ya existe novedad con ese título")
    
    if (featuredPos != null) {
      // Obtener todos los blogs con featured_pos >= el deseado
      let { data: blogs, error } = await supabase
        .from("blogs")
        .select()
        .gte('featured_pos', featuredPos)

      if (error) {
        console.error("Error al obtener blogs:", error.message);
        throw error;
      }
      // verifico que la pos esté libre antes del corrimiento
      const exists = blogs.some(blog => blog.featured_pos === featuredPos);
      if(!exists){
        // si la pos no está ocupada inserto sin problemas
        const { data, error: insertError } = await supabase
          .from("blogs")
          .insert({
            content_sections: content,
            tag: tag,
            title: title,
            description: description,
            featured_pos: featuredPos,
            bucket_folder_url: bucketFolderUrl,
          })
          .select();

        if (insertError) {
          console.log("Error al insertar blog:", insertError.message);
        }
        return { data, error: insertError };
      }
      // Ordenar en orden descendente para actualizar primero el de mayor posición
      blogs.sort((a, b) => b.featured_pos - a.featured_pos);

      const lastFeaturedPos = 4;
      // Recolectamos todas las actualizaciones en un array de promesas
      const updatePromises = blogs.map((blog) => {
        // Si el blog está en la posición máxima, se desasigna
        if (blog.featured_pos === lastFeaturedPos) {
          return supabase
            .from("blogs")
            .update({ featured_pos: null })
            .eq("id", blog.id)
            .select();
        } else {
          // Incrementa su posición en 1
          const newPos = blog.featured_pos + 1;
          return supabase
            .from("blogs")
            .update({ featured_pos: newPos })
            .eq("id", blog.id)
            .select();
        }
      });

      // Ejecutar todas las actualizaciones en paralelo
      try {
        await Promise.all(updatePromises);
        // Insertar el nuevo blog
        const { data, error: insertError } = await supabase
          .from("blogs")
          .insert({
            content_sections: content,
            tag: tag,
            title: title,
            description: description,
            featured_pos: featuredPos,
            bucket_folder_url: bucketFolderUrl,
          })
          .select();

        if (insertError) {
          console.log("Error al insertar blog:", insertError.message);
        }
        return { data, error: insertError };
      } catch (e) {
        console.error("Error en las actualizaciones de featured_pos:", e);
        throw e;
      }
    }
  }

  static async modifyBlog(oldTitle, validFields) {
    const featuredPos = validFields.featured_pos;
    const title = validFields.title;
    if(title && oldTitle !== title){
      const { data: novelties, error: err} = await supabase
      .from('blogs')
      .select()
      .eq('title', title)
      if(!err && Array.isArray(novelties) && novelties.length > 0)
          throw new AppError("Ya existe novedad con ese título", 409, "Ya existe novedad con ese título")
      
    }
    if (featuredPos != null) {
      // Obtener todos los blogs con featured_pos >= el deseado
      let { data: blogs, error } = await supabase
        .from("blogs")
        .select()
        .gte('featured_pos', featuredPos)
      
      if (error) {
        console.error("Error al obtener blogs:", error.message);
        throw error;
      }
      // verifico que la pos esté libre antes del corrimiento
      const exists = blogs.some(blog => blog.featured_pos === featuredPos && blog.title !== oldTitle);
      if(!exists){
        // si la pos no está ocupada inserto sin problemas
        const { data, error } = await supabase
          .from("blogs")
          .update(validFields)
          .eq("title", oldTitle)
          .select();
          return {data, error};
      }
      // Ordenar en orden descendente para actualizar primero el de mayor posición
      blogs.sort((a, b) => b.featured_pos - a.featured_pos);

      const lastFeaturedPos = 4;
      // Recolectamos todas las actualizaciones en un array de promesas
      const updatePromises = blogs.map((blog) => {
        // Si el blog está en la posición máxima, se desasigna
        if (blog.featured_pos === lastFeaturedPos) {
          return supabase
            .from("blogs")
            .update({ featured_pos: null })
            .eq("id", blog.id)
            .select();
        } else {
          // Incrementa su posición en 1
          const newPos = blog.featured_pos + 1;
          return supabase
            .from("blogs")
            .update({ featured_pos: newPos })
            .eq("id", blog.id)
            .select();
        }
      });

      // Ejecutar todas las actualizaciones en paralelo
      try {
        await Promise.all(updatePromises);
        // Actualizar el blog a editar
        const { data, error } = await supabase
          .from("blogs")
          .update(validFields)
          .eq("title", oldTitle)
          .select();

        return { data, error };
      } catch (e) {
        console.error("Error en las actualizaciones de featured_pos:", e);
        throw e;
      }
    }
    else {
      const { data, error } = await supabase
          .from("blogs")
          .update(validFields)
          .eq("title", oldTitle)
          .select();
          return {data, error};
    }
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

  static async isTitleBusy(folderName){
    // Se utiliza solo con el storage este
    const { data, error } = await supabase
      .from("blogs")
      .select()
      .eq("title", folderName)
      if (error)
        throw new AppError(error.code, error.status, "Error al verificar si titulo de novedad existe");
      console.log((Array.isArray(data) && data.length > 0))
      return (Array.isArray(data) && data.length > 0);
  }
}
