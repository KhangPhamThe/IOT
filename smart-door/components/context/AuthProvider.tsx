import { useAppDispatch, useAppSelector } from "hooks";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { getUserProfile } from "reducer/user/userSlice";
import { getCookieUserJWT } from "utils/users.utils";

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext({});

export const AuthProvider = (props: Props) => {
  const currUserSelection = useAppSelector(state => state.user);
  const dispatch = useAppDispatch()
  const route = useRouter()
  useEffect(() => {
    const jwt =  getCookieUserJWT()
    if (!jwt) {
      // if (route.pathname != '/user' && route.pathname != '/' && route.pathname != "/user/account")
      route.push('/general/login')
    } 
    else {
      dispatch(getUserProfile({jwt}))
      if (route.pathname == '/general/login') {
        route.push('/')
      }
    }
  }, [route, dispatch])

  return (
    <AuthContext.Provider value={{}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
