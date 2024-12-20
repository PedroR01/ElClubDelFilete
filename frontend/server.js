import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import { Resend } from 'resend';
const app = express();
const PORT = process.env.PORT || 3001;


dotenv.config();

const resend= new Resend(process.env.VITE_RESEND_API_KEY)

app.use(cors());
app.use(bodyParser.json());  // Para leer el cuerpo de las solicitudes POST

app.post('/api/submit', (req, res) => {
  const { nombre, email ,descripcion } = req.body;

  (async function () {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['massimoparzanese@gmail.com'],
      subject: 'Consulta',
      html: `<p>Hola mi nombre es ${nombre}, ${descripcion}  </p>
             <p>Mi email de contacto ${email}</p>`,
    });
  
    if (error) {
      return console.error({ error });
    }
  
    console.log({ data });
  })();
});
 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});