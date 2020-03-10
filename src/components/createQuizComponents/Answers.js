import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const styles = {
    inputNormal: { color: '#FFFA8D' },
    inputClicked: { color: '#CBF2DA' }
}

class Answers extends React.Component {

    deleteAnswer = () => {
        this.props.handleDeleteAnswer(this.props.answer, this.props.question)
    }

    handleAnswerChange = (e) => {
        this.props.handleAnswerChange(e.target.value, this.props.answer, this.props.question)
    }

    handleIsTrue = () => {
        this.props.handleIsTrue(this.props.answer, this.props.question)
    }

    render() {
        return (
            <div>
                <label htmlFor="answerTitle">Answer</label>
                <div className="input-group mt-1 mb-1">
                    <input type="text"
                        id="answerTitle"
                        aria-label="Answer"
                        placeholder="Type in answer"
                        className="form-control"
                        onChange={this.handleAnswerChange}
                        value={this.props.answerTitle}
                    />

                    {this.props.answers.length > 2
                        ?
                        <div className="input-group-append">
                            <span
                                id="minusCircle"
                                onClick={this.deleteAnswer}
                                className="input-group-text">
                                <FontAwesomeIcon icon={faMinusCircle}
                                />
                            </span>
                        </div>
                        :
                        ''
                    }
                </div>
                <span
                    id="isTrue"
                    style={this.props.answer.isTrue
                        ?
                        styles.inputClicked
                        :
                        styles.inputNormal
                    }
                    onClick={this.handleIsTrue}
                >
                    {this.props.answer.isTrue
                        ?
                        <FontAwesomeIcon icon={faCheck} title="Correct answer"
                        />
                        :
                        <FontAwesomeIcon icon={faTimes} title="Wrong answer"
                        />
                    }
                </span>
            </div>
        )
    }
}

export default Answers