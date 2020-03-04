import React from 'react'
import { Link } from 'react-router-dom';

function Quiz(props){
    
    return (
        <div>
            <li>
                <Link to={'/quiz/123'}>Quizz title</Link>
            </li>
        </div>
    )
}


export default Quiz