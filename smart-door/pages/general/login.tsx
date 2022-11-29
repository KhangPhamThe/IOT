import { Text } from "@nextui-org/react";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "components/context/AuthProvider";
import bgImage from 'assets/images/bg-img.png';
import loginStyles from "styles/login.module.scss";
import EmailIcon from "@/assets/svg/emailIcon";
import LockIcon from "@/assets/svg/lockIcon";
import { Modal } from "@nextui-org/react";

type Props = {};

const LoginPage = (props: Props) => {
  const emailInput = useRef<HTMLInputElement>(null);
  const passInput = useRef<HTMLInputElement>(null);

  const currentUser = useContext(AuthContext)

  const [isShowCreateGuide, setIsShowCreateGuide] = useState(false);
  const showCreateGuide = () => {
    setIsShowCreateGuide(true);
  }
  const hideCreateGuide = () => {
    setIsShowCreateGuide(false);
  }

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

        <p style={{marginTop: "13px"}}>Don't have account yet?</p>

        <button className={loginStyles.createBtn} onClick={showCreateGuide}>Request an account</button>
        <Modal closeButton open={isShowCreateGuide} onClose={hideCreateGuide} style={{maxWidth: '85%', margin: '0 auto'}}>
          <Modal.Header>
            <Text b size={22} >How to get an account?</Text>
          </Modal.Header>
          <Modal.Body>
            <p style={{textAlign: 'justify'}}>Because of security Policy, new employees need an account to pass the security gate. Please contact an administrator to get an new account.</p>
          </Modal.Body>
          <Modal.Footer>
            <a href="mailto:khangpt3@vng.com.vn" target="_blank" rel="noopener noreferrer" style={{fontWeight: 'bold', fontSize: '14px'}} onClick={hideCreateGuide}>Email Admin</a>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default LoginPage;
