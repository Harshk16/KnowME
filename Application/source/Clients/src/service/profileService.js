import axios from 'axios';
import {
    GET_PROFILE,
    CLEAR_CURRENT_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    GET_ERRORS,
    SET_CURRENT_USER
} from './types';

// GET Current Profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('http://localhost:5000/api/profile')
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            }),
        )
        .catch(err => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })
}

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
    axios
        .post('http://localhost:5000/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Add Experience
export const addExperience = (expData, history) => dispatch => {
    axios
    .post('http://localhost:5000/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

// Add Education
export const addEducation = (eduData, history) => dispatch => {
    axios
    .post('http://localhost:5000/api/profile/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

// delete account and profile
export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you sure? This can be undone!')) {
        axios
            .delete('http://localhost:5000/api/profile')
            .then(res => 
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })
            )
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    }
}

// Profile Loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

// Clear Profile Loading
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}