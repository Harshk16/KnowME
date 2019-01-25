const Validator = require('validator');
const isEmpty = require('./function');

module.exports = function validateRegisterInput(data) {
    let errors = {}

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isLength(data.name, {
            min: 2,
            max: 30
        })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = "Field can't be empty"
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