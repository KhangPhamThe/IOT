import { Input, Spacer, StyledButton } from '@nextui-org/react'
import React, { useContext, useEffect, useState } from 'react'
import Head from "next/head";
import NavBar from "components/home/navBar";
import LeftBar from "components/home/leftBar";
import styles from "styles/Home.module.scss";
import adminStyle from "styles/admin.module.scss";
import AuthContext from 'components/context/AuthProvider'

type Props = {

}

const RegisterAdminPage = (props: Props) => {
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const currentUser = useContext(AuthContext)
    useEffect(() => {
        console.log("abcxyz", currentUser)
    }, [currentUser])
    
    const handleRegister = async () => {

    }

    return (
        <div className={styles.container}>
            {/* <div>{JSON.stringify(alarmData)}</div>
			<div>{JSON.stringify(PPLInData)}</div>
			<div>{JSON.stringify(PPLOutData)}</div> */}
            <Head>
                <title>Door Management - Admin</title>
                <meta name="description" content="Door" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <LeftBar />

                <div className={styles.rightSide}>
                    <NavBar />

                    <main className={adminStyle.mainContent}>
                        <div>
                            <div>Just admin can go to this page to register to User</div>
                            <Input labelLeft="User name" placeholder='Username' onChange={(e) => {
                                setRegisterEmail(e.target.value)
                            }} />

                            <Spacer y={0.5} />
                            <Input.Password
                                labelLeft='Password'
                                placeholder="Password here"
                                onChange={(e) => {
                                    setRegisterPassword(e.target.value)
                                }}
                            />
                            <StyledButton onClick={handleRegister}>Register</StyledButton>
                        </div>
                    </main>
                </div>
            </main>
        </div>
    );
}

export default RegisterAdminPage