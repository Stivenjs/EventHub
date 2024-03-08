import React from "react";
import eventfff from "../Imgs/eventfff.png";
import "./styles/Login.css";

export const Login = () => {
  return (
    <div className="login-container">
      <div className="login-content">
        <div className="form-log">
          <img src={eventfff} alt="Logo de EventHub" />
          <h1>Inicia secion</h1>
          <p>Comienza a crear con nosotros</p>
        </div>
        <form>
          <label>Email</label>
          <input type="text" id="email" />
          <label>Contraseña</label>
          <input type="text" id="password" />
        </form>
        <button className="google-btn">
          {/* <img
            className="google-logo"
            src="./assets/google.png"
            alt="logo de google"
          /> */}
          <p className="txt-google">Continuar</p>
        </button>
      </div>
    </div>
  );
};
