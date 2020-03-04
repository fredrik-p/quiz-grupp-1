import React from 'react'
import { Link } from 'react-router-dom';

function Quiz(props){
    
    return (
        <div>
            <li>
            <Link to={'/quiz/' + id}>{props.quizState.title}</Link>
            </li>
        </div>
    )
}


export default Quiz