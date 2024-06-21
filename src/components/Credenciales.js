import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCyzBR2wdCrbqUSUZu05tmyZTgJGrmlWuc",
  authDomain: "database-login-2b2c5.firebaseapp.com",
  projectId: "database-login-2b2c5",
  storageBucket: "database-login-2b2c5.appspot.com",
  messagingSenderId: "969566120765",
  appId: "1:969566120765:web:d69d8e1bd45535fde8f354",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);



export const requestForToken = async (setTokenFound, userId) => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BMNDJfEf2-yX3NxAWAqE1Bg3AG1p0j4DbmhzqP_zammxGl2LVLTCs3ThOcl7OxVjYifASceZxhCD33J5XbaKEgA",
    });
    if (currentToken) {
      console.log("Token actual: ", currentToken);
      setTokenFound(true);
      // Enviar token al backend
      await axios.post("http://localhost:3000/guardar-token", {
        userId: userId,
        token: currentToken,
      });
    } else {
      console.log("No se encontró el token.");
      setTokenFound(false);
    }
  } catch (error) {
    console.error("Error al obtener el token: ", error);
    setTokenFound(false);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export default firebaseApp;
