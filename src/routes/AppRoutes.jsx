import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { requestForToken, onMessageListener } from "../components/Credenciales";
import LandingPage from "../components/LandingPage";
import Home from "../components/Home";
import UserProfile from "../components/UserProfile";
import Eventos from "../components/SideBarComponents/Eventos";
import EventsList from "../components/SideBarComponents/EventsList";
import { Usuarios } from "../components/SideBarComponents/Usuarios";
import { Configuracion } from "../components/SideBarComponents/Configuracion";
import ResetPassword from "../components/ResetPassword";
import firebaseApp from "../components/Credenciales";
import { UserProvider } from "../context/UserContext";

const auth = getAuth(firebaseApp);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registrado con éxito:", registration);
    })
    .catch((err) => {
      console.error("Error al registrar el Service Worker:", err);
    });
}

function AppRoutes() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [isTokenFound, setTokenFound] = useState(false);

  useEffect(() => {
    const handlePermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Permiso de notificación concedido.");
        } else {
          console.log("Permiso de notificación denegado.");
        }
      } catch (error) {
        console.error("Error al solicitar permiso de notificación:", error);
      }
    };

    handlePermission();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        const userId = usuarioFirebase.uid;
        setUsuario(usuarioFirebase);
        requestForToken(setTokenFound, userId);
      }
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        console.log("Mensaje recibido en primer plano:", payload);
        const { title, body, image } = payload.notification;
        new Notification(title, { body, icon: image });
      })
      .catch((err) => console.log("Error al recibir mensaje:", err));
  }, []);

  if (cargando) {
    return <p>Cargando...</p>;
  }

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={usuario ? <Home /> : <LandingPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/Lista de eventos" element={<EventsList />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/perfil" element={<UserProfile />} />
      </Routes>
    </UserProvider>
  );
}

export default AppRoutes;
