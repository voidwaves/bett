
import React, { Context, Dispatch, createContext, FunctionComponent, useState, useEffect, useContext } from 'react'
import axios from 'axios'

type LoginState = {
  isAuthorized: boolean
  interceptor: number
}
const defaultLoginState: LoginState = {
  isAuthorized: false,
  interceptor: 0
}
type LoginHook = [LoginState, Dispatch<LoginState>]
const LoginContext: Context<LoginHook> = createContext<LoginHook>([defaultLoginState, () => {}])

const LoginStateProvider: FunctionComponent = ({ children }) => {
  const [loginState, setLoginState] = useState(defaultLoginState)

  useEffect(() => {
    const token = getToken()
    if(token !== null) addTokenToHeaders(token)
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

const addTokenToHeaders = (token: string) => {
  return axios.interceptors.request.use(config => (
    {...config, Authorization: `Bearer ${token}`}
  ))
}

const removeTokenFromHeader = (interceptor: number) => {
  axios.interceptors.request.eject(interceptor)
}

const useLoginContext = () => useContext(LoginContext)

export const useLoginState = () => {
  const [loginState] = useLoginContext()
  return loginState
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
