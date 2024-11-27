import Etiqueta from '../models/etiquetas.js';

// Obtener todas las etiquetas
const getEtiquetas = async (req, res) => {
    try {
        const etiquetas = await Etiqueta.find();
        res.json(etiquetas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las etiquetas" });
    }
};

// Obtener una etiqueta por ID
const getEtiquetaById = async (req, res) => {
    try {
        const etiqueta = await Etiqueta.findById(req.params.id);
        if (!etiqueta) return res.status(404).json({ mensaje: "Etiqueta no encontrada" });
        res.json(etiqueta);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la etiqueta" });
    }
};

// Crear una nueva etiqueta
const addEtiqueta = async (req, res) => {
    try {
        const { nombre_etiqueta } = req.body;
        // Verificar si la etiqueta ya existe
        const etiquetaExistente = await Etiqueta.findOne({ nombre_etiqueta });
        if (etiquetaExistente) {
            return res.status(400).json({ mensaje: "La etiqueta ya existe" });
        }

        // Crear la nueva etiqueta
        const nuevaEtiqueta = new Etiqueta({ nombre_etiqueta });
        await nuevaEtiqueta.save(); // Guardar en la base de datos
        res.status(201).json(nuevaEtiqueta); // Devolver la nueva etiqueta creada
    } catch (error) {
        res.status(500).json({ mensaje: "Error al agregar la etiqueta" });
    }
};

// Actualizar una etiqueta por ID
const updateEtiqueta = async (req, res) => {
    try {
        const { nombre_etiqueta } = req.body;
        const etiqueta = await Etiqueta.findByIdAndUpdate(
            req.params.id,
            { nombre_etiqueta },
            { new: true } // Retorna el documento actualizado
        );
        if (!etiqueta) {
            return res.status(404).json({ mensaje: "Etiqueta no encontrada" });
        }
        res.json(etiqueta); // Retorna la etiqueta actualizada
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la etiqueta" });
    }
};

// Eliminar una etiqueta por ID
const deleteEtiqueta = async (req, res) => {
    try {
        const etiqueta = await Etiqueta.findByIdAndDelete(req.params.id);
        if (!etiqueta) {
            return res.status(404).json({ mensaje: "Etiqueta no encontrada" });
        }
        res.json({ mensaje: "Etiqueta eliminada con éxito" }); // Respuesta de eliminación exitosa
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la etiqueta" });
    }
};

export { getEtiquetas, getEtiquetaById, addEtiqueta, updateEtiqueta, deleteEtiqueta };
