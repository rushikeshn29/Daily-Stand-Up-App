import { APIResponse } from "../utils/common.js";
import { userUpdatesSchema } from "../validations/userValidation.js";


export function validateUserUpdates(req, res, next) {
    try {
        const data = req.body;
        const validationResult = userUpdatesSchema.validate(data);
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

