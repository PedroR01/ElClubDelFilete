require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { resend } = require('resend');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());  // Para leer el cuerpo de las solicitudes POST

app.post('/api/submit', (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'El nombre, el email y el mensaje son obligatorios' });
  }
  try {
    resend.emails.send({
        from: `${email}`,
        to: 'massimoparzanese@gmail.com',
        subject: 'Consulta',
        html: `<p>Hola,soy ${nombre}, ${mensaje}</p>`
      });
  }
  catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: 'Hubo un problema al enviar el correo' });
  }
  console.log(`Email recibido: ${email}`);

  res.status(200).json({ message: 'Datos recibidos correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});