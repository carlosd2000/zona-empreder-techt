import React, { useState, useEffect } from "react";
import "./styles/Auth.css";

function Agreagarapp() {
  const [form, setForm] = useState({ name: "", logo: "", link: "", etiqueta: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      </div>
      <div className="form-container sign-in">
        <form>
          <h1>Registrar App</h1>
          <div className="social-icons">
            <a className="icon" href="https://mail.google.com"><i className="fa-brands fa-google-plus-g"></i></a>
            <a className="icon" href="https://facebook.com"><i className="fa-brands fa-facebook-f"></i></a>
            <a className="icon" href="https://github.com"><i className="fa-brands fa-github"></i></a>
            <a className="icon" href="https://linkedin.com"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>Ingrese datos de su Aplicacion</span>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="logo"
            placeholder="Logo"
            value={form.logo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="link"
            placeholder="Link"
            value={form.link}
            onChange={handleChange}
          />
          <input
            type="text"
            name="etiqueta"
            placeholder="Etiqueta"
            value={form.etiqueta}
            onChange={handleChange}
          />
          <div className="etiquetas-recom">
            <button type="button" className="etiqueta-sugerida">Alimentacion</button>
            <button type="button" className="etiqueta-sugerida">Educacción</button>
          </div>
          <button type="submit" className="button-app">Crear app</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-right">
            <h1>Hola, ingresa tu app</h1>
            <p>Ingrese los datos de app para utilizar todas las funciones del sitio</p>
            <div className="toggle-panel-text">
              <h3>¿Por qué poner etiquetas?</h3>
              <p>Facilita la búsqueda de tus aplicaciones a los usuarios.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agreagarapp;
