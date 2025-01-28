export const validateResendData = (req, res, next) => {
  const { nombre, email, descripcion } = req.body;

  if (!nombre || !email || !descripcion) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  if (!/^[A-Za-z\s]+$/.test(nombre)) {
    return res.status(400).json({ error: "Nombre inválido" });
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  if (descripcion.length > 200) {
    return res.status(400).json({ error: "La descripción es demasiado larga" });
  }

  next();
};

export const validateLogin = (req, res, next) => {};
