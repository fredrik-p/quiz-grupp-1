import React from 'react'
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import QuizList from './components/QuizList'
import { render } from 'node-sass';





class App extends React.Component {
  state = {
    user: {
      email: 'dummy Email',
      displayName: 'Dummy Name'
    }
  }
  render() {
      return (
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route path="/" component={QuizList} />
            </Switch>
          </div>
        </BrowserRouter>
      );
  }
}

export default App;
