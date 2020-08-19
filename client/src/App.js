import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

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
            <TodoList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
