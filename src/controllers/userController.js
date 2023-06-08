import userModel from "../models/userModel.js";
import reportModel from "../models/reportModel.js";
import { APIResponse } from "../utils/common.js";
import mongoose from "mongoose";
import { PRESENT } from "../utils/constant.js";


export const addUserUpdates = async (req, res) => {
    try {

        const { id1, id2 } = req.params;
        const { attendance, workingStatus, workingOnClientName, workingFrom, updates } = req.body;
        const doc = new reportModel({
            userId: id1,
            teamLeadId: id2,
            attendance: attendance,
            workingStatus: workingStatus + "-" + workingOnClientName,
            workingFrom: workingFrom,
            updates: updates
        });
        const addUpdates = await doc.save();
        if (addUpdates) {
            res.status(201).send(new APIResponse(1, "Updates added successfully...", addUpdates));
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(new APIResponse(0, "Error adding updates..."));
    }
}

export const updateUserUpdates = async (req, res) => {
    try {
        const id = req.params.id;
        const { attendance, workingStatus, workingOnClientName, workingFrom, updates } = req.body;
        const updateData = await reportModel.findByIdAndUpdate(id, {
            attendance: attendance,
            workingStatus: workingStatus + "-" + workingOnClientName,
            workingFrom: workingFrom,
            updates: updates
        }, { new: true }).lean();
        if (updateData) {
            res.status(200).send(new APIResponse(1, "Data updated successfully...", updateData));
        }
    } catch (error) {
        res.status(400).send(new APIResponse(0, "Error updating details"));
    }
}

export const deleteUserUpdates = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteUpdates = await reportModel.findByIdAndDelete(id).lean();
        if (deleteUpdates) {
            res.status(200).send(new APIResponse(1, "Data deleted successfully..."));
        }
        else {
            res.status(400).send(new APIResponse(1, "Employee not found..."));
        }
    } catch (error) {
        res.status(400).send(new APIResponse(0, "Error deleting updates..."));
    }
}

export const getUserUpdates = async (req, res) => {
    try {
        const id = req.parms.id;
        let start = new Date();
        start.setHours(0, 0, 0, 0);
        let end = new Date();
        end.setHours(23, 59, 59, 999);
        const getEmployeeUpdates = await reportModel.find({ userId: id, createdAt: { $gte: start, $lt: end } }).populate("userId").lean();
        if (getEmployeeUpdates) {
            res.status(200).send(new APIResponse(1, "Data found...", getEmployeeUpdates));
        }
    } catch (error) {
        res.status(400).send(new APIResponse(0, "Error fetching updates..."));
    }
}

export const getEmployeesOfTL = async (req, res) => {
    try {
        const id = req.params.id;
        const getEmployees = await userModel.find({ teamLeadId: id }).lean();
        if (getEmployees) {
            res.status(200).send(new APIResponse(1, "Data found...", getEmployees));
        }

    } catch (error) {
        res.status(400).send(new APIResponse(0, "Error fetching Records..."));
    }
}

export const getEmployeeDetailsById = async (req, res) => {
    try {
        const id = req.params.id;
        const userData = await userModel.findById(id).lean();
        if (userData) {
            res.status(200).send(new APIResponse(1, "Data found...", userData));
        }

    } catch (error) {
        res.status(400).send(new APIResponse(0, "Error fetching Records..."));
    }
}

export const getEmployeesTodaysUpdates = async (req, res) => {
    try {
        const id = req.params.id;
        let start = new Date();
        start.setHours(0, 0, 0, 0);
        let end = new Date();
        end.setHours(23, 59, 59, 999);
        const data = await reportModel.find({ teamLeadId: id, createdAt: { $gte: start, $lt: end } })
            .populate("userId").lean();
        if (data) {
            res.status(200).send(new APIResponse(1, "Data found...", data));
        }
    } catch (error) {
        res.status(400).send(new APIResponse(0, "Error fetching updates..."));
    }
}

export const getUpdatesOfWeek = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await reportModel.find(
            {
                userId: id,
                createdAt:
                {
                    $gte: (new Date((new Date()).getTime() - (7 * 24 * 60 * 60 * 1000)))
                }
            }
        ).sort({ "createdAt": -1 });
        if (data) {
            res.status(200).send(new APIResponse(1, "found data", data));
        }

    } catch (error) {
        res.status(400).send(new APIResponse(0, "Error while fetching data"))
    }
}

export const exportFileData = async (req, res) => {
    try {
        const id = req.params.id;
        let start = new Date();
        start.setHours(0, 0, 0, 0);
        let end = new Date();
        end.setHours(23, 59, 59, 999);
        const data = await reportModel.find({
            createdAt: {
                $gte: start, $lt: end
            }
        }).populate("userId").lean();
        const daysPresent = await reportModel.aggregate([
            {
                $match: {
                    teamLeadId: new mongoose.Types.ObjectId(`${id}`),
                    attendance: PRESENT,
                }
            },
            {
                $group: { _id: "$userId", count: { $sum: 1 } }
            },
        ]).lean();

        if (data && daysPresent) {
            const newData = data.map((elements) => {
                var result = daysPresent.filter(obj => String(obj._id) == elements.userId._id)
                return {
                    firstName: elements.userId.firstName,
                    lastName: elements.userId.lastName,
                    email: elements.userId.email,
                    department: elements.userId.department,
                    daysPresentInCall: result.length > 0 ? result[0].count : 0,
                    teamLead: elements.userId.teamLead,
                    workingFrom: elements.userId.workingFrom,
                    workingStatus: elements.userId.workingStatus,
                    contact: elements.userId.contact,
                    attendance: elements.attendance,
                    status: elements.status,
                    updates: elements.updates,
                    createdAt: elements.createdAt,
                }
            })
            if (newData) {
                res.status(200).send(new APIResponse(1, "Data exported successfully...", newData));
            }
        }
    } catch (error) {
        res.status(400).send(new APIResponse(0, "Error exporting data..."));
    }
}