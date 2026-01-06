// 1. Department Schema Keys
// const departmentSchemaKeys = {
//     name,
//     description,
// adminId
// image
//     head,
//     description,
//     createdAt,
//     updatedAt
// };

// // 2. Function Schema Keys
// const functionSchemaKeys = {
//     name,
//     departmentId,
//     assignedTo,
//     description,
//     status,
//     createdAt,
//     updatedAt
// };

// // 3. User Schema Keys (Admin, Clerk)
// const userSchemaKeys = {
//     name,
//     email,
//     password,
//     role,         // 'admin', 'clerk'
//     phone,
//     departmentId,
//     createdAt,
//     updatedAt
// };

// // 4. Student Admission Form Schema Keys
// const studentAdmissionFormKeys = {
//     firstName,
//     lastName,
//     gender,
//     dateOfBirth,
//     email,
//     phone,
//     address,
//     city,
//     state,
//     pinCode,
//     guardianName,
//     guardianPhone,
//     guardianRelation,
//     admissionDate,
//     classApplied,
//     previousSchool,
//     documentsSubmitted,  // ['birthCertificate', 'aadharCard', 'marksheet']
//     status,              // 'pending', 'approved', 'rejected'
//     createdAt,
//     updatedAt
// };

// const mongoose = require("mongoose")
// const teacherSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     classes: { type: String, required: true },
//     subject: { type: String, required: true },
//     experience: { type: String, required: true },
//     mobile: { type: String, required: true },
//     profile: { type: String, required: true },
//     adminId: { type: String },

// }, { timestamps: true })
// module.exports = mongoose.model("teacher", teacherSchema)

// const mongoose = require("mongoose")
