import jwt from "jsonwebtoken";
import { APIResponse } from "../utils/common.js";
import { loginSchema, registrationSchema } from "../validations/authValidation.js";


export async function auth(req, res, next) {
    try {


        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        if (!token) {
            res.send(new APIResponse(0, "Invalid User"));
        } else {
            jwt.verify(token, process.env.JWT_SECRET_KEY);
            next();
        }
    } catch (err) {
        res.send(new APIResponse(0, "Invalid User"));
    }
}

export async function validateUserRegistration(req, res, next) {
    try {
        const data = req.body;
        const validationResult = registrationSchema.validate(data);
        if (validationResult.error) {
         
            return res.send(new APIResponse(0, validationResult.error.message));
        }
        else {
            next();
        }
    } catch (error) {
        res.send(new APIResponse(0, error.message));
    }
}

export function validateUserLogin(req, res, next) {
    try {
        const data = req.body;
        const validationResult = loginSchema.validate(data);
        if (validationResult.error) {
            return res.send(new APIResponse(0, validationResult.error.message));
        }
        else {
            next();
        };

    }
    catch (error) {
        res.send(new APIResponse(0, error.message));
    }
}



