import mongoose from "mongoose";

const mailFieldsSchema = new mongoose.Schema({
    teamLeadId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    pointsDiscussed: {
        type: String,
        trim: true
    },
    actionItems: {
        type: String,
        trim: true
    },
    blockersAndHeighlights: {
        type: String,
        trim: true
    }


}, { timestamps: true });

const mailFieldsModel = mongoose.model("Mail_Fields", mailFieldsSchema);

export default mailFieldsModel;