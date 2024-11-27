import React, { useState, useEffect } from 'react';
import { getAplicaciones, addAplicacion, updateAplicacion, deleteAplicacion } from '../services/AplicacionService';
import { getEtiquetas, addEtiqueta } from '../services/EtiquetaService'; // Servicio para obtener y agregar etiquetas
import { useNavigate } from 'react-router-dom';
import './styles/GestorAplicaciones.css';

const GestorAplicaciones = () => {
  // Estado para almacenar las aplicaciones y las etiquetas
  const [aplicaciones, setAplicaciones] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]); // Almacena las etiquetas existentes de la base de datos
  const [editMode, setEditMode] = useState(false); // Estado para determinar si estamos en modo edición
  const [currentAplicacion, setCurrentAplicacion] = useState(null); // Aplicación actualmente en edición
  const [newAplicacion, setNewAplicacion] = useState({ // Estado para manejar la nueva aplicación
    nombreApp: '',
    iconoApp: '',
    etiquetas: [],
    linkApp: '',
  });
  const [newEtiqueta, setNewEtiqueta] = useState(''); // Estado para manejar la nueva etiqueta a agregar
  const [filteredEtiquetas, setFilteredEtiquetas] = useState([]); // Etiquetas filtradas mientras el usuario escribe

  // Cargar las aplicaciones y etiquetas al montar el componente
  const navigate = useNavigate();  // Hook para redirección

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      // Si no hay empresaID, redirigir a la página de login
      navigate('/Auth');  // Redirige al login
      return;
    }
    
    // Si está logueado, cargar las aplicaciones y etiquetas
    loadAplicaciones(userId); 
    loadEtiquetas(); 
  }, [navigate]);


  // Cargar aplicaciones con filtro al obtenerlas
  const loadAplicaciones = async (userId) => {
    try {
      const data = await getAplicaciones(); // Obtienes todas las aplicaciones
      // Filtras las aplicaciones que pertenecen a esta empresa
      const aplicacionesDeEmpresa = data.filter((aplicacion) => aplicacion.owner === userId);
      setAplicaciones(aplicacionesDeEmpresa); // Solo las de la empresa logueada
    } catch (error) {
      console.error('Error al cargar las aplicaciones:', error);
    }
  };


  // Cargar etiquetas desde el servidor
  const loadEtiquetas = async () => {
    try {
      const data = await getEtiquetas(); // Obtiene las etiquetas usando el servicio
      setEtiquetas(data); // Actualiza el estado con las etiquetas obtenidas
    } catch (error) {
      console.error('Error al cargar las etiquetas:', error); // Maneja errores de carga
    }
  };

  // Manejar el cambio en los campos del formulario para la nueva aplicación
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAplicacion((prevState) => ({
      ...prevState,
      [name]: value, // Actualiza el estado con los nuevos valores de los inputs
    }));
  };

  // Manejar el cambio en el campo de texto de etiquetas, filtra las etiquetas existentes
  const handleEtiquetaChange = (e) => {
    const { value } = e.target;
    setNewEtiqueta(value); // Actualiza el valor del input de la etiqueta

    if (value) {
      // Filtra las etiquetas existentes según lo que el usuario escribe
      setFilteredEtiquetas(etiquetas.filter((etiqueta) => etiqueta.nombre_etiqueta.toLowerCase().includes(value.toLowerCase())));
    } else {
      setFilteredEtiquetas([]); // Si no hay texto, limpiamos las sugerencias
    }
  };

  // Manejar la selección de una etiqueta, la agrega al formulario
  const handleEtiquetaSelect = (etiqueta) => {
    if (!newAplicacion.etiquetas.some((e) => e._id === etiqueta._id)) {
      // Verifica si la etiqueta ya está seleccionada antes de agregarla
      setNewAplicacion((prevState) => ({
        ...prevState,
        etiquetas: [...prevState.etiquetas, etiqueta], // Agrega la etiqueta al estado
      }));
    }
    setNewEtiqueta(''); // Limpia el input de la etiqueta
    setFilteredEtiquetas([]); // Limpia las sugerencias filtradas
  };

  // Manejar la eliminación de una etiqueta seleccionada
  const handleEtiquetaRemove = (etiqueta) => {
    setNewAplicacion((prevState) => ({
      ...prevState,
      etiquetas: prevState.etiquetas.filter((e) => e._id !== etiqueta._id), // Elimina la etiqueta del formulario
    }));
  };

  // Agregar una nueva etiqueta si el usuario escribe una que no existe
  const handleAddEtiqueta = async () => {
    try {
      if (!newEtiqueta) return; // No hacer nada si el campo de etiqueta está vacío
      const etiquetaData = { nombre_etiqueta: newEtiqueta }; // Prepara la data de la nueva etiqueta
      const nuevaEtiqueta = await addEtiqueta(etiquetaData); // Llama al servicio para agregar la etiqueta
      setNewAplicacion((prevState) => ({
        ...prevState,
        etiquetas: [...prevState.etiquetas, nuevaEtiqueta], // Agrega la nueva etiqueta al formulario
      }));
      setNewEtiqueta(''); // Limpia el campo de texto
      setFilteredEtiquetas([]); // Limpia las sugerencias
    } catch (error) {
      console.error('Error al agregar etiqueta:', error); // Maneja errores al agregar la etiqueta
    }
  };

  // Manejar el envío del formulario para agregar o actualizar una aplicación
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Previene la acción por defecto del formulario
    try {
      if (editMode) {
        await updateAplicacion(currentAplicacion._id, newAplicacion); // Si estamos en modo edición, actualiza la aplicación
      } else {
        await addAplicacion(newAplicacion); // Si no, agrega una nueva aplicación
      }
      loadAplicaciones(); // Recarga las aplicaciones después de agregar o actualizar
      resetForm(); // Resetea el formulario para la próxima operación
    } catch (error) {
      console.error('Error al agregar o actualizar la aplicación:', error); // Maneja errores al enviar el formulario
    }
  };

  // Manejar el inicio de edición de una aplicación
  const handleEdit = (aplicacion) => {
    setEditMode(true); // Activa el modo edición
    setCurrentAplicacion(aplicacion); // Establece la aplicación actual a editar
    setNewAplicacion({
      nombreApp: aplicacion.nombreApp,
      iconoApp: aplicacion.iconoApp,
      etiquetas: aplicacion.etiquetas,
      linkApp: aplicacion.linkApp,
    });
  };

  // Manejar la eliminación de una aplicación
  const handleDelete = async (id) => {
    try {
      await deleteAplicacion(id); // Llama al servicio para eliminar la aplicación
      loadAplicaciones(); // Recarga la lista de aplicaciones después de eliminar
    } catch (error) {
      console.error('Error al eliminar la aplicación:', error); // Maneja errores al eliminar la aplicación
    }
  };

  // Restablecer el formulario a su estado inicial
  const resetForm = () => {
    setEditMode(false); // Desactiva el modo edición
    setNewAplicacion({
      nombreApp: '',
      iconoApp: '',
      etiquetas: [],
      linkApp: '',
    });
    setNewEtiqueta(''); // Limpia el campo de la nueva etiqueta
    setFilteredEtiquetas([]); // Limpia las etiquetas filtradas
  };

  // Renderiza la interfaz de usuario
  return (
    <div className="gestor-container">
      <h1>Gestor de Aplicaciones</h1>

      <form onSubmit={handleFormSubmit} className="form-container">
        <input
          type="text"
          name="nombreApp"
          value={newAplicacion.nombreApp}
          onChange={handleInputChange}
          placeholder="Nombre de la aplicación"
          required
        />
        <input
          type="text"
          name="iconoApp"
          value={newAplicacion.iconoApp}
          onChange={handleInputChange}
          placeholder="URL del ícono"
          required
        />
        <input
          type="text"
          name="linkApp"
          value={newAplicacion.linkApp}
          onChange={handleInputChange}
          placeholder="URL de la aplicación"
        />

        {/* Input para etiquetas */}
        <input
          type="text"
          value={newEtiqueta}
          onChange={handleEtiquetaChange}
          placeholder="Escribe una etiqueta"
        />
        <button type="button" onClick={handleAddEtiqueta}>Agregar nueva etiqueta</button>

        {/* Contenedor de etiquetas seleccionadas */}
        <div className="etiquetas-seleccionadas">
          {newAplicacion.etiquetas.map((etiqueta) => (
            <div key={etiqueta._id} className="etiqueta-seleccionada">
              {etiqueta.nombre_etiqueta}
              <span
                className="remove-tag"
                onClick={() => handleEtiquetaRemove(etiqueta)}
              >
                X
              </span>
            </div>
          ))}
        </div>

        {filteredEtiquetas.length > 0 && (
          <div className="etiquetas-sugeridas">
            {filteredEtiquetas.map((etiqueta) => (
              <div
                key={etiqueta._id}
                onClick={() => handleEtiquetaSelect(etiqueta)}
                className="etiqueta-sugerida"
              >
                {etiqueta.nombre_etiqueta}
              </div>
            ))}
          </div>
        )}

        <button type="submit">{editMode ? 'Actualizar Aplicación' : 'Agregar Aplicación'}</button>
        {editMode && <button type="button" onClick={resetForm}>Cancelar Edición</button>}
      </form>

      <div className="aplicaciones-list">
        {aplicaciones.map((aplicacion) => (
          <div key={aplicacion._id} className="aplicacion-item">
            <h3>{aplicacion.nombreApp}</h3>
            <p> <img src={aplicacion.iconoApp} alt="icono" className="aplicacion-icono" /></p>
            <p>Enlace: <a href={aplicacion.linkApp} target="_blank" rel="noopener noreferrer">{aplicacion.linkApp}</a></p>
            <div className="tags">
              {aplicacion.etiquetas.map((etiqueta) => (
                <span key={etiqueta._id} className="tag">{etiqueta.nombre_etiqueta}</span>
              ))}
            </div>
            <button onClick={() => handleEdit(aplicacion)}>Editar</button>
            <button onClick={() => handleDelete(aplicacion._id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestorAplicaciones;
