import axios from 'axios';
import setAuthToken  from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode'
import {
    GET_ERRORS,
    SET_CURRENT_USER
} from './types';


// Register User

export const registerUser = (userData, history) => dispatch => {
    axios
        .post('http://localhost:5000/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
    axios
        .post('http://localhost:5000/api/users/login', userData)
        .then(res => {
            // Save to Local Storage
            const {token} = res.data;
            // Set Token to Local Storage
            localStorage.setItem('jwtToken',token);
            // Set token to Auth Header
            setAuthToken(token);
            // Decode toke to get user data
            const decoded = jwt_decode(token)
            // Set Current User
            dispatch(currentUser(decoded));
        })
        .catch(err => 
            dispatch({
               type: GET_ERRORS,
               payload: err.response.data
            },
            console.log("AuthServie", err)  
            )          
        );
};

// Set Logged in User
export const currentUser = (decode) => {
    return {
        type: SET_CURRENT_USER,
        payload: decode
    }
}

// LogOut User
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove  auth headet auth
    setAuthToken(false);

    // set current user to  empty whic will set  isAuthenticated fasle
    dispatch(currentUser({}));
}