import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Importa los componentes de react-router-dom
import firebaseApp from "../components/Credenciales";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "../styles/ResetPassword.css";

const auth = getAuth(firebaseApp);

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {resetSent ? (
        <div>
          <p>
            Se ha enviado un enlace para restablecer la contraseña a su correo
            electrónico.
          </p>
          <button className="buttons-password">
            {" "}
            <Link className="link" to="/">
              Volver
            </Link>
          </button>
        </div>
      ) : (
        <form onSubmit={handleResetPassword}>
          <h2>Restablecer contraseña</h2>
          <input
            type="email"
            placeholder="Ingrese su correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-password"
          />
          <button className="buttons-password" type="submit">
            Restablecer contraseña
          </button>{" "}
          <button className="buttons-password">
            {" "}
            <Link className="link" to="/">
              Volver
            </Link>
          </button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
