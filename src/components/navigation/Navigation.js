import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { auth } from '../../firebase/firebase'

const Navigation = props => {

    const handleSignOut = e => {
        auth.signOut()
            .then(() => {
                props.history.push('/')
            })
    }
    return (
        <nav id="navigation" className="navbar navbar-expand navbar-trans navbar-inverse">
            <Link to="/" className="navbar-brand">Quiz</Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <span className="nav-link active">{props.user.displayName}</span>
                        </li>
                        <li className="nav-item">
                            <span id="logoutLink" className="nav-link active" onClick={handleSignOut}>Logout</span>
                        </li>
                    </ul>
                </div>
        </nav>
    )
}


export default withRouter(Navigation)
