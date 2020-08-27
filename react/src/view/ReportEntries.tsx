
import React, { FunctionComponent, Fragment, useState } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'ts-date'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'

type ReportEntry = {
    id: number
    userId: number
    userName: string
    firstName: string
    lastName: string
    content: string
    date: Date
    workingHours: number
    department: string
}

const api = 'http://localhost:8081'

const ReportEntries: FunctionComponent = () => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [reportEntries, setReportEntries] = useState<ReportEntry[]>([])

    const buttonClick = () => {
        const start = format(startDate, 'YYYY-MM-DD')
        const end = format(endDate, 'YYYY-MM-DD')

        axios.get<ReportEntry[]>(`${api}/reportentry`, {
            params: {
                start: start,
                end: end
            }
        })
        .then(reportEntries => setReportEntries(reportEntries.data))
        .catch(error => alert(error))
    }

    return ( 
        <Fragment>
            <h2>Select a start date:</h2>
            <DatePicker selected={startDate} onChange={date => setStartDate(date as Date)}/>
            <h2>Select an end date:</h2>
            <DatePicker selected={endDate} onChange={date => setEndDate(date as Date)}/>
            <button onClick={buttonClick}>get report entries</button>
            {reportEntries === undefined ? null : reportEntries.map(reportEntry => (
            <Fragment>
                <h3>{reportEntry.id}</h3>
                <h3>{reportEntry.content}</h3>
            </Fragment>
            ))}
        </Fragment>
    )
}

export default ReportEntries