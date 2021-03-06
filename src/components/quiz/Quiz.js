import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/quizlogo.svg';

function Quiz(props) {
    const quizListItems = props.quizState.map(quiz => {
        return (
            <li className="list-group" id="listStyle" key={quiz.id}>
                <Link key={quiz.id} to={'/quiz/' + quiz.id}>{quiz.quizTitle}</Link>
            </li>
        )
    })
    return (

        <div id="quizStyle" className="container mt-4 text-center">
            <h1>QUIZES</h1>
            <ul className="list-group">
                {quizListItems}
            </ul>

            <div className="imgContainer mb-3">
                <img src={logo} alt="Quiz logo" />
            </div>

        </div>


    )
}


export default Quiz