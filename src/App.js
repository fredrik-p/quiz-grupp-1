import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import QuizList from './components/QuizList'
import Navigation from './components/navigation/Navigation'
import { auth, google } from './firebase/firebase'
import LoginPage from './components/LoginPage'
import CreateQuiz from './components/createQuizComponents/CreateQuiz'


class App extends React.Component {
	state = {
		user: null
	}

	componentDidMount() {
		auth.onAuthStateChanged(user => {
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

	login = () => {
		auth.signInWithPopup(google).catch(err => {
			console.log(err.message)
		})
	}

	render() {
		return (
			<BrowserRouter>
				<div className="App">
          			{this.state.user ? <Navigation user={this.state.user} /> : ''} 
					  <Route
							path='/create-quiz'
							render={(props) => <CreateQuiz {...props} /> } 
						/>
					<Switch>
						{this.state.user ?
							<Route
								path='/'
								render={(props) => <QuizList user={this.state.user} />}
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
