import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto
const AuthContext = createContext();

// Creamos un proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true); // Cambiar el estado cuando el usuario se loguea
  };

  const logout = () => {
    setIsAuthenticated(false); // Cambiar el estado cuando el usuario cierre sesión
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Función para consumir el contexto en los componentes
export const useAuth = () => useContext(AuthContext);