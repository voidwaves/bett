
import React, { FunctionComponent, Fragment, useState, useEffect } from 'react'
import { ApiResponse, App, ApiRequest } from '../Types'
import axios from 'axios'
import { links } from '../Links'
import { stringToDate, dateToString } from '../utils'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useLogout } from '../AppState'

const Profile: FunctionComponent = () => {
    const [fieldsDisabled, setFieldsDisabled] = useState(true)
    const [user, setUser] = useState<App.User | null>(null)
    const logout = useLogout()

    useEffect(() => {
        axios.get<ApiResponse.User>(links.api.profile)
        .then(response => setUser({...response.data, beginOfApprenticeship: stringToDate(response.data.beginOfApprenticeship)}))
        .catch(() => alert('could not load profile'))
    }, [])

    const handleDelete = () => {
        if(user !== null && window.confirm('are you sure that you want to delete your account permanently?')) {
            axios.delete(links.api.profileDelete(user.id))
            logout()
        }
    }

    const handleSave = () => {
        if(user !== null) {
            const body: ApiRequest.User.Put = {...user, beginOfApprenticeship: dateToString(user.beginOfApprenticeship)}
            axios.put(links.api.profile, body)
            setFieldsDisabled(true)
        }
    }

    return (
        <Fragment>
            <h1>User Profile</h1>
            {user === null ? <h2>loading...</h2> : (
                <div>
                    <h3>label</h3>
                    <input value={user.label} disabled={fieldsDisabled} type="text" onChange={event => setUser({...user, label: event.target.value})}/>
                    <h3>first name</h3>
                    <input value={user.firstName} disabled={fieldsDisabled} type="text" onChange={event => setUser({...user, firstName: event.target.value})}/>
                    <h3>last name</h3>
                    <input value={user.lastName} disabled={fieldsDisabled} type="text" onChange={event => setUser({...user, lastName: event.target.value})}/>
                    <h3>begin of apprenticeship</h3>
                    <DatePicker selected={user.beginOfApprenticeship} disabled={fieldsDisabled} onChange={(date: Date) => setUser({...user, beginOfApprenticeship: date})}/>

                    <button onClick={() => setFieldsDisabled(false)}>edit</button>
                    <button onClick={handleSave}>save</button>
                    <button onClick={handleDelete}>delete</button>
                </div>
            )}
        </Fragment>
    )
}

export default Profile