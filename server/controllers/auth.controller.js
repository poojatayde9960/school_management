const asyncHandler = require("express-async-handler")
const Auth = require("../models/Auth")
const { checkEmpty } = require("../utils/checkEmpty")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { upload } = require("../utils/uplod")
const cloudinary = require("../utils/cloudinary.config")
const sendEmail = require("../utils/email")

exports.registerAdmin = asyncHandler(async (req, res) => {

    upload(req, res, async (err) => {

        // 1. Upload Error
        if (err) {
            return res.status(400).json({
                message: "Image Upload Failed",
                error: err
            });
        }

        // 2. Body fields
        const { name, email, password, mobile } = req.body;

        // 3. Empty Validation
        const { isError, error } = checkEmpty({ name, email, password, mobile });
        if (isError) {
            return res.status(400).json({ message: "All Fields Required", error });
        }

        // 4. Email Validation
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email Format" });
        }

        // 5. Strong Password
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Weak Password, use strong one" });
        }

        // 6. Mobile Validation
        if (!validator.isMobilePhone(mobile, "en-IN")) {
            return res.status(400).json({ message: "Invalid Mobile Number" });
        }

        // 7. Profile Image Required
        if (!req.file) {
            return res.status(400).json({ message: "Profile Image Required" });
        }

        // 8. Check if Email Already Exists
        const isFound = await Auth.findOne({ email });
        if (isFound) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // 9. Encrypt Password
        const hashPass = await bcrypt.hash(password, 10);

        // 10. Create Admin
        await Auth.create({
            name,
            email,
            password: hashPass,
            mobile,
            profile: req.file.filename,   // IMPORTANT
            role: "admin"
        });

        // 11. Success Response
        return res.json({
            message: "Admin Register Success",
        });
    });
});

exports.loginAdmin = asyncHandler(async (req, res) => {
    const { password, email } = req.body
    const { isError, error } = checkEmpty({ email, password })
    if (isError) {
        return res.status(400).json({ message: "All fields required", error })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" })
    }
    const result = await Auth.findOne({ email })

    if (!result) {
        return res.status(400).json({ message: "Invalid Email" })
    }
    const isVerify = await bcrypt.compare(password, result.password)
    if (!isVerify) {
        return res.status(400).json({ message: "Password do not match" })
    }
    const token = jwt.sign({ userId: result._id },
        process.env.JWT_KEY, { expiresIn: "15d" })
    res.cookie("admin", token, {
        maxAge: 15 * 24 * 60 * 1000,
        httpOnly: true
    })
    res.json({
        message: "login admin success.",
        result: {
            _id: result._id,
            name: result.name,
            email: result.email,
            mobile: result.mobile,
            role: result.role,
        }
    })
})

exports.logoutAdmin = asyncHandler(async (req, res) => {
    try {
        res.clearCookie("admin")
        res.json({ message: "admin logout success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: " Internal Server Error", error: error.message })
    }
})

exports.registerClerk = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        try {
            if (err) {
                return res.status(400).json({ message: "multer Error", err });
            }

            const { name, email, password, mobile } = req.body;

            // 1️⃣ Empty check (password compulsory)
            const { isError, error } = checkEmpty({ name, email, password, mobile });
            if (isError) {
                return res.status(400).json({ message: "All Fields Required", error });
            }

            // 2️⃣ Email validation
            const emailClean = email?.trim().toLowerCase();

            if (!validator.isEmail(emailClean)) {
                return res.status(400).json({ message: "Invalid Email" });
            }


            // 3️⃣ Password strength (optional but recommended)
            if (!validator.isStrongPassword(password)) {
                return res.status(400).json({
                    message: "Weak Password. Use strong password"
                });
            }

            // 4️⃣ Mobile validation
            if (!validator.isMobilePhone(mobile, "en-IN")) {
                return res.status(400).json({ message: "Invalid Mobile Number" });
            }

            // 5️⃣ Profile upload (optional)
            let profile;
            if (req.file) {
                const { secure_url } = await cloudinary.uploader.upload(req.file.path);
                profile = secure_url;
            }

            // 6️⃣ Check existing clerk
            const isFound = await Auth.findOne({ email, role: "clark" });
            if (isFound) {
                return res.status(400).json({ message: "Clerk already registered" });
            }

            // 7️⃣ Hash password
            const hashPass = await bcrypt.hash(password.trim(), 10);

            // 8️⃣ Create clerk
            await Auth.create({
                name,
                email,
                password: hashPass,
                mobile,
                role: "clark",
                clarkId: req.user,
                adminId: req.user,
                profile
            });

            // 9️⃣ Send email (optional)
            try {
                await sendEmail({
                    to: email,
                    subject: "Clerk Login Credentials",
                    message: `
                        <h2>Welcome ${name}</h2>
                        <p>Email: ${email}</p>
                        <p>Password: ${password}</p>
                    `
                });
            } catch (e) {
                console.log("Email failed:", e.message);
            }

            return res.json({
                message: "Clerk registered successfully"
            });

        } catch (error) {
            return res.status(500).json({
                message: "Error registering clerk",
                error: error.message
            });
        }
    });
});



exports.loginClark = asyncHandler(async (req, res) => {
    const { password, email } = req.body
    const { isError, error } = checkEmpty({ email, password })
    if (isError) {
        return res.status(400).json({ message: "All fields required", error })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" })
    }
    const result = await Auth.findOne({ email })

    if (!result) {
        return res.status(400).json({ message: "Invalid Email" })
    }
    const isVerify = await bcrypt.compare(password, result.password)
    if (!isVerify) {
        return res.status(400).json({ message: "Password do not match" })
    }
    const token = jwt.sign({ userId: result._id },
        process.env.JWT_KEY, { expiresIn: "15d" })
    res.cookie("admin", token, {
        maxAge: 15 * 24 * 60 * 1000,
        httpOnly: true
    })
    res.json({
        message: "login admin success.",
        result: {
            _id: result._id,
            name: result.name,
            email: result.email,
            mobile: result.mobile,
            role: result.role,
        }
    })
})
exports.logoutClark = asyncHandler(async (req, res) => {
    try {
        res.clearCookie("clark")
        res.json({ message: "clark logout success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: " Internal Server Error", error: error.message })
    }
})