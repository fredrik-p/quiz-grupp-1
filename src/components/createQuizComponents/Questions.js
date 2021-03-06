import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Answers from './Answers'

class Questions extends React.Component {

    handleQuestionTitleChange = (e) => {
        this.props.handleQuestionTitleChange(this.props.question, e.target.value)
    }

    handlePointsChange = (e) => {
        this.props.handlePointsChange(this.props.question, +e.target.value)
    }

    handleAddAnswer = () => {
        this.props.handleAddAnswer(this.props.question)
    }

    render() {
        const answers = this.props.answers.map((answer, i) => {
            return <Answers
                key={i}
                handleDeleteAnswer={this.props.handleDeleteAnswer}
                handleAnswerChange={this.props.handleAnswerChange}
                handleIsTrue={this.props.handleIsTrue}
                answerTitle={answer.answerTitle}
                answer={answer}
                answers={this.props.answers}
                question={this.props.question}
            />
        })
        return (
            <div>
                <label htmlFor="questionTitle">Question</label>
                <input type="text"
                    id="questionTitle"
                    aria-label="Question"
                    placeholder="Type in your question"
                    className="form-control mt-1 mb-3"
                    onChange={this.handleQuestionTitleChange}
                    value={this.props.questionTitle} />

                <label htmlFor="points">Points</label>
                <div className="input-group w-25 mt-1 mb-3">
                    <input 
                        type="tel" 
                        pattern="[0-9]*"
                        id="points"
                        className="form-control"
                        placeholder="Points"
                        aria-label="Points"
                        onChange={this.handlePointsChange}
                        value={this.props.points}
                    />
                </div>
                {answers}
                <div className="d-flex justify-content-end" id="addAnswer">
                    <span onClick={this.handleAddAnswer}>
                        <FontAwesomeIcon icon={faPlusCircle} size="2x" id="addAnswerIcon" title="Add answer" />
                    </span>
                </div>
            </div>

        )
    }
}

export default Questions