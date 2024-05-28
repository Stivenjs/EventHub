import React, { useContext, useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { UserContext } from "../context/UserContext";
import "../styles/UserProfile.css";
import NavigationBar from "./NavigationBar";
import firebaseApp from "./Credenciales";

const auth = getAuth(firebaseApp);

const UserProfile = () => {
  const { userProfile, setUserProfile } = useContext(UserContext);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newPhotoURL, setNewPhotoURL] = useState("");

  useEffect(() => {
    if (userProfile) {
      console.log(userProfile.photoURL);
    }
  }, [userProfile]);

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
          console.log("Perfil actualizado correctamente");
          setUserProfile((prevState) => ({
            ...prevState,
            displayName:
              newDisplayName !== "" ? newDisplayName : prevState.displayName,
            photoURL: newPhotoURL !== "" ? newPhotoURL : prevState.photoURL,
          }));
          setNewDisplayName("");
          setNewPhotoURL("");
        })
        .catch((error) => {
          console.error("Error al actualizar el perfil:", error);
        });
    }
  };

  if (!userProfile) {
    return <p>Loading user details...</p>;
  }

  return (
    <>
      <NavigationBar />
      <div className="profile-container">
        <div>
          <img
            src={userProfile.photoURL}
            alt="User's photo"
            style={{ maxWidth: "200px" }}
          />
        </div>
        <h2>Detalles de usuario:</h2>
        <p>
          <strong>Nombre en pantalla:</strong> {userProfile.displayName}
        </p>
        <p>
          <strong>Correo:</strong> {userProfile.email}
        </p>
        <p>
          <strong>Correo verificado:</strong>{" "}
          {userProfile.emailVerified ? "Si" : "No"}
        </p>
        <p>
          <strong>UID:</strong> {userProfile.uid}
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
    </>
  );
};

export default UserProfile;
