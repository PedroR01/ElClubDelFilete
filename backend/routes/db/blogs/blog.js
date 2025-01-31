import { Router } from "express";

const blogInfoRouter = Router();

blogInfoRouter.get("/", async (req, res) => {
  try {
    let { data: blogs, error } = await supabase.from("blogs").select("*");

    console.log(profiles, error);
    res.send({ profiles, error });
  } catch (e) {
    res.send({ e });
  }
});

export default blogInfoRouter;
