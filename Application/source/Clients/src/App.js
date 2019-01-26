import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {currentUser, logoutUser} from './service/authservice';
import {clearCurrentProfile} from './service/profileService';

import {Provider} from 'react-redux';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';


import PrivateRoute from './components/common/PrivateRoute'
import store from './store';

import './App.css';
 
// Check For token
if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expression
  const decoded  = jwt_decode(localStorage.jwtToken);
  // Set User and isAuthenticated
  store.dispatch(currentUser(decoded));

  // Check for Expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // Logout user 
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to Login
    window.location.href = 'login';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      <div className="App">
        <Navbar/>
        <Route exact path="/" component={Landing}/>
        <div className="container">
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          </Switch>
          <Switch>
            <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
          </Switch>
          <Switch>
            <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
          </Switch>
          <Switch>
            <PrivateRoute exact path="/add-experience" component={AddExperience}/>
          </Switch>
          <Switch>
            <PrivateRoute exact path="/add-education" component={AddEducation}/>
          </Switch>
        </div>
        <Footer/>
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
