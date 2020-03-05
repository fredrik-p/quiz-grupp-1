import React from 'react'
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import QuizList from './components/QuizList'
import Navigation from './components/navigation/Navigation'





function App() {
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

export default App;
