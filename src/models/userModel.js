import mongoose from "mongoose";

// User Schema

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        employeeId: {
            type: Number,
            required: true
        },
        department: {
            type: String,
            required: true,
            trim: true,
        },
        teamLead: {
            type: String,
            required: true,
        },
        contact: {
            type: Number,
            required: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        profileImage: {
            type: String,
        },

    },
    { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
