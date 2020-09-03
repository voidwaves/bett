
import React, { FunctionComponent, Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'
import {  App, ApiRequest } from '../Types'
import { links } from '../Links'
import { dateToString, fromEvent } from '../utils'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type EntryListItemProps = {
    reportEntry: App.ReportEntry
    reload: () => void
}

// todo: include pop up, pop up fields are input fields disabled by default
const EntryListItem: FunctionComponent<EntryListItemProps> = ({ reportEntry, reload }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [fieldsDisabled, setFieldsDisabled] = useState(true)
    const [workingHours, setWorkingHours] = useState(reportEntry.workingHours)
    const [department, setDepartment] = useState(reportEntry.department)
    const [content, setContent] = useState(reportEntry.content)

    const resetInputs = () => {
        setWorkingHours(reportEntry.workingHours)
        setDepartment(reportEntry.department)
        setContent(reportEntry.content)
    }

    const handleDelete = () => {
        if(window.confirm('do you really want to delete this report entry?')) {
            const { id } = reportEntry
            axios.delete(links.api.reportEntryDelete(id))
            .then(() => {
                alert('successfully deleted the report entry')
                reload()
                resetInputs()
            })
            .catch(() => {
                alert('could not delete report entry')
            })
        }
    }

    const handleSave = () => {
        const { id } = reportEntry

        if(reportEntry.exists) {
            const body: ApiRequest.ReportEntry.Put = {
                id, content, workingHours, department,
                reportDate: dateToString(reportEntry.reportDate)
            }
            axios.put(links.api.reportEntries, body)
            .then(() => {
                setFieldsDisabled(true)
                reload()
            })
            .catch(() => {
                alert('could not save existing report entry')
            })
        } else {
            const body: ApiRequest.ReportEntry.Post = {
                content, workingHours, department,
                reportDate: dateToString(reportEntry.reportDate)
            }
            axios.post(links.api.reportEntries, body)
            .then(() => {
                setFieldsDisabled(true)
                reload()
            })
            .catch(() => {
                alert('could not create new report entry')
            })
        }
    }

    const handleClose = () => {
        setIsModalOpen(false)
        resetInputs()
    }

    return (
        <Fragment>
            <div style={{backgroundColor: reportEntry.exists ? 'lightgreen' : 'lightcoral', width: 500}}>
                <h3>{dateToString(reportEntry.reportDate)}</h3>
                <h3>{reportEntry.department}</h3>
                {!isModalOpen ? <button onClick={() => setIsModalOpen(true)}>details</button> : (
                    <div style={{backgroundColor: 'lightblue', width: 300}}>
                        <h2>Report for {dateToString(reportEntry.reportDate)}</h2>

                        <h3>workingHours</h3>
                        <input value={workingHours} disabled={fieldsDisabled} type='number' onChange={event => setWorkingHours(parseInt(event.target.value))}/>
                        <h3>department</h3>
                        <input value={department} disabled={fieldsDisabled} type='text' onChange={fromEvent(setDepartment)}/>
                        <h3>content</h3>
                        <input value={content} disabled={fieldsDisabled} type='text' onChange={fromEvent(setContent)}/>

                        <button onClick={() => setFieldsDisabled(false)}>edit</button>
                        <button onClick={handleSave}>save</button>
                        {!reportEntry.exists ? null : <button onClick={handleDelete}>delete</button>}
                        <button onClick={handleClose}>close</button>
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default EntryListItem