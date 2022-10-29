import React, { createContext, useState } from "react";

type Props = {
  children: JSX.Element;
};

const AuthContext = createContext({
  auth: null,
  handleSetAuth: (user: any) => {},
});

export const AuthProvider = (props: Props) => {
  const [auth, setAuth] = useState(null);
  const handleSetAuth = (user: any) => {
    setAuth(user);
  };
  return (
    <AuthContext.Provider value={{ auth, handleSetAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
