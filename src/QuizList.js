import React from 'react'
import App from 'App'
import { db } from './firebase/firebase'

class QuizList extends React.Component {
    state = {
		quizes: [],
    }

    componentDidMount() {

		this.getQuizzes()
	}

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