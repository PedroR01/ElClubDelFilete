import { Router } from "express";
import { UserRepository } from "../userRepository.js";

const logedUserCookiesRouter = Router();

logedUserCookiesRouter.post("", async (req, res) => {
  try {
    const token = req.cookies["access_token"];
    const refToken = req.cookies["refresh_token"];
    if (!token) {
      return res.status(401).json({ error: "No token found" });
    }
    const data = await UserRepository.refreshUserCookie(token, refToken, res);
    res.send(data);
  } catch (e) {
    return res.status(500).json(e);
  }
});

// Otra alternativa para obtener las cookies del usuario logeado.
/*
app.get("/api/verifySecond", async (req, res) => {
  try {
    const accessToken = req.cookies["access_token"];
    const refreshToken = req.cookies["refresh_token"];
    // Verificar si existen cookies
    if (!accessToken && !refreshToken) {
      return res
        .status(401)
        .json({ message: "No hay sesión activa, inicie sesión nuevamente" });
    }
    // Intentar verificar la sesión con el access token actual
    const { data: session, error } = await supabase.auth.getUser(accessToken);
    if (!accessToken || error) {
      console.log(
        "El token de acceso es inválido o ha expirado. Intentando refrescar..."
      );

      if (!refreshToken) {
        return res
          .status(401)
          .json({
            message:
              "Token de refresco no encontrado. Inicie sesión nuevamente.",
          });
      }

      // Intentar renovar el token con el refresh token
      const { data: refreshedSession, error: refreshError } =
        await supabase.auth.refreshSession({
          refresh_token: refreshToken,
        });

      if (refreshError) {
        return res
          .status(401)
          .json({ message: "Sesión expirada, vuelva a iniciar sesión" });
      }

      // Guardar el nuevo access_token y refresh_token en cookies
      res.cookie("access_token", refreshedSession.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000,
        sameSite: "Strict",
      });

      res.cookie("refresh_token", refreshedSession.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1700000000000,
        sameSite: "Strict",
      });

      return res.json({ message: "Sesión renovada" });
    }

    // Si el token es válido, devolver el usuario
    return res.json({ message: "Sesión válida", user: session.user });
  } catch (error) {
    console.error("Error verificando la sesión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

*/
export default logedUserCookiesRouter;
