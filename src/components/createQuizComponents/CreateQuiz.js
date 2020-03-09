import React from 'react'
import Questions from './Questions'
import Answers from './Answers'

class CreateQuiz extends React.Component {
    state = {
        quiz: {
            quizTitle: '',   
            questions: [ 
                    {
                        
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
                ]
            } 
        }

    handleQuestionTitleChange = (payload, value) => {
        const newQuestions = [...this.state.quiz.questions]
        const newQuestion = newQuestions.find(question => question === payload)
        newQuestion.questionTitle = value
		this.setState({
            quiz: {
                ...this.state.quiz, 
                question: newQuestions
            }
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
    
    handleFormSubmit = (e) => {
		e.preventDefault();

    }
    
	handleQuizTitleChange = (e) => {
        
		this.setState({
            quiz: {...this.state.quiz, quizTitle: e.target.value}
            
        })
    }

    handlePointsChange = (payload, value) => {
        const newQuestions = [...this.state.quiz.questions]
        const newQuestion = newQuestions.find(question => question === payload)
        newQuestion.points = value

        this.setState({
            quiz: {...this.state.quiz, questions: newQuestions}
        })
    }
    
    render() {
        const allQuestions = this.state.quiz.questions.map((question, i) => {
            return  <Questions 
                    key={i}
                    handleQuestionTitleChange={this.handleQuestionTitleChange}
                    handleClick={this.handleClick}
                    answers={question.answers}
                    question={question}
                    questionTitle={question.questionTitle}
                    points={question.points}
                    handlePointsChange={this.handlePointsChange}
                    />
                
        })

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
						onChange={this.handleQuizTitleChange}
						value={this.state.quizTitle}/>

                    </div>
                   {allQuestions}

                    {/* <Answers
                        handleDeleteAnswer={this.handleDeleteAnswer}
                        handleAnswerChange={this.handleAnswerChange}
                        answers={this.state.answers}
                       
                    /> */}
                </form>

        )
    }
}

export default CreateQuiz
