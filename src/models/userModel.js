import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            unique: true,
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        employeeId: {
            type: Number,
            required: true,
            unique: true,
        },
        department: {
            type: String,
            trim: true,
            required: true
        },
        teamLeadId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        contact: {
            type: Number,
            required: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
        },
        profileImage: {
            type: String,
        },
    },
    { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
