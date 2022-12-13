import { FormElement, Input, Spacer, StyledButton, Radio, } from '@nextui-org/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Head from "next/head";
import NavBar from "components/home/navBar";
import LeftBar from "components/home/leftBar";
import styles from "styles/Home.module.scss";
import adminStyle from "styles/admin.module.scss";
import AuthContext from 'components/context/AuthProvider'

type Props = {

}

const RegisterAdminPage = (props: Props) => {
    const emailInput = useRef<FormElement>(null);
    const passInput = useRef<HTMLInputElement>(null);
    const firstNameInput = useRef<FormElement>(null);
    const lastNameInput = useRef<FormElement>(null);
    const avatarLinkInput = useRef<FormElement>(null);
    const [roleInput, setRoleInput] = useState("admin");
    const currentUser = useContext(AuthContext)

    useEffect(() => {
        console.log("abcxyz", currentUser)
    }, [currentUser])

    const handleRegister = async () => {
        console.log(emailInput.current?.value)
        console.log(passInput.current?.value)
        console.log(firstNameInput.current?.value)
        console.log(lastNameInput.current?.value)
        console.log(avatarLinkInput.current?.value)
        console.log(roleInput)
    }

    return (
        <div className={styles.container}>
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
                        <div style={{width: '45%', paddingLeft: '40px', paddingTop: '10px'}}>
                            <h3>Register for new employee</h3>
                            <div>Just admin can go to this page to register to User</div>

                            <Spacer y={1} />
                            <Input labelLeft="User name" placeholder='Username' width='90%' ref={emailInput} />

                            <Spacer y={1} />
                            <Input labelLeft="First name" placeholder='Firstname' width='90%' ref={firstNameInput} />

                            <Spacer y={1} />
                            <Input labelLeft="Last name" placeholder='Lastname' width='90%' ref={lastNameInput} />

                            <Spacer y={1} />
                            <Input labelLeft="Avatart link" placeholder='Avata link' width='90%' ref={avatarLinkInput} />

                            <Spacer y={1} />
                            <Input.Password
                                labelLeft='Password'
                                placeholder="Password here"
                                width='90%'
                                ref={passInput}
                            />

                            <Spacer y={1} />
                            <Radio.Group label="Roles" labelColor='primary' defaultValue="admin" orientation="horizontal" onChange={setRoleInput}>
                                <Radio value="admin">
                                    Admin
                                </Radio>
                                <Radio value="user">
                                    User
                                </Radio>
                            </Radio.Group>

                            <Spacer y={1} />
                            <StyledButton style={{width: '90%', background: 'linear-gradient(0deg, #EDBAFF 0%, #A1FFFF 90%)', color: 'black', fontWeight: 'bold'}} onClick={handleRegister}>Register</StyledButton>
                        </div>
                    </main>
                </div>
            </main>
        </div>
    );
}

export default RegisterAdminPage