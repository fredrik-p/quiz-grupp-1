import React from 'react';
import { db } from './firebase/firebase'

class App extends React.Component {

	state = {
		quizes: []
	}
	componentDidMount() {
		this.getQuizzes()
	}

	getQuizzes = () => {
		db.collection('quizes').get()
			.then(querySnapshot => {
				//clear Quizz data
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
			<div className="App">
				
			</div>
		);
	}
}

export default App;
