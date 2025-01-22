import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Resend } from "resend";
import { createClient } from '@supabase/supabase-js';
import  cookieParser  from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Simula la variable global de dirección dinámica `__dirname` de CommonJS en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(
  cors({
    origin: ["https://elclubdelfilete.com.ar", "http://localhost:5173", "http://localhost:3001"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  const htmlResponse = `
    <html>
      <head>
        <title>NodeJs y Express en Vercel</title>
      </head>
      <body>
        <h1>Soy un proyecto Back end en vercel</h1>
      </body>
    </html>
  `;
  res.send(htmlResponse);
});

app.get("/api/submit", (req, res) => {
  const htmlResponse = `
    <html>
      <body>
        <h1>Esta es la dirección donde se comúnica con la API Resend.</h1>
      </body>
    </html>
  `;
  res.send(htmlResponse);
});

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
      to: "elclubdelfilete@gmail.com",
      subject: "Consulta",
      html: `<p>Hola, mi nombre es ${nombre}. ${descripcion}</p>
                 <p>Mi email de contacto es: ${email}</p>`,
    });

    if (error) {
      console.error(error);
      return res.status(error.code).json({
        title: "Error con API al intentar enviar el mail",
        error: error.name,
        description: error.message,
      });
    }

    return res
      .status(200)
      .json({ message: "Correo enviado exitosamente", data });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ error: "Error en el servidor", description: e.message });
  }
});
// Inicio de como consultar base de datos para login
app.post("/api/login", async (req, res) => {
  try {
    
    const { username, password} = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    })
    
  res.cookie('access_token', data.session.access_token,{
      httpOnly : true,
      secure: false, // cambiar a true en producción 
      maxAge: 60 * 60 * 1000,
      sameSite: 'strict',
  })
  res.cookie('refresh_token', data.session.refresh_token,{
      httpOnly : true,
      secure: false, // cambiar a true en producción 
      maxAge: 1700000000000,
      sameSite: 'strict',
    })
    
    res.send({message: 'Login succesfully'})
  }
  catch (e) {
    console.log(e);
    res.send('No se pudo realizar la autenticación')
  }
})

app.post("/api/register", async (req, res) => {
  try {
  const { username , password} = req.body
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(username)) {
    return res.status(400).json({ error: "Email inválido" });
  }
  if(password.length < 6)
    return res.status(400).json({ error: "La contraseña debe poseer más de 6 caracteres" });
  
  const { data, error } = await supabase.auth.signUp({
    email: username,
    password: password,
  })
  if (error){
    
    res.send({error})
  }
  else{
  res.send({data});}
  }
  catch (err){
    res.send(err);
  }
})

app.post("/api/verify", async (req, res) => {
    console.log('Consulta recibida');
    const token = req.cookies['access_token'];
    const refToken = req.cookies['refresh_token'];
  
    if (!token) {
      return res.status(401).json({ error: "No token found" });
    }
  
    // Verifica el acceso del usuario con el access_token
    const { data: { user }, error } = await supabase.auth.getUser(token);
  
    if (!user && error) {
      try {
        console.log('Token inválido, intentando refrescar...');
        
        // Intenta refrescar la sesión usando el refresh_token
        const { data, error } = await supabase.auth.refreshSession({ refresh_token: refToken });
  
        if (error) {
          console.log('Error al refrescar sesión:', error.message);
          res.clearCookie('access_token');
          res.clearCookie('refresh_token');
          return res.status(401).json({ error: "Usuario no autorizado" });
        }
  
        const { session, user } = data;
        console.log('Sesión refrescada:', session);
  
        // Establece las cookies con los nuevos tokens
        res.cookie('access_token', session.access_token, {
          httpOnly: true,
          secure: false, // Cambiar a true en producción
          maxAge: 60 * 60 * 1000, // 20 minutos para la cookie de access_token
          sameSite: 'strict',
        });
  
        res.cookie('refresh_token', session.refresh_token, {
          httpOnly: true,
          secure: false, // Cambiar a true en producción
          maxAge: 1700000000000, // Largo para refresh token
          sameSite: 'strict',
        });
  
        res.send({ message: 'Refresco exitoso' });
  
      } catch (err) {
        console.log('Error al intentar refrescar sesión:', err);
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        return res.status(401).json({ error: "Usuario no autorizado" });
      }
    }
  
    return res.send({ data: true }); // Sesión verificada con éxito
  });

app.post("/api/logout", async (req, res) => {
  console.log("Consulta sobre cierre")
  try{
  const { error } = await supabase.auth.signOut()
  if(error)
    res.send(error)
  else{
    res.clearCookie('access_token')
    res.clearCookie('refresh_token');
    res.send({ message: 'Sesión cerrada con éxito'})
  }}
  catch (err){
    res.send({err})
  }
})


// Me traigo los blogs para la page de blogs
app.get("/api/blogs", async (req, res) =>{
  try {
    let { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    
    console.log(profiles, error);
    res.send({profiles, error})
    }catch (e){
      res.send({e})
    }
})
// Consulta sobre las imágenes del storage
// Dato no menor: Los storage que se desean consultar deben ser PUBLICOS
// Prueba recuperando storage en prueba_storage
app.get("/api/storage", async (req, res) => {
  try {
    // Listar las subcarpetas dentro de "novedades"
    const { data: subcarpetas, error: errorSubcarpetas } = await supabase
      .storage
      .from('prueba_storage')  // Bucket 'prueba_storage'
      .list('novedades', {    // Carpeta 'novedades'
        recursive: false,      // No recursivo para obtener solo las subcarpetas
      });

    if (errorSubcarpetas) {
      console.error('Error al obtener las subcarpetas:', errorSubcarpetas);
      return res.status(500).send({ error: 'Error al obtener las subcarpetas' });
    }

    // Obtener los archivos dentro de cada subcarpeta
    const archivosPorSubcarpeta = await Promise.all(
      subcarpetas.map(async (subcarpeta) => {
        const { data: archivos, error: errorArchivos } = await supabase
          .storage
          .from('prueba_storage')
          .list(`novedades/${subcarpeta.name}`, {  // Usar la ruta completa de la subcarpeta
            recursive: true,  // Recursivo para obtener todos los archivos dentro
          });

        if (errorArchivos) {
          console.error(`Error al obtener archivos de ${subcarpeta.name}:`, errorArchivos);
          return [];
        }

        return archivos;
      })
    );
    console.log(subcarpetas)
    // Obtener la URL pública de cada archivo
    const imagenesUrls = [];
    let i = 0;
    for (const archivos of archivosPorSubcarpeta) {
      const nombre = subcarpetas[i].name
      for (const archivo of archivos) {
        // Construir la ruta completa del archivo (incluir la subcarpeta y el archivo dentro de ella)
        const rutaCompleta = `novedades/${nombre}/${archivo.name}`;  // Esta línea asume que archivo.name incluye la subcarpeta y el archivo

        // Obtener la URL pública del archivo
        const { data: urlData, error: urlError } = await supabase
          .storage
          .from('prueba_storage')
          .getPublicUrl(rutaCompleta);  // Usar la ruta completa para obtener la URL pública

        if (urlError) {
          console.error('Error al obtener la URL para el archivo:', archivo.name, urlError);
          continue;  // Continuar con el siguiente archivo si hay un error
        }

        // Añadir la URL pública al array
        imagenesUrls.push(urlData);  // Aquí se accede a la propiedad 'publicURL' correctamente
      }
      i++;
    }

    // Si no se encontraron imágenes, enviar una respuesta vacía
    if (imagenesUrls.length === 0) {
      return res.status(404).send({ error: 'No se encontraron imágenes' });
    }

    // Responder con las URLs de los archivos
    res.send({ imagenesUrls });
  } catch (e) {
    console.error('Error general:', e);
    res.status(500).send({ error: 'Error al procesar la solicitud' });
  }
});

// Prueba recuperando un storage reestructurado llamado novedades
app.get("/api/storage2", async (req, res) => {
  try{
  const { data: subcarpetas, error: errorSubcarpetas } = await supabase
      .storage
      .from('Novedades')  // Bucket 'prueba_storage'
      .list('')
      const urlImg = []
      const obtenerUrlsPublicas = async (subcarpetas) => {
        for (const carpeta of subcarpetas) {
          try {
            // Listar archivos dentro de la carpeta
            const { data: archivos, error: errorArchivos } = await supabase
              .storage
              .from('Novedades')
              .list(carpeta.name);
  
            if (errorArchivos) {
              console.error(`Error obteniendo archivos de ${carpeta.name}:`, errorArchivos);
              continue;
            }
  
            if (archivos.length > 0) {
              // Obtener la URL del primer archivo de la carpeta
              const { data: urlImage } = supabase.storage
                .from('Novedades')
                .getPublicUrl(`${carpeta.name}/${archivos[0].name}`);
  
              urlImg.push({
                carpeta: carpeta.name,
                url: urlImage
              });
            }
          } catch (err) {
            console.error('Error en la solicitud:', err);
          }
        }
      };
  
      await obtenerUrlsPublicas(subcarpetas);

      res.status(200).send({ urlImg });

    }
  catch (err){
    res.send({err})
  }
})

// Ruta para manejar cualquier otra solicitud (404)
app.use((req, res) => {
  res.status(404).send("<h1>Recurso no encontrado</h1>");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});
