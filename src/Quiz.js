import React from 'react'
import { Link } from 'react-router-dom';

function Quiz(props){
   const quizListItems = props.quizState.map(quiz => {
        console.log(quiz)
        return ( <li key={quiz.id}>
            <Link to={'/quiz/' + quiz.id}>{quiz.quizTitle}</Link>
        </li>)
    })
    return (
        <ul>
           {quizListItems}
        </ul>
    )
}


export default Quiz