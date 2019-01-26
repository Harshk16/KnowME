import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../service/profileService';
import { withRouter } from 'react-router-dom'
import isEmpty from '../../clientValidation/function';

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocailInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            github: '',
            bio: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            twitter: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }

        if(nextProps.profile.profile) {
            const profile = nextProps.profile.profile;
            console.log("Data", profile);
            
            // Bring Skills Arrays back to CSV
            const skillsCSV = profile.skills.join(',');

            // If Profile file doesn't exist and make empty string
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.github = !isEmpty(profile.github) ? profile.github : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';

            // Set Component field state 
            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                github: profile.github,
                bio: profile.bio,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                twitter: profile.twitter,
                instagram: profile.instagram,
                youtube: profile.youtube,
            })
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            github: this.state.github,
            bio: this.state.bio,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            twitter: this.state.twitter,
            instagram: this.state.instagram,
            youtube: this.state.youtube,
        }
        console.log("CREATEPROFILE", profileData);
        
        this.props.createProfile(profileData, this.props.history)     
    }

  render() {
      const { errors, displaySocailInputs }  = this.state;
        console.log("Server error", this.state, errors);
        
        let socialInputs;
        
        if(displaySocailInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                    placeholder = "Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={errors.twitter}
                    />

                    <InputGroup
                    placeholder = "Facebook Profile URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook}
                    />

                    <InputGroup
                    placeholder = "LinkedIn Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.onChange}
                    error={errors.linkedin}
                    />

                     <InputGroup
                    placeholder = "YouTube URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={this.state.youtube}
                    onChange={this.onChange}
                    error={errors.youtube}
                    />
                    <InputGroup
                    placeholder = "Instagram URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={this.state.instagram}
                    onChange={this.onChange}
                    error={errors.instagram}
                    />
                </div>
            )
        }
      // Select option for status
      const options = [
        {label: '* Select Professional Status', value: 0},
        {label: 'Developer', value: 'Developer'},
        {label: 'Junior Developers', value: 'Junior Developers'},
      ];
    return (
      <div className="create-profile">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Edit Your Profile</h1>
                    <small className="d-block pb-3">* = required fields</small>
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup 
                            placeholder="* Profile Handle"
                            name="handle"
                            type="text"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                            info="A unique handle for your profile URL. Your Full name nick name and company name"
                        />
                        <SelectListGroup
                             placeholder="Add"
                             name="status"
                             value={this.state.status}
                             onChange={this.onChange}
                             options={options}
                             error={errors.status}
                             info="Add something here for user"
                        />
                        <TextFieldGroup 
                            placeholder="Company"
                            name="company"
                            type="text"
                            value={this.state.company}
                            onChange={this.onChange}
                            error={errors.company}
                            info="A unique handle for your profile URL. Your Full name nick name and company name"
                        />
                        <TextFieldGroup 
                            placeholder="Website"
                            name="website"
                            value={this.state.website}
                            onChange={this.onChange}
                            error={errors.website}
                            info="A unique handle for your profile URL. Your Full name nick name and company name"
                        />
                        <TextFieldGroup 
                            placeholder="* Skills"
                            name="skills"
                            type="text"
                            value={this.state.skills}
                            onChange={this.onChange}
                            error={errors.Skills}
                            info="A unique handle for your profile URL. Your Full name nick name and company name"
                        />
                        <TextFieldGroup 
                            placeholder="Github"
                            name="github"
                            type="text"
                            value={this.state.github}
                            onChange={this.onChange}
                            error={errors.github}
                            info="A unique handle for your profile URL. Your Full name nick name and company name"
                        />
                        <TextAreaFieldGroup 
                            placeholder="Short Bio"
                            name="bio"
                            type="text"
                            value={this.state.bio}
                            onChange={this.onChange}
                            error={errors.bio}
                            info="A unique handle for your profile URL. Your Full name nick name and company name"
                        />
                        <div className="mb-3">
                            <button 
                                type="button"
                                onClick={() => {
                                this.setState(prevState => ({
                                    displaySocailInputs: !prevState.displaySocailInputs
                                }))
                                }} className="btn btn-light">
                                Add Social Network Links
                            </button>
                            <span className="text-muted">Optional</span>
                        </div>
                        {socialInputs}
                        <input type="submit" className="btn btn-info btn-block mt-4"/>
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors   
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile}) (withRouter(CreateProfile));       