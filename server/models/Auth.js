const mongoose = require("mongoose")
const authSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    profile: { type: String, required: true },
    adminId: { type: String },
    clarkId: { type: String },
    role: { type: String, enum: ["admin", "clark"], default: "clark" },
}, { timestamps: true })
module.exports = mongoose.model("auth", authSchema)