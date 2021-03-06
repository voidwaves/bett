import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useLogout, useLoginState } from '../AppState'

// Navigationsleiste mit dem Logout Button
const Navigation = () => {
  const loggedIn = useLoginState()
  const logout = useLogout()

  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='http://localhost:3000/landing'>Bett</Navbar.Brand>
        <Nav className='mr-auto'></Nav>
        <Form inline>
          {!loggedIn ? null : (
            <Button variant='outline-info' onClick={logout}>
              Logout
            </Button>
          )}
        </Form>
      </Navbar>
    </>
  )
}

export default Navigation
