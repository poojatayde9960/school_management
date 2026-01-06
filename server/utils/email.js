

const nodemailer = require("nodemailer");

// 1. Create the transporter OUTSIDE the function
// This allows Nodemailer to reuse the connection (pooling), making it much faster.
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.EMAIL_PASS, // ⚠️ Must be an App Password (see below)
    },
});

const sendEmail = async ({ subject, to, message }) => {
    try {
        // 2. Use async/await instead of callbacks
        const info = await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: to,
            subject: subject,
            text: message, // Plain text fallback (good for spam filters)
            html: message, // HTML version
        });

        console.log("Message sent: %s", info.messageId);
        return true;

    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

module.exports = sendEmail;


