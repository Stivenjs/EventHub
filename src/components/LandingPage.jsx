import React, { useState } from "react";
import firebaseApp from "./Credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
import "../styles/LandingPage.css";
import { SignInWithGoogle } from "./SignInWithGoogle";
import { signInWithGitHub } from "./SignInWithGitHub";
import google from "../Imgs/google-logo.png";
import github from "../Imgs/github-logo.png";

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

    //Logica para crear ingresar, o validar usuarios
    if (isSignUp) {
      await createUserWithEmailAndPassword(auth, email, password);
      sendEmailVerification(auth.currentUser).then(() => {
        alert(
          "Se le ha enviado un email, haga click para terminar de activar su cuenta."
        );
      });
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
              onClick={SignInWithGoogle}
              src={google}
              className="icon-google"
            />
            <img
              src={github}
              onClick={signInWithGitHub}
              className="icon-google"
            />
          </div>

          <span>Usar datos personales en su lugar</span>
          <input required type="email" placeholder="Email" id="email" />
          <input
            required
            type="password"
            placeholder="Contraseña"
            id="password"
          />
          <button>{isSignUp ? "Registrarse" : "Inicia sesión"}</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleSubmit}>
          <h1>Inicia sesión</h1>
          <div className="social-icons">
            <img
              onClick={SignInWithGoogle}
              src={google}
              className="icon-google"
            />
            <img
              src={github}
              onClick={signInWithGitHub}
              className="icon-google"
            />
          </div>
          <span>O utiliza tu correo electrónico y contraseña</span>
          <input required type="email" placeholder="Email" id="email" />
          <input
            required
            type="password"
            placeholder="Contraseña"
            id="password"
          />
          <Link to="/reset-password">Olvidó su contraseña?</Link>{" "}
          {/* Enlace para redirigir al componente ResetPassword */}
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
