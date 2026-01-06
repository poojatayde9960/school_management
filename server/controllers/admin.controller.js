const asyncHandler = require("express-async-handler");
const { checkEmpty } = require("../utils/checkEmpty");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { upload, uploadImage } = require("../utils/uplod");
const cloudinary = require("../utils/cloudinary.config");
const sendEmail = require("../utils/email");

const Teacher = require("../models/Teacher");
const Department = require("../models/Department");
const Student = require("../models/Student");
const Events = require("../models/Events");
const Facilities = require("../models/Facilities");

/* ============================================================
   ADD TEACHER
============================================================ */
exports.addTeacher = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).json({ message: "multer Error", err });

        const { password, email, name, mobile, subject, classes, experience } = req.body;
        const { isError } = checkEmpty({ name, email, password, mobile, classes, subject, experience });

        if (isError) return res.status(400).json({ message: "All Fields Required" });
        if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid Email" });
        if (!validator.isStrongPassword(password)) return res.status(400).json({ message: "Provide strong password" });
        if (mobile && !validator.isMobilePhone(mobile)) return res.status(400).json({ message: "Provide correct phone number" });

        let profile;
        if (req.file) {
            const { secure_url } = await cloudinary.uploader.upload(req.file.path);
            profile = secure_url;
        }

        const isFound = await Teacher.findOne({ $or: [{ email }, { mobile }] });
        if (isFound) return res.status(400).json({ message: "Email or mobile already registered" });

        // DEV LOGGING: Print credentials so developer can login
        console.log("==========================================");
        console.log(" NEW TEACHER CREDENTIALS ");
        console.log(` Email: ${email}`);
        console.log(` Password: ${password}`);
        console.log("==========================================");

        const hashPass = await bcrypt.hash(password, 10);

        await Teacher.create({
            password: hashPass,
            email,
            name,
            mobile,
            profile,
            classes,
            subject,
            experience,
            adminId: req.user
        });

        try {
            await sendEmail({
                to: email,
                subject: "Welcome to SkillHub - Teacher Access",
                message: `
                    <h2>Welcome, ${name}!</h2>
                    <p>You have been registered as a Teacher at SkillHub.</p>
                    <ul>
                        <li><strong>Login ID:</strong> ${email}</li>
                        <li><strong>Password:</strong> ${password}</li>
                    </ul>
                    <p>Please change your password after logging in.</p>
                `
            })
        } catch (emailError) {
            console.log("WARNING: Email sending failed. Continuing...");
            console.log("Email Error:", emailError.message);
        }

        return res.json({ message: "Teacher added successfully" });
    });
});
exports.deleteTeacher = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Teacher ID is required" });
    }

    const teacher = await Teacher.findById(id);

    if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
    }

    // OPTIONAL: delete image from cloudinary
    // if (teacher.profile) {
    //     const publicId = teacher.profile.split("/").pop().split(".")[0];
    //     await cloudinary.uploader.destroy(publicId);
    // }

    await Teacher.findByIdAndDelete(id);

    return res.json({
        message: "Teacher deleted successfully"
    });
});

/* ============================================================
   ADD STUDENT
============================================================ */
exports.addStudent = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).json({ message: "File upload error" });

        const { firstName, lastName, email, gender, mobile, dateOfBirth, address, city, state, documentsSubmitted = "Pending", pinCode, admissionDate, status = "Active", classApplied, password } = req.body;

        const { isError } = checkEmpty({ firstName, lastName, email, mobile, dateOfBirth, address, classApplied, password });
        if (isError) return res.status(400).json({ message: "All fields are required" });

        if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid Email" });
        if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });

        const isFound = await Student.findOne({ $or: [{ email }, { mobile }] });
        if (isFound) return res.status(400).json({ message: "Email or mobile already registered" });

        let profile = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`;
        if (req.file) {
            const { secure_url } = await cloudinary.uploader.upload(req.file.path);
            profile = secure_url;
        }

        const hashPass = await bcrypt.hash(password, 10);

        await Student.create({
            firstName,
            lastName,
            email,
            gender,
            mobile,
            dateOfBirth,
            address,
            city,
            state,
            documentsSubmitted,
            pinCode,
            admissionDate,
            status,
            classApplied,
            password: hashPass,
            profile
        });

        res.json({ message: "Student added successfully" });
    });
});

/* ============================================================
   UPDATE STUDENT
============================================================ */
exports.updateStudent = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).json({ message: "Image Upload Error" });

        const { id } = req.params;
        const { firstName, lastName, email, gender, mobile, dateOfBirth, address, city, state, documentsSubmitted, pinCode, admissionDate, status, classApplied, password } = req.body;

        // Relaxed validation for update (checkEmpty only if fields are meant to be mandatory updates, usually partial updates are allowed but this looks like full update)
        // const { isError } = checkEmpty({ ... }); // Keeping safety check if desired, but careful with optional fields

        let profile = null;
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path);
            profile = uploadResult.secure_url;
        }

        const updateData = {
            firstName, lastName, email, gender, mobile,
            dateOfBirth, address, city, state,
            documentsSubmitted, pinCode, admissionDate,
            status, classApplied
        };

        if (password && password.length >= 1) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        if (profile) updateData.profile = profile;

        const updated = await Student.findByIdAndUpdate(id, updateData, { new: true });
        if (!updated) return res.status(404).json({ message: "Student not found" });

        res.json({ message: "Student updated successfully" });
    });
});

/* ============================================================
   FETCH FUNCTIONS
============================================================ */

exports.fetchStudent = asyncHandler(async (req, res) => {
    const result = await Student.find();
    res.json({ message: "Student Fetch Success", result });
});

exports.deleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.json({ message: "Student deleted successfully" });
});

exports.fetchTeacher = asyncHandler(async (req, res) => {
    const result = await Teacher.find();
    res.json({ message: "Teacher Fetch Success", result });
});

/* ============================================================
   DEPARTMENT CRUD
============================================================ */

exports.addDepartment = asyncHandler(async (req, res) => {
    uploadImage(req, res, async (err) => {
        if (err) return res.status(400).json({ message: "Multer Error", err });

        const { name, head, category, description } = req.body;
        const { isError } = checkEmpty({ name, head, category, description });

        if (isError) return res.status(400).json({ message: "All fields are required" });

        let images = [];

        if (req.files?.images) {
            for (const file of req.files.images) {
                const result = await cloudinary.uploader.upload(file.path);
                images.push(result.secure_url);
            }
        }

        await Department.create({
            name,
            adminId: req.user,
            head,
            category,
            description,
            images
        });

        res.json({ message: "Department added", images });
    });
});

exports.deleteDepatment = asyncHandler(async (req, res) => {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: "Department deleted successfully" });
});

/* ============================================================
   FACILITIES CRUD
============================================================ */

exports.addFacilities = asyncHandler(async (req, res) => {
    uploadImage(req, res, async (err) => {
        if (err) return res.status(400).json({ message: "Multer Error", err });

        const { name, description } = req.body;
        const { isError } = checkEmpty({ name, description });

        if (isError) return res.status(400).json({ message: "All fields required" });

        let facilityImages = [];

        if (req.files?.images) {
            for (const file of req.files.images) {
                const result = await cloudinary.uploader.upload(file.path);
                facilityImages.push(result.secure_url);
            }
        }

        await Facilities.create({
            name,
            description,
            images: facilityImages
        });

        res.json({ message: "Facility added", facilityImages });
    });
});

exports.fetchFacilities = asyncHandler(async (req, res) => {
    const result = await Facilities.find();
    res.json({ message: "Facilities fetch success", result });
});

exports.deleteFacilities = asyncHandler(async (req, res) => {
    await Facilities.findByIdAndDelete(req.params.id);
    res.json({ message: "Facility deleted" });
});

/* ============================================================
   MISSING CONTROLLER FUNCTIONS
============================================================ */

exports.fetchDepartment = asyncHandler(async (req, res) => {
    const result = await Department.find();
    res.json({ message: "Department Fetch Success", result });
});

exports.updateDepartment = asyncHandler(async (req, res) => {
    uploadImage(req, res, async (err) => {
        if (err) return res.status(400).json({ message: "Multer Error", err });
        const { id } = req.params;

        const { name, head, category, description } = req.body;

        const updateData = { name, head, category, description };

        if (req.files?.images) {
            let images = [];
            for (const file of req.files.images) {
                const result = await cloudinary.uploader.upload(file.path);
                images.push(result.secure_url);
            }
            updateData.images = images;
        }

        await Department.findByIdAndUpdate(id, updateData);
        res.json({ message: "Department updated successfully" });
    });
});

/* ============================================================
   EVENTS CRUD
============================================================ */

exports.addEvent = asyncHandler(async (req, res) => {
    uploadImage(req, res, async (err) => {
        if (err) return res.status(400).json({ message: "Multer Error", err });

        const { name, description, date, time, category } = req.body;
        const { isError } = checkEmpty({ name, description, date, time, category });

        if (isError) return res.status(400).json({ message: "All fields are required" });

        let images = [];
        if (req.files?.images) {
            for (const file of req.files.images) {
                const result = await cloudinary.uploader.upload(file.path);
                images.push(result.secure_url);
            }
        }

        await Events.create({
            name,
            description,
            date,
            time,
            category,
            images
        });

        res.json({ message: "Event added successfully" });
    });
});

exports.fetchEvent = asyncHandler(async (req, res) => {
    const result = await Events.find();
    res.json({ message: "Events Fetch Success", result });
});

exports.updateEvent = asyncHandler(async (req, res) => {
    uploadImage(req, res, async (err) => {
        if (err) return res.status(400).json({ message: "Multer Error", err });
        const { id } = req.params;
        const { name, description, date, time, category } = req.body;

        const updateData = { name, description, date, time, category };

        if (req.files?.images) {
            let images = [];
            for (const file of req.files.images) {
                const result = await cloudinary.uploader.upload(file.path);
                images.push(result.secure_url);
            }
            updateData.images = images;
        }

        await Events.findByIdAndUpdate(id, updateData);
        res.json({ message: "Event updated successfully" });
    });
});

exports.deleteEvent = asyncHandler(async (req, res) => {
    await Events.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
});

/* ============================================================
   FACILITIES UPDATE
============================================================ */

exports.updateFacilities = asyncHandler(async (req, res) => {
    uploadImage(req, res, async (err) => {
        if (err) return res.status(400).json({ message: "Multer Error", err });
        const { id } = req.params;
        const { name, description } = req.body;

        const updateData = { name, description };

        if (req.files?.images) {
            let images = [];
            for (const file of req.files.images) {
                const result = await cloudinary.uploader.upload(file.path);
                images.push(result.secure_url);
            }
            updateData.images = images;
        }

        await Facilities.findByIdAndUpdate(id, updateData);
        res.json({ message: "Facility updated successfully" });
    });
});
