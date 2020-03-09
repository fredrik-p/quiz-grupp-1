import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

class Answers extends React.Component {
    state = {
        answerTitle: '',
        isTrue: false,
    }

    handleInputChange = (e) => {
		this.setState({
            [e.target.id]: e.target.value,
        })
    }
    
    deleteAnswer = () => {
        this.props.handleDeleteAnswer(this.props.answer)
    }

    handleAnswerChange = (e) => {
        this.props.handleAnswerChange(e.target.value, this.props.answer)
    }

    render() {
        return (
            <div>
            <label htmlFor="answerTitle">Answer</label>
                <div className="input-group mb-1">
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
                            <span onClick={this.deleteAnswer} 
                                className="input-group-text">
                                <FontAwesomeIcon icon={faMinusCircle}
                                />
                            </span>
                        </div> 
                    : 
                        ''
                    }
                </div>
                <button type="submit" 
                className="btn btn-success"
                >
                Correct?
                </button>
            </div>
        )
    }
}

export default Answers