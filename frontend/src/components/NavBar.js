import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const NavBar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper purple lighten-3 z-depth-5" style={{ padding: '0 2rem' }}>
                <span className="brand-logo">TODOs</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/createit">ToDo</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Log Out</a></li>
                </ul>
            </div>
        </nav>
    )
}