
import React, { FunctionComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { links } from '../Links'

const Landing: FunctionComponent = () => {
    const { register, login } = links.browser
    return (
        <Fragment>
            <Link to={register}>
                <button>register</button>
            </Link>
            <Link to={login}>
                <button>login</button>
            </Link>
        </Fragment>
    )
}

export default Landing