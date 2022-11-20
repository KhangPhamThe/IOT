import React, { createContext, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext({});

export const AuthProvider = (props: Props) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  

  return (
    <AuthContext.Provider value={{currentUser}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
