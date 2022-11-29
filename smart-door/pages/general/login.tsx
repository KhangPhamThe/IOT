// import { Input, Spacer, StyledButton } from "@nextui-org/react";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "components/context/AuthProvider";
import bgImage from 'assets/images/bg-img.png';
import loginStyles from "styles/login.module.scss";
import EmailIcon from "@/assets/svg/emailIcon";
import LockIcon from "@/assets/svg/lockIcon";

type Props = {};

const LoginPage = (props: Props) => {
  // const [loginEmail, setLoginEmail] = useState("");
  // const [loginPassword, setLoginPassword] = useState("");
  const emailInput = useRef<HTMLInputElement>(null);
  const passInput = useRef<HTMLInputElement>(null);

  const currentUser = useContext(AuthContext)

  const handleOnLogin = async () => {
    console.log(emailInput?.current?.value)
    console.log(passInput?.current?.value)
  }
  

  useEffect(() => {
    console.log("cccc", currentUser)
  }, [currentUser])
  
  return (
    <div className={loginStyles.container}>
      {/* <div>{globalAuth && `${globalAuth.user.email}`}</div> */}

      <div className={loginStyles.main}>
        <h1>Sign In</h1>

        <label style={{marginTop: "19px"}}>
          <input type='email' className={loginStyles.pinkBorder} placeholder="Email ID" ref={emailInput} autoComplete="off" autoCorrect="off" autoCapitalize="off"/>
          <EmailIcon className={loginStyles.icon}/>
        </label>

        <label style={{marginTop: "16px"}}>
          <input type='password' className={loginStyles.pinkBorder} placeholder="Enter Password" ref={passInput} autoComplete="off" autoCorrect="off" autoCapitalize="off"/>
          <LockIcon className={loginStyles.icon}/>
        </label>

        <button className={loginStyles.submitBtn} style={{marginTop: "31px"}} onClick={handleOnLogin}>Log In</button>
      </div>
    </div>
  );
};
export default LoginPage;
