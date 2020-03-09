import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import logo from './assets/quizlogo.svg';
import qg1logo from './assets/qg1-logo.svg';

const LoginPage = (props) => {

    return (
        <div id="login" className="container mt-4 text-center">
            <img className="login-logo"
                src={logo}
                alt="Logo" />
            <h1>SIGN IN TO CREATE & PLAY QUIZES</h1>
            <button onClick={props.login} className="btn button btn-lg"><FontAwesomeIcon icon={faGoogle} id="google" />Sign in with Google </button>
            <h2>OR</h2>
            <button className="btn button btn-lg">
                Play as a guest
            </button>
            <img className="qg1-logo"
                src={qg1logo}
                alt="QG1 Logo" />
        </div>
    );

}

export default LoginPage