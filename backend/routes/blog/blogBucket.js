import { Router } from "express";
import { BlogRepository } from "./blogRepository.js";
import multer from "multer"
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
    const data = await BlogRepository.addImage(image, folderName, imgName , req.file.mimetype);
    res.send(data);
  }
  catch (err){
    next(err);
  }
})


blogImgRouter.delete("/", async (req, res,next)=> {
  try{
    const {folderName} = req.body;
    if(!folderName)
      throw new AppError("MissingDataError",400,"No se enviaron los datos solicitados")
    const data = await BlogRepository.deleteImage(folderName);
    res.send(data);
  }
  catch (err){
    next(err);
  }
})

export default blogImgRouter;
