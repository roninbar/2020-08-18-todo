import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TodoForm from './components/TodoForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signin">

          </Route>
          <Route path="/signup">

          </Route>
          <Route path="/">
            <TodoForm />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
