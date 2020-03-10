import React from 'react'
import { db } from '../firebase/firebase'
import Quiz from './quiz/Quiz'
import DoQuiz from './quiz/DoQuizComponents/DoQuiz'
import { Route, Switch, Link } from 'react-router-dom';

class QuizList extends React.Component {
    state = {
        quizes: [],
    }

    componentDidMount() {
        //update quizzes from database in real time
        this.dbSnapshot = db.collection('quizes').onSnapshot(() => {
            this.getQuizzes()
        })
    }

    componentWillUnmount() {
        this.dbSnapshot();
    }

    //get quizzes from db
    getQuizzes = () => {
        db.collection('quizes').get()
            .then(querySnapshot => {
                //clear Quizz data.
                this.setState({
                    quizes: []
                })

                //add new data to quizz
                querySnapshot.forEach(doc => {
                    const quiz = {
                        ...doc.data(),
                        id: doc.id
                    }
                    this.setState({
                        //Concat doc to array
                        quizes: [...this.state.quizes, quiz]
                    })
                })
            })
    }

    render() {
        return (
            <Switch>
                <Route exact path="/">


                    <div className="container mt-4 text-center">

                        <button className="btn button btn-lg quizBtn">
                            <Link to="/create-quiz">Create New Quiz</Link>
                        </button>
                        <Quiz quizState={this.state.quizes} />
                    </div>
                </Route>
                <Route
                    path="/quiz/:quiz_id"
                    render={(props) => <DoQuiz {...props} quizCompleted={this.props.quizCompleted} toggleCompleteQuiz={this.props.toggleCompleteQuiz} />}
                />
            </Switch>
        )
    }
}

export default QuizList