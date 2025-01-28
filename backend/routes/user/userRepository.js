import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export class UserRepository {
  static async createAuthenticatedUser({ username, email, password }) {
    // Validaciones para nombre de usuario (ver librerias para validaciones completas (como zod, aunque este es con TS))
    if (typeof username !== "string") {
      throw new Error(
        "El nombre de usuario tiene que ser una cadena de texto."
      );
    }

    if (!/^[a-zA-Z0-9_.-]{3,20}$/.test(username))
      throw new Error("Nombre de usuario inválido");
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/.test(
        password
      )
    )
      //throw new Error("Contraseña insegura"); // DEVOLVER OBJETO DE RESPUESTA CON ESTADO Y MENSAJE DE ERROR
      console.log("Contraseña insegura");

    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) console.log(error);
    // Verificar si el usuario ya existe
    const { data: existingUsername } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username);

    if (existingUsername && existingUsername.length > 0)
      throw new Error("Usuario ya registrado");
    /*
    else {
      let { data: profiles, error } = await supabase
        .from("profiles")
        .update({ username: username })
        .eq("user_id", await supabase.auth.getUser().id);
      console.log(profiles);
      if (error) console.log(error);
    }
*/
    return data;
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
      console.log("Entro al condicional 1");

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
      console.log("Entro al condicional 2");

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

  static login({ username, password }) {}
}
