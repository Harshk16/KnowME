import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCurrentProfile, deleteAccount} from '../../service/profileService';
import Spinner from '../common/Spinner'; 
import ProfileActions from './ProfileAction';
import Experience from './Experience';
 class Dashboard extends Component {
   componentDidMount() {
     this.props.getCurrentProfile();
   }

   onDeleteClick(e) {
    this.props.deleteAccount();
   }

  render() {
    const {user} = this.props.auth;
    const { profile, loading } = this.props.profile;
    console.log("Data", profile);

    let dashBoardContent;

    let userName;

    let data;
    
    if(profile === null || loading) {
      dashBoardContent = <Spinner/>

    }else {
      // Check if logged in  user has profile data
      if(Object.keys(profile).length > 0) {
        userName = profile.handle.replace(/\s/g,'')
        data = profile.experience
        console.log("Again", data);
        
        dashBoardContent = (
          <div>
            <p className="lead-text-muted">
              Welcome <Link to={`/profile/${userName}`}>{user.name}</Link>  
            </p>
            <ProfileActions/>
            <Experience experience = {data} {...this.state}/>
            <div style={{marginBottom: '60px'}}/>
            <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Account</button>
          </div>
        )
      } else {
        // User is logged in but has not profile
        dashBoardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
          </div>
        )
      }

    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
                {dashBoardContent}
            </div> 
         </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount}) (Dashboard);
