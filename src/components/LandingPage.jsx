// Importacion de depencias
import React, { useState } from "react";
import firebaseApp from "./Credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "../styles/LandingPage.css";
import { signInWithGoogle } from "./signInWithGoogle";
import google from "../Imgs/google-logo.png";
import facebook from "../Imgs/facebook-logo.png";
// Credenciales de firebase
const auth = getAuth(firebaseApp);

// Estado para mostrar ventana de Inicio de session o creacion de cuenta
const LandingPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };
  // Funcion para seleccionar las id correspondientes
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    //Logica para crear ingresar, o validar usuarios
    if (isSignUp) {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        alert("Correo o contraseña incorrectos");
      }
    }
  };

  return (
    <div className={`container ${isSignUp ? "active" : ""}`}>
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h1>{isSignUp ? "Crear cuenta" : "Inicia sesión"}</h1>
          <div className="social-icons">
            <img
              onClick={signInWithGoogle}
              src={google}
              className="icon-google"
            />
            <img src={facebook} className="icon-facebook" />
            <i className="Facebook"></i>
          </div>

          <span>Usar datos personales en su lugar</span>
          <input type="text" placeholder="Nombre" id="name" />
          <input type="email" placeholder="Email" id="email" />
          <input type="password" placeholder="Contraseña" id="password" />
          <button>{isSignUp ? "Registrarse" : "Inicia sesión"}</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleSubmit}>
          <h1>Inicia sesión</h1>
          <div className="social-icons">
            <img
              onClick={signInWithGoogle}
              src={google}
              className="icon-google"
            />
            <i className="fab fa-github"></i>

            <img src={facebook} className="icon" />
            <i className="fab fa-linkedin-in"></i>
          </div>
          <span>O utiliza tu correo electrónico y contraseña</span>
          <input type="email" placeholder="Email" id="email" />
          <input type="password" placeholder="Contraseña" id="password" />
          <a href="#">Olvido su contraseña?</a>
          <button>Inicia sesión</button>
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
