
import React, { FunctionComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'

const Landing: FunctionComponent = () => {
    return (
        <Fragment>
            <Link to='/register'>
                <button>register</button>
            </Link>
            <Link to='/login'>
                <button>login</button>
            </Link>
        </Fragment>
    )
}

export default Landing