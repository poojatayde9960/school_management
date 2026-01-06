const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    classValue: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending" // Pending, Approved, Rejected
    }
}, { timestamps: true })

module.exports = mongoose.model("application", applicationSchema)
