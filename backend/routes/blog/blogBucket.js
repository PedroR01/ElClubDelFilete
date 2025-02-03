import { Router } from "express";
import { BlogRepository } from "./blogRepository.js";

const blogImgRouter = Router();

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

export default blogImgRouter;
