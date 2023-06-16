import Joi from 'joi';


export const registrationSchema = Joi.object({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().lowercase().min(5).max(45).required(),
    employeeId: Joi.number().integer().min(1000).max(99999999).required(),
    department: Joi.string().min(4).max(45).required(),
    teamLeadId: Joi.string().hex().length(24),
    contact: Joi.number().integer().min(10 ** 9).max(10 ** 10 - 1).required().messages({
        'number.min': 'Contact number should be 10 digit.',
        'number.max': 'Contact number should be 10 digit'
    }),
    password: Joi.string().pattern(RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$')).required(),
    confirmpassword: Joi.ref('password'),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().min(5).max(45).required(),
    password: Joi.string().required(),
})