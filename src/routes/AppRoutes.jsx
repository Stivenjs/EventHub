import LandingPage from "../components/LandingPage";
import ResetPassword from "../components/ResetPassword";
import firebaseApp from "../components/Credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

const auth = getAuth(firebaseApp);

function AppRoutes() {
  const [usuario, setUsuario] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUsuario(usuarioFirebase);
    } else {
      setUsuario(null);
    }
  });

  return (
    <Routes>
      <Route path="/" element={usuario ? <Home /> : <LandingPage />} />
       <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default AppRoutes;
