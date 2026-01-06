const mongoose = require("mongoose")
const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    admissionDate: { type: String, required: true },
    classApplied: { type: String, required: true },
    documentsSubmitted: { type: String, required: true },
    status: { type: String, required: true },
    profile: { type: String, required: true },

}, { timestamps: true })
module.exports = mongoose.model("student", studentSchema)