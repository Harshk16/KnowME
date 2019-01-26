import React, { Component } from 'react'
import  TextFieldGroup  from '../common/TextFieldGroup';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {addEducation} from '../../service/profileService';
import  TextAreaFieldGroup  from '../common/TextAreaFieldGroup';

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        desc: '',
        errors: {},
        disabled: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
}

componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
        this.setState({errors: nextProps.errors});
    }
}

onChange(e) {
    this.setState({[e.target.name]: e.target.value})
}

onCheck(e) {
    this.setState({
        disabled: !this.state.disabled,
        current: !this.state.disabled
    })
}

onSubmit(e) {
    e.preventDefault();

    const eduData = {
        school: this.state.school,
        degree: this.state.degree,
        fieldofstudy: this.state.fieldofstudy,
        from: this.state.from,
        to: this.state.to,
        current: this.state.current,
        des: this.state.current.desc,
    };
    this.props.addEducation(eduData, this.props.history)
}

render() {
const { errors } = this.state;

return (
  <div className="add-education">
    <div className="container">
        <div className="row">
            <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">
                    Go Back
                </Link>
                <h1 className="display-4 text-center">Add Experience</h1>
                <p className="lead tex-center">Add Job and Experience that you have had in the past or current
                </p>
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                        placeholder="School Name"
                        name="school"
                        type="text"
                        value={this.state.school}
                        onChange={this.onChange}
                        error={errors.school}
                    />
                    <TextFieldGroup
                        placeholder="* Degree"
                        name="degree"
                        type="text"
                        value={this.state.degree}
                        onChange={this.onChange}
                        error={errors.degree}
                    />
                    <TextFieldGroup
                        placeholder="Field Of Study"
                        name="fieldofstudy"
                        type="text"
                        value={this.state.fieldofstudy}
                        onChange={this.onChange}
                        error={errors.fieldofstudy}
                    />
                    <h6>From Date</h6>
                    <TextFieldGroup
                        name="from"
                        type="date"
                        value={this.state.from}
                        onChange={this.onChange}
                        error={errors.from}
                    />
                    <h6>To Date</h6>
                    <TextFieldGroup
                        name="to"
                        type="date"
                        value={this.state.to}
                        onChange={this.onChange}
                        error={errors.to}
                        disabled={this.state.disabled ? 'disabled' : ''}
                    />
                    <div className="form-check mb-4">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="current"
                            value={this.state.current}
                            checked={this.state.current}
                            onChange={this.onCheck}
                            id="current"
                        />
                        <label htmlFor="current" className="form-check-label">
                            Current Job
                        </label>
                    </div>
                    <TextAreaFieldGroup
                            placeholder="Description"
                            name="desc"
                            type="date"
                            value={this.state.desc}
                            onChange={this.onChange}
                            error={errors.desc}
                            info="Tell Us about your company and your role in company and position"
                        />
                    <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                </form>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

AddEducation.prototypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, {addEducation}) (withRouter(AddEducation));
