import React, { Fragment } from 'react'
import { Redirect, BrowserRouter, Switch, Route } from 'react-router-dom'
import { LoginStateProvider, useLoginState } from './AppState'
import Home from './view/Home'
import Landing from './view/Landing'
import Profile from './view/Profile'
import ReportEntries from './view/EntryList'
import Register from './view/Register'
import Login from './view/Login'
import Footer from './components/Footer'
import Navigation from './components/Navigation'

// Verpack die App Komponente in den Login State Provider
// sodass diese Daten in der gesammten App verfügbar sind
const WrappedApp = () => (
  <LoginStateProvider>
    <App />
  </LoginStateProvider>
)

// rendert die Login App oder die Core App, je nach dem ob der User angemeldet ist
const App = () => {
  const isAuthorized = useLoginState()
  return (
    <>
      <Navigation/>
      <div className='home-banner'></div>
      <div className='contentContainer'>
        <div className='container my-container'>
          {isAuthorized ? <CoreApp /> : <LoginApp />}
        </div>
      </div>
      <Footer />
    </>
  )
}

// Kompoente die den Kern der Application darstellt
const CoreApp = () => (
  <Fragment>
    <BrowserRouter>
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/reportentries' component={ReportEntries} />
        <Redirect from='/*' to='/home' />
      </Switch>
    </BrowserRouter>
  </Fragment>
)

// Komponente die den Anmelde und Registrierungsprozess übernimmt
const LoginApp = () => (
  <Fragment>
    <BrowserRouter>
      <Switch>
        <Route exact path='/landing' component={Landing} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Redirect from='/*' to='/landing' />
      </Switch>
    </BrowserRouter>
  </Fragment>
)

export default WrappedApp
