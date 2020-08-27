
import React, { FunctionComponent, Fragment, useState, SetStateAction, ChangeEvent } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'ts-date'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const Register: FunctionComponent = () => {
    // username, password, firstname, lastname, label, startofapprenticeship
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [label, setLabel] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [redirect, setRedirect] = useState(false)

    const fromEvent = function <Type>(setter: SetStateAction<any>) {
        return (event: ChangeEvent<HTMLInputElement>) => setter(event.target.value)
    }

    const handleSubmit = () => {
        const body = {
            username: userName,
            beginOfApprenticeship: format(startDate, 'YYYY-MM-DD'),
            password, firstName, lastName, label
        }

        const api = 'http://localhost:8081'

        axios.post<{token: string}>(`${api}/register`, body)
        .then(() => {
            setRedirect(true)
        })
        .catch(() => {
            alert('could not create a new user')
        })
    }

    return redirect ? <Redirect to='/landing'/> : (
        <Fragment>
            <h1>Register here</h1>
            <h2>enter your user name</h2>
            <input type='text' onChange={fromEvent(setUserName)}/>
            <h2>enter your password</h2>
            <input type='password' onChange={fromEvent(setPassword)}/>
            <h2>enter your first name</h2>
            <input type='text' onChange={fromEvent(setFirstName)}/>
            <h2>enter your last name</h2>
            <input type='text' onChange={fromEvent(setLastName)}/>
            <h2>enter your job label</h2>
            <input type='text' onChange={fromEvent(setLabel)}/>
            <h2>enter the start date of your apprenticeship</h2>
            <DatePicker selected={startDate} onChange={date => setStartDate(date as Date)}/>
            <br/>
            <button onClick={handleSubmit}>register</button>
        </Fragment>
    )
}

export default Register