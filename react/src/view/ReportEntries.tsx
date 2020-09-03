
import React, { FunctionComponent, Fragment, useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom'
import { ApiResponse, ApiRequest, App } from '../Types'
import { links } from '../Links'
import { dateToString, dateRange, stringToDate } from '../utils'

const ListEntry: FunctionComponent<{reportEntry: App.ReportEntry}> = ({ reportEntry }) => {
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
                <h3>{dateToString(reportEntry.reportDate)}</h3>
                <h3>{reportEntry.content}</h3>
                <button onClick={handleDelete}>delete</button>
            </div>
        </Fragment>
    )
} 

const ReportEntries: FunctionComponent = () => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [reportEntries, setReportEntries] = useState<ApiResponse.ReportEntry[] | null>(null)
    const [fullEntryList, setFullEntryList] = useState<App.ReportEntry[] | null>(null)
    const [user, setUser] = useState<ApiResponse.User | null>(null)

    useEffect(() => {
        axios.get<ApiResponse.User>(links.api.profile)
        .then(response => setUser(response.data))
        .catch(() => alert('Could not get user data from api!'))
    }, [])

    useEffect(() => {
        if(user !== null) {
            const start = user.beginOfApprenticeship
            const end = dateToString(new Date())
            const params: ApiRequest.ReportEntry.Params = {
                params: {start, end}
            }
            axios.get<ApiResponse.ReportEntry[]>(links.api.reportEntries, params)
            .then(reportEntries => setReportEntries(reportEntries.data))
            .catch(() => alert('Could not get report entries from api!'))
        }
    }, [user])

    useEffect(() => {
        if(reportEntries !== null) {
            const allDates = dateRange(startDate, endDate)
            setFullEntryList(allDates.map(date => {
                const matchingEntry = reportEntries.find(entry => {
                    console.log(entry.reportDate === dateToString(date), entry.reportDate, dateToString(date), )
                    return entry.reportDate === dateToString(date)
                })
                const emptyEntry: App.ReportEntry = {
                    id: -1,
                    user: user as ApiResponse.User,
                    reportDate: date,
                    content: '',
                    workingHours: 0,
                    department: '',
                }
                return matchingEntry === undefined ? emptyEntry : {
                    ...matchingEntry,
                    reportDate: stringToDate(matchingEntry.reportDate)
                }
            }))
        }
    }, [reportEntries, startDate, endDate])

    return ( 
        <Fragment>
            <h2>Select a start date:</h2>
            <DatePicker selected={startDate} onChange={date => setStartDate(date as Date)}/>
            <h2>Select an end date:</h2>
            <DatePicker selected={endDate} onChange={date => setEndDate(date as Date)}/>
            {fullEntryList === null ? null : fullEntryList.map(reportEntry => (
                <ListEntry reportEntry={reportEntry}/>
            ))}
            <Link to='/reportentries/new'>
                <button>new entry</button>
            </Link>
        </Fragment>
    )
}

export default ReportEntries