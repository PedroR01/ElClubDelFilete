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
    /*
    const {access_token, refresh_token} = await UserRepository.logIn({
      username,
      password,
      res,
    });
    
    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: false, // cambiar a true en producción
      maxAge: 60 * 60 * 1000,
      sameSite: "Strict",
    });
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false, // cambiar a true en producción
      maxAge: 1700000000000,
      sameSite: "Strict",
    });
    */
    res.send(data);
  } catch (e) {
    return res.status(500).json(e);
  }
});
export default loginRouter;
