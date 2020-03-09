import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import QuizList from './components/QuizList'
import Navigation from './components/navigation/Navigation'
import { auth, google } from './firebase/firebase'
import LoginPage from './components/LoginPage'
import CreateQuiz from './components/createQuizComponents/CreateQuiz'


class App extends React.Component {
	state = {
		user: null,
		quizCompleted: false
	}

	componentDidMount() {
		this.authLissener = auth.onAuthStateChanged(user => {
			if (user) {
				this.setState({
					user: {
						email: user.email,
						displayName: user.displayName
					}
				})

			} else {
				this.setState({
					user: null
				})
			}
		})
	}

	componentWillUnmount() {
		this.authLissener.unsubscribe();
	}

	login = () => {
		auth.signInWithPopup(google).catch(err => {
			console.log(err.message)
		})
	}

	toggleCompleteQuiz = () => {
		let toggledCompleted = this.state.quizCompleted
		toggledCompleted = !toggledCompleted
		this.setState({
			quizCompleted: toggledCompleted
		})
	}

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					{this.state.user ? <Navigation user={this.state.user} quizCompleted={this.state.quizCompleted} /> : ''}

					<Switch>
						<Route
							path='/create-quiz'
							render={(props) => <CreateQuiz {...props} />}
						/>
						{this.state.user ?
							<Route
								path='/'
								render={(props) => <QuizList {...props} user={this.state.user} quizCompleted={this.state.quizCompleted} toggleCompleteQuiz={this.toggleCompleteQuiz} />}
							/>
							:
							<Route
								path='/'
								exact
								render={(props) => <LoginPage {...props} login={this.login} />}
							/>
						}


					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
