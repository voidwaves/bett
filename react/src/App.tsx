import React, { Fragment } from 'react'
import { Redirect, BrowserRouter, Switch, Route } from 'react-router-dom'
import { LoginStateProvider, useLoginState } from './AppState'
import Home from './view/Home'
import Landing from './view/Landing'
import Profile from './view/Profile'
import ReportEntries from './view/EntryList'
import Register from './view/Register'
import Login from './view/Login'
import { links } from './Links'

const WrappedApp = () => (
    <LoginStateProvider>
        <App/>
    </LoginStateProvider>
)

const App = () => {
    const isAuthorized = useLoginState()
    return isAuthorized ? <CoreApp/> : <LoginApp/>
}

const { home, profile, reportEntries, landing, register, login } = links.browser

const CoreApp = () => (
    <Fragment>
        <BrowserRouter>
            <Switch>
                <Route exact path={home} component={Home}/>
                <Route exact path={profile} component={Profile}/>
                <Route exact path={reportEntries} component={ReportEntries}/>
                <Redirect from='/*' to={home}/>
            </Switch>
        </BrowserRouter>
    </Fragment>
)

const LoginApp = () => (
    <Fragment>
        <BrowserRouter>
            <Switch>
                <Route exact path={landing} component={Landing}/>
                <Route exact path={register} component={Register}/>
                <Route exact path={login} component={Login}/>
                <Redirect from='/*' to={landing}/>
            </Switch>
        </BrowserRouter>
    </Fragment>
)

export default WrappedApp
