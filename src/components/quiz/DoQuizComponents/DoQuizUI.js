import React from 'react'
import DoQuizListItem from './DoQuizListItem'
import logo from '../../assets/quizlogo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

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
        <div id="doQuiz">
            <section className="questions">
                <h2 className="doQuestionTitle">{question.questionTitle}</h2>
                <ul className="list-group">
                    {answers}
                </ul>
            </section>

            <div className="buttonContainer">
                {/* --- Render next button if atleast one answer is selected --- */}
                {selectedAnswer && (quizQuestionLength - 1 !== index) ? 
                    <span id="nextQuestion" onClick={props.nextQuestion} >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </span>
                :
                    ''
                }

                {/* --- Render submit answers button if on last question --- */}
                {(quizQuestionLength - 1) === index && selectedAnswer ?
                    <button onClick={props.sendAnswers} className="btn button w-100" id="submitAnswerButton">Submit answers</button>
                :
                ''
                }
            </div>
            {/* --- Render error message --- */}
            {errorMessage ? 
                    <div className="alert alert-warning">{errorMessage}</div>
                :
                    '' 
            }
            <div className="imgContainer">
                <img src={logo} alt="Quiz logo" className="doQuizLogo" />
            </div>
        </div>

    )

}
