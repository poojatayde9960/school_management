const Application = require("../models/Application")
const sendEmail = require("../utils/email")

exports.addApplication = async (req, res) => {
    try {
        console.log("Received application data:", req.body)
        const result = await Application.create(req.body)
        console.log("Created application:", result)
        // Opt: Send email notification here if needed
        res.status(201).json({ message: "Application submitted successfully", result })
    } catch (error) {
        res.status(400).json({ message: "Error submitting application", error })
    }
}

exports.getApplications = async (req, res) => {
    try {
        const result = await Application.find()
        res.status(200).json({ message: "Applications fetched successfully", result })
    } catch (error) {
        res.status(400).json({ message: "Error fetching applications", error })
    }
}
