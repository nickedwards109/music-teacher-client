import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Popper from 'popper.js';
import { Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import AdminDashboard from './AdminDashboard';
import StudentDashboard from './StudentDashboard';
import LoginForm from './LoginForm';
import NewTeacherForm from './NewTeacherForm';
import ErrorPage from './ErrorPage';
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();

const routing = (
  <Router history={history}>
    <div className="centered-layout">
      <Route exact path='/' component={LoginForm} />
      <Route path='/admin/dashboard' component={AdminDashboard} />
      <Route path='/student/dashboard' component={StudentDashboard} />
      <Route path='/teachers/new' component={NewTeacherForm} />
      <Route path='/404' component={ErrorPage} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
