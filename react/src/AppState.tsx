
import React, { Context, Dispatch, createContext, FunctionComponent, useState, useEffect, useContext } from 'react'
import axios from 'axios'

type LoginState = {
  isAuthorized: boolean
  interceptor: number
}

const defaultLoginState: LoginState = {
  isAuthorized: false,
  interceptor: -1
}

type LoginHook = [LoginState, Dispatch<LoginState>]
const LoginContext: Context<LoginHook> = createContext<LoginHook>([defaultLoginState, () => {}])

export const LoginStateProvider: FunctionComponent = ({ children }) => {
  const [loginState, setLoginState] = useState(defaultLoginState)
  const login = useLogin()

  useEffect(() => {
    const token = getToken()
    if(token !== null) {
      // check if token has not been expired!
      login(token)
    }
  }, [])

  return (
    <LoginContext.Provider value={[loginState, setLoginState]}>
      {children}
    </LoginContext.Provider>
  )
}

const appKey = 'bett'
const setToken = (token: string) => sessionStorage.setItem(appKey, token)
const getToken = () => sessionStorage.getItem(appKey)
const removeToken = () => sessionStorage.removeItem(appKey)

const addTokenToHeaders = (token: string): number => {
  return axios.interceptors.request.use(config => (
    {...config, Authorization: `Bearer ${token}`}
  ))
}

const removeTokenFromHeader = (interceptor: number) => {
  axios.interceptors.request.eject(interceptor)
}

const useLoginContext = () => useContext(LoginContext)

export const useLoginState = () => {
  const [{ isAuthorized }] = useLoginContext()
  return isAuthorized
}

export const useLogin = () => {
  const [, setloginState] = useLoginContext()
  return (token: string) => {
    setToken(token)
    const interceptor = addTokenToHeaders(token)
    setloginState({isAuthorized: true, interceptor})
  }
}

export const useLogout = () => {
  const [{ interceptor }, setloginState] = useLoginContext()
  return () => {
    removeToken()
    removeTokenFromHeader(interceptor)
    setloginState({isAuthorized: false, interceptor: 0})
  }
}
