import React, { useContext, useState, useEffect } from "react";
import {
  getAuth,
  updateProfile,
  updateEmail,
  updatePassword,
  sendEmailVerification,
  deleteUser,
} from "firebase/auth";
import { UserContext } from "../context/UserContext";
import "../styles/UserProfile.css";
import NavigationBar from "./NavigationBar";
import firebaseApp from "./Credenciales";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const UserProfile = () => {
  const { userProfile, setUserProfile } = useContext(UserContext);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newPhotoURL, setNewPhotoURL] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [activityLog, setActivityLog] = useState([]);
  const [showActivityLog, setShowActivityLog] = useState(false);

  useEffect(() => {
    if (userProfile) {
      fetchActivityLog();
    }
  }, [userProfile]);

  const fetchActivityLog = async () => {
    if (auth.currentUser) {
      try {
        const activityRef = collection(firestore, "activityLogs");
        const q = query(activityRef, where("uid", "==", userProfile.uid));
        const querySnapshot = await getDocs(q);
        const activities = querySnapshot.docs.map((doc) => doc.data());
        setActivityLog(activities);
      } catch (error) {
        console.error("Error al obtener el historial de actividad:", error);
      }
    } else {
      console.error("Usuario no autenticado.");
    }
  };

  const logActivity = async (activity) => {
    if (auth.currentUser) {
      try {
        const activityRef = collection(firestore, "activityLogs");
        await addDoc(activityRef, {
          uid: userProfile.uid,
          activity,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Error al registrar la actividad:", error);
      }
    } else {
      console.error("Usuario no autenticado.");
    }
  };

  const handleUpdateProfile = () => {
    const user = auth.currentUser;

    if (user && (newDisplayName || newPhotoURL || newEmail || newPassword)) {
      const profileUpdates = {};
      if (newDisplayName !== "") {
        profileUpdates.displayName = newDisplayName;
      }
      if (newPhotoURL !== "") {
        profileUpdates.photoURL = newPhotoURL;
      }

      // Update profile
      updateProfile(user, profileUpdates)
        .then(() => {
          console.log("Perfil actualizado correctamente");
          setUserProfile((prevState) => ({
            ...prevState,
            displayName:
              newDisplayName !== "" ? newDisplayName : prevState.displayName,
            photoURL: newPhotoURL !== "" ? newPhotoURL : prevState.photoURL,
            email: newEmail !== "" ? newEmail : prevState.email,
          }));
          logActivity("Actualización de perfil");
          setNewDisplayName("");
          setNewPhotoURL("");
        })
        .catch((error) => {
          console.error("Error al actualizar el perfil:", error);
        });

      // Update email
      if (newEmail !== "") {
        updateEmail(user, newEmail)
          .then(() => {
            console.log("Correo actualizado correctamente");
            setUserProfile((prevState) => ({
              ...prevState,
              email: newEmail,
            }));
            logActivity("Actualización de correo electrónico");
            setNewEmail("");
          })
          .catch((error) => {
            console.error("Error al actualizar el correo:", error);
          });
      }

      // Update password
      if (newPassword !== "") {
        updatePassword(user, newPassword)
          .then(() => {
            console.log("Contraseña actualizada correctamente");
            logActivity("Actualización de contraseña");
            setNewPassword("");
          })
          .catch((error) => {
            console.error("Error al actualizar la contraseña:", error);
          });
      }
    } else {
      console.error(
        "No se puede actualizar el perfil, todos los campos están vacíos."
      );
    }
  };

  const handleSendVerificationEmail = () => {
    const user = auth.currentUser;

    if (user && !user.emailVerified) {
      sendEmailVerification(user)
        .then(() => {
          console.log("Correo de verificación enviado");
          logActivity("Correo de verificación reenviado");
        })
        .catch((error) => {
          console.error("Error al enviar el correo de verificación:", error);
        });
    }
  };

  const handleDeleteAccount = () => {
    const user = auth.currentUser;

    if (user) {
      logActivity("Cuenta eliminada")
        .then(() => {
          deleteUser(user)
            .then(() => {
              console.log("Cuenta eliminada correctamente");
              // Redirigir o limpiar el estado después de la eliminación de la cuenta
            })
            .catch((error) => {
              console.error("Error al eliminar la cuenta:", error);
            });
        })
        .catch((error) => {
          console.error(
            "Error al registrar la actividad de eliminación de cuenta:",
            error
          );
        });
    } else {
      console.error("Usuario no autenticado.");
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
            className="user-img"
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
        {!userProfile.emailVerified && (
          <button className="verify-btn" onClick={handleSendVerificationEmail}>
            Reenviar correo de verificación
          </button>
        )}
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
        <input
          type="email"
          placeholder="Nuevo correo electrónico"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className="update-btn" onClick={handleUpdateProfile}>
          Actualizar perfil
        </button>
        <button className="delete-btn" onClick={handleDeleteAccount}>
          Eliminar cuenta
        </button>
        <hr />
        <button
          className="toggle-activity-btn"
          onClick={() => setShowActivityLog(!showActivityLog)}
        >
          {showActivityLog ? "Ocultar" : "Mostrar"} historial de actividad
        </button>
        {showActivityLog && (
          <div className="activity-log">
            <h3>Historial de actividad</h3>
            <ul>
              {activityLog.map((activity, index) => (
                <li key={index}>
                  {activity.timestamp}: {activity.activity}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
