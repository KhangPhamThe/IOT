import { Input, Spacer, StyledButton } from "@nextui-org/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../components/context/AuthProvider";
import { auth } from "../api/googleAuthen/firebase-config";

type Props = {};

const LoginPage = (props: Props) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const currentUser = useContext(AuthContext)

  const handleLogin = async () => {
    try {
        const user = await signInWithEmailAndPassword(
            auth, 
            loginEmail, 
            loginPassword,
        )

    } catch(error) {
        console.log(error)
    }
  };

  useEffect(() => {
    console.log("cccc", currentUser)
  }, [currentUser])
  return (
    <div>
      <div>Just admin can go to this page to register to User</div>
      {/* <div>{globalAuth && `${globalAuth.user.email}`}</div> */}
      <Input
        labelLeft="User name"
        placeholder="Username"
        onChange={(e) => {
          setLoginEmail(e.target.value);
        }}
      />

      <Spacer y={0.5} />
      <Input.Password
        labelLeft="Password"
        placeholder="Password here"
        onChange={(e) => {
          setLoginPassword(e.target.value);
        }}
      />
      <StyledButton onClick={handleLogin}>Login</StyledButton>      
    </div>
  );
};
export default LoginPage;