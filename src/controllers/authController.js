import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({ path: '../../.env' });
import { __dirname } from "../index.js";
import userModel from "../models/userModel.js";
import { APIResponse } from "../utils/common.js";
import { DEFAULT_TL_ID } from "../utils/constant.js";
import departmentModel from "../models/departmentModel.js";

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
        res.status(200).send(new APIResponse(0, "Email already exists"));
    }
    else {
        if (password == confirmpassword) {
            try {
                let doc;

                const departmentName = await departmentModel.findOne({ _id: department });
                if (req.file) {
                    const url = `http://localhost:8000/${req.file.filename}`;
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt);
                    doc = new userModel({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        employeeId: employeeId,
                        department: departmentName.department,
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
                        department: departmentName.department,
                        teamLeadId: teamLeadId,
                        contact: contact,
                        password: hashPassword,
                    });
                }
                await doc.save();
                const savedUser = await userModel.findOne({ email: email }).lean();

                if (savedUser.teamLeadId.toString() == DEFAULT_TL_ID) {
                    const insertTeamLeadId = await departmentModel.findOneAndUpdate({ _id: department },
                        { $push: { "teamLeadId": savedUser._id } }).lean();
                }
                res.status(201).send(new APIResponse(1, "Registration Successfull", savedUser));
            } catch (error) {
                res.status(401).send(new APIResponse(0, error.message));
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
                    { userID: user._id, Tl: user.teamLeadId, email: user.email, firstName: user.firstName, image: user.profileImage },
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

const getTeamLead = async (req, res) => {
    try {

        const id = req.params.id;
        const tlData = await departmentModel.findOne({ _id: id }, { _id: 0, teamLeadId: 1 }).lean();

        let newArr = [];
        const s = tlData.teamLeadId?.map((item) =>
            newArr.push(item));

        const response = await userModel.aggregate([
            { $match: { _id: { $in: newArr } } },
            { $project: { name: { $concat: ["$firstName", " ", "$lastName"] } } }
        ]
        )
        if (response.length > 0) {
            res.status(200).send(new APIResponse(1, "Records found.", response));
        } else {
            res.status(404).send(new APIResponse(0, "No records found."));
        }
    } catch (error) {
        res.status(500).send(new APIResponse(0, "Error fetching records..."));
    }
}

const getDepartments = async (req, res) => {
    try {
        const departments = await departmentModel.find({}, { department: 1 }).lean();
        if (departments) {
            res.status(200).send(new APIResponse(1, "Data found...", departments));
        }
    } catch (error) {
        res.status(400).send(new APIResponse(0, "Error fetching Departmetns..."));
    }
}

const addDepartment = async (req, res) => {
    try {
        const { department, teamLeadId } = req.body;
        const doc = new departmentModel({
            department: department,
            teamLeadId: teamLeadId
        });
        const addDepartment = await doc.save();
        if (addDepartment) {
            res.status(200).send(new APIResponse(1, "Department added successfully...", addDepartment));
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).send(new APIResponse(0, "Error adding departments..."));
    }
}
export { userRegistration, userLogin, getTeamLead, addDepartment, getDepartments };

