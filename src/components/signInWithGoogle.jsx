
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import firebaseApp from './Credenciales'; 

const auth = getAuth(firebaseApp);

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export { signInWithGoogle };
