import mongoose from "mongoose";

const branchesSchema = new mongoose.Schema({
    branchHead: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    areaManager: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    branchCode: {
        type: String,
        unique: true,
        required: true,
    },
    branchName: {
        type: String,
        required: true
    },
    dailySadqaMSL: {
        type: Number,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "In-Active"],
        required: true
    },
    branchSchedule: {
        days: {
            type: [String],
            enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            required: true
        },
        openTime: {
            type: String,
            required: true
        },
        closeTime: {
            type: String,
            required: true
        }
    }

}, { timestamps: true });

export default mongoose.model("Branch", branchesSchema);
