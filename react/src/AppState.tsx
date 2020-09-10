
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
// erstellt den React Context, aus dem der Login State Provider gebaut wird
// und die Hooks um auf diesen State zuzugreifen und ihn zu modifizieren
const LoginContext: Context<LoginHook> = createContext<LoginHook>([defaultLoginState, () => {}])

// Erstellung des Login State Providers
export const LoginStateProvider: FunctionComponent = ({ children }) => {
  const [loginState, setLoginState] = useState(defaultLoginState)

  useEffect(() => {
    const token = getToken()
    if(token !== null) {
      // check if token has not been expired!
      const interceptor = addTokenToHeaders(token)
      setLoginState({isAuthorized: true, interceptor})
    }
  }, [])

  return (
    <LoginContext.Provider value={[loginState, setLoginState]}>
      {children}
    </LoginContext.Provider>
  )
}

// Funtionen um den Token im Sessionspeicher des Browsers abzulegen 

const appKey = 'bett'
const setToken = (token: string) => sessionStorage.setItem(appKey, token)
const getToken = () => sessionStorage.getItem(appKey)
const removeToken = () => sessionStorage.removeItem(appKey)

// Funktionen um die Request Header für die API zu modifizieren

const addTokenToHeaders = (token: string): number => {
  return axios.interceptors.request.use(config => (
    {...config, headers: {
      Authorization: `Bearer ${token}`
    }}
  ))
}

const removeTokenFromHeader = (interceptor: number) => {
  axios.interceptors.request.eject(interceptor)
}

// Hooks um auf den Login State zuzugreifen und ihn zu modifizieren

const useLoginContext = () => useContext(LoginContext)

export const useLoginState = () => {
  const [{ isAuthorized }] = useLoginContext()
  return isAuthorized
}

export const useLogin = () => {
  const [, setLoginState] = useLoginContext()
  return (token: string) => {
    setToken(token)
    const interceptor = addTokenToHeaders(token)
    setLoginState({isAuthorized: true, interceptor})
  }
}

export const useLogout = () => {
  const [{ interceptor }, setLoginState] = useLoginContext()
  return () => {
    removeToken()
    removeTokenFromHeader(interceptor)
    setLoginState({isAuthorized: false, interceptor: -1})
  }
}
