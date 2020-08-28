import React, { FunctionComponent, Fragment, useState, SetStateAction, ChangeEvent } from 'react'
import { Link, Redirect } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { format } from 'ts-date'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'
import { ReportEntry } from './ReportEntries'

const fromEvent = function <Type>(setter: SetStateAction<any>) {
    return (event: ChangeEvent<HTMLInputElement>) => setter(event.target.value)
}

const api = 'http://localhost:8081'

const NewReportEntry: FunctionComponent = () => {
    const [workingHours, setWorkingHours] = useState(0)
    const [department, setDepartment] =useState('')
    const [date, setDate] = useState(new Date())
    const [content, setContent] = useState('')
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = () => {
        const formattedDate = format(date, 'YYYY-MM-DD')

        const body = {content, date: formattedDate, workingHours, department}

        axios.post<ReportEntry[]>(`${api}/reportentry`, body)
        .then(() => setRedirect(true))
        .catch(error => alert(error))
    }

    return redirect ? <Redirect to='/reportentries'/> : (
        <Fragment>
            <h1>create a new entry</h1>
            <h2>enter working hours</h2>
            <input type='float' onChange={fromEvent(setWorkingHours)}/>
            <h2>enter department</h2>
            <input type='text' onChange={fromEvent(setDepartment)}/>
            <h2>enter date</h2>
            <DatePicker selected={date} onChange={date => setDate(date as Date)}/>
            <h2>enter content</h2>
            <input type='text' onChange={fromEvent(setContent)}/>
            <br/>
            <button onClick={handleSubmit}>create new entry</button>
        </Fragment>
    )
}

export default NewReportEntry