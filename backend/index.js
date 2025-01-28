import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import cors from "cors";
import resendRouter from "./routes/api/resend.js";
import loginRouter from "./routes/auth/login.js";
import logoutRouter from "./routes/auth/logout.js";
import registerRouter from "./routes/auth/signUp.js";
import confirmAuthUserRouter from "./routes/user/webhooks/confirmAuthUser.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Simula la variable global de dirección dinámica `__dirname` de CommonJS en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

// CORS middleware
app.use(
  cors({
    origin: ["https://elclubdelfilete.com.ar", "http://localhost:5173"],
  })
);
app.use(express.json());

app.use("/api/submitResend", resendRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/signup", registerRouter);
app.use("/webhook/confirmed_auth_user", confirmAuthUserRouter);

// app.use("/protected", protectedRouter);

// Ruta para manejar cualquier otra solicitud (404)
app.use((req, res) => {
  res.status(404).send("<h1>Recurso no encontrado</h1>");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});
