
import React, { FunctionComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../AppState'

const Home: FunctionComponent = () => {
    const logout = useLogout()

    return (
        <Fragment>
            <Link to='/profile'>
                <button>profile</button>
            </Link>
            <Link to='/reportentries'>
                <button>report entries</button>
            </Link>
            <br/>
            <button onClick={logout}>log out</button>
        </Fragment>
    )
}

export default Home