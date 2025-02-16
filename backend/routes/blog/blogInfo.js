import { Router } from "express";
import { BlogRepository } from "./blogRepository.js";
import { AppError } from "../../errors/appError.js";

const blogInfoRouter = Router();

blogInfoRouter.get("/", async (req, res, next) => {
  try {
    const data = await BlogRepository.getAllBlogsInfo();
    res.send(data);
  } catch (e) {
    next(e);
  }
});

blogInfoRouter.post("/", async (req, res, next) => {
  try {
    const {
      tag,
      title,
      description,
      introduction,
      content_sections,
      featured_pos,
      bucket_folder_url,
    } = req.body;
    const { data, error } = await BlogRepository.addBlog(
      tag,
      title,
      description,
      introduction,
      content_sections,
      featured_pos,
      bucket_folder_url
    );
    if (error)
      throw new AppError(
        error.code,
        error.status,
        "No se añadió el blog correctamente. Revise las credenciales"
      );
    res.send(data);
  } catch (e) {
    next(e);
  }
});

blogInfoRouter.post("/test", async (req, res, next) => {
  try {
    const { content_sections } = req.body;
    const { data, error } = await BlogRepository.addTestBlog(content_sections);
    if (error)
      throw new AppError(
        error.code,
        error.status,
        "No se añadió el blog correctamente. Revise las credenciales"
      );
    res.send(data);
  } catch (e) {
    // next(e);
    console.log(e);
  }
});

blogInfoRouter.delete("/", async (req, res, next) => {
  try {
    const { title } = req.body;
    const data = await BlogRepository.deleteBlog(title);
    res.send(data);
  } catch (e) {
    next(e);
  }
});
export default blogInfoRouter;
