import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";
import { APIResponse } from "../utils/common.js";
import { __dirname } from "../app.js";
dotenv.config({ path: '../../.env' });

// user Registration
const userRegistration = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        employeeId,
        department,
        teamLeadId,
        contact,
        password,
        confirmpassword
    } = req.body;

    const user = await userModel.findOne({ email: email }).lean();
    if (user) {
        res.status(400).send(new APIResponse(0, "Email already exists"));
    }
    else {
        if (password == confirmpassword) {
            try {
                let doc;
                if (req.file) {
                    const url = `http://localhost:8000/${req.file.filename}`;
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt);
                    doc = new userModel({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        employeeId: employeeId,
                        department: department,
                        teamLeadId: teamLeadId,
                        contact: contact,
                        password: hashPassword,
                        profileImage: url
                    });
                } else {
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt);
                    doc = new userModel({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        employeeId: employeeId,
                        department: department,
                        teamLeadId: teamLeadId,
                        contact: contact,
                        password: hashPassword,
                    });
                }
                await doc.save();
                const savedUser = await userModel.findOne({ email: email }).lean();
                res.status(201).send(new APIResponse(1, "Registration Successfull", savedUser));
            } catch (error) {
                res.status(401).send(new APIResponse(0, "Unable to register"));
            }
        }
        else {
            res.status(400).send(new APIResponse(0, "Password and Confirm Password doesn't match"));
        }
    }
}

// user Login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email }).lean();
        if (user != null) {
            const matchPassword = await bcrypt.compare(password, user.password);
            if ((user.email === email) && matchPassword) {
                const token = jwt.sign(
                    { userID: user._id, email: user.email, firstName: user.firstName, image: user.profileImage },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: "1d" }
                );
                res.status(200).send(new APIResponse(1, "Login Successfull", { token: token }));
            } else {
                res.status(401).send(new APIResponse(0, "Email or Password is not Valid"));
            }
        } else {
            res.status(401).send(new APIResponse(0, "Email or Password is not Valid"));
        }
    }
    catch {
        res.status(401).send(new APIResponse(0, "Unable to Login"));
    }
};


export { userRegistration, userLogin };

