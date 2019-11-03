import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Popper from 'popper.js';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import LoginForm from './LoginForm';
import SetPasswordForm from './SetPasswordForm';
import AdminDashboard from './AdminDashboard';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';
import NewTeacherForm from './NewTeacherForm';
import TeachersIndex from './TeachersIndex';
import NewLessonForm from './NewLessonForm';
import Lesson from './Lesson';
import Lessons from './Lessons';
import ErrorPage from './ErrorPage';
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();

const routing = (
  <Router history={history}>
    <div className="centered-layout">
      <Switch>
        <Route exact path='/' component={LoginForm} />
        <Route path='/set_password' component={SetPasswordForm} />
        <Route path='/admin/dashboard' component={AdminDashboard} />
        <Route path='/teacher/dashboard' component={TeacherDashboard} />
        <Route path='/student/dashboard' component={StudentDashboard} />
        <Route path='/teachers/new' component={NewTeacherForm} />
        <Route exact path='/teachers' component={TeachersIndex} />
        <Route path='/lessons/new' component={NewLessonForm} />
        <Route path='/lessons/:id' component={Lesson} />
        <Route path='/lessons' component={Lessons} />
        <Route path='/404' component={ErrorPage} />
      </Switch>
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
