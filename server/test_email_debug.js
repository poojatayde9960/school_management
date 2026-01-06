
require("dotenv").config();
const nodemailer = require("nodemailer");

async function testEmail() {
    console.log("--- Starting Email Test ---");
    console.log("FROM_EMAIL present:", !!process.env.FROM_EMAIL);
    console.log("EMAIL_PASS present:", !!process.env.EMAIL_PASS);

    if (!process.env.FROM_EMAIL || !process.env.EMAIL_PASS) {
        console.error("ERROR: Missing environment variables.");
        return;
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.FROM_EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        console.log("Attempting to verify transporter connection...");
        await transporter.verify();
        console.log("Transporter verification successful!");

        console.log("Attempting to send test email...");
        const info = await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: process.env.FROM_EMAIL, // Send to self
            subject: "Test Email from SkillHub Debugger",
            text: "If you receive this, email sending is working correctly.",
        });

        console.log("Email sent successfully!");
        console.log("Message ID:", info.messageId);
    } catch (error) {
        console.error("--- EMAIL SENDING FAILED ---");
        console.error("Error Code:", error.code);
        console.error("Error Command:", error.command);
        console.error("Error Message:", error.message);

        if (error.code === 'EAUTH') {
            console.log("\nTIP: This is an Authentication Error.");
            console.log("1. Ensure 'FROM_EMAIL' and 'EMAIL_PASS' are correct in .env");
            console.log("2. For Gmail, you MUST use an 'App Password', not your login password.");
            console.log("3. Ensure 2-Step Verification is enabled on your Google Account to generate an App Password.");
        }
    }
}

testEmail();
