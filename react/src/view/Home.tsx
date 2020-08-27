
import React, { FunctionComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'

const Home: FunctionComponent = () => {
    return (
        <Fragment>
            <Link to='/profile'>
                <button>profile</button>
            </Link>
            <Link to='/reportentries'>
                <button>report entries</button>
            </Link>
        </Fragment>
    )
}

export default Home