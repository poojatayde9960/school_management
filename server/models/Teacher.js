
const mongoose = require("mongoose")
const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    classes: { type: String, required: true },
    subject: { type: String, required: true },
    experience: { type: String, required: true },
    mobile: { type: String, required: true },
    profile: { type: String, required: true },
    adminId: { type: String },

}, { timestamps: true })
module.exports = mongoose.model("teacher", teacherSchema)

