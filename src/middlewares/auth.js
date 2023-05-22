import jwt from "jsonwebtoken";
import { APIResponse } from "../utils/common";

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