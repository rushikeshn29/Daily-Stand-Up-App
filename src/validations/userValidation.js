import Joi from "joi";

export const userUpdatesSchema = Joi.object({
    attendance: Joi.string().required(),
    workingStatus: Joi.string().required(),
    workingOnClientName: Joi.string().required(),
    workingFrom: Joi.string().required(),
    updates: Joi.string().min(4).max(4000).required(),
});
