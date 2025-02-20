import { Router } from "express";
import { BlogRepository } from "./blogRepository.js";
import multer from "multer";
import { AppError } from "../../errors/appError.js";
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
    const { imgName, folderName } = req.body;
    const image = req.file.buffer; // El archivo cargado
    const data = await BlogRepository.addImage(
      image,
      folderName,
      imgName,
      req.file.mimetype
    );
    res.send(data);
  } catch (err) {
    next(err);
  }
});

blogImgRouter.post("/test", upload.single("image"), async (req, res, next) => {
  try {
    // Si le saco el imgName y la const image queda ighual al del array.
    const { imgName, folderName } = req.body; // Hace falta el imgName?
    const image = req.file.buffer; // El archivo cargado
    const { data, error, url } = await BlogRepository.addImageTest(
      image,
      imgName,
      folderName,
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
    // next(e);
    console.log(e);
  }
});

blogImgRouter.post(
  "/test/array",
  upload.array("images"),
  async (req, res, next) => {
    try {
      const { folderName } = req.body;

      const { data, error, url } = await BlogRepository.addMultipleImageTest(
        req.files,
        folderName
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
      console.error("Catch del endpoint: " + e);
      // res.status(500).json({ error: "Error al subir imágenes" });
    }
  }
);

blogImgRouter.delete("/", async (req, res, next) => {
  try {
    const { folderName } = req.body;
    if (!folderName)
      throw new AppError(
        "MissingDataError",
        400,
        "No se enviaron los datos solicitados"
      );
    const data = await BlogRepository.deleteImage(folderName);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

blogImgRouter.put("/test/:oldFolderName", upload.single("image"), async (req, res, next) =>{
  try{
    const { oldFolderName } = req.params;// El título del blog a actualiza
    const { imgName, folderName } = req.body; // Hace falta el imgName?
    const image = req.file.buffer; // El archivo cargado
    if(oldFolderName !== folderName){
      const {deleteData} = await BlogRepository.deleteImage(oldFolderName)}
    const { data, error, url } = await BlogRepository.addImageTest(
        image,
        imgName,
        folderName,
        req.file.mimetype
      );
      if (error)
        throw new AppError(
          error.code,
          error.status,
          error.code
        );
    res.send({data, url})

  }
  catch (err){
    next(err);
  }
});

export default blogImgRouter;
