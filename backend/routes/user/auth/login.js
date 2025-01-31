import { Router } from "express";
import { UserRepository } from "../userRepository.js";

const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const data = await UserRepository.logIn({
      username,
      password,
      res,
    });
    res.send(data);
  } catch (e) {
    return res.status(500).json(e);
  }
});
export default loginRouter;
