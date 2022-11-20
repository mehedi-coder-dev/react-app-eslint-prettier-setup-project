import { onAuthStateChanged } from 'firebase/auth';
import {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();

export const AuthUseContext = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={useMemo(() => ({ currentUser }), [currentUser])}>
      {children}
    </AuthContext.Provider>
  );
}
