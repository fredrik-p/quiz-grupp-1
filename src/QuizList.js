import React from 'react'
import { db } from './firebase/firebase'
import Quiz from './Quiz'

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
					this.setState({
						//Concat doc to array
						quizes: [...this.state.quizes, doc.data()]
					}) 
				})
			})
    }
    
    render() {
        return (
            <div>
                <ul>
                    <Quiz />
                </ul>
            </div>
        )
    }
}

export default QuizList