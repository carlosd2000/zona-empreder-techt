import mongoose from 'mongoose';

// Se crea un const para definir el esquema, por si en el futuro hay que cambiarlo o agregarle algo
const aplicacionSchema = new mongoose.Schema({
    nombreApp: {
        type: String,
        required: true,
    },
    iconoApp: {
        type: String,
        required: true,
    },
    etiquetas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "etiquetas",
    }],
    linkApp: {
        type: String,
    },
    
});

const Aplicacion = mongoose.model('aplicaciones', aplicacionSchema);

export default Aplicacion;