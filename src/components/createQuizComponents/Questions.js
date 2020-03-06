import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import Answers from './Answers'

class Questions extends React.Component {
    state = {
        questionTitle: '',
        points: 0,
        isMultipleQuestions: false,
        id: '',
        answers: [
            {
                answerTitle: '',
                isTrue: false,
            }
        ]
    }

    handleInputChange = (e) => {
		this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleClick = () => {
        this.setState({
            answers: [...this.state.answers,
                {
                    answerTitle: '',
                    isTrue: false,
                }
            ]

        })
    }
    handleDeleteAnswer = (payload) => {
        const newAnswers = [...this.state.answers]
       const filteredAnswers = newAnswers.filter(answer => answer !== payload)
    
       this.setState({
           answers: filteredAnswers,
       })
    }

    handleAnswerChange = (value, payload) => {
        const newAnswers = [...this.state.answers]
        const newAnswer = newAnswers.find(answer => answer === payload)
        newAnswer.answerTitle = value

        this.setState({
            answers: newAnswers,
        })
    }
    render() {
       const answers = this.state.answers.map((answer, i) => {
            return <Answers 
                    key={i}    
                    answer={answer} 
                    answers={this.state.answers} 
                    handleDeleteAnswer={this.handleDeleteAnswer}
                    handleAnswerChange={this.handleAnswerChange}
                />
        })
        return (
            <div>
                <label htmlFor="questionTitle">Question</label>
                <input type="text"
                id="questionTitle"
                aria-label="Question"
                placeholder="Type in your question"
                className="form-control mt-1 mb-1"
                onChange={this.handleInputChange}
                value={this.state.question}/>

                <label htmlFor="points">Points</label>
                <div className="input-group mb-3 w-25">
                    <input type="text" 
                    id="points" 
                    className="form-control" 
                    placeholder="Points" 
                    aria-label="Points" 
                    onChange={this.handleInputChange}
                    value={this.state.points}
                    />
                    <div className="input-group-append">
                        <span 
                            className="input-group-text">
                            <FontAwesomeIcon icon={faCheck}
                            />
                        </span>
                        <span 
                            className="input-group-text">
                            <FontAwesomeIcon icon={faCheckDouble} 
                            />
                        </span>
                        </div>
                    </div>
                    {answers}
                    <button onClick={this.handleClick} type="submit" 
                className="btn btn-success"
                >
                Add answer
                </button>
                </div>

           
        )
    }
}

export default Questions