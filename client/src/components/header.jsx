import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import {} from "../pages/Auth"
const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const empresaID = localStorage.getItem("empresaID");
      const esEmpresa = localStorage.getItem("es_empresa");
      setIsAuthenticated(!!empresaID && esEmpresa === "true");
    };

    checkAuth(); // Revisión inicial
    window.addEventListener("storage", checkAuth); // Escuchar cambios en localStorage

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("es_empresa");
    localStorage.removeItem("_id");
    setIsAuthenticated(false);
    Swal.fire({
      title: "Sesión cerrada",
      text: "Has cerrado sesión con éxito.",
      icon: 'success',
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/"); // Redirigir al inicio
    });
  };

  return (
    <header className="main-header">
      <div className="container-header">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="site-name">ZONA EMPRENDER TECH</span>
        </Link>

        {/* Toggle para menú responsive va en una cajita*/}
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">
          ☰ {/* Carácter Unicode para un ícono tipo "hamburguesa" */}
        </label>

        {/* Menú de navegación */}
        <nav className="main-navbar">
          <ul className="nav-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li><Link to="/agregar">App</Link></li>
            
            <li><Link to="/Auth">Login</Link></li> 
            <li><Link to="/comentarios">Comentarios</Link></li> 
            
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
