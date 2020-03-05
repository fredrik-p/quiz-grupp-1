import React from 'react';

const LoginPage = (props) => {

    return (
        <div id="login">
            <h1 className="mb-5">Quiz App</h1>
            <button onClick={props.login}>Sign in with Google</button>

        </div>
    );



}

export default LoginPage