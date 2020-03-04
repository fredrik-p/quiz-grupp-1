import React from 'react'
import { db } from './firebase/firebase'
import Quiz from './Quiz'
import DoQuiz from './DoQuiz'
import { Route, Switch } from 'react-router-dom';

class QuizList extends React.Component {
    state = {
		quizes: [],
    }

    componentDidMount() {
        //update quizzes from database in real time
        db.collection('quizes').onSnapshot(() => {
            this.getQuizzes()
        })
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
                    <div>
                        <ul>
                            <Quiz quizState={this.state.quizes}/>
                        </ul>
                    </div>
                </Route>
                <Route 
                    path="/quiz/:quiz_id"
                    render={(props) => <DoQuiz {...props} />}
                 />
            </Switch>
        )
    }
}

export default QuizList