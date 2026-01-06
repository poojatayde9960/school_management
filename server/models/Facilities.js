const mongoose = require('mongoose');

const facilitiesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    // created_at: { type: Date, default: Date.now },
    // updated_at: { type: Date, default: Date.now }
}, { timestamps: true })

module.exports = mongoose.model("facilities", facilitiesSchema)
