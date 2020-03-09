import React from 'react'
import { db } from '../../../firebase/firebase'
import DoQuizUI from './DoQuizUI'
import ScoreScreen from './ScoreScreen'

class DoQuiz extends React.Component {
    state = {
        quiz: [],
        currentQuestion: 0,
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
                    answers: answersWithSelected,
                    errorMessage: ''

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

        //remove Error message if there is one
        clickedQuestion.errorMessage = '';

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
        this.checkAnswers()
    }

    //Check if atleast one answer is selected at every question
    checkAnswers = () => {
        const answers = [...this.state.quiz]
        //check if atleast one answer is selected
        answers.forEach(question => {
            const atleastOneSelectedAnswer = question.answers.find(answer => answer.selected === true);
            if(!atleastOneSelectedAnswer) {
                question.errorMessage = 'Pleas select atleast one answer'
            } else {
                question.errorMessage = ''
            }
        })

        //if no error message in questions calc answers
        const errorMessageValue = answers.find(question => question.errorMessage !== '');
        if(errorMessageValue) {
            this.setState({
                quiz: answers
            })
            return;
        }
        this.calculateAnswers()
    }

    nextQuestion = () => {
        //return if on last question
        if((this.state.quiz.length - 1) === this.state.currentQuestion) {
            return;
        }
        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        })
    }

    calculateAnswers = () => {
        const answers = this.state.quiz;
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

        this.setState({
            points: {
                score: scoreWithOneDecimal,
                totalPoints: totalPoints
            } 
        })

        this.completeQuiz()

    }

    completeQuiz = () => {
        this.props.toggleCompleteQuiz()
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
                errorMessage={question.errorMessage}
                nextQuestion={this.nextQuestion}
            />
                )
        }) 

        return (

            <div>
                {this.props.quizCompleted ? '' : <h1>{this.state.quizTitle}</h1>}
                {this.state.quiz.length ? 
                    this.props.quizCompleted ?
                            <ScoreScreen points={this.state.points} completeQuiz={this.completeQuiz} history={this.props.history} />
                        :
                            allQuestions[this.state.currentQuestion]
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
