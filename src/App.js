import React from 'react'
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import QuizList from './components/QuizList'





function App() {
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

export default App;
