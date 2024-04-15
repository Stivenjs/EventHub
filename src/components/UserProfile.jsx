import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import "../styles/UserProfile.css";
import NavigationBar from "./NavigationBar";
import firebaseApp from "./Credenciales";

const auth = getAuth(firebaseApp);

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newPhotoURL, setNewPhotoURL] = useState("");


  useEffect(() => {
    const user = auth.currentUser;

    if (user !== null) {
      // Obtener los datos del usuario
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL; 
      const emailVerified = user.emailVerified;
      const uid = user.uid;

      // Guardar los datos del usuario en el estado del componente
      setUserDetails({
        displayName,
        email,
        photoURL, // Utilizar la imagen de perfil del contexto
        emailVerified,
        uid,
      });
    }
  }, []); // Dependencia añadida al contexto de la imagen de perfil

  const handleUpdateProfile = () => {
    const user = auth.currentUser;

    if (user) {
      const profileUpdates = {};
      if (newDisplayName !== "") {
        profileUpdates.displayName = newDisplayName;
      }
      if (newPhotoURL !== "") {
        profileUpdates.photoURL = newPhotoURL;
      }

      updateProfile(user, profileUpdates)
        .then(() => {
          // Perfil actualizado correctamente
          console.log("Perfil actualizado correctamente");
          // Actualizar los detalles del usuario en el estado del componente
          setUserDetails((prevState) => ({
            ...prevState,
            displayName:
              newDisplayName !== "" ? newDisplayName : prevState.displayName,
            photoURL: newPhotoURL !== "" ? newPhotoURL : prevState.photoURL,
          }));
          // Reiniciar los campos de entrada
          setNewDisplayName("");
          setNewPhotoURL("");
        })
        .catch((error) => {
          // Error al actualizar el perfil
          console.error("Error al actualizar el perfil:", error);
        });
    }
  };

  return (
    <>
      <NavigationBar />

      {userDetails ? (
        <div className="profile-container">
          <div>
            <img
              src={userDetails.photoURL}
              alt="User's photo"
              style={{ maxWidth: "200px" }}
            />
          </div>
          <h2>Detalles de usuario:</h2>
          <p>
            <strong>Nombre en pantalla:</strong> {userDetails.displayName}
          </p>
          <p>
            <strong>Correo:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Correo verificado:</strong>{" "}
            {userDetails.emailVerified ? "Si" : "No"}
          </p>
          <p>
            <strong>UID:</strong> {userDetails.uid}
          </p>
          <input
            type="text"
            placeholder="Nuevo nombre en pantalla"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nueva URL de foto"
            value={newPhotoURL}
            onChange={(e) => setNewPhotoURL(e.target.value)}
          />
          <button onClick={handleUpdateProfile}>Actualizar perfil</button>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </>
  );
};

export default UserDetails;
