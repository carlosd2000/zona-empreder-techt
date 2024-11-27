import React from "react";
import "./styles/comentario.css";

function Comentario() {
  return (
    <div className="container-comentario">
      <h1 className="titulo-comentario">DEJANOS TU COMENTARIO</h1>
      <p className="p-text">Nos importa mucho tu opinión</p>
      <div className="text-comentario">
        <h3>¿QUIERES GANAR PUNTOS?</h3>
        <p>
          Al comentar o calificar con estrella las aplicaciones recibes puntos.
          Consigue la mayor cantidad de puntos para entrar al <span className="xyz-ranking">ranking</span>.
        </p>
      </div>
      <form className="comment-form">
        <textarea placeholder="Email..." rows="1"></textarea>
        <textarea placeholder="Escribe tu comentario aquí..." rows="5"></textarea>
        <div>
          <button type="submit" className="button-app">Volver al menu</button>
          <button type="submit" className="button-app">Enviar comentario</button>
        </div>
      </form>
    </div>
  );
}

export default Comentario;
