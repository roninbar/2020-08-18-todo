import './App.css';
import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import configureStore from './utils';
import { Typography } from '@material-ui/core';
import PrivateRoute from './components/PrivateRoute';

const store = configureStore();

function App() {

  async function onClickLogOut(history, e) {
    const { status } = await fetch('/logout', { method: 'POST' });
    if (status === 205) {
      history.push('/signin');
    }
  }

  function ToDoWrapper({ history }) {
    return (
      <Fragment>
        <div>
          <Typography>
            <Link to="#" onClick={onClickLogOut.bind(null, history)}>Log Out</Link>
          </Typography>
        </div>
        <h1>To Do List</h1>
        <TodoForm />
        <TodoList />
      </Fragment>
    );
  }

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/signin">
              <h1>To Do List</h1>
              <SignInForm />
              <Link to="/signup">Don't have an account yet?</Link>
            </Route>
            <Route path="/signup">
              <h1>To Do List</h1>
              <SignUpForm />
              <Link to="/signin">Already have an account?</Link>
            </Route>
            <PrivateRoute exact path="/" component={ToDoWrapper} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
