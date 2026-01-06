const mongoose = require("mongoose")
const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    images: { type: [String], required: true },
    head: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    adminId: { type: String },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],

    },
}, { timestamps: true })
module.exports = mongoose.model("deprtment", departmentSchema)