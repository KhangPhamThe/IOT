import { Input, Spacer, StyledButton } from '@nextui-org/react'
import React, { useContext, useEffect, useState } from 'react'
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