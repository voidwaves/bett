import React, { FunctionComponent, Fragment } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Profile from './Profile'
import ReportEntries from './EntryList'

// Home Page mit Tabs um zwischen Report Entries un Profil zu wechseln
const Home: FunctionComponent = () => {
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
