// Importacion de depencias 
import { getAuth, updatePassword } from "firebase/auth";
import firebaseApp from "./Credenciales";

// Credeciales de firebase
const auth = getAuth(firebaseApp);

// Funcion para actualizar contraseña
function ChangePassword() {
  const user = auth.currentUser;
  const newPassword = getASecureRandomPassword();

  updatePassword(user, newPassword)
    .then(() => {
      // Cambio de contraeña correcto.
    })
    .catch((error) => {
      // Para saber si ocurrio un error
      
    });

  return <div>

  </div>;
}
export default ChangePassword;
