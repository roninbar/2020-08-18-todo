import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import configureStore from './utils';
import { Typography } from '@material-ui/core';

const store = configureStore();

function App() {

  async function onClickLogOut(e) {
    await fetch('/logout', { method: 'POST' });
  }

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/signin">
              <h1>To Do List</h1>
              <SignInForm />
            </Route>
            <Route path="/signup">
              <h1>To Do List</h1>
              <SignUpForm />
            </Route>
            <Route path="/">
              <div>
                <Typography>
                  <Link to="#" onClick={onClickLogOut}>Log Out</Link>
                </Typography>
              </div>
              <h1>To Do List</h1>
              <TodoForm />
              <TodoList />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
