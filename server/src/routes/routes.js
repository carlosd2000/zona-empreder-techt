import { Router } from 'express';

// Para usar sus metodos los metodos lo guardamos en constante.
const router = Router();

import {
  getAplicaciones,
  getAplicacionesById,
  addAplicacion,
  updateAplicacion,
  deleteAplicacion
} from '../controllers/aplicacionesController.js';

import {
  getEtiquetas,
  getEtiquetaById,
  addEtiqueta,
  updateEtiqueta,
  deleteEtiqueta
} from "../controllers/etiquetasController.js"; // Importamos todos los controladores para etiquetas

import {
  getUsuarios,
  getUsuarioById,
  addUsuario,
  updateUsuario,
  deleteUsuario,
  validateUserLogin
} from '../controllers/usuariosController.js'; // Importamos los controladores



// Rutas para aplicaciones
router.get('/aplicaciones', getAplicaciones);
router.get('/aplicaciones/:id', getAplicacionesById);
router.post('/aplicaciones', addAplicacion);
router.put('/aplicaciones/:id', updateAplicacion);
router.delete('/aplicaciones/:id', deleteAplicacion);

// Rutas para etiquetas
router.get('/etiquetas', getEtiquetas); // Obtener todas las etiquetas
router.get('/etiquetas/:id', getEtiquetaById); // Obtener una etiqueta por ID
router.post('/etiquetas', addEtiqueta); // Crear una nueva etiqueta
router.put('/etiquetas/:id', updateEtiqueta); // Actualizar una etiqueta por ID
router.delete('/etiquetas/:id', deleteEtiqueta); // Eliminar una etiqueta por ID

// Rutas para usuarios
router.get('/usuarios', getUsuarios); // Obtener todos los usuarios
router.get('/usuarios/:id', getUsuarioById); // Obtener un usuario por ID
router.post('/usuarios', addUsuario); // Crear un nuevo usuario
router.put('/usuarios/:id', updateUsuario); // Actualizar un usuario por ID
router.delete('/usuarios/:id', deleteUsuario); // Eliminar un usuario por ID

// Nueva ruta para validar el login
router.post('/login', validateUserLogin);

export default router; // Exportamos el router para utilizarlo en el archivo principal (index.js)
