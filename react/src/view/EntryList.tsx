import React, { FunctionComponent, Fragment, useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'
import { ApiResponse, App } from '../Types'
import { links } from '../Links'
import Button from 'react-bootstrap/Button'
import jsPDFGenerator from '../utility/jsPDFGenerator'
import Form from 'react-bootstrap/Form'
import { dateToString, dateRange, stringToDate, weekDateRange, isWeekDay, isEqual} from '../utility/utils'
import EntryListItem from '../components/EntryListItem'

// Komponente um die Liste an Report Entries zu rendern und das Datum auszuwählen
const EntryList: FunctionComponent = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [reportEntries, setReportEntries] = useState<ApiResponse.ReportEntry[] | null>(null)
  const [fullEntryList, setFullEntryList] = useState<App.ReportEntry[] | null>(null)
  const [user, setUser] = useState<App.User | null>(null)

  // API Requests die nach dem rendern ausgeführt werden
  useEffect(() => {
    getUser()
    getReportEntries()
  }, [])

  // API Request für das User Objekt
  const getUser = () => {
    axios
    .get<ApiResponse.User>(links.api.profile)
    .then(response => {
      setUser({
        ...response.data,
        beginOfApprenticeship: stringToDate(response.data.beginOfApprenticeship)
      })

      const [start, end] = weekDateRange(new Date(), stringToDate(response.data.beginOfApprenticeship))
      setStartDate(start)
      setEndDate(end)
    })
    .catch(() => alert('Could not get user data from api!'))
  }

  // API Request für die Liste an Report Entries
  const getReportEntries = () => {
    axios
    .get<ApiResponse.ReportEntry[]>(links.api.reportEntries)
    .then((reportEntries) => setReportEntries(reportEntries.data))
    .catch(() => alert('Could not get report entries from api!'))
  }

  // zusammenführen der Liste aus Report Entries aus dem Backend mit den noch
  // nicht getätigten Report Entries für den jeweiligen Zeitraum
  useEffect(() => {
    if (reportEntries !== null && user !== null) {
      const allDates = dateRange(startDate, endDate)
      setFullEntryList(
        allDates.map((date) => {
          const matchingEntry = reportEntries.find((entry) => entry.reportDate === dateToString(date))
          const emptyEntry: App.ReportEntry = {
            id: -1,
            exists: false,
            user: {
              ...user,
              beginOfApprenticeship: dateToString(user.beginOfApprenticeship),
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
        })
      )
    }
  }, [reportEntries, user, startDate, endDate])

  // ändere den audgewählten Zeitraum
  const onDateChange = (date: Date) => {
    if(user !== null) {
      const [newStartDate, newEndDate] = weekDateRange(date, user.beginOfApprenticeship)
      setStartDate(newStartDate)
      setEndDate(newEndDate)
    }
  }

  // rendern der Liste aus gemachten und noch nicht gemachten Report Entries und des Date Pickers
  return user === null || reportEntries === null ? null : (
    <Fragment>
      <div className='row' style={{marginTop: 30, marginBottom: 30}}>
        <div className='col-md-3 col-sm-6 '>
          <Form.Label>Select a week</Form.Label>
        </div>
        <div className='col-md-8 col-sm-6 '>
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
            highlightDates={[
              {
                "date-no-highlight": dateRange(user.beginOfApprenticeship, new Date())
                .filter(date => isWeekDay(date))
                .filter(date => reportEntries.find(entry => isEqual(stringToDate(entry.reportDate), date)) === undefined)
              },
              {
                "date-highlight": reportEntries.map((entry) => stringToDate(entry.reportDate))
              }
            ]}
            showWeekNumbers
            showMonthDropdown
            showYearDropdown
          />
        </div>
      </div>
      {fullEntryList === null
        ? null
        : fullEntryList.map((reportEntry) => (
            <EntryListItem
              key={Math.random()}
              reportEntry={reportEntry}
              reload={getReportEntries}
            />
          ))}
      {fullEntryList === null ? null : (
        <Button onClick={() => jsPDFGenerator(fullEntryList, user)}>Download</Button>
      )}
    </Fragment>
  )
}

export default EntryList
