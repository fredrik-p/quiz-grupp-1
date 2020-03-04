import React from 'react'
import DoQuizListItem from './DoQuizListItem'

export default function DoQuizUI(props) {
    const { quizTitle, questions } = props.quiz
    const allQuestions = questions.map((question, index) => {
        const answers = question.answers.map((answer, index) => {
            return <DoQuizListItem 
                key={index} 
                answer={answer}
                handleClick={props.handleClick} 
                />
        })
        return(
            <section className="questions" key={index}>
                <h2>{question.questionTitle}</h2>
                <ul className="list-group">
                    {answers}
                </ul>
            </section>
        )
    })
    return (
        <div className="card" id="doQuiz">
            <h1>{quizTitle}</h1>
            {allQuestions}  
        </div>
    )
}
