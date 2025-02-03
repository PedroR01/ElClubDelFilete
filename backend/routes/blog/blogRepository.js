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
}
