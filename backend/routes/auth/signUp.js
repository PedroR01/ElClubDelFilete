import { Router } from "express";
import { UserRepository } from "../user/userRepository.js";

const signUpRouter = Router();

signUpRouter.post("/", (req, res) => {
  const { username, email, password } = req.body;
  try {
    const data = UserRepository.createAuthenticatedUser({
      username,
      email,
      password,
    });
    res.send(data);
  } catch (e) {
    throw new Error(e);
  }
});

export default signUpRouter;
