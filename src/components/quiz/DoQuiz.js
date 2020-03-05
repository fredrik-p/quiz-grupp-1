import React from 'react'
import { db } from '../../firebase/firebase'
import DoQuizUI from './DoQuizUI'

class DoQuiz extends React.Component {
    state = {
        currentQuiz: '',
        errorMessage: ''
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
        this.checkAnswers(this.state.currentQuiz)
    }

    //Check if atleast one answer is selected at every question
    checkAnswers = (answers) => {

        let selected = 0
        answers.questions.forEach(question => {
            const selectedAnswers = question.answers.filter(answer => answer.selected === true)
            if (!selectedAnswers.length) {
                selected += 0;
            } else {
                selected += 1;
            }
        })

        //if 
        if(selected === answers.questions.length) {
            this.calculateAnswers(answers)
            this.setState({
                errorMessage: ''
            })
        } else {
            this.setState({
                errorMessage: 'Pleas select atleast one answer on each question'
            })
        }
    }

    calculateAnswers = (answers) => {
        let score = 0;
        let totalPoints = 0;
        answers.questions.forEach(question => {
            const points = question.points;
            //How many points per question (Total points / amount of questions)
            const pointsPerAnswer = points/question.answers.length

            //for storing total score of quiz
            let sum = 0;
            //calculate amount of right answers
            question.answers.forEach(answer => {
                if(answer.isTrue === answer.selected) {
                    sum += pointsPerAnswer;
                } else {
                    sum -= pointsPerAnswer;
                }
            })

            totalPoints += points;
            score += Math.max(sum, 0)
        })

        //avrundar svaret till en decimal
        const scoreWithOneDecimal = Math.round(score * 10) / 10

        /**
         * Return as template Literal string or as an object
         * {
         *      score: scoreWithOneDecimal,
         *      totalPoints: totalPoints
         * }
         */
        console.log(`You got ${scoreWithOneDecimal} / ${totalPoints} points `)
    }

    render() {
        return (

            <div>
                {this.state.currentQuiz ? <DoQuizUI
                    quiz={this.state.currentQuiz}
                    handleClick={this.handleClick}
                    sendAnswers={this.sendAnswers}
                    errorMessage={this.state.errorMessage}
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
