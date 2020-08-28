
import React, { FunctionComponent, Fragment, useState } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'ts-date'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom'

export type ReportEntry = {
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

const ListEntry: FunctionComponent<{reportEntry: ReportEntry}> = ({ reportEntry }) => {
    const handleDelete = () => {
        if(window.confirm('do you really want to delete this report entry?')) {
            const { id } = reportEntry
            axios.delete(`${api}/reportentry/${id}`)
            .then(() => {
                alert('successfully deleted the report entry')
            })
            .catch(() => {
                alert('could not delete report entry')
            })
        }
    }

    return (
        <Fragment>
            <div style={{backgroundColor: 'grey', width: 500}}>
                <h3>{reportEntry.date}</h3>
                <h3>{reportEntry.department}</h3>
                <button onClick={handleDelete}>delete</button>
            </div>
        </Fragment>
    )
} 

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
                <ListEntry reportEntry={reportEntry}/>
            ))}
            <Link to='/reportentries/new'>
                <button>new entry</button>
            </Link>
        </Fragment>
    )
}

export default ReportEntries