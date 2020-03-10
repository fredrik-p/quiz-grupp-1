import React from 'react'
import Questions from './Questions'
import Answers from './Answers'
import { db } from '../../firebase/firebase'

class CreateQuiz extends React.Component {
    state = {
        quiz: {
            quizTitle: '',   
            questions: [ 
                    {
                        
                        questionTitle: '',
                        points: 1,
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
                questions: newQuestions
            }
        })
    }

    handleAddAnswer = (payloadQuestion) => { 
        const newQuestions = [...this.state.quiz.questions]
        const foundQuestion = newQuestions.find(question => question === payloadQuestion)
        foundQuestion.answers = [...foundQuestion.answers, {
            answerTitle: '',
            isTrue: false,
        }]
        this.setState({
            quiz: {
                ...this.state.quiz,
                questions: newQuestions
            }

        })
    }
    handleDeleteAnswer = (payload, payloadQuestion) => {
        const newQuestions = [...this.state.quiz.questions]
        const foundQuestion = newQuestions.find(question => question === payloadQuestion)
        const filteredAnswers = foundQuestion.answers.filter(answer => answer !== payload)
        foundQuestion.answers = filteredAnswers;
    
        this.setState({
            quiz: {
                ...this.state.quiz,
                questions: newQuestions
            }
       })
    }

    handleAnswerChange = (value, payload, payloadQuestion) => {
        const newQuestions = [...this.state.quiz.questions]
        const foundQuestion = newQuestions.find(question => question === payloadQuestion)
        const newAnswer = foundQuestion.answers.find(answer => answer === payload)
        newAnswer.answerTitle = value

        this.setState({
            quiz: {
                ...this.state.quiz,
                questions: newQuestions
            }
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
        /**
         * make sure there is a number and not a string
         */
        if(value !== +value || value < 0) {
            return;
        }
        const newQuestions = [...this.state.quiz.questions]
        const newQuestion = newQuestions.find(question => question === payload)
        newQuestion.points = value

        this.setState({
            quiz: {...this.state.quiz, questions: newQuestions}
        })
    }
    
    handleIsTrue = (payload, questionPayload) => {
        const newQuestions = [...this.state.quiz.questions];
        const foundQuestion = newQuestions.find(question => question === questionPayload);
        const foundAnswer = foundQuestion.answers.find(answer => answer === payload);
        foundAnswer.isTrue = !foundAnswer.isTrue
        
    
        this.setState({
            quiz: {...this.state.quiz, questions: newQuestions}
        })

        this.handleIsMultipleQuestions(questionPayload);
    }

    handleIsMultipleQuestions = (payloadQuestion) => {
        const newQuestions = [...this.state.quiz.questions];
        const foundQuestion = newQuestions.find(question => question === payloadQuestion);

        const allIsTrueAnswers = foundQuestion.answers.filter(answer => answer.isTrue === true)

        if(allIsTrueAnswers.length > 1) {
            foundQuestion.isMultipleQuestions = true
        } else if ( allIsTrueAnswers.length === 1) {
            foundQuestion.isMultipleQuestions = false
        }

        this.setState({
            quiz: {
                ...this.state.quiz,
                questions: newQuestions
            }
        })
    }

    uploadQuiz = () => {
        const { quizTitle, questions } = this.state.quiz
        //Add quiz title to a new doc in quizes collection
        db.collection('quizes').add({
            quizTitle: quizTitle
        })
            .then((docRef) => {
                questions.forEach(question => {
                    //add new documents to docId's subcollection for each question with answers
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
    }

    render() {
        const allQuestions = this.state.quiz.questions.map((question, i) => {
            return  <Questions 
                    key={i}
                    handleQuestionTitleChange={this.handleQuestionTitleChange}
                    handleAddAnswer={this.handleAddAnswer}
                    answers={question.answers}
                    question={question}
                    questionTitle={question.questionTitle}
                    points={question.points}
                    handlePointsChange={this.handlePointsChange}
                    handleAnswerChange={this.handleAnswerChange}
                    handleDeleteAnswer={this.handleDeleteAnswer}
                    handleIsTrue={this.handleIsTrue}
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
