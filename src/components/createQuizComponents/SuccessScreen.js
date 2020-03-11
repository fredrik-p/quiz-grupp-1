import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/quizlogo.svg'

const SuccessScreen = () => {
    return (
        <div className="container">
            <h1 className="successTitle  text-center">Quiz successfully uploaded!</h1>
            <div className="successComp">
                <button className="btn button btn-lg">
                    <Link to="/">GO BACK TO ALL QUIZES!</Link>
                </button>
            </div>
            <div className="successComp">
                <img src={logo} alt="Quiz Logo" className="successIMG mb-3" />
            </div>
        </div>
    )
}

export default SuccessScreen
