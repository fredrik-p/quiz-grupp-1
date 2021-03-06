import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { auth } from '../../firebase/firebase'

const Navigation = props => {

    const handleSignOut = e => {
        auth.signOut()
            .then(() => {
                props.history.push('/')
            })
    }

    const handleLogin = () => {
        props.handleLogin();
        props.history.push('/');
    }
    return (
        <nav id="navigation" className="navbar navbar-expand navbar-trans navbar-inverse">
            {props.quizCompleted ?
                ''
                :
                <Link to="/" className="navbar-brand">Quiz</Link>
            }
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <span className="nav-link active">{props.user.displayName}</span>
                    </li>
                    {props.user.displayName === 'Guest' ?
                            <li className="nav-item">
                                <span id="logoutLink" className="nav-link active" onClick={handleLogin}>Login</span>
                            </li>
                        :
                            <li className="nav-item">
                                <span id="logoutLink" className="nav-link active" onClick={handleSignOut}>Logout</span>
                            </li>
                    }

                </ul>
            </div>
        </nav>
    )
}


export default withRouter(Navigation)
