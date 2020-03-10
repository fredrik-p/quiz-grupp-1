import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import Answers from './Answers'

class Questions extends React.Component {
    
    handleQuestionTitleChange = (e) => {
        this.props.handleQuestionTitleChange(this.props.question, e.target.value)
    }

    handlePointsChange = (e) => {
        this.props.handlePointsChange(this.props.question, e.target.value)
    }

    render() {
        
       const answers = this.props.answers.map((answer, i) => {
            return <Answers 
                    key={i}    
                    handleDeleteAnswer={this.handleDeleteAnswer}
                    handleAnswerChange={this.handleAnswerChange}
                    answerTitle={answer.answerTitle}
                    answer={answer}   
                    answers={this.props.answers}
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
                onChange={this.handleQuestionTitleChange}
                value={this.props.questionTitle}/>

                <label htmlFor="points">Points</label>
                <div className="input-group mb-3 w-25">
                    <input type="text" 
                    id="points" 
                    className="form-control" 
                    placeholder="Points" 
                    aria-label="Points" 
                    onChange={this.handlePointsChange}
                    value={this.props.points}
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