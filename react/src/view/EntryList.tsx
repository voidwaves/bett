
import React, { FunctionComponent, Fragment, useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom'
import { ApiResponse, ApiRequest, App } from '../Types'
import { links } from '../Links'
import { dateToString, dateRange, stringToDate, isLater, isEarlier, weekDateRange, isWeekDay } from '../utils'
import EntryListItem from './EntryListItem'

const ReportEntries: FunctionComponent = () => {
    const [monday, friday] = weekDateRange(stringToDate('2020-08-26'))
    const [startDate, setStartDate] = useState(monday)
    const [endDate, setEndDate] = useState(friday)
    const [reportEntries, setReportEntries] = useState<ApiResponse.ReportEntry[] | null>(null)
    const [fullEntryList, setFullEntryList] = useState<App.ReportEntry[] | null>(null)
    const [user, setUser] = useState<App.User | null>(null)

    useEffect(() => {
        axios.get<ApiResponse.User>(links.api.profile)
        .then(response => setUser({
            ...response.data,
            beginOfApprenticeship: stringToDate(response.data.beginOfApprenticeship)
        }))
        .catch(() => alert('Could not get user data from api!'))
    }, []);

    const getReportEntries = () => {
        if(user !== null) {
            const start = dateToString(user.beginOfApprenticeship)
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
        if(reportEntries !== null && user !== null) {
            const allDates = dateRange(startDate, endDate)
            setFullEntryList(allDates.map(date => {
                const matchingEntry = reportEntries.find(entry => entry.reportDate === dateToString(date))
                const emptyEntry: App.ReportEntry = {
                    id: -1,
                    exists: false,
                    user: {
                        ...user,
                        beginOfApprenticeship: dateToString(user.beginOfApprenticeship)
                    },
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

    const onDateChange = (date: Date) => {
        const [newStartDate, newEndDate] = weekDateRange(date)
        setStartDate(newStartDate)
        setEndDate(newEndDate)
    }

    // random key prop to force rerender
    return user === null || reportEntries === null ? null : ( 
        <Fragment>
            <h2>Select a week</h2>
            <DatePicker
            selected={startDate} 
            onChange={onDateChange}
            onWeekSelect={onDateChange}
            startDate={startDate}
            endDate={endDate}
            minDate={user.beginOfApprenticeship}
            maxDate={new Date()}
            filterDate={isWeekDay}
            shouldCloseOnSelect={false}
            highlightDates={reportEntries.map(entry => stringToDate(entry.reportDate))}
            showWeekNumbers
            showMonthDropdown
            showYearDropdown
            />
            {fullEntryList === null ? null : fullEntryList.map(reportEntry => (
                <EntryListItem key={Math.random()} reportEntry={reportEntry} reload={getReportEntries}/>
            ))}
        </Fragment>
    )
}

export default ReportEntries