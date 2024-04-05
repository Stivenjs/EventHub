import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LandingPage from "../components/LandingPage";
import Home from "../components/Home";
import UserProfile from "../components/UserProfile";
import { ProfileImageProvider } from "../context/ProfileImageContext";
import { Eventos } from "../components/SideBarComponents/Eventos";
import { Estadisticas } from "../components/SideBarComponents/Estadisticas";
import { Usuarios } from "../components/SideBarComponents/Usuarios";
import { Configuracion } from "../components/SideBarComponents/Configuracion";
import ResetPassword from "../components/ResetPassword";
import firebaseApp from "../components/Credenciales";

const auth = getAuth(firebaseApp);

function AppRoutes() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      setUsuario(usuarioFirebase);
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  if (cargando) {
    return <p>Cargando...</p>;
  }

  return (
    <ProfileImageProvider>
      <Routes>
        <Route path="/" element={usuario ? <Home /> : <LandingPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/perfil" element={<UserProfile />} />
      </Routes>
    </ProfileImageProvider>
  );
}

export default AppRoutes;
