import { Router } from "express";

const logoutRouter = Router();

logoutRouter.post("/", (req, res) => {
  res.send("<h1>LOGOUT PRUEBA</h1>");
});

export default logoutRouter;
