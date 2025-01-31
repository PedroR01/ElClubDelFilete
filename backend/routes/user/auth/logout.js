import { Router } from "express";
import { UserRepository } from "../userRepository.js";

const logoutRouter = Router();

logoutRouter.post("/", async (req, res) => {
  try {
    const data = await UserRepository.logOut(res);
    res.send(data);
  } catch (e) {
    return res.status(500).json(e);
  }
});

export default logoutRouter;
