import { Router } from "express";

const blogImgRouter = Router();

// Consulta sobre las imágenes del storage
// Prueba recuperando un storage reestructurado llamado novedades
blogImgRouter.get("/", async (req, res) => {
  try {
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
          }
        } catch (err) {
          console.error("Error en la solicitud:", err);
        }
      }
    };

    await obtenerUrlsPublicas(subcarpetas);

    res.status(200).send({ urlImg });
  } catch (err) {
    res.send({ err });
  }
});

export default blogImgRouter;
