import { Router } from "express";
import { BlogRepository } from "./blogRepository.js";
import multer from "multer"
const blogImgRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Consulta sobre las imágenes del storage
// Prueba recuperando un storage reestructurado llamado novedades
blogImgRouter.get("/", async (req, res) => {
  try {
    const data = await BlogRepository.getAllBlogsImages();
    res.send(data);
  } catch (e) {
    return res.status(500).json(e);
  }
});

blogImgRouter.post("/", upload.single("image"), async (req, res) => {
  try {
    const { imgName, folderName } = req.body;
    const image = req.file.buffer; // El archivo cargado
    const data = await BlogRepository.addImage(image, folderName, imgName , req.file.mimetype);
    res.send(data);
  }
  catch (err){
    return res.status(500).json(err);
  }
})


blogImgRouter.delete("/", async (req, res)=> {
  try{
    const {folderName} = req.body;
    const data = await BlogRepository.deleteImage(folderName);
    res.send(data);
  }
  catch (err){
    res.status(500).json(err);
  }
})

export default blogImgRouter;
