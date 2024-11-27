import mongoose from 'mongoose';

const etiquetaSchema = new mongoose.Schema({
    nombre_etiqueta: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }
});

const Etiqueta = mongoose.model("etiquetas", etiquetaSchema);

export default Etiqueta;