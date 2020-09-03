
import React, { FunctionComponent, Fragment, useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom'
import { ApiResponse, ApiRequest, App } from '../Types'
import { links } from '../Links'
import { dateToString, dateRange, stringToDate, isLater, isEarlier } from '../utils'
import EntryListItem from './EntryListItem'

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

    const getReportEntries = () => {
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
    }

    useEffect(() => {
        getReportEntries()
    }, [user])

    useEffect(() => {
        if(reportEntries !== null) {
            const allDates = dateRange(startDate, endDate)
            setFullEntryList(allDates.map(date => {
                const matchingEntry = reportEntries.find(entry => entry.reportDate === dateToString(date))
                const emptyEntry: App.ReportEntry = {
                    id: -1,
                    exists: false,
                    user: user as ApiResponse.User,
                    reportDate: date,
                    content: '',
                    workingHours: 0,
                    department: '',
                }
                return matchingEntry === undefined ? emptyEntry : {
                    ...matchingEntry,
                    exists: true,
                    reportDate: stringToDate(matchingEntry.reportDate)
                }
            }))
        }
    }, [reportEntries, startDate, endDate])

    const changeStartDate = (date: Date) => {
        if(!isLater(startDate, endDate)) {
            setStartDate(date)
        } else {
            alert('start date can not be later than end date')
        }
    }

    const changeEndDate = (date: Date) => {
        if(!isEarlier(endDate, startDate)) {
            setEndDate(date)
        } else {
            alert('end date can not be earlier than start date')
        }
    }

    // random key prop to force rerender
    return ( 
        <Fragment>
            <h2>Select a start date:</h2>
            <DatePicker selected={startDate} onChange={changeStartDate}/>
            <h2>Select an end date:</h2>
            <DatePicker selected={endDate} onChange={changeEndDate}/>
            {fullEntryList === null ? null : fullEntryList.map(reportEntry => (
                <EntryListItem key={Math.random()} reportEntry={reportEntry} reload={getReportEntries}/>
            ))}
        </Fragment>
    )
}

export default ReportEntries