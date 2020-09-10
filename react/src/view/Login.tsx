import React, { FunctionComponent, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useLogin } from '../AppState'
import { links } from '../Links'
import { ApiRequest } from '../Types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'

// Komponente mit der die Anmeldung vorgenommen wird
const Login: FunctionComponent = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const login = useLogin()

  // Funktion die das Absenden der Request ans Backend übernimmt, um einen Token
  // für die Authentifizierung zu erhalten
  const handleSubmit = () => {
    const body: ApiRequest.Login = {
      username: userName,
      password: password,
    }

    axios
      .post<{ token: string }>(links.api.login, body)
      .then((response) => {
        login(response.data.token)
      })
      .catch((error: AxiosError) => {
        const unauthorized = error.response?.status === 401
        if(unauthorized) alert('invalid credentials, please try again')
        else alert('could not connect to backend services')
        setPassword('')
      })
  }

  return (
    <>
      <div className='loginForm'>
        <Form>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={(event) => setUserName(event.target.value)}
              name='username'
              type='text'
              placeholder='z.B abcds@blabla.de'
              value={userName}
            />
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(event) => setPassword(event.target.value)}
              name='password'
              type='password'
              value={password}
            />
          </Form.Group>
          <Button variant='secondary' onClick={handleSubmit}>
            Login
          </Button>
        </Form>
      </div>
    </>
  )
}

export default Login
