import { Router } from "express";

const loginRouter = Router();

loginRouter.post("/", (req, res) => {
  res.send("<h1>LOGIN PRUEBA</h1>");
});

export default loginRouter;
