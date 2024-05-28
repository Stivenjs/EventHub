import { signInWithPopup, getAuth } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import firebaseApp from "./Credenciales";

const auth = getAuth(firebaseApp);

const signInWithGitHub = () => {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // El usuario ha iniciado sesión con GitHub exitosamente
      const user = result.user;
    })
    .catch((error) => {
      // Manejar errores
      console.error(error);
    });
};

export { signInWithGitHub };
