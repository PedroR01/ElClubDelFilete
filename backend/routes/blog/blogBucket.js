import { Router } from "express";
import { BlogRepository } from "./blogRepository.js";
import multer from "multer";
import { AppError } from "../../errors/appError.js";
import { nameStandarized } from "../../utils/imageNameStandarizer.js"
const blogImgRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Consulta sobre las imágenes del storage
// Prueba recuperando un storage reestructurado llamado novedades
blogImgRouter.get("/", async (req, res, next) => {
  try {
    const data = await BlogRepository.getAllBlogsImages();
    res.send(data);
  } catch (e) {
    next(e);
  }
});

blogImgRouter.post("/", upload.single("image"), async (req, res, next) => {
  try {
    // Si le saco el imgName y la const image queda ighual al del array.
    const { imgName, folderName } = req.body; // Hace falta el imgName?
    const image = req.file.buffer; // El archivo cargado
    const folderNameStandarized = nameStandarized(folderName);
    const { data, error, url } = await BlogRepository.addImage(
      image,
      imgName,
      folderNameStandarized,
      req.file.mimetype
    );
    if (error)
      throw new AppError(
        error.code,
        error.status,
        "No se subio la imagen correctamente. Revise las credenciales"
      );
    res.status(200).send({ data, url });
  } catch (e) {
     next(e);
    
  }
});

blogImgRouter.post("/array", upload.array("images"), async (req, res, next) => {
  try {
    const { folderName } = req.body;
    const folderNameStandarized = nameStandarized(folderName);
    const { data, error, url } = await BlogRepository.addMultipleImage(
      req.files,
      folderNameStandarized
    );

    if (error) {
      throw new AppError(
        error.code,
        error.status,
        "No se subieron las imágenes correctamente. Revise las credenciales"
      );
    }
    res.status(200).send({ data, url });
  } catch (e) {
      next(e)
  }
});

blogImgRouter.delete("/", async (req, res, next) => {
  try {
    const { folderName } = req.body;
    if (!folderName)
      throw new AppError(
        "MissingDataError",
        400,
        "No se enviaron los datos solicitados"
      );
    const folderNameStandarized = nameStandarized(folderName);
    const data = await BlogRepository.deleteImage(folderNameStandarized);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

blogImgRouter.put(
  "/update/:oldFolderName",
  upload.single("image"),
  async (req, res, next) => {
    try {
      const { oldFolderName } = req.params; // El título del blog a actualiza
      // Decodifico el titulo porque lo paso codificado en un formato válido para URL
      const decodifiedOldFolderName = decodeURIComponent(oldFolderName);
      const oldFolderNameStandarized = nameStandarized(decodifiedOldFolderName);
      const { imgName, folderName } = req.body; // Hace falta el imgName?
      const folderNameStandarized = nameStandarized(folderName);
      let image = null;
      let mimeType = null;
      if (req.file) {
        image = req.file.buffer; // El archivo cargado
        mimeType = req.file.mimetype;
      } else {
        image = req.body.image;
      }
      const isBusy = await BlogRepository.isTitleBusy(folderNameStandarized);
      const isDifferent = oldFolderNameStandarized !== folderNameStandarized;
      if(isBusy && isDifferent){
        throw new AppError("Ya existe novedad con ese título", 409, "Ya existe novedad con ese título")}
      if (oldFolderNameStandarized!== folderNameStandarized) {
        const { deleteData } = await BlogRepository.deleteImage(oldFolderNameStandarized); // Variable sin uso
      }
      const { data, error, url } = await BlogRepository.addImage(
        image,
        imgName,
        folderNameStandarized,
        mimeType,
        true
      );
      if (error) throw new AppError(error.code, error.status, error.code);
      res.send({ data, url });
    } catch (err) {
      next(err);
    }
  }
);

blogImgRouter.put(
  "/update/array/:oldFolderName",
  upload.array("images"),
  async (req, res, next) => {
    try {
      const { oldFolderName } = req.params; // El título del blog a actualiza
      // Decodifico el titulo porque lo paso codificado en un formato válido para URL
      const decodifiedOldFolderName = decodeURIComponent(oldFolderName);
      const oldFolderNameStandarized = nameStandarized(decodifiedOldFolderName);
      const { folderName, images: urls } = req.body;
      console.log(urls)
      const folderNameStandarized = nameStandarized(folderName);
      const isBusy = await BlogRepository.isTitleBusy(folderNameStandarized);
      const isDifferent = oldFolderNameStandarized !== folderNameStandarized;
      if(isBusy && isDifferent){
        console.log("ME fui en el put");
        throw new AppError("Ya existe novedad con ese título", 409, "Ya existe novedad con ese título")}
      let urlImages = urls;
      if (oldFolderNameStandarized !== folderNameStandarized) {
        const { deleteData } = await BlogRepository.deleteImage(oldFolderNameStandarized);
      }
      // Si urlImages existe y no es un array, lo convertimos en uno
      if (urlImages && !Array.isArray(urlImages)) {
        urlImages = [urlImages];
      }

      const images = [...(urlImages || []), ...(req.files || [])];
      const { data, error, url } = await BlogRepository.addMultipleImage(
        images,
        folderNameStandarized,
        true
      );

      if (error) {
        throw new AppError(
          error.code,
          error.status,
          "No se subieron las imágenes correctamente. Revise las credenciales"
        );
      }
      res.status(200).send({ data, url });
    } catch (e) {
      console.log(e)
      next(e);
    }
  }
);

export default blogImgRouter;
