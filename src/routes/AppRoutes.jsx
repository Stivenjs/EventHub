import LandingPage from "../components/LandingPage";
import Home from "../components/Home";
import { Eventos } from "../components/SideBarComponents/Eventos";
import { Estadisticas } from "../components/SideBarComponents/Estadisticas";
import { Usuarios } from "../components/SideBarComponents/Usuarios";
import { Configuracion } from "../components/SideBarComponents/Configuracion";
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
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/estadisticas" element={<Estadisticas />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/configuracion" element={<Configuracion />} />
    </Routes>
  );
}

export default AppRoutes;
