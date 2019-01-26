import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { logoutUser } from "../../service/authservice";
import { clearCurrentProfile } from "../../service/profileService";


class Navbar extends Component {
  onLogout(e){
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {

    const {isAuthenticated, user} = this.props.auth;

    const authLink = (
      <ul className="navbar-nav ml-auto">
              <li className="nav-item">
               <a href="" onClick={this.onLogout.bind(this)} className="nav-links">
                <img
                className="rounded-circle" 
                src={user.avatar} alt={user.name}  style = {{width: '25px', marginRight: '5px'}}/>{' '}
                LogOut
               </a>
               </li>
            </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">Sign Up</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
    </ul>
    )
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/dashboard">DevConnector</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
    
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles"> Developers
                </Link>
              </li>
            </ul>

            {isAuthenticated ? authLink : guestLinks}
           
          </div>
        </div>
      </nav>
    )
  }
}
Navbar.prototypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile}) (Navbar);
