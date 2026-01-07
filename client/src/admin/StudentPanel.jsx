import { useFormik } from 'formik'
import * as yup from "yup"
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useAddStudentMutation, useFetchStudentQuery, useUpdateStudentMutation } from '../redux/apis/adminApi'
import { toast } from 'react-toastify'

const StudentPanel = () => {

    const { data, refetch } = useFetchStudentQuery()
    const [updateStudent, { isSuccess: isUpdateSuccess, isLoading: isUpdateLoading, isError: isUpdateError, error: updateError }] = useUpdateStudentMutation()
    const [addStudent, { isSuccess: isAddSuccess, isError: isAddError, error: addError, isLoading: isAddLoading }] = useAddStudentMutation()

    const [selectedStudent, setSelectedStudent] = useState(null)
    const isProcessing = isAddLoading || isUpdateLoading;

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: selectedStudent?.firstName || "",
            lastName: selectedStudent?.lastName || "",
            gender: selectedStudent?.gender || "",
            dateOfBirth: selectedStudent?.dateOfBirth || "",
            email: selectedStudent?.email || "",
            mobile: selectedStudent?.mobile || "",
            password: "",
            address: selectedStudent?.address || "",
            city: selectedStudent?.city || "",
            state: selectedStudent?.state || "",
            pinCode: selectedStudent?.pinCode || "",
            admissionDate: selectedStudent?.admissionDate || "",
            classApplied: selectedStudent?.classApplied || "",
            documentsSubmitted: selectedStudent?.documentsSubmitted || "Pending",
            status: selectedStudent?.status || "Active",
            profile: "",
        },
        validationSchema: yup.object({
            firstName: yup.string().required("First Name is required"),
            lastName: yup.string().required("Last Name is required"),
            email: yup.string().email("Invalid email").required("Email is required"),
            mobile: yup.string().required("Mobile is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            const fd = new FormData();
            // Object.entries(values).forEach(([key, value]) => {
            //     if (key === "profile" && value instanceof File) {
            //         fd.append(key, value);
            //     } else if (key !== "profile") {
            //         fd.append(key, value);
            //     }
            // });
            Object.entries(values).forEach(([key, value]) => {
                if (key === "profile") {
                    if (value instanceof File) {
                        fd.append("profile", value);
                    }
                } else {
                    fd.append(key, value);
                }
            });

            try {
                if (selectedStudent) {
                    await updateStudent({ fd, _id: selectedStudent._id }).unwrap();
                } else {
                    await addStudent(fd).unwrap();
                }
                resetForm();
                document.getElementById('student_modal').close();
                setSelectedStudent(null);
            } catch (err) {
                console.error("Operation failed", err);
            }
        }
    })

    const handleClass = (fieldName) => clsx(
        "w-full px-4 py-2 border rounded-lg outline-none transition-all", {
        "border-red-500 focus:border-red-500 bg-red-50": formik.touched[fieldName] && formik.errors[fieldName],
        "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100": !formik.touched[fieldName] || !formik.errors[fieldName],
    })

    // Handle Toasts
    useEffect(() => {
        if (isAddSuccess) {
            toast.success("Student added successfully! 🎉");
            refetch();
        }
        if (isAddError) {
            toast.error(addError?.data?.message || "Failed to add student.");
        }
    }, [isAddSuccess, isAddError, addError, refetch]);

    useEffect(() => {
        if (isUpdateSuccess) {
            toast.success("Student updated successfully! ✏️");
            refetch();
        }
        if (isUpdateError) {
            toast.error(updateError?.data?.message || "Failed to update student.");
        }
    }, [isUpdateSuccess, isUpdateError, updateError, refetch]);

    const openAddModal = () => {
        setSelectedStudent(null);
        formik.resetForm();
        document.getElementById('student_modal').showModal();
    }

    const openUpdateModal = (student) => {
        setSelectedStudent(student);
        document.getElementById('student_modal').showModal();
    }

    return (
        <div className="p-8 bg-slate-50 min-h-full">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold font-serif text-slate-800">Student Management</h2>
                    <p className="text-slate-500 text-sm mt-1">Manage student records and admissions</p>
                </div>
                <button
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all shadow-md font-medium"
                    onClick={openAddModal}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Add New Student
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-slate-50 text-slate-600 font-serif text-sm uppercase tracking-wide">
                            <tr>
                                <th className="py-4 pl-6">#</th>
                                <th className="py-4">Student</th>
                                <th className="py-4">Class</th>
                                <th className="py-4">Gender</th>
                                <th className="py-4">Contact</th>
                                <th className="py-4">Status</th>
                                <th className="py-4 pr-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data && data.map((item, index) => (
                                <tr key={item._id} className="hover:bg-slate-50 transition-colors group">
                                    <th className="pl-6 text-slate-400 font-normal">{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-10 h-10 bg-slate-100">
                                                    <img
                                                        src={item.profile || `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random`}
                                                        alt={item.firstName}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800">{item.firstName} {item.lastName}</div>
                                                <div className="text-xs text-slate-500">{item.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-medium text-slate-700">{item.classApplied || "N/A"}</div>
                                        <div className="text-xs text-slate-400">Admitted: {item.admissionDate || "N/A"}</div>
                                    </td>
                                    <td className="text-slate-600">{item.gender}</td>
                                    <td className="text-slate-600">{item.mobile}</td>
                                    <td>
                                        <div className={`badge ${item.status === 'Active' ? 'badge-success text-white' : 'badge-warning text-white'} gap-2`}>
                                            {item.status}
                                        </div>
                                    </td>
                                    <td className="pr-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => openUpdateModal(item)}
                                                className="btn btn-ghost btn-xs text-blue-600 hover:bg-blue-50 tooltip tooltip-left"
                                                data-tip="Edit Student"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                            </button>
                                            <button
                                                className="btn btn-ghost btn-xs text-red-600 hover:bg-red-50 tooltip tooltip-left"
                                                data-tip="Delete Student"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {!data?.length && (
                    <div className="text-center py-12 text-slate-400">
                        <div className="mb-3">
                            <svg className="w-12 h-12 mx-auto text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        </div>
                        <p>No students found. Add one to get started.</p>
                    </div>
                )}
            </div>

            {/* Combined Add/Update Student Modal */}
            <dialog id="student_modal" className="modal backdrop-blur-sm">
                <div className="modal-box bg-white rounded-xl shadow-2xl max-w-4xl w-full p-0 overflow-hidden">
                    <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-white font-serif">
                            {selectedStudent ? "Update Student Details" : "Add New Student"}
                        </h3>
                        <form method="dialog">
                            <button className="text-slate-400 hover:text-white transition-colors text-xl">✕</button>
                        </form>
                    </div>

                    <div className="p-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Personal Info */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name <span className="text-red-500">*</span></label>
                                    <input className={handleClass("firstName")} {...formik.getFieldProps("firstName")} type="text" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name <span className="text-red-500">*</span></label>
                                    <input className={handleClass("lastName")} {...formik.getFieldProps("lastName")} type="text" placeholder="Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email <span className="text-red-500">*</span></label>
                                    <input className={handleClass("email")} {...formik.getFieldProps("email")} type="email" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Phone <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="9876543210"
                                        maxLength={10}
                                        className={handleClass("mobile")}
                                        {...formik.getFieldProps("mobile")}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                        }}
                                    />

                                    {formik.touched.mobile && formik.errors.mobile && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {formik.errors.mobile}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                                    <select className={handleClass("gender")} {...formik.getFieldProps("gender")}>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                                    <input className={handleClass("dateOfBirth")} {...formik.getFieldProps("dateOfBirth")} type="date" />
                                </div>

                                {/* Address & Location */}
                                <div className="md:col-span-2 lg:col-span-3">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Address</label>
                                    <input className={handleClass("address")} {...formik.getFieldProps("address")} type="text" placeholder="123 Main St, Apt 4B" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                                    <input className={handleClass("city")} {...formik.getFieldProps("city")} type="text" placeholder="New York" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                                    <input className={handleClass("state")} {...formik.getFieldProps("state")} type="text" placeholder="NY" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Pin Code</label>
                                    <input className={handleClass("pinCode")} {...formik.getFieldProps("pinCode")} type="text" placeholder="10001" />
                                </div>

                                {/* Academic Info */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Class Applied</label>
                                    <input className={handleClass("classApplied")} {...formik.getFieldProps("classApplied")} type="text" placeholder="10th" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Admission Date</label>
                                    <input className={handleClass("admissionDate")} {...formik.getFieldProps("admissionDate")} type="date" />
                                </div>
                                <div>
                                    <label className="block text-sm  font-medium text-slate-700 mb-1">
                                        Status <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className={handleClass("status")}
                                        {...formik.getFieldProps("status")}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>


                                {/* Security & Files */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Password {selectedStudent ? "(Leave blank to keep same)" : ""}</label>
                                    <input className={handleClass("password")} {...formik.getFieldProps("password")} type="password" placeholder="••••••••" />
                                </div>
                                <div className="md:col-span-2 lg:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Profile Image
                                    </label>

                                    <label className="cursor-pointer block">
                                        <div
                                            className="px-4 py-1 -mt-1 border-2 border-dashed border-slate-300 rounded-lg text-center
            hover:border-blue-500 hover:bg-blue-50 transition-all"
                                        >
                                            <p className="text-xs font-medium text-slate-700">
                                                {formik.values.profile
                                                    ? "Image selected successfully"
                                                    : "Click to upload"}
                                            </p>

                                            <p className="text-xs text-slate-400">
                                                {formik.values.profile
                                                    ? formik.values.profile.name
                                                    : "PNG, JPG up to 5MB"}
                                            </p>
                                        </div>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) =>
                                                formik.setFieldValue("profile", e.currentTarget.files[0])
                                            }
                                        />
                                    </label>
                                </div>


                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 font-medium
               flex items-center justify-center gap-2
               disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isProcessing && (
                                    <span className="loading loading-spinner loading-sm"></span>
                                )}

                                {isProcessing
                                    ? "Processing"
                                    : selectedStudent
                                        ? "Update Details"
                                        : "Add Student"}
                            </button>

                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default StudentPanel
