import React, { useState, useEffect } from "react";
import { getAplicaciones } from "../services/AplicacionService";  // Importar tu servicio
import "./styles/Home.css"; // Asegúrate de tener un archivo de estilos
import { Link, useNavigate } from 'react-router-dom';

const App = () => {
  const [aplicaciones, setAplicaciones] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [ratings, setRatings] = useState({}); // Estado para las calificaciones de las aplicaciones

  // Cargar las aplicaciones desde la base de datos
  useEffect(() => {
    const loadAplicaciones = async () => {
      try {
        const data = await getAplicaciones();
        setAplicaciones(data);
        setLoading(false); // Cambiar el estado a false cuando los datos se han cargado
      } catch (error) {
        console.error("Error al cargar Aplicaciones:", error);
        setLoading(false); // Asegurarse de desactivar el estado de carga incluso si hay un error
      }
    };

    loadAplicaciones();
  }, []);

  // Maneja el cambio de calificación
  const handleRatingChange = (e, appId) => {
    const newRating = e.target.value;
    setRatings((prevRatings) => ({
      ...prevRatings,
      [appId]: newRating,
    }));
    console.log(`Calificación seleccionada para la aplicación ${appId}: ${newRating} estrella(s)`);
  };

  // Mostrar un mensaje de carga mientras esperamos los datos
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <main className="main-layout">
        <section className="content-container">
          <section className="search-section">
            <input type="text" placeholder="Buscar..." className="search-input" />
            <select className="filter-select">
              <option value="">Seleccionar</option>
              <option value="popular">Educacion</option>
              <option value="reciente">Alimentacion</option>
            </select>
            <button className="search-btn">Buscar</button>
          </section>

          <section className="cards-section">
            {aplicaciones.map((app) => (
              <div className="card" key={app._id}>
                <div className="header-card">
                  <h2>{app.nombreApp}</h2>
                </div>
                <div className="body-card">
                  <img src={app.iconoApp} alt={`${app.nombreApp} Icono`} className="app-icon" />
                  

                  {/* Mostrar etiquetas de la aplicación */}
                  {app.etiquetas &&
                    app.etiquetas.map((etiqueta) => (
                      <span key={etiqueta._id} className="tag">
                        {etiqueta.nombre_etiqueta}
                      </span>
                    ))}
                </div>

                {/* Sección de calificación */}
                <div className="rating" aria-label="Calificación">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <React.Fragment key={star}>
                      <input
                        type="radio"
                        id={`star${star}-${app._id}`}
                        name={`rating-${app._id}`}
                        value={star}
                        checked={ratings[app._id] == star}
                        onChange={(e) => handleRatingChange(e, app._id)}
                      />
                      <label htmlFor={`star${star}-${app._id}`} aria-label={`${star} estrella`}>
                        ★
                      </label>
                    </React.Fragment>
                  ))}
                </div>

                <div className="card-buttons">
                  <button className="link-btn"> <Link to="/comentarios">Comentarios</Link></button>


                  <button
                  className="link-btn"
                  onClick={() => window.open(app.linkApp, "_blank")} // Redirige al enlace de la aplicación
                  >
                  Link
                    </button>

                </div>
              </div>
            ))}
          </section>
        </section>

        <aside>
          <div className="ranking-container">
            <div className="ranking-section ranking-usuarios">
              <h2>RANKING USUARIOS</h2>
              <ul>
                <li>1. <span className="image-placeholder"></span> USUARIO - 100</li>
                <li>2. <span className="image-placeholder"></span> USUARIO - 95</li>
                <li>3. <span className="image-placeholder"></span> USUARIO - 90</li>
                <li>4. <span className="image-placeholder"></span> USUARIO - 85</li>
                <li>5. <span className="image-placeholder"></span> USUARIO - 80</li>
              </ul>
            </div>

            <div className="ranking-section ranking-apps">
              <h2>RANKING APP</h2>
              <ul>
                <li>1. <span className="image-placeholder"></span> APP - 4.0★</li>
                <li>2. <span className="image-placeholder"></span> APP - 3.8★</li>
                <li>3. <span className="image-placeholder"></span> APP - 3.5★</li>
                <li>4. <span className="image-placeholder"></span> APP - 2.7★</li>
                <li>5. <span className="image-placeholder"></span> APP - 2.0★</li>
              </ul>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default App;
