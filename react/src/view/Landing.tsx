import React, { FunctionComponent, Fragment } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Login from './Login'
import Register from './Register'
import HomeText from '../components/HomeText'

// Landing Page mit Tabs um zwischen Anmeldung und Registrierung zu wechseln
const Landing: FunctionComponent = () => {
  return (
    <Fragment>
      <div className='row  my-row'>
        <div className='col-md-6 col-sm-6 my-col-Login2'>
          <HomeText />
        </div>
        <div className='col-md-6 col-sm-6 my-col-Login2'>
          <Tabs defaultActiveKey='login' id='uncontrolled-tab-example'>
            <Tab eventKey='login' title='Login'>
              <Login />
            </Tab>
            <Tab eventKey='register' title='Register'>
              <Register />
            </Tab>
          </Tabs>
        </div>
      </div>
    </Fragment>
  )
}

export default Landing
