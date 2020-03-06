import React from 'react'

class CreateQuiz extends React.Component {
    state = {
        quizTitle: '',
        questions: [
            {
                questionTitle: '',
                points: 0,
                isMultipleQuestions: false,
                answers: [
                    {
                        answerTitle: '',
                        isTrue: false,
                    }
                ]
            }
        ]
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
            <form onSubmit={this.handleFormSubmit}>
                <div className="container" className="form-group">
                    <h1>Create Quiz</h1>
                    
                        <input type="text"
						id="quizTitle"
						aria-label="Title of new quiz"
						placeholder="Type in your quiz title"
						className="form-control"
						onChange={this.handleInputChange}
						value={this.state.quizTitle}/>

                        <input type="text"
						id="userQuestions"
						aria-label="Question"
						placeholder="Type in your question"
						className="form-control"
						onChange={this.handleInputChange}
						value={this.state.question}/>

                        

                    </div>
                </form>
        )
    }


export default CreateQuiz
