import { useState, useEffect } from "react"; 
import Swal from "sweetalert2";
import { addItem, getUser, validateUserLogin } from "../services/itemService";
import "./styles/Auth.css";

function Crud() {
  const [form, setForm] = useState({ name: "", email: "", contraseña: "", es_empresa: Boolean });
  
  // Verifica si el usuario ya está autenticado en el localStorage
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      Swal.fire({
        title: "Sesión activa",
        text: "Ya estás logueado.",
        icon: 'info',
        confirmButtonText: "OK",
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    await addItem(form);
    Swal.fire({
      title: "Datos ingresados",
      text: "Información ingresada con éxito",
      icon: 'success',
      confirmButtonText: "OK",
    });
    setForm({ name: "", email: "", contraseña: "", es_empresa: Boolean });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      // Aquí estamos llamando a la función que valida el login.
      const isValidUser = await validateUserLogin(form.email, form.contraseña);

      if (isValidUser) {
        const userData = await getUser(form.email)
        // Si el usuario es válido, guardamos el estado de autenticación en localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("es_empresa", userData.es_empresa);
        localStorage.setItem("_id", userData._id);
        Swal.fire({
          title: "Ingreso exitoso",
          text: "Bienvenido de nuevo",
          icon: 'success',
          confirmButtonText: "OK",
        });
      } else {
        // Si la respuesta es falsa (usuario no encontrado o contraseña incorrecta)
        Swal.fire({
          title: "Error",
          text: "Usuario no existe o contraseña incorrecta",
          icon: 'error',
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      // Si ocurre algún error en la solicitud, también se muestra un error
      Swal.fire({
        title: "Error de conexión",
        text: "No se pudo verificar la información, intenta de nuevo.",
        icon: 'error',
        confirmButtonText: "OK",
      });
    }
  };

  

  useEffect(() => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (registerBtn && loginBtn && container) {
      registerBtn.addEventListener('click', () => {
        container.classList.add("active");
      });

      loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
      });
    }
  }, []);

  return (
    
    <div className="container" id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleRegisterSubmit}>
          <h1>Registrarse</h1>
          <div className="social-icons">
            <a className="icon" href="https://mail.google.com"><i className="fa-brands fa-google-plus-g"></i></a>
            <a className="icon" href="https://facebook.com"><i className="fa-brands fa-facebook-f"></i></a>
            <a className="icon" href="https://github.com"><i className="fa-brands fa-github"></i></a>
            <a className="icon" href="https://linkedin.com"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>o usa alguna de tus cuentas</span>
          <input
            name="name"
            placeholder="Digita el nombre"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Digita el correo"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="contraseña"
            placeholder="Digita la contraseña"
            value={form.contraseña}
            onChange={handleChange}
          />
          <label>
            ¿Eres empresa?
            <select
              name="es_empresa"
              value={form.es_empresa}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
          </label>
          <button type="submit">Agregar</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleLoginSubmit}>
          <h1>Iniciar Sesión</h1>
          <div className="social-icons">
            <a className="icon" href="https://mail.google.com"><i className="fa-brands fa-google-plus-g"></i></a>
            <a className="icon" href="https://facebook.com"><i className="fa-brands fa-facebook-f"></i></a>
            <a className="icon" href="https://github.com"><i className="fa-brands fa-github"></i></a>
            <a className="icon" href="https://linkedin.com"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>o usa alguna de tus cuentas</span>
          <input
            name="email"
            placeholder="Digita el correo"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="contraseña"
            placeholder="Digita la contraseña"
            value={form.contraseña}
            onChange={handleChange}
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>¡Bienvenido de nuevo!</h1>
            <p>Ingrese sus datos personales para utilizar todas las funciones del sitio</p>
            <button className="hidden" id="login">Iniciar Sesión</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hola amigo</h1>
            <p>Regístrese con sus datos personales para utilizar todas las funciones del sitio</p>
            <button className="hidden" id="register">Registro</button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Crud;
