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
            this.createUserCopy(doc.data())
        })
    }

    createUserCopy = (data) =>{
        //Remap question and save only title and add is selected key default false
        const newUserChoices = {
            quizTitle: data.quizTitle,
            questions: data.questions.map(question => {
                return {
                    questionTitle: question.questionTitle,
                    isMultipleQuestions: question.isMultipleQuestions,
                    answers: question.answers.map(answer => {
                        return {
                            answersTitle: answer.answersTitle,
                            selected: false
                        }
                    })
                }
            })
        }
        this.setState({
            userChoices: newUserChoices
        })
    }

    handleClick = (answerObject) => {
        this.toggleSelected(answerObject)
    }

    toggleSelected = (answerObject) => {
        //make copy of userChoises state
        const newUserChoices= {...this.state.userChoices};
        
        const toggledUserChoices = {
            quizTitle: newUserChoices.quizTitle,
            questions: newUserChoices.questions.map(question => {
                return {
                    questionTitle: question.questionTitle,
                    isMultipleQuestions: question.isMultipleQuestions,
                    answers: question.answers.map(answer => {
                        //find matching answer
                        if(answer.answersTitle === answerObject.answersTitle) {
                            answer.selected = !answer.selected
                            return {
                                answersTitle: answer.answersTitle,
                                selected: answer.selected
                            }
                        }
                        return {
                            answersTitle: answer.answersTitle,
                            selected: answer.selected
                        }
                    })
                }
            })
        }

        this.setState({
            userChoices: toggledUserChoices
        })
    }

    render() {
        return (
            <div>
                {this.state.userChoices ? <DoQuizUI 
                    quiz={this.state.userChoices} 
                    handleClick={this.handleClick} 
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
