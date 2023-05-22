import { check, validationResult } from 'express-validator';
import { APIResponse } from "../utils/common.js"

export const validationCheck = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.errors.length) {
        res.send(new APIResponse(0, "Error", errors));
    } else {
        next();
    }
}

//Rules for Auth Module
export const authRules = {
    SignUp: [
        check("userName").isLength({min:4}).isAlphanumeric().withMessage("User Name is required"),
        check("email").isEmail().withMessage("Valid Email required"),
        check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 character long"),
    ],
    login: [
        check("email").notEmpty().withMessage("Valid username required"),
        check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 character long"),
    ]
} 
