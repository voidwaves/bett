import React, { FunctionComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../AppState'
import { links } from '../Links'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Profile from './Profile'
import Register from './Register'
import ReportEntries from './EntryList'

const Home: FunctionComponent = () => {
  const logout = useLogout()

  return (
    <Fragment>
      <div className='row  my-row'>
        <div className='col-md-12 col-sm-6 my-col-Login2'>
          <Tabs defaultActiveKey='register' id='uncontrolled-tab-example'>
            <Tab eventKey='register' title='Report entries'>
              <ReportEntries />
            </Tab>
            <Tab eventKey='login' title='Profile Bearbeiten'>
              <Profile />
            </Tab>
          </Tabs>
        </div>
      </div>
    </Fragment>
  )
}

export default Home
