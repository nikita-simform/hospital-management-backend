const { check } = require('express-validator');

const patientValidations = () => {
    return [
        check("firstName", "First name is required").notEmpty(),
        check("firstName", "First name should be atleast be 3 characters").isLength({
            min: 3,
        }),
        check("lastName", "Last name should be atleast be 3 characters").isLength({
            min: 3,
        }),
        check("age", "age is required").notEmpty(),
        check("age", "please add valid age").isNumeric(),
        check("contact_number", "contact number is required").notEmpty(),
        check("contact_number", "please add valid contact number").isNumeric(),
        check("contact_number", "contact number should be of 10 numbers").isLength({
            min: 10,
            max: 10,
        }),
        check("email", "Email should be valid").isEmail(),
    ]
}

module.exports = {
    patientValidations
}