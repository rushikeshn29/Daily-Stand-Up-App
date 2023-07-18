import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    department: {
        type: String,
        required: true,
        trim: true,
    },
    teamLeadId: [
        { type: mongoose.Schema.Types.ObjectId }
    ]

}, { timestamps: true });

const departmentModel = mongoose.model("Department", departmentSchema);

export default departmentModel;