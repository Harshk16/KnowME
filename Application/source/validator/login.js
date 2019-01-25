const Validator = require('validator');
const isEmpty = require('./function');

module.exports = function validateLoginInput(data) {
    let errors = {}

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email can't be empty"
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password can't be empty"
    }

    if (!Validator.isEmail(data.email)) {
        console.log(data.email)
        errors.email = 'Email is not valid';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}