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
import LogoutButton from './LogoutButton';
import LogoutInProgressPage from './LogoutInProgressPage';
import SetPasswordForm from './SetPasswordForm';
import InitiatePasswordResetForm from './InitiatePasswordResetForm';
import PasswordResetEmailSent from './PasswordResetEmailSent';
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

class App extends React.Component {
  constructor() {
    super();
    if (localStorage.getItem('token')) {
      this.state = {
        loggedIn: true
      }
    } else {
      this.state = {
        loggedIn: false
      }
    }

    this.setLoggedInState = this.setLoggedInState.bind(this);
    this.setLoggedOutState = this.setLoggedOutState.bind(this);
  }

  setLoggedInState() {
    this.setState({loggedIn: true})
    // The JSON Web Token with authentication data is set in the login form
    // component when handling the server's response to an authentication
    // request. Updating app state here only affects UI behavior.
  }

  setLoggedOutState() {
    this.setState({loggedIn: false})
    localStorage.removeItem('token')
  }

  render() {
    return(
      <Router history={history}>
        <div className="centered-layout">
        <LogoutButton loggedIn={this.state.loggedIn} setLoggedOutState={this.setLoggedOutState}/>
          <Switch>
            <Route exact path='/' render={(props) => <LoginForm setLoggedInState={this.setLoggedInState} history={history}/>}/>
            <Route path='/logout' component={LogoutInProgressPage} />
            <Route path='/set_password' component={SetPasswordForm} />
            <Route path='/initiate_password_reset' component={InitiatePasswordResetForm} />
            <Route path='/password_reset_email_sent' component={PasswordResetEmailSent} />
            <Route path='/reset_password' component={SetPasswordForm} />
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
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
