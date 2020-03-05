import React from 'react'
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import QuizList from './components/QuizList'
import Navigation from './components/navigation/Navigation'
import { auth, google } from './firebase/firebase'


class App extends React.Component {
	state = {
		user: {
			email: 'dummy Email',
			displayName: 'Dummy Name'
		}
	}

	componentDidMount() {
		auth.onAuthStateChanged(user => {
			if(user) {
				this.setState({
					email: user.email,
					displayName: user.displayName
				})
			} else {
				this.setState({
					/**
					 * IMPORTANT CHANGE TO NULL WHEN LOGIN BUTTON IS DONE
					 * IMPORTANT CHANGE TO NULL WHEN LOGIN BUTTON IS DONE
					 * IMPORTANT CHANGE TO NULL WHEN LOGIN BUTTON IS DONE
					 */
					user: {
						email: 'dummy Email',
						displayName: 'Dummy Name'
					}
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
            <Navigation user={this.state.user} />
              <Switch>
                <Route path="/" component={QuizList} />
              </Switch>
            </div>
          </BrowserRouter>
			);
	}
>>>>>>> master
}

export default App;
