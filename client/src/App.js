import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import configureStore from './utils';

const store = configureStore();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
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
      </Provider>
    </div>
  );
}

export default App;
