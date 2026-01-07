import React, { useEffect } from 'react'
import { FaRegUser } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { FiUpload } from "react-icons/fi";
import { FiFileText } from "react-icons/fi"; // Import for the PDF icon
import { useFormik } from "formik"
import * as yup from "yup"
import { useAddApplicationMutation } from '../redux/apis/applicationApi';
import { toast } from 'react-toastify';
import vidyalaya_school from '../asset/vidyalaya_school.pdf'
import clsx from 'clsx';

const Admission = () => {
    const [addApplication, { isSuccess, isError, error }] = useAddApplicationMutation()

    const formik = useFormik({
        initialValues: {
            name: "",
            classValue: "",
            gender: "",
            dateOfBirth: "",
            bloodGroup: "",
            fatherName: "",
            motherName: "",
            number: "",
            email: "",
            address: ""
        },
        validationSchema: yup.object({
            name: yup.string().required("Student name is required"),
            classValue: yup.string().required("Class selection is required"),
            gender: yup.string().required("Gender is required"),
            dateOfBirth: yup.date().required("DOB is required"),
            fatherName: yup.string().required("Father's name is required"),
            motherName: yup.string().required("Mother's name is required"),
            number: yup
                .string()
                .required("Contact number is required")
                .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

            email: yup.string().email("Invalid email").required("Email is required"),
            address: yup.string().required("Address is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                await addApplication(values)
                resetForm()
            } catch (err) {
                console.error(err)
            }
        }
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Application Submitted Successfully! 🎉")
        }
        if (isError) {
            toast.error(error?.data?.message || "Failed to submit application")
        }
    }, [isSuccess, isError, error])

    const handleClass = (name) => clsx("w-full px-4 py-2.5 rounded-lg border focus:ring-1 outline-none transition-all", {
        "border-red-500 focus:border-red-500 bg-red-50": formik.touched[name] && formik.errors[name],
        "border-slate-300 focus:border-blue-600 focus:ring-blue-600": !formik.touched[name] || !formik.errors[name]
    })

    return (
        <div className="bg-slate-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8 pt-28">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif mb-4">
                        Admission Application
                    </h1>
                    <div className="h-1 w-24 bg-amber-500 mx-auto mb-6"></div>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Join our community of learners. Please complete the form below to apply for admission to Vidyalaya School.
                    </p>
                </div>

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
                    <div className="bg-slate-900 px-8 py-6">
                        <h2 className="text-xl text-white font-serif tracking-wide">Student Registration Form</h2>
                        <p className="text-slate-400 text-sm mt-1">Academic Year 2025-2026</p>
                    </div>

                    <div className="p-8 sm:p-10 space-y-12">
                        <form onSubmit={formik.handleSubmit}>
                            {/* Student Info */}
                            <section className="mb-12">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3 font-serif border-b border-slate-100 pb-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                        <FaRegUser className="h-5 w-5" />
                                    </div>
                                    Student Information
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            {...formik.getFieldProps("name")}
                                            placeholder="Enter student's full name"
                                            className={handleClass("name")}
                                        />
                                        {formik.touched.name && formik.errors.name && <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Class Applying For <span className="text-red-500">*</span></label>
                                        <select
                                            {...formik.getFieldProps("classValue")}
                                            className={handleClass("classValue")}
                                        >
                                            <option value="">Select Class</option>
                                            {[...Array(10)].map((_, i) => (
                                                <option key={i} value={`${i + 1}th`}>{i + 1}{i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'} Class</option>
                                            ))}
                                        </select>
                                        {formik.touched.classValue && formik.errors.classValue && <p className="text-red-500 text-xs mt-1">{formik.errors.classValue}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Gender <span className="text-red-500">*</span></label>
                                        <select
                                            {...formik.getFieldProps("gender")}
                                            className={handleClass("gender")}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {formik.touched.gender && formik.errors.gender && <p className="text-red-500 text-xs mt-1">{formik.errors.gender}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth <span className="text-red-500">*</span></label>
                                        <input
                                            type="date"
                                            {...formik.getFieldProps("dateOfBirth")}
                                            className={handleClass("dateOfBirth")}
                                        />
                                        {formik.touched.dateOfBirth && formik.errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{formik.errors.dateOfBirth}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Blood Group</label>
                                        <select
                                            {...formik.getFieldProps("bloodGroup")}
                                            className={handleClass("bloodGroup")}
                                        >
                                            <option value="">Select Blood Group</option>
                                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                                                <option key={bg} value={bg}>{bg}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </section>

                            {/* Parent Info */}
                            <section className="mb-12">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3 font-serif border-b border-slate-100 pb-4">
                                    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                                        <FaRegUser className="h-5 w-5" />
                                    </div>
                                    Parent / Guardian Details
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Father's Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            {...formik.getFieldProps("fatherName")}
                                            placeholder="Enter father's name"
                                            className={handleClass("fatherName")}
                                        />
                                        {formik.touched.fatherName && formik.errors.fatherName && <p className="text-red-500 text-xs mt-1">{formik.errors.fatherName}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Mother's Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            {...formik.getFieldProps("motherName")}
                                            placeholder="Enter mother's name"
                                            className={handleClass("motherName")}
                                        />
                                        {formik.touched.motherName && formik.errors.motherName && <p className="text-red-500 text-xs mt-1">{formik.errors.motherName}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Number <span className="text-red-500">*</span></label>
                                        <input
                                            type="tel"
                                            {...formik.getFieldProps("number")}
                                            placeholder="Mobile number"
                                            maxLength={10}
                                            className={handleClass("number")}
                                        />

                                        {formik.touched.number && formik.errors.number && <p className="text-red-500 text-xs mt-1">{formik.errors.number}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                                        <input
                                            type="email"
                                            {...formik.getFieldProps("email")}
                                            placeholder="email@example.com"
                                            className={handleClass("email")}
                                        />
                                        {formik.touched.email && formik.errors.email && <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>}
                                    </div>
                                </div>
                            </section>

                            {/* Address Info */}
                            <section className="mb-12">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3 font-serif border-b border-slate-100 pb-4">
                                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                                        <FiMapPin className="h-5 w-5" />
                                    </div>
                                    Residential Address
                                </h3>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Complete Address <span className="text-red-500">*</span></label>
                                    <textarea
                                        {...formik.getFieldProps("address")}
                                        rows="3"
                                        placeholder="Enter full residential address"
                                        className={handleClass("address")}
                                    ></textarea>
                                    {formik.touched.address && formik.errors.address && <p className="text-red-500 text-xs mt-1">{formik.errors.address}</p>}
                                </div>
                            </section>

                            {/* Document Upload */}
                            <section className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-8">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 font-serif">
                                            <FiUpload className="h-5 w-5 text-slate-600" />
                                            Required Documents
                                        </h3>
                                        <ul className="space-y-2 text-sm text-slate-600 marker:text-blue-500 list-disc pl-5">
                                            <li>Birth Certificate (Original & Copy)</li>
                                            <li>Previous School Leaving Certificate</li>
                                            <li>Mark Sheets of Previous Class</li>
                                            <li>Passport Size Photographs (4 copies)</li>
                                            <li>Address Proof (Aadhar/Passport/Utility Bill)</li>
                                        </ul>
                                    </div>

                                    <div className="flex-1 w-full">
                                        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 font-serif">
                                            <FiFileText className="h-5 w-5 text-slate-600" />
                                            Fees Structure
                                        </h3>
                                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                            <p className="text-sm text-slate-600 mb-3">
                                                Download the detailed fee structure for the academic year 2025-2026.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={e => window.open(vidyalaya_school)}
                                                className="flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800 hover:underline transition-colors"
                                            >
                                                <FiFileText className="h-4 w-4" />
                                                Download Fees Structure PDF
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Submit Button */}
                            <div className="pt-6 border-t border-slate-100 flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admission;
