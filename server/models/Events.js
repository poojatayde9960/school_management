const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    category: { type: String, required: true },
    // location: {
    //     building: { type: String, required: true }, 
    //     room: { type: String } 
    // },
    images: { type: [String], required: true },
    // created_at: { type: Date, default: Date.now },
    // updated_at: { type: Date, default: Date.now }
}, { timestamps: true })
module.exports = mongoose.model("event", eventsSchema)

