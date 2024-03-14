import LandingPage from "./LandingPage";
import Home from "./Home";
import Firebaseapp from "./Credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

function App() {
  const auth = getAuth(Firebaseapp);

  const [usuario, setUsuario] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUsuario(usuarioFirebase);
    } else {
      setUsuario(null);
    }
  });
  return (
    <div>
     <LandingPage />
    </div>
  );
}

export default App;
