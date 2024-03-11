import React, { useState } from "react";
import Firebaseapp from "./Credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "../styles/LandingPage.css";

const auth = getAuth(Firebaseapp);

const LandingPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const [registro, setRegistro] = useState(false);

  return (
    <div className={`container ${isSignUp ? "active" : ""}`}>
      <div className="form-container sign-up">
        <form>
          <h1>Crear cuenta</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>Usar datos personales en su lugar</span>
          <input type="text" placeholder="Nombre" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Contraseña" />
          <button href="#">Registrarse</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1>Inicia sesión</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>O utiliza tu correo electrónico y contraseña</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Contraseña" />
          <a href="#">Olvido su contraseña?</a>
          <button href="#">Inicia sesión</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div
            className={`toggle-panel ${
              isSignUp ? "toggle-left" : "toggle-right"
            }`}
          >
            <h1>{isSignUp ? "¡Bienvenido de nuevo!" : "¡Hola, amigo!"}</h1>
            <p>
              {isSignUp
                ? "Ingrese sus datos personales para utilizar todas las funciones del sitio"
                : "Regístrese con sus datos personales para utilizar todas las funciones del sitio"}
            </p>
            <button className="hidden" onClick={toggleForm}>
              {isSignUp ? "Ingresar" : "Registrase"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
