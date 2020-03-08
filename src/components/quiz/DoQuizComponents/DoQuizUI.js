import React from 'react'
import DoQuizListItem from './DoQuizListItem'

export default function DoQuizUI(props) {
    const { question, errorMessage, quizQuestionLength, index, questionId } = props

    const answers = question.answers.map((answer, index) => {
        return <DoQuizListItem
            key={index}
            questionId={questionId}
            answer={answer}
            handleClick={props.handleClick}
        />
    })

    const selectedAnswer = question.answers.find(answer => answer.selected === true)

    return (
        <div className="container card text-center" id="doQuiz">
            <section className="questions">
                <h2>{question.questionTitle}</h2>
                <ul className="list-group">
                    {answers}
                </ul>
            </section>

            {/* --- Render next button if atleast one answer is selected --- */}
            {selectedAnswer && (quizQuestionLength - 1 !== index) ? 
                <button className="btn button" id="nextQuestion" onClick={props.nextQuestion}>
                    <span>Next</span>
                </button>
            :
                 ''
            }

            {/* --- Render submit answers button if on last question --- */}
            {(quizQuestionLength - 1) === index && selectedAnswer ? 
                <button onClick={props.sendAnswers} className="btn button w-100" id="submitAnswerButton">Submit answers</button>
            :
             ''
            }
            {/* --- Render error message --- */}
            {errorMessage ? 
                    <div className="alert alert-warning">{errorMessage}</div>
                :
                    '' 
            }
        </div>

    )

}
