import React from 'react'
import DoQuizListItem from './DoQuizListItem'

export default function DoQuizUI(props) {
    const { quizTitle, questions } = props.quiz
    const allQuestions = questions.map((question, index) => {
        console.log(question)
        const answers = question.answers.map((answer, index) => {
            return <DoQuizListItem key={index} title={answer.answersTitle} />
        })
        return(
            <section className="container questions" key={index}>
                <h2>{question.questionTitle}</h2>
                <ul className="list-group">
                    {answers}
                </ul>
            </section>
        )
    })
    return (
        <div className="container card text-center" id="doQuiz">
            <h1>{quizTitle}</h1>
            {allQuestions}  
        </div>
    )
}
