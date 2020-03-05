import React from 'react'
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import QuizList from './components/QuizList'
import { auth, google } from './firebase/firebase'
import LoginPage from './components/LoginPage'





class App extends React.Component {
	state = {
		user: {
			email: 'dummy Email',
			displayName: 'Dummy Name'
		}
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
					<Switch>
						<Route
							path='/' exact render={(props) => <LoginPage {...props} login={this.login} />} />
						<Route path="/quiz" component={QuizList} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
