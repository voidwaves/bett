import React, { FunctionComponent, Fragment, useState, useEffect, createContext, Context, Dispatch, useContext } from 'react'
import axios from 'axios'
import { Redirect, BrowserRouter, Switch, Route } from 'react-router-dom'
import { LoginStateProvider, useLoginState } from './AppState'
import Home from './view/Home'
import Landing from './view/Landing'
import Profile from './view/Profile'
import ReportEntries from './view/ReportEntries'
import Register from './view/Register'
import Login from './view/Login'

// import DatePicker from 'react-datepicker'
// import "react-datepicker/dist/react-datepicker.css"
// import { format } from 'ts-date'

// type ReportEntry = {
//   id: number
//   userId: number
//   userName: string
//   firstName: string
//   lastName: string
//   content: string
//   date: Date
//   workingHours: number
//   department: string
// }

// const api = 'http://localhost:8081'

// const App: FunctionComponent = () => {
//   const [token, setToken] = useState('')
//   const [startDate, setStartDate] = useState(new Date())
//   const [endDate, setEndDate] = useState(new Date())
//   const [reportEntries, setReportEntries] = useState<ReportEntry[]>([])

//   useEffect(() => {
//     axios.post<{token: string}>(`${api}/authenticate`, {
//       username: 'javaforever',
//       password: '123456'
//     })
//     .then(response => {
//       setToken(response.data.token)
//       console.log(response.data.token)

//       axios.interceptors.request.use(
//         config => {
//           config.headers.Authorization = `Bearer ${response.data.token}`
//           return config
//         },
//         (error: any) => {
//           Promise.reject(error)
//         }
//       )
//     })
//     .catch(() => console.log('..............'))
//   }, [])

//   const buttonClick = () => {
//     const start = format(startDate, 'YYYY-MM-DD')
//     const end = format(endDate, 'YYYY-MM-DD')

//     axios.get<ReportEntry[]>(`${api}/reportentry`, {
//       params: {
//         start: start,
//         end: end
//       }
//     })
//     .then(reportEntries => setReportEntries(reportEntries.data))
//     .catch(error => alert(error))
//   }

//   return ( 
//     <Fragment>
//       <h2>Select a start date:</h2>
//       <DatePicker selected={startDate} onChange={date => setStartDate(date as Date)}/>
//       <h2>Select an end date:</h2>
//       <DatePicker selected={endDate} onChange={date => setEndDate(date as Date)}/>
//       <button onClick={buttonClick}>get report entries</button>
//       {reportEntries === undefined ? null : reportEntries.map(reportEntry => (
//         <Fragment>
//           <h3>{reportEntry.id}</h3>
//           <h3>{reportEntry.content}</h3>
//         </Fragment>
//       ))}
//     </Fragment>
//   )
// }

// export default App

const WrappedApp = () => (
    <LoginStateProvider>
        <App/>
    </LoginStateProvider>
)

const App = () => {
    const isAuthorized = useLoginState()
    return isAuthorized ? <CoreApp/> : <LoginApp/>
}

const CoreApp = () => (
    <Fragment>
        <BrowserRouter>
            <Switch>
                <Route exact path='/home' component={Home}/>
                <Route exact path='/profile' component={Profile}/>
                <Route exact path='/reportentries' component={ReportEntries}/>
                <Redirect from='/*' to='/home'/>
            </Switch>
        </BrowserRouter>
    </Fragment>
)

const LoginApp = () => (
    <Fragment>
        <BrowserRouter>
            <Switch>
                <Route exact path='/landing' component={Landing}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/login' component={Login}/>
                <Redirect from='/*' to='/landing'/>
            </Switch>
        </BrowserRouter>
    </Fragment>
)

export default WrappedApp
