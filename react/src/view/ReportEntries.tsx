
import React, { FunctionComponent, Fragment, useState } from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom'
import { ApiResponse, ApiRequest } from '../Types'
import { links } from '../Links'
import { dateToString } from '../utils'

const ListEntry: FunctionComponent<{reportEntry: ApiResponse.ReportEntry}> = ({ reportEntry }) => {
    const handleDelete = () => {
        if(window.confirm('do you really want to delete this report entry?')) {
            const { id } = reportEntry
            axios.delete(links.api.reportEntryDelete(id))
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
    const [reportEntries, setReportEntries] = useState<ApiResponse.ReportEntry[]>([])

    const buttonClick = () => {
        const start = dateToString(startDate)
        const end = dateToString(endDate)
        const params: ApiRequest.ReportEntry.Params = {
            params: {start, end}
        }

        axios.get<ApiResponse.ReportEntry[]>(links.api.reportEntries, params)
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