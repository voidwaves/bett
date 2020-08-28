
import React, { FunctionComponent, Fragment, useState } from 'react'
import axios from 'axios'
import { useLogin } from '../AppState'
import { links } from '../Links'
import { ApiRequest } from '../Types'

const Login: FunctionComponent = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const login = useLogin()

    const handleSubmit = () => {
        const body: ApiRequest.Login = {
            username: userName,
            password: password
        }

        axios.post<{token: string}>(links.api.login, body)
        .then(response => {
            login(response.data.token)
        })
        .catch(() => {
            setPassword('')
        })
    }

    return (
        <Fragment>
            <h1>login here</h1>
            <h2>user name</h2>
            <input type='text' onChange={event => setUserName(event.target.value)}/>
            <h2>password</h2>
            <input type='password' onChange={event => setPassword(event.target.value)}/>
            <br/>
            <button onClick={handleSubmit}>login</button>
        </Fragment>
    )
}

export default Login