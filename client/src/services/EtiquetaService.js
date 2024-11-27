const API_URL = "http://localhost:5000/etiquetas"; // Cambia la URL si es necesario

// Función para obtener todas las etiquetas
export const getEtiquetas = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener las etiquetas");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener etiquetas:", error);
    throw error;
  }
};

// Función para obtener una etiqueta por ID
export const getEtiquetaById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener la etiqueta");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener la etiqueta:", error);
    throw error;
  }
};

// Función para agregar una nueva etiqueta
export const addEtiqueta = async (etiqueta) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(etiqueta),
    });

    if (!response.ok) {
      throw new Error("Error al agregar la etiqueta");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al agregar la etiqueta:", error);
    throw error;
  }
};

// Función para actualizar una etiqueta
export const updateEtiqueta = async (id, etiqueta) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(etiqueta),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la etiqueta");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al actualizar la etiqueta:", error);
    throw error;
  }
};

// Función para eliminar una etiqueta
export const deleteEtiqueta = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la etiqueta");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al eliminar la etiqueta:", error);
    throw error;
  }
};

// Función para buscar etiquetas por nombre (usada para autocompletado)
export const searchEtiquetas = async (query) => {
  try {
      const response = await fetch(`http://localhost:5000/etiquetas/search?query=${query}`);
      if (!response.ok) {
          throw new Error('No se pudo obtener las etiquetas');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error al buscar etiquetas:', error);
      throw new Error('Error al buscar etiquetas');
  }
};
