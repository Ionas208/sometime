import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import User from './user';
import Login from './Login';
import Register from './Register';
import Todo from './Todo';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import TodoCalenderController from './TodoCalenderController';


const routing = (
  <Router>
    <div className='root2'>
      <Route exact path="/" component={App}/>
      <Route path="/user" component={User}/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/todo" component={Todo}/>
      <Route path="/calender" component={TodoCalenderController}/>
    </div>
  </Router>
)

ReactDOM.render(
  <div className='root2'>
    {routing}
    </div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
