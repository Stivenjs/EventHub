import LandingPage from "./LandingPage";
import Home from "./Home";
import firebaseApp from "./Credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

function App() {
  const auth = getAuth(firebaseApp);

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
      {usuario ? <Home correoUsuario={usuario.email} /> : <LandingPage />}
    </div>
  );
}

export default App;
