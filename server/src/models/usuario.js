import mongoose from 'mongoose';

// Definimos el esquema de Usuario
const usuarioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    contraseña: {
        type: String,
        required: true,
    },
    es_empresa: {
        type: Boolean,
        default: false,
    },
});

// Creamos el modelo basado en el esquema de Usuario
const Usuario = mongoose.model("users", usuarioSchema);

export default Usuario;