
import React, { FunctionComponent, Fragment, useState } from 'react'
import axios from 'axios'
import { useLogin } from '../AppState'

const Login: FunctionComponent = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const login = useLogin()

    const handleSubmit = () => {
        const body = {
            username: userName,
            password: password
        }

        const api = 'http://localhost:8081'

        axios.post<{token: string}>(`${api}/authenticate`, body)
        .then(response => {
            login(response.data.token)
        })
        .catch(() => {
            setPassword('deleted....')
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