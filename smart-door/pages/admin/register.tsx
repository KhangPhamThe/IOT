import { Input, Spacer, StyledButton } from '@nextui-org/react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../components/context/AuthProvider'
import { auth } from '../api/googleAuthen/firebase-config'

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
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword,
            )
            
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <div>Just admin can go to this page to register to User</div>
        <Input labelLeft="User name" placeholder='Username' onChange={(e) => {
            setRegisterEmail(e.target.value)
        }}/>
        
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
  )
}

export default RegisterAdminPage