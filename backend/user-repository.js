import DBLocal from 'db-local'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
// Utilizo las dependencias para facilitar bd local y encriptamiento de passwords
const { Schema } = new DBLocal({ path: './db'})

// Creo el esquema para guardar unsuarios en mi db
const User = Schema('User', {
    _id: {type : String, require: true},
    username: { type: String, require: true},
    password: { type: String, require: true}
})

export class UserRepository {

    static async create({ username, password }){
        
        Validation.username(username);
        Validation.password(password);
        // Verifico si el usuario no existe en mi sistema
        const user = User.findOne({ username });
        if (user) throw new Error('El nombre de usuario ya existe');

        const id = crypto.randomUUID();

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10); 
        User.create({
            _id: id,
            username,
            password: hashedPassword
        }).save();

        return id;
    }
    static async login({ username, password }){
        Validation.username(username);
        Validation.password(password);

        const user = User.findOne({ username });
        if (!user) throw new Error('El Usuario no existe');
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error('La contraseña es incorrecta');
        return {
            username: user.username, 
            _id: user._id
        };
    }

}
class Validation {
    static username (username) {
        if (typeof username !== 'string') throw new Error('El nombre de usuario debe ser una cadena de caracteres');
        if (username.length < 3) throw new Error('El nombre de usuario debe tener mas de 3 caracteres ')
    }
    static password (password ){
        if(typeof password !== 'string') throw new Error('La contraseña debe ser una cadena de caracteres');
        if(password.length < 6) throw new Error('La contraseña debe poseer mas de 6 caracteres');    
    }
}