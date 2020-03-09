import React from 'react'
import logo from '../../assets/quizlogo.svg';

const ScoreScreen = (props) => {

    const sendBackToQuizes = () => {
        props.completeQuiz()
        props.history.push('/')
    }
    return (
        <div className="scoreScreen">
            <img src={logo} alt="Quiz Logo" />
            <h1 className="scoreTitle">YOUR FINAL SCORE IS</h1>
            <p className="score">
                {props.points.score}/{props.points.totalPoints}
            </p>
            <div>
                <button className="btn button btn-lg" onClick={sendBackToQuizes}>BACK TO QUIZES</button>
            </div>
        </div>
    )
}

export default ScoreScreen
