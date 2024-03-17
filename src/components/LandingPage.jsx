// Importacion de las dependencias
import React, { useState } from "react";
import firebaseApp from "./Credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "../styles/LandingPage.css";

// Funcion de estado para el cambio de paneles entre el registro y el login
const LandingPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  // Variables para la autenticacion de usuario
  const auth = getAuth(firebaseApp);

  const validation = false;

  // Autenticacion de inicio de sesion

  const functAuthenticationLog = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;

    if (!validation) {
      await signInWithEmailAndPassword(auth, email, password);
    }
  };

  // Autenticacion de registro de usuarios

  const functAuthenticationReg = async (e) => {
    e.preventDefault();
    const regEmail = e.target.regEmail.value;
    const regPass = e.target.regPass.value;
    const name = e.target.name.value;

    if (!validation) {
      await createUserWithEmailAndPassword(auth, regEmail, regPass);
    }
  };

  return (
    <div className="body-container">
      {/* Login y registro */}
      <div className={`container ${isSignUp ? "active" : ""}`}>
        <div className="form-container sign-up">
          {/* Registro de usuarios  */}
          <form onSubmit={functAuthenticationReg}>
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
            <input type="text" placeholder="Nombre" id="name" />
            <input type="email" placeholder="Email" id="regEmail" />
            <input type="password" placeholder="Contraseña" id="regPass" />
            <button>Registrarse</button>
          </form>
        </div>
        {/* Inicio de sesion */}
        <div className="form-container sign-in">
          <form onSubmit={functAuthenticationLog}>
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
            <input type="email" placeholder="Email" id="email" />
            <input type="password" placeholder="Contraseña" id="password" />
            <a href="#">Olvido su contraseña?</a>
            <button>Inicia sesión</button>
          </form>
        </div>
        {/* Cambio de paneles entre registro y login */}
        <div className="toggle-container">
          <div className="toggle">
            <div
              className={`toggle-panel ${
                isSignUp ? "toggle-left" : "toggle-right"
              }`}
            >
              <h1>{isSignUp ? "¡Hola, amigo!" : "¡Bienvenido de nuevo!"}</h1>
              <p>
                {isSignUp
                  ? "Regístrese con sus datos personales para utilizar todas las funciones del sitio"
                  : "Ingrese sus datos personales para utilizar todas las funciones del sitio"}
              </p>
              <button className="hidden" onClick={toggleForm}>
                {isSignUp ? "Ingresar" : "Registrase"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
