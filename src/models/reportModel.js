import mongoose from "mongoose";
import { ABSENT, CLIENT_OFFICE, HOME, OFFICE, PRESENT } from "../utils/constant.js";

const reportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    teamLeadId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    attendance: {
        type: String,
        required: true,
        enum: [PRESENT, ABSENT],
    },
    workingStatus: {
        type: String,
    },
    workingFrom: {
        type: String,
        required: true,
        enum: [HOME, OFFICE, CLIENT_OFFICE],
    },
    updates: {
        type: String,
        trim: true,
    }
}, { timestamps: true });

const reportModel = mongoose.model("Report", reportSchema);

export default reportModel;