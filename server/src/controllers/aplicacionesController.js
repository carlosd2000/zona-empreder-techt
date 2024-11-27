import Aplicacion from '../models/aplicaciones.js';
import Etiqueta  from '../models/etiquetas.js';
// Obtener todas las películas
const getAplicaciones = async (req, res) => {
  try {
      const aplicaciones = await Aplicacion.find()
      .populate("etiquetas", "nombre_etiqueta"); // Poblamos los géneros con el nombre
          res.json(aplicaciones);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener las etiquetas" });
  }
};

// Obtener una app por ID
const getAplicacionesById = async (req, res) => {
  try {
    const aplicacion = await Aplicacion.findById(req.params.id);
    if (!aplicacion) return res.status(404).json({ error: 'Aplicacion no encontrada' });
    res.json(aplicacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la aplicacion' });
  }
};

// Agregar una nueva aplicación
const addAplicacion = async (req, res) => {
  try {
      console.log("Datos recibidos:", req.body); // Verifica los datos enviados
      const etiquetas = await Etiqueta.find({
          _id: { $in: req.body.etiquetas }
      });

      console.log("Etiquetas encontrados:", etiquetas); // Verifica los géneros encontrados

      const aplicacionData = {
          ...req.body,
          etiquetas: etiquetas.map(g => g._id),
      };

      const newAplicacion = new Aplicacion(aplicacionData);
      await newAplicacion.save();
      res.status(201).json(newAplicacion);
  } catch (error) {
      console.error("Error al agregar la aplicación:", error.message);
      res.status(500).json({ error: "Error al agregar aplicación", details: error.message });
  }
};

// Editar una película existente
const updateAplicacion = async (req, res) => {
  try {
    const updateAplicacion = await Aplicacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updateAplicacion) return res.status(404).json({ error: 'Aplicación no encontrada' });
    res.json(updateAplicacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar Aplicación' });
  }
};

// Eliminar una película
const deleteAplicacion = async (req, res) => {
  try {
    const deleteAplicacion = await Aplicacion.findByIdAndDelete(req.params.id);
    if (!deleteAplicacion) return res.status(404).json({ error: 'Aplicación no encontrada' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar Aplicación' });
  }
};

export { getAplicaciones, getAplicacionesById, addAplicacion, updateAplicacion, deleteAplicacion };