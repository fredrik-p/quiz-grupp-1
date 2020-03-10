import React from 'react'
import Questions from './Questions'
<<<<<<< HEAD
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
=======
import Answers from './Answers'
import { db } from '../../firebase/firebase'
>>>>>>> master

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
    
<<<<<<< HEAD
    handleAddQuestion = () => {
        const newQuestions = [ {
                        
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
        }, ...this.state.quiz.questions]
        this.setState({
            quiz: {...this.state.quiz, questions: newQuestions}
        })

=======
    uploadQuiz = () => {
        const { quizTitle, questions } = this.state.quiz
        db.collection('quizes').add({
            quizTitle: quizTitle
        })
            .then((docRef) => {
                questions.forEach(question => {
                    db.collection('quizes').doc(docRef.id).collection('questions').add({
                        questionTitle: question.questionTitle,
                        points: question.points,
                        isMultipleQuestions: question.isMultipleQuestions,
                        answers: [...question.answers]
                        
                    })
                })
            }).catch( err => {
                console.log('Add quiz error', err)
            })
>>>>>>> master
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
                    
                    <div 
                    className="d-flex justify-content-end align-self-center" 
                    id="addQuestion"
                    >
                    Next question 

                    <span 
                    onClick={this.handleAddQuestion} 
                    className="ml-2">
                    <FontAwesomeIcon icon={faPlusCircle} size="2x" id="addQuestionIcon"
                    />
                    </span>
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
