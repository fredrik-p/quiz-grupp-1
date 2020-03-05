import React from 'react'
import { db } from '../../firebase/firebase'
import DoQuizUI from './DoQuizUI'

class DoQuiz extends React.Component {
    state = {
        currentQuiz: '',
        userChoices: ''
    }
    componentDidMount() {
        //get single quizz by id
        this.getCurrentQuiz(this.props.match.params.quiz_id)
    }
    getCurrentQuiz = (id) => {
        db.collection('quizes').doc(id).get().then(doc => {
            //Set quiz vanilla state.
            this.setState({
                currentQuiz: doc.data()
            })
            //set users copy of the quizz so we can compare them later
            this.createQuiz(doc.data())
        })
    }

    createQuiz = (data) => {
        //Remap question and save only title and add is selected key default false
        const newCurrentQuiz = {
            quizTitle: data.quizTitle,
            questions: data.questions.map(question => {
                return {
                    questionTitle: question.questionTitle,
                    isMultipleQuestions: question.isMultipleQuestions,
                    points: question.points,
                    answers: question.answers.map(answer => {
                        return {
                            answersTitle: answer.answersTitle,
                            selected: false,
                            isTrue: answer.isTrue
                        }
                    })
                }
            })
        }
        this.setState({
            currentQuiz: newCurrentQuiz
        })
    }

    handleClick = (answerObject) => {
        this.toggleSelected(answerObject)
    }

    toggleSelected = (answerObject) => {
        //make copy of userChoises state
        const newUserChoices = { ...this.state.currentQuiz };

        const toggledUserChoices = {
            quizTitle: newUserChoices.quizTitle,
            questions: newUserChoices.questions.map(question => {
                return {
                    questionTitle: question.questionTitle,
                    isMultipleQuestions: question.isMultipleQuestions,
                    points: question.points,
                    answers: question.answers.map(answer => {
                        //find matching answer
                        if (answer.answersTitle === answerObject.answersTitle) {
                            answer.selected = !answer.selected
                            return {
                                answersTitle: answer.answersTitle,
                                selected: answer.selected,
                                isTrue: answer.isTrue
                            }
                        }
                        return {
                            answersTitle: answer.answersTitle,
                            selected: answer.selected,
                            isTrue: answer.isTrue
                        }
                    })
                }
            })
        }

        this.setState({
            currentQuiz: toggledUserChoices
        })
    }

    sendAnswers = () => {
        console.log(this.state.currentQuiz)
    }

    render() {
        return (

            <div>
                {this.state.currentQuiz ? <DoQuizUI
                    quiz={this.state.currentQuiz}
                    handleClick={this.handleClick}
                    sendAnswers={this.sendAnswers}
                />
                    :
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                }
            </div>
        )
    }
}

export default DoQuiz
