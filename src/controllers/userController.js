import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import { sendEmail } from "../mail/sendMail.js";
import { APIResponse } from "../utils/common.js";
import { DateFormatter } from "../utils/common.js";
import reportModel from "../models/reportModel.js";
import { PRESENT } from "../utils/constant.js";
import mailFieldsModel from "../models/mailFieldsModel.js";

export const addUserUpdates = async (req, res) => {
  try {
    const { teamLeadId } = req.params;

    const data = req.body;

    const mailData = data?.pop();

    const mailDoc = new mailFieldsModel({
      teamLeadId: teamLeadId,
      blockersAndHeighlights: mailData.blockersAndHeighlights,
      actionItems: mailData.actionItems,
      pointsDiscussed: mailData.pointsDiscussed,
    });

    let addMailFields = await mailDoc.save();

    const updatesArray = [];

    await Promise.all(
      data?.map(async (item) => {
        const doc = new reportModel({
          userId: item.userId,
          teamLeadId: req.params.teamLeadId,
          attendance: item.attendance,
          workingStatus: item.workingOnClientName
            ? item.workingStatus + "-" + item.workingOnClientName
            : item.workingStatus,
          workingFrom: item.workingFrom,
          updates: item.updates,
          fromDate: item.fromDate,
          toDate: item.toDate,
          reviewDate: item.reviewDate,
        });

        const addUpdates = await doc.save();

        updatesArray.push(addUpdates);
      })
    );

    const finalResult = [...updatesArray, addMailFields];
    res
      .status(201)
      .send(new APIResponse(1, "Updates added successfully...", finalResult));
  } catch (error) {
    console.log(error);
    res.status(400).send(new APIResponse(0, "Error adding updates..."));
  }
};

export const updateUserUpdates = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      attendance,
      workingStatus,
      workingOnClientName,
      workingFrom,
      updates,
      fromDate,
      toDate,
      reviewDate,
    } = req.body;
    const updateData = await reportModel
      .findByIdAndUpdate(
        id,
        {
          attendance: attendance,
          workingStatus: workingStatus + "-" + workingOnClientName,
          workingFrom: workingFrom,
          updates: updates,
          fromDate: fromDate,
          toDate: toDate,
          reviewDate: reviewDate,
        },
        { new: true }
      )
      .lean();
    if (updateData) {
      res
        .status(200)
        .send(new APIResponse(1, "Data updated successfully...", updateData));
    }
  } catch (error) {
    res.status(400).send(new APIResponse(0, "Error updating details"));
  }
};

export const deleteUserUpdates = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUpdates = await reportModel.findByIdAndDelete(id).lean();
    if (deleteUpdates) {
      res.status(200).send(new APIResponse(1, "Data deleted successfully..."));
    } else {
      res.status(400).send(new APIResponse(1, "Employee not found..."));
    }
  } catch (error) {
    res.status(400).send(new APIResponse(0, "Error deleting updates..."));
  }
};

export const getUserUpdates = async (req, res) => {
  try {
    const id = req.params.id;
    let start = new Date();
    start.setHours(0, 0, 0, 0);
    let end = new Date();
    end.setHours(23, 59, 59, 999);
    const getEmployeeUpdates = await reportModel
      .find({ userId: id, createdAt: { $gte: start, $lt: end } })
      .populate("userId")
      .lean();
    if (getEmployeeUpdates) {
      res
        .status(200)
        .send(new APIResponse(1, "Data found...", getEmployeeUpdates));
    }
  } catch (error) {
    res.status(400).send(new APIResponse(0, "Error fetching updates..."));
  }
};

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
};

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
};

export const getEmployeesTodaysUpdates = async (req, res) => {
  try {
    const id = req.params.id;
    let start = new Date();
    start.setHours(0, 0, 0, 0);
    let end = new Date();
    end.setHours(23, 59, 59, 999);
    const data = await reportModel
      .find({ teamLeadId: id, createdAt: { $gte: start, $lt: end } })
      .populate("userId")
      .lean();
    if (data) {
      res.status(200).send(new APIResponse(1, "Data found...", data));
    }
  } catch (error) {
    res.status(400).send(new APIResponse(0, "Error fetching updates..."));
  }
};

export const getUpdatesOfWeek = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await reportModel
      .find({
        userId: id,
        createdAt: {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      })
      .sort({ createdAt: -1 });
    if (data) {
      res.status(200).send(new APIResponse(1, "found data", data));
    }
  } catch (error) {
    res.status(400).send(new APIResponse(0, "Error while fetching data"));
  }
};

export const mailFields = async (req, res) => {
  try {
    const id = req.params.id;
    const { blockersAndHeighlights, actionItems, pointsDiscussed } = req.body;
    const doc = new mailFieldsModel({
      teamLeadId: id,
      blockersAndHeighlights: blockersAndHeighlights,
      actionItems: actionItems,
      pointsDiscussed: pointsDiscussed,
    });
    const addData = await doc.save();
    if (addData) {
      res
        .status(201)
        .send(new APIResponse(1, "Updates added successfully...", addData));
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(new APIResponse(0, "Error adding updates..."));
  }
};

export const getTableData = async (req, res) => {
  try {
    const id = req.params.id;
    let start = new Date();
    start.setHours(0, 0, 0, 0);
    let end = new Date();
    end.setHours(23, 59, 59, 999);
    const getEmployeesOfTl = await userModel
      .find(
        { teamLeadId: id },
        { firstName: 1, lastName: 1, email: 1, employeeId: 1, teamLeadId: 1 }
      )
      .sort({ _id: 1 })
      .lean();

    const data = getEmployeesOfTl.map((item) => item._id);

    const daysPresent = await reportModel.aggregate([
      {
        $match: {
          teamLeadId: new mongoose.Types.ObjectId(`${id}`),
          attendance: PRESENT,
        },
      },
      {
        $group: { _id: "$userId", count: { $sum: 1 } },
      },
    ]);

    for (let employee of getEmployeesOfTl) {
      for (let daysCount of daysPresent) {
        if (String(employee._id) == String(daysCount._id)) {
          employee.count = daysCount.count;
          break;
        } else {
          continue;
        }
      }
    }

    const report = await reportModel.aggregate([
      {
        $match: {
          $and: [{ userId: { $in: data } }],
        },
      },
      { $sort: { userId: 1 } },
    ]);

    for (const i1 of getEmployeesOfTl) {
      if (report.length > 0)
        for (const i2 of report) {
          if (String(i1._id) === String(i2.userId)) {
            // console.log(`${i1._id} matched with ${i2.userId}`);
            if (DateFormatter(i2.createdAt) == DateFormatter(new Date())) {
              i1.flag = true;
              i1.attendance = i2.attendance;
              i1.workingFrom = i2.workingFrom;
              i1.workingStatus = i2.workingStatus;
              i1.updates = i2.updates;
              i1.toDate = DateFormatter(i2.toDate);
              i1.fromDate = DateFormatter(i2.fromDate);
              i1.reviewDate = DateFormatter(new Date);
              break;
            }
            else {
              i1.flag = false;
              i1.attendance = "";
              i1.workingFrom = "";
              i1.workingStatus = "";
              i1.updates = "";
              i1.toDate = "";
              i1.fromDate = "";
              i1.reviewDate = "";
              break;
            }

          } else {
            continue;
          }
        }
    }

    const mailFieldsData = await mailFieldsModel
      .findOne({ teamLeadId: id, createdAt: { $gt: start, $lt: end } })
      .populate("teamLeadId");

    const obj = {
      pointsDiscussed:
        mailFieldsData?.pointsDiscussed?.length > 0 ? mailFieldsData.pointsDiscussed : " ",
      actionItems:
        mailFieldsData?.actionItems?.length > 0 ? mailFieldsData.actionItems : " ",
      blockersAndHeighlights:
        mailFieldsData?.blockersAndHeighlights?.length > 0
          ? mailFieldsData.blockersAndHeighlights
          : " ",
    };

    const finalResult = [...getEmployeesOfTl, obj];

    res.status(200).send(new APIResponse(1, "found data", finalResult));
  } catch (error) {
    console.log(error);
    res.status(400).send(new APIResponse(0, "Error while fetching data"));
  }
};

export const exportAllDataForExcel = async (req, res) => {
  try {
    const id = req.params.id;

    const getEmployeesOfTl = await userModel
      .find(
        { teamLeadId: id },
        { firstName: 1, lastName: 1, email: 1, teamLeadId: 1 }
      ).sort({ _id: 1 })
      .lean();

    const data = getEmployeesOfTl.map((item) => item._id);

    const daysPresent = await reportModel.aggregate([
      {
        $match: {
          teamLeadId: new mongoose.Types.ObjectId(`${id}`),
          attendance: PRESENT,
        },
      },
      {
        $group: { _id: "$userId", count: { $sum: 1 } },
      },
    ]);

    for (let employee of getEmployeesOfTl) {
      for (let daysCount of daysPresent) {
        if (String(employee._id) == String(daysCount._id)) {
          employee.count = daysCount.count;
          break;
        } else {
          continue;
        }
      }
    }

    const report = await reportModel.aggregate([
      {
        $match: {
          $and: [{ userId: { $in: data } }],
        },
      },
      { $sort: { userId: 1 } },
    ]);


    for (const i1 of getEmployeesOfTl) {
      for (const i2 of report) {
        if (String(i1._id) === String(i2.userId)) {
          // console.log(`${i1._id} matched with ${i2.userId}`);
          if (DateFormatter(i2.createdAt) == DateFormatter(new Date())) {
            i1.flag = true;
            i1.attendance = i2.attendance;
            i1.workingFrom = i2.workingFrom;
            i1.workingStatus = i2.workingStatus;
            i1.updates = i2.updates;
            i1.toDate = DateFormatter(i2.toDate);
            i1.fromDate = DateFormatter(i2.fromDate);
            i1.reviewDate = DateFormatter(new Date());
            break;
          }
          else {
            i1.flag = false;
            i1.attendance = "";
            i1.workingFrom = "";
            i1.workingStatus = "";
            i1.updates = "";
            i1.toDate = "";
            i1.fromDate = "";
            i1.reviewDate = "";
            break;
          }

        } else {
          continue;
        }
      }
    }


    const mailFieldsData = await mailFieldsModel
      .find({ teamLeadId: id })
      .populate("teamLeadId");

    for (let item of mailFieldsData) {
      let teamLeadDetailsObj = {
        teamLeadName:
          item.teamLeadId.firstName + " " + item.teamLeadId.lastName,
        teamLeadEmail: item.teamLeadId.email,
        teamLeadDepartment: item.teamLeadId.department,
        teamLeadContact: item.teamLeadId.contact,
      };
      var fieldsDataObj = {
        ...teamLeadDetailsObj,
        pointsDiscussed: "",
        actionItems: "",
        blockersAndHeighlights: "",
      };
      if (DateFormatter(item.createdAt) == DateFormatter(new Date())) {
        fieldsDataObj = {
          ...teamLeadDetailsObj,
          pointsDiscussed: item.pointsDiscussed,
          actionItems: item.actionItems,
          blockersAndHeighlights: item.blockersAndHeighlights,
        };
      }
    }

    const finalResult = [...getEmployeesOfTl, fieldsDataObj];

    const mailNotify = await sendEmail(finalResult);
    if (mailNotify) {
      console.log("mail sent successfully");
    }

    res.status(200).send(new APIResponse(1, "Data found", finalResult));
  } catch (error) {
    console.log(error);
    res.status(400).send(new APIResponse(0, "Error while fetching data"));
  }
};
