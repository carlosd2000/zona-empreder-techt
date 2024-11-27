// src/services/itemService.js

// URL base de la API
const API_URL = "http://localhost:5000/Usuarios";

// Funci贸n para obtener todos los elementos
export const getItems = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

// Funci贸n para agregar un nuevo elemento
export const addItem = async (item) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    });
    return await response.json();
};

// Funci贸n para actualizar un elemento existente
export const updateItem = async (id, item) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    });
    return await response.json();
};

// Funci贸n para eliminar un elemento
export const deleteItem = async (id) => {
    await fetch(`${API_URL}/${id}`, { 
        method: "DELETE" });
};

// **Nueva función para validar inicio de sesión**
// Esta función verifica si el correo y la contraseña coinciden con algún usuario
export const validateUserLogin = async (email, contraseña) => {
    try {
        const users = await getItems();  // Obtiene todos los usuarios de la base de datos
      // Busca si existe un usuario con el correo y contraseña ingresados
    const user = users.find(
        (user) => user.email === email && user.contraseña === contraseña
    );
      return user;  // Retorna el usuario si es encontrado, o `undefined` si no se encuentra
    } catch (error) {
    console.error("Error al validar el inicio de sesión:", error);
      return null;  // En caso de error, retorna `null`
    }
};

// Función para obtener un usuario por su correo electrónico
export const getUser = async (email) => {
    const users = await getItems(); // Obtiene todos los usuarios desde la base de datos o API
  
    // Busca un usuario por el correo electrónico
    const user = users.find((user) => user.email === email);
  
    // Retorna el usuario encontrado, o null si no se encuentra
    return user || null;
  };