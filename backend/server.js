import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Resend } from "resend";

const app = express();
const PORT = process.env.PORT || 3001;

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(
  cors({
    origin: "https://elclubdelfilete.com.ar",
    methods: ["POST"],
  })
);
app.use(bodyParser.json());

app.post("/api/submit", async (req, res) => {
  try {
    const { nombre, email, descripcion } = req.body;

    if (!nombre || !email || !descripcion) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    if (!/^[A-Za-z\s]+$/.test(nombre)) {
      return res.status(400).json({ error: "Nombre inválido" });
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    if (descripcion.length > 200) {
      return res
        .status(400)
        .json({ error: "La descripción es demasiado larga" });
    }

    const { data, error } = await resend.emails.send({
      from: `${nombre} <contacto@elclubdelfilete.com.ar>`,
      to: "peporobinet01@gmail.com",
      subject: "Consulta",
      html: `<p>Hola, mi nombre es ${nombre}. ${descripcion}</p>
                 <p>Mi email de contacto es: ${email}</p>`,
    });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error enviando el correo" });
    }

    return res
      .status(200)
      .json({ message: "Correo enviado exitosamente", data });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ error: "Error en el servidor", details: e.message });
  }
});

// Ruta para manejar cualquier otra solicitud (404)
app.use((req, res) => {
  res.status(404).send("<h1>Recurso no encontrado</h1>");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});
