import React from 'react'
import Questions from './Questions'
import Answers from './Answers'

class CreateQuiz extends React.Component {
    state = {
        quizTitle: '',
    }
    
    handleFormSubmit = (e) => {
		e.preventDefault();

    }
    
	handleInputChange = (e) => {
		this.setState({
            [e.target.id]: e.target.value,
        })
    }
    
    render() {

        return (
            <form onSubmit={this.handleFormSubmit} className="container">
                <div className="form-group">
                    <h1>Create Quiz</h1>

                        <label htmlFor="quizTitle">Quiz Title</label>
                        <input type="text"
						id="quizTitle"
						aria-label="Title of new quiz"
						placeholder="Type in your quiz title"
						className="form-control"
						onChange={this.handleInputChange}
						value={this.state.quizTitle}/>

                    </div>
                    <Questions />
                
                </form>

        )
    }
}

export default CreateQuiz
