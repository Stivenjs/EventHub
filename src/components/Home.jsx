import firebaseApp from "../components/Credenciales";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(firebaseApp);

function Home() {
  return (
    <div>
      <h1>Te has logeado</h1>
      <button onClick={() => signOut(auth)}>logOut</button>
    </div>
  );
}

export default Home;
