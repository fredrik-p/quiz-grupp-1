import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { auth } from '../../firebase/firebase'

const  Navigation = props => {

    const handleSignOut = e => {
        auth.signOut()
        .then(() => {
            console.log('Signed Out')
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
                            <span className="nav-link" onClick={handleSignOut}>Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}


export default Navigation
