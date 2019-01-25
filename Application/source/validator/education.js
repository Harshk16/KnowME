const Validator = require('validator');
const isEmpty = require('./function');

module.exports = function validateEducationInput(data) {
    let errors = {}

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.from = !isEmpty(data.from) ? data.from : '';


    if (Validator.isEmpty(data.school)) {
        errors.school = "School can't be empty"
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = "Degree can't be empty"
    }

    if (Validator.isEmpty(data.from)) {
        console.log(data.from)
        errors.from = 'From Date is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}