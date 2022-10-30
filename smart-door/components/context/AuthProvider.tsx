import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../pages/api/googleAuthen/firebase-config";

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext({});

export const AuthProvider = (props: Props) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        })
      } else {
        setCurrentUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{currentUser}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
