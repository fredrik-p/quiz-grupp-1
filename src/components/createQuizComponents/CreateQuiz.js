import React from 'react'
import Questions from './Questions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { db } from '../../firebase/firebase'
import SuccessScreen from './SuccessScreen'

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
                            isTrue: true,
                        },
                        {
                            answerTitle: '',
                            isTrue: false,
                        }
                    ]
                }
            ]
        },
        errorMessage: '',
        uploadDone: false
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

        this.handleIsMultipleQuestions(payloadQuestion);
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

        this.uploadQuiz();
    }

    handleQuizTitleChange = (e) => {

        this.setState({
            quiz: { ...this.state.quiz, quizTitle: e.target.value }

        })
    }

    handlePointsChange = (payload, value) => {
        /**
         * make sure there is a number and not a string
         */
        if (value !== +value || value < 0) {
            return;
        }
        const newQuestions = [...this.state.quiz.questions]
        const newQuestion = newQuestions.find(question => question === payload)
        newQuestion.points = value

        this.setState({
            quiz: { ...this.state.quiz, questions: newQuestions }
        })
    }

    handleAddQuestion = () => {
        const newQuestions = [{

            questionTitle: '',
            points: 1,
            isMultipleQuestions: false,
            id: '',
            answers: [
                {
                    answerTitle: '',
                    isTrue: true,
                },
                {
                    answerTitle: '',
                    isTrue: false,
                }
            ]
        }, ...this.state.quiz.questions]
        this.setState({
            quiz: { ...this.state.quiz, questions: newQuestions }
        })
    }
    handleIsTrue = (payload, questionPayload) => {
        const newQuestions = [...this.state.quiz.questions];
        const foundQuestion = newQuestions.find(question => question === questionPayload);
        const foundAnswer = foundQuestion.answers.find(answer => answer === payload);
        foundAnswer.isTrue = !foundAnswer.isTrue


        this.setState({
            quiz: { ...this.state.quiz, questions: newQuestions }
        })

        this.handleIsMultipleQuestions(questionPayload);
    }

    handleIsMultipleQuestions = (payloadQuestion) => {
        const newQuestions = [...this.state.quiz.questions];
        const foundQuestion = newQuestions.find(question => question === payloadQuestion);

        const allIsTrueAnswers = foundQuestion.answers.filter(answer => answer.isTrue === true)

        if (allIsTrueAnswers.length > 1) {
            foundQuestion.isMultipleQuestions = true
        } else if (allIsTrueAnswers.length === 1) {
            foundQuestion.isMultipleQuestions = false
        }

        this.setState({
            quiz: {
                ...this.state.quiz,
                questions: newQuestions
            }
        })
    }

    checkQuiz = () => {
        const newQuestions = [...this.state.quiz.questions]

        //find if questionTitle is not empty and points is more then 0
        const findPoints = newQuestions.find(question => question.points === 0);
        const findQTitle = newQuestions.find(question => question.questionTitle === '');


        //find if answerTitle is empy
        let oneTitleIsnotTrue = false;
        newQuestions.forEach(question => {
            const emptyAnswer = question.answers.find(answer => answer.answerTitle === '')
            if (!oneTitleIsnotTrue && emptyAnswer) {
                oneTitleIsnotTrue = true;
            }

        })


        //find if atleast one answer is true
        let oneAnswerIsNotTrue = false;
        newQuestions.forEach(question => {
            const trueAnswer = question.answers.filter(answer => answer.isTrue === true)
            if (!oneAnswerIsNotTrue && !trueAnswer.length) {
                oneAnswerIsNotTrue = true
            }
        })

        //return true if quiz is missing Quiz title
        if (!this.state.quiz.quizTitle) {
            this.setState({
                errorMessage: 'Please fill out the Quiz Title field'
            })
            return true;
        }
        //return true if quiz is missing points or Question title
        if (findPoints) {
            this.setState({
                errorMessage: 'A question needs to be worth more then 0 points'
            })
            return true;
        }

        if (findQTitle) {
            this.setState({
                errorMessage: 'Please fill out the Question Title field'
            })
            return true;
        }
        //return true if there is answers without atleast one true answer
        if (oneAnswerIsNotTrue) {
            this.setState({
                errorMessage: 'Atleast one answer needs to be true'
            })
            return true;
        }
        //return true if there is a question without a title
        if (oneTitleIsnotTrue) {
            this.setState({
                errorMessage: 'Every answer needs a title'
            })
            return true;
        }

        return false
    }

    uploadQuiz = () => {

        //check quiz 
        if (this.checkQuiz()) {
            console.log('Form not ok')
            return;
        }

        this.setState({
            errorMessage: ''
        })
        const { quizTitle, questions } = this.state.quiz
        //Add quiz title to a new doc in quizes collection
        console.log('submit')
        db.collection('quizes').add({
            quizTitle: quizTitle
        })
            .then((docRef) => {
                questions.forEach(question => {
                    //add new documents to docId's subcollection for each question with answers
                    console.log('sent Question')
                    console.log(docRef.id)
                    db.collection('quizes').doc(docRef.id).collection('questions').add({
                        questionTitle: question.questionTitle,
                        points: question.points,
                        isMultipleQuestions: question.isMultipleQuestions,
                        answers: [...question.answers]

                    })
                })

                //clear input fields
                this.setState({
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
                                        isTrue: true,
                                    },
                                    {
                                        answerTitle: '',
                                        isTrue: false,
                                    }
                                ]
                            }
                        ]
                    },
                    errorMessage: '',
                    uploadDone: true
                })
            }).catch(err => {
                this.setState({
                    errorMessage: err.errorMessage
                })
            })
    }

    render() {
        const allQuestions = this.state.quiz.questions.map((question, i) => {
            return <Questions
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

            <div>
                {this.state.uploadDone ?
                    <SuccessScreen />
                    :

                    <div>
                        {this.state.errorMessage ?
                            <div className="alert alert-warning">{this.state.errorMessage}</div>
                            :
                            ''
                        }
                        <form onSubmit={this.handleFormSubmit} className="container">
                            <div className="text-center mt-2 mb-4 ">
                                <button className="btn button btn-lg"
                                    type="submit" >
                                    I'M DONE!
                                </button>
                            </div>

                            <div className="form-group">
                                <h1>CREATE QUIZ</h1>
                                <label htmlFor="quizTitle">Quiz Title</label>
                                <input type="text"
                                    id="quizTitle"
                                    aria-label="Title of new quiz"
                                    placeholder="Type in your quiz title"
                                    className="form-control"
                                    onChange={this.handleQuizTitleChange}
                                    value={this.state.quizTitle} />
                            </div>

                            <div
                                className="d-flex justify-content-end align-self-center"
                                id="addQuestion"
                            >
                                <span
                                    onClick={this.handleAddQuestion}
                                    className="ml-2">
                                    <FontAwesomeIcon icon={faPlusCircle} size="2x" id="addQuestionIcon" title="Next question"
                                    />
                                </span>
                            </div>

                            {allQuestions}

                        </form>
                    </div>
                }
            </div>

        )
    }
}

export default CreateQuiz
