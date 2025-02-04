import supabase from "../supabaseClient.js";

export class BlogRepository {
  static async getAllBlogsInfo() {
    try {
      let { data: blogs, error } = await supabase.from("blogs").select("*");
      if (error)
        return {
          status: 500,
          message:
            "Error al intentar obtener información de los blogs. " + error,
        };
      return {
        status: 200,
        message:
          "Información de los blogs recuperada con éxito. " +
          JSON.stringify(blogs),
      };
    } catch (e) {
      return {
        status: 500,
        message: "Error al comunicarse con Supabase. " + e,
      };
    }
  }

  static async getAllBlogsImages() {
    const { data: subcarpetas, error: errorSubcarpetas } =
      await supabase.storage
        .from("Novedades") // Bucket 'Novedades'
        .list("");
    const urlImg = [];
    const obtenerUrlsPublicas = async (subcarpetas) => {
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
            return {
              status: 400,
              message:
                `Error obteniendo archivos de ${carpeta.name}:` + errorArchivos,
            };
        } catch (e) {
          return {
            status: 500,
            message: "Error al comunicarse con Supabase. " + e,
          };
        }
      }
    };
    await obtenerUrlsPublicas(subcarpetas);
    return {
      status: 200,
      message:
        "Imagenes de blogs obtenidas de forma éxitosa." +
        JSON.stringify(urlImg[0]),
    };
  }
  static async addImage (image, folderName, imgName, mimeType){
    
    const { data, error } = await supabase
      .storage
      .from('Novedades')
      .upload(`${folderName}/${imgName}`, image, {
        cacheControl: '3600',
        contentType: mimeType,
        upsert: false
      })
    if (error) {
        return {
          status: 400,
          message: "Ya existe una imagen con ese nombre" };
    }
      return {
        status: 200,
        message: 'Operación exitosa'
      };
  }

  static async addImageV2(imgName, folderName, fileBuffer, fileType){
    const { data, error } = await supabase
      .storage
      .from('Novedades')
      .upload(`${folderName}/${imgName}`, fileBuffer, {
        contentType: fileType, // Usamos el tipo MIME
        upsert: false,  // Permite reemplazar el archivo si ya existe
      });
      if (error) {
        return error;
    }
      return {
        status: 200,
        message: 'Operación exitosa'
      };
  }

  static async addBlog(newTag, newTitle, newDescription, newIntroduction, newContent, newFeatured){
    
    const { error } = await supabase
    .from('blogs')
    .insert([
      {
        tag: newTag,
        title: newTitle,
        description: newDescription,
        introduction: newIntroduction,
        content_sections: newContent,
        featured_pos: newFeatured
      }
    ]);
  
    return error;
  
  }
  static async deleteBlog(title){
    const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('title', title)
    return error;
  }
  static async deleteImage(folderName){
    const { data, error } = await supabase
    .storage
    .from('Novedades')
    .list(folderName); // Obtiene la lista de archivos en 'folder'
    if(data){
      const filesToDelete = data.map(file => `${folderName}/${file.name}`);
      if(filesToDelete.length > 0){
        const { data: deleteData, error: deleteError } = await supabase
        .storage
        .from('Novedades')
        .remove(filesToDelete);
        if (deleteError) {
          return deleteError
        }
        return deleteData;
      }
    }
   
  }

}
