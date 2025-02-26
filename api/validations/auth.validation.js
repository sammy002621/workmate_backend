const Joi = require('joi');

// Define schema for user signup
const signupSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address.',
        'string.empty': 'Email is required.',
        'any.required': 'Email is required.'
    }),
    phone: Joi.string().pattern(new RegExp('^\\+[1-9]{1}[0-9]{3,14}$')).required().messages({
        'string.pattern.base': 'Phone number must be in the format +[country code][number] and contain 4 to 15 digits.',
        'string.empty': 'Phone number is required.',
        'any.required': 'Phone number is required.'
    }),
    compID: Joi.string().pattern(new RegExp('^COMP-[a-zA-Z0-9]{6}$')).required().messages({
        'string.pattern.base': 'Company ID must be in the format COMP-[ID] and contain 6 alphanumeric characters after the hyphen.',
        'string.empty': 'Company ID is required.',
        'any.required': 'Company ID is required.'
    }),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$')).required().messages({
        'string.pattern.base': 'Password must be at least 8 characters long and include at least one letter, one number, and one special character.',
        'string.empty': 'Password is required.',
        'any.required': 'Password is required.'
    }),
});


const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address.',
        'string.empty': 'Email is required.',
        'any.required': 'Email is required.'
    }),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$')).required().messages({
        'string.pattern.base': 'Password must be at least 8 characters long and include at least one letter, one number, and one special character.',
        'string.empty': 'Password is required.',
        'any.required': 'Password is required.'
    }),
})

module.exports = { signupSchema , loginSchema };