// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../components/Credenciales'; // Ajusta la ruta según sea necesario

const UserContext = createContext();

const auth = getAuth(firebaseApp);

const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const { displayName, email, photoURL, emailVerified, uid } = user;
      setUserProfile({ displayName, email, photoURL, emailVerified, uid });
    }
  }, []);

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
