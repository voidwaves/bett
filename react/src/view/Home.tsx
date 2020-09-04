
import React, { FunctionComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../AppState'
import { links } from '../Links'

const Home: FunctionComponent = () => {
    const { profile, reportEntries } = links.browser
    const logout = useLogout()

    return (
        <Fragment>
            <Link to={profile}>
                <button>profile</button>
            </Link>
            <Link to={reportEntries}>
                <button>report entries</button>
            </Link>
            <br/>
            <button onClick={logout}>log out</button>
        </Fragment>
    )
}

export default Home