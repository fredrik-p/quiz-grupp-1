import React from 'react'
import { Link } from 'react-router-dom';

function Quiz(props) {
    const quizListItems = props.quizState.map(quiz => {
        console.log(quiz)
        return ( 
            <div>
                <li className="list-group" id="listStyle"  key={quiz.id}>
                    <Link className="list-group-item list-group-item-action" key={quiz.id} to={'/quiz/' + quiz.id}>{quiz.quizTitle}</Link>
                </li>
            </div>
            )
    })
    return (

        <div id="quizStyle" className="container mt-4 text-center">
            <h1>Quiz – Grupp 1</h1>
                <ul className="list-group">
                {quizListItems}
                </ul>
        </div>
    )
}


export default Quiz