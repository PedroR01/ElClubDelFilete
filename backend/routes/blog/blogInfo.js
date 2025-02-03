import { Router } from "express";
import { BlogRepository } from "./blogRepository.js";

const blogInfoRouter = Router();

blogInfoRouter.get("/", async (req, res) => {
  try {
    const data = await BlogRepository.getAllBlogsInfo();
    res.send(data);
  } catch (e) {
    res.status(500).json(e);
  }
});

export default blogInfoRouter;
