import eventfff from "../Imgs/eventfff.png";
import googlelogo from "../Imgs/googlelogo.png";
import "./styles/LandingPage.css";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div>
      <div className="container">
        <div className="title">
          <div>
            <img src={eventfff} alt="logo de Event Hub" />
            <h1>Event Hub</h1>
            <p>lleva a tus eventos al siguiente nivel</p>
          </div>
        </div>
        <div className="login-content">
          <div className="login">
            <div className="form-title">
              <img src={eventfff} alt="logo de Event Hub" />
              <h1>Inscribirse</h1>
              <p>ingresa tu informacion para comenzar</p>
            </div>
            <form>
              <label>Nombre completo</label>
              <input type="text" id="first-name" />
              <label>Email</label>
              <input type="text" id="email" />
              <label>Nombre de usuario</label>
              <input type="text" id="username" />
              <label>Contraseña</label>
              <input type="text" id="password" />
              <label>Confirmar Contraseña</label>
              <input type="text" id="confirm-pass" />
              <label>
                <input type="checkbox" id="term" /> Acepto los
                <a href="#">terminos y condiciones</a>.{/* <button></button> */}
              </label>
            </form>
            <button className="google-button">
              <img
                className="google-logo"
                src={googlelogo}
                alt="logo de google"
              />
              <p className="text-google">Continua con goolge</p>
            </button>
          </div>
        </div>
      </div>
      <Link to="/App">
        <button>hola king</button>
      </Link>
    </div>
  );
};
