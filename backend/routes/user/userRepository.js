import supabase from "../supabaseClient.js";

// La duración de las cookies en JavaScript se establece en milisegundos (ms).
// Calculamos el equivalente a 1 hora
// - 1 hora tiene 60 minutos
// - Cada minuto tiene 60 segundos
// - Cada segundo tiene 1000 milisegundos

const DURATION_ACCESS_COOKIE = 60 * 60 * 1000;

// Calculamos el tiempo equivalente a 1 semana:
// - 7 días
// - Cada día tiene 24 horas
// - Cada hora tiene 60 minutos
// - Cada minuto tiene 60 segundos
// - Cada segundo tiene 1000 milisegundos

const DURATION_REFRESH_COOKIE = 7 * 24 * 60 * 60 * 1000;

// ambas constantes representan las duraciones en ms de las cookies utilizadas
export class UserRepository {
  static async createAuthenticatedUser({ username, email, password }) {
    // Validaciones para nombre de usuario (ver librerias para validaciones completas (como zod, aunque este es con TS))
    if (typeof username !== "string")
      return {
        status: 400,
        message:
          "Formato de campo inválido. El nombre de usuario tiene que ser una cadena de texto.",
      };

    if (!/^[a-zA-Z0-9_.-]{3,20}$/.test(username))
      return {
        status: 400,
        message:
          "Nombre de usuario no válido. No se admiten caracteres especiales.",
      };

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/.test(
        password
      )
    )
      return { status: 400, message: "Contraseña insegura." };

    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error)
      return {
        status: 500,
        message: "Error en la autenticación de la cuenta. " + error,
      };
    // Verificar si el usuario ya existe
    const { data: existingUsername } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username);

    if (existingUsername && existingUsername.length > 0)
      return {
        status: 400,
        message:
          "Nombre de usuario ya ocupado - Usuario ya existente en la BD.",
      };

    return {
      status: 200,
      message:
        "Datos de usuario recibidos correctamente. Esperando confirmación por correo para finalizar la autenticación",
    };
  }

  // Metodo encargado de añadir a la tabla de "profiles" en la BD solo a aquellos usuarios con autenticación CONFIRMADA.
  static async createProfile({ userId, newEmail, old_record }) {
    // Consulta si ya existe un perfil asociado al usuario
    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("id, username")
      .eq("user_id", userId);

    if (fetchError) {
      console.error("Error fetching profile:", fetchError.message);
      return { status: 500, message: "Failed to fetch profile" }; //res.status(500).json({ error: "Failed to fetch profile" });
    }

    if (existingProfile !== "") {
      // Si no existe, inserta un nuevo perfil
      const { error: insertError } = await supabase.from("profiles").insert({
        user_id: userId,
        username: newEmail,
        role: "user",
      });

      if (insertError) {
        console.error("Error inserting profile:", insertError.message);
        return { status: 500, message: "Failed to create profile" }; //res.status(500).json({ error: "Failed to create profile" });
      }

      return { status: 200, message: "Profile created successfully" }; //res.status(200).json({ message: "Profile created successfully" });
    } else if (old_record && old_record.email !== newEmail) {
      // Si ya existe el perfil y el correo ha cambiado, actualiza el email
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ username: newEmail })
        .eq("user_id", userId);

      if (updateError) {
        console.error("Error updating profile:", updateError.message);
        return { status: 500, message: "Failed to update profile" }; //res.status(500).json({ error: "Failed to update profile" });
      }

      return { status: 200, message: "Profile updated successfully" }; //res.status(200).json({ message: "Profile updated successfully" });
    }

    return { status: 400, message: "Invalid event or no action required" };
  }

  static async logIn({ username, password, res }) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });
      /*
        const access_token = data.session.access_token;
        const refresh_token = data.session.refresh_token;
        */

      res.cookie("access_token", data.session.access_token, {
        httpOnly: true,
        secure: false, // cambiar a true en producción
        maxAge: DURATION_ACCESS_COOKIE,
        sameSite: "Strict",
      });
      res.cookie("refresh_token", data.session.refresh_token, {
        httpOnly: true,
        secure: false, // cambiar a true en producción
        maxAge: DURATION_REFRESH_COOKIE,
        sameSite: "Strict",
      });
      return { status: 200, message: "Log In correcto" };
      //return { access_token, refresh_token};
    } catch (e) {
      return {
        status: 400,
        message: "No se pudo realizar la autenticación de inicio",
        error: e,
      };
    }
  }

  static async logOut(res) {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) return error;
      else {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        return { status: 200, message: "Sesión cerrada con éxito" };
      }
    } catch (e) {
      return {
        status: 400,
        message: "No se pudo realizar el cierre de sesión",
        error: e,
      };
    }
  }

  static async refreshUserCookie(token, refToken, res) {
    // Verifica el acceso del usuario con el access_token
    console.log("verifique los tokens pibe");
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (!token || error) {
      try {
        console.log("Token inválido, intentando refrescar...");

        if (!refToken) {
          return { status: 401, message: "Inicie sesión nuevamente" };
        }
        // Intenta refrescar la sesión usando el refresh_token
        const { data, error } = await supabase.auth.refreshSession({
          refresh_token: refToken,
        });

        if (error) {
          console.log("Error al refrescar sesión:", error.message);
          res.clearCookie("access_token");
          res.clearCookie("refresh_token");
          return res.status(401).json({ error: "Usuario no autorizado" });
        }

        const { session, user } = data;
        console.log("Sesión refrescada:", session);

        // Establece las cookies con los nuevos tokens
        res.cookie("access_token", session.access_token, {
          httpOnly: true,
          secure: false, // Cambiar a true en producción
          maxAge: DURATION_ACCESS_COOKIE, // 20 minutos para la cookie de access_token
          sameSite: "strict",
        });

        res.cookie("refresh_token", session.refresh_token, {
          httpOnly: true,
          secure: false, // Cambiar a true en producción
          maxAge: DURATION_REFRESH_COOKIE, // Largo para refresh token
          sameSite: "strict",
        });

        res.send({ message: "Refresco exitoso" });
      } catch (err) {
        console.log("Error al intentar refrescar sesión:", err);
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        return res.status(401).json({ error: "Usuario no autorizado" });
      }
    }

    return { data: true }; // Sesión verificada con éxito
  }
}
