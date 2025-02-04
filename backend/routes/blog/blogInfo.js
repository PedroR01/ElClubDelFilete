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

blogInfoRouter.post("/", async (req, res) => {
  try{
    const {tag, title, description, introduction, content_sections, featured_pos } = req.body;
    const data = await BlogRepository.addBlog(tag, title, description, introduction, content_sections, featured_pos);
    res.send(data)
  }
  catch (err){
    res.status(500).json(err);
  }
})

blogInfoRouter.delete("/", async (req,res) => {
  try{
    const {title} = req.body;
    const data = await BlogRepository.deleteBlog(title);
    res.send(data)
  }
  catch (err){
    res.status(500).json(err);
  }
        
  }
)
export default blogInfoRouter;
