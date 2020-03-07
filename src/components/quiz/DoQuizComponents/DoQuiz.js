import React from 'react'
import { db } from '../../../firebase/firebase'
import DoQuizUI from './DoQuizUI'

class DoQuiz extends React.Component {
    state = {
        quiz: [],
        errorMessage: ''
    }
    componentDidMount() {
        //get quiz title


        //get single quizz by id
        this.getCurrentQuiz(this.props.match.params.quiz_id)
    }
    getCurrentQuiz = (id) => {
        db.collection('quizes').doc(id).get()
            .then(doc => {
                this.setState({
                    quizTitle: doc.data().quizTitle
                })
            }).catch(err => {
                console.log('Get quiz title error', err)
            })
        db.collection('quizes').doc(id).collection('questions')
        .get().then(querySnapshot => {
            
            //resetState
            this.setState({
                quiz: []
            })
            querySnapshot.forEach(doc => {
                //give all answers selected property
                const answersWithSelected = doc.data().answers.map(answer => {
                    return {
                        ...answer,
                        selected: false
                    }
                })
                //give all questions its documents ID and updated answers
                const question = {
                    id: doc.id,
                    ...doc.data(),
                    answers: answersWithSelected
                }
                this.setState({
                    quiz: [...this.state.quiz, question]
                })
            })
        })
        .catch(err => {
            console.log('DoQuiz get error', err)
        })
    }

    handleClick = (answerObject, id) => {
        this.toggleSelected(answerObject, id)
    }

    toggleSelected = (answerObject, questionId) => {
        //make copy of Quiz state
        const newQuiz = [...this.state.quiz ];

        //find question with answer
        const clickedQuestion = newQuiz.find(question => question.id === questionId)

        //check if radiobutton or not
        if(clickedQuestion.isMultipleQuestions) {
            //find clicked answer
            const clickedAnswer = clickedQuestion.answers.find(answer => answer === answerObject)
            clickedAnswer.selected = !clickedAnswer.selected 
        } else {
            //Unselect all
            clickedQuestion.answers.forEach(answer => {
                answer.selected = false;
            })

            //Set clicked answer to true
            const clickedAnswer = clickedQuestion.answers.find(answer => answer === answerObject)
            clickedAnswer.selected = true; 
        }
        
        this.setState({
            quiz: newQuiz
        })
    }

    sendAnswers = () => {
        this.checkAnswers(this.state.quiz)
    }

    //Check if atleast one answer is selected at every question
    checkAnswers = (answers) => {
        let selected = 0
        answers.forEach(question => {
            const selectedAnswers = question.answers.filter(answer => answer.selected === true)
            if (!selectedAnswers.length) {
                selected += 0;
            } else {
                selected += 1;
            }
        })

        //if the amount of questions with atleast ONE selected question === total amount of question
        //calc answer
        if(selected === answers.length) {
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
        answers.forEach(question => {
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

        console.log(`You got ${scoreWithOneDecimal} / ${totalPoints} points `)

        return {
            score: scoreWithOneDecimal,
            totalPoints: totalPoints
        }
    }

    render() {
        const allQuestions = this.state.quiz.map((question, index) => {
            return (
            <DoQuizUI
                key={index}
                index={index}
                question={question}
                questionId={question.id}
                quizQuestionLength={this.state.quiz.length}
                handleClick={this.handleClick}
                sendAnswers={this.sendAnswers}
                errorMessage={this.state.errorMessage}
            />
                )
        }) 

        return (

            <div>
                <h1>{this.state.quizTitle}</h1>
                {this.state.quiz.length ? 
                    allQuestions
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
