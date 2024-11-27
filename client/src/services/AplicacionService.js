// Crear la URL base de la API
const API_URL = "http://localhost:5000/aplicaciones";// URL base para la API de aplicación

// Función para obtener todas las aplicaciones
export const getAplicaciones = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener las aplicaciones");// suele ser porque no se cargó la BD
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener aplicaciones:", error);
    throw error;
  }
};

// Función para obtener una aplicaciones por ID
export const getAplicacionesById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener la aplicaciones");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener la aplicaciones:", error);
    throw error;
  }
};

// Función para agregar una nueva aplicaciones
export const addAplicacion = async (aplicacion) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aplicacion),
    });
    if (!response.ok) {
      throw new Error("Error al agregar la aplicación");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al agregar la aplicación:", error);
    throw error;
  }
};

// Función para actualizar una aplicaciones existente
export const updateAplicacion = async (id, aplicacion) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aplicacion),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar la aplicaciones");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar la aplicaciones:", error);
    throw error;
  }
};

export const deleteAplicacion = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la aplicaciones");
    }

    // Verificar si hay contenido en la respuesta antes de intentar convertirlo a JSON
    if (response.status === 204) {
      // Código 204 indica que la eliminación fue exitosa, pero no hay contenido
      return;
    }

    // Si hay contenido, entonces procesar el JSON
    return await response.json();
  } catch (error) {
    console.error("Error al eliminar la aplicaciones:", error);
    throw error;
  }
};
