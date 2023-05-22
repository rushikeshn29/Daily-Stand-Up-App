import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { APIResponse } from "../utils/common.js";
import { __dirname } from "../app.js";


// user Registration
const userRegistration = async (req, res) => {

    const {
        name,
        email,
        employeeId,
        department,
        teamLead,
        contact,
        password,
        confirmpassword,
        profileImage,
    } = req.body;


    const user = await userModel.findOne({ email: email });

    if (user) {
        const response = new APIResponse(0, "Email already exists");
        res.send(response);
    }

    else {
        if (password == confirmpassword) {
            try {
                let doc;
                if (req.file) {
                    const file = req.file;
                    const url = `http://localhost:8000/${req.file.filename}`;
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt);
                    doc = new userModel({
                        name: name,
                        email: email,
                        employeeId: employeeId,
                        department: department,
                        teamLead: teamLead,
                        contact: contact,
                        password: hashPassword,
                        profileImage: url
                    });
                } else {
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt);
                    doc = new userModel({
                        name: name,
                        email: email,
                        employeeId: employeeId,
                        department: department,
                        teamLead: teamLead,
                        contact: contact,
                        password: hashPassword,
                    });
                }
                await doc.save();
                const savedUser = await userModel.findOne({ email: email });
                // Generate JWT Token
                const token = jwt.sign(
                    {
                        userID: savedUser._id,
                        email: savedUser.email,
                    },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: "3d" }
                );

                const response = new APIResponse(1, "Registration Successfull", savedUser);
                res.status(201).send(response);
            } catch (error) {
                const response = new APIResponse(0, "Unable to register");
                res.send(response);
            }
        }
        else {
            const response = new APIResponse(
                0,
                "Password and Confirm Password doesn't match"
            );
            res.send(response);
        }
    }
};

// user Login

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({
            email: email
        });

        if (user != null) {
            const isMatch = await bcrypt.compare(password, user.password);
            if ((user.email === email) && isMatch) {
                const token = jwt.sign(
                    { userID: user._id, email: user.email },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: "1d" }
                );
                const response = new APIResponse(1, "Login Successfull", {
                    token: token, data: user.profileImage
                });
                res.status(200).send(response);
            } else {
                const response = new APIResponse(0, "Email or Password is not Valid");
                res.status(401).send(response);
            }
        } else {
            const response = new APIResponse(0, "Email or Password is not Valid");
            res.status(401).send(response);
        }
    } catch (error) {
        const response = new APIResponse(0, "Unable to Login");
        res.status(401).send(response);
    }
};


export { userRegistration, userLogin };

