import Usuario from '../models/usuario.js';

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find(); // Obtenemos todos los usuarios
        res.json(usuarios); // Enviamos la lista de usuarios
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuarios" });
    }
};

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id); // Buscamos el usuario por ID
        if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
        res.json(usuario); // Enviamos el usuario encontrado
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el usuario" });
    }
};

// Crear un nuevo usuario
const addUsuario = async (req, res) => {
    try {
        const newUsuario = new Usuario(req.body); // Creamos un nuevo usuario con los datos del cuerpo de la solicitud
        await newUsuario.save(); // Guardamos el nuevo usuario en la base de datos
        res.status(201).json(newUsuario); // Respondemos con el nuevo usuario creado
    } catch (error) {
        res.status(500).json({ mensaje: "Error al agregar el usuario" });
    }
};

// Actualizar un usuario existente
const updateUsuario = async (req, res) => {
    try {
        const updatedUsuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Actualizamos el usuario por ID
        res.json(updatedUsuario); // Respondemos con el usuario actualizado
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el usuario" });
    }
};

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id); // Eliminamos el usuario por ID
        res.status(204).send(); // Respondemos con un código de estado 204 (sin contenido)
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el usuario" });
    }
};

// Validar un usuario por correo y contraseña
const validateUserLogin = async (req, res) => {
    try {
      const { email, contraseña } = req.body; // Obtenemos el correo y la contraseña del cuerpo de la solicitud
  
      // Buscamos el usuario por correo electrónico
      const usuario = await Usuario.findOne({ email });
  
      // Si no encontramos el usuario, respondemos con un error
      if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
  
      // Verificamos si la contraseña coincide
      if (usuario.contraseña !== contraseña) {
        return res.status(401).json({ mensaje: "Contraseña incorrecta" });
      }
  
      // Si las credenciales son correctas, devolvemos el id y es_empresa
      res.json({
        id: usuario._id.toString(),
        es_empresa: usuario.es_empresa,
      });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al validar el usuario" });
    }
  };
  
  export { getUsuarios, getUsuarioById, addUsuario, updateUsuario, deleteUsuario, validateUserLogin };
  