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
        <nav id="navigation" className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">Quiz</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <span className="nav-link active">{'props.user.displayName'}</span>
                        </li>
                        <li className="nav-item">
                            <span id="logoutLink" className="nav-link active" onClick={handleSignOut}>Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}


export default withRouter(Navigation)
