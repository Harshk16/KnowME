import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../service/profileService';
import { withRouter } from 'react-router-dom'

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

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
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
      //Select option for status
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
                    <h1 className="display-4 text-center">Create Your Profile</h1>
                    <p className="lead text-center">
                        Let's get some information to make you profile stand out
                    </p>
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
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors   
});

export default connect(mapStateToProps, {createProfile}) (withRouter(CreateProfile));       