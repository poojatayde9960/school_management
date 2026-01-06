const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const sendEmail = require('./utils/email')

console.log("Testing Email Sending...")
console.log("FROM:", process.env.FROM_EMAIL)
console.log("PASS:", process.env.EMAIL_PASS ? "****" : "MISSING")

const run = async () => {
    try {
        await sendEmail({
            to: process.env.FROM_EMAIL, // Send to self
            subject: "Test Email from Script",
            message: "<h1>It Works!</h1><p>Your email credentials are valid.</p>"
        })
        console.log("✅ Email sent successfully!")
    } catch (error) {
        console.error("❌ Email failed:", error.message)
        if (error.code === 'EAUTH') {
            console.error("--> This means your Email or App Password is incorrect.")
        }
    }
}

run()
