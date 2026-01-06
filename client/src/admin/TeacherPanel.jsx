import clsx from 'clsx';
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup';
import { useAddTeacherMutation, useDeleteTeacherMutation, useFetchTeacherQuery } from '../redux/apis/adminApi';
import { toast } from 'react-toastify';

const TeacherPanel = () => {
    const [addTeacher, { isSuccess, error, isError, isLoading }] = useAddTeacherMutation()
    const { data, refetch } = useFetchTeacherQuery()
    const [deleteTeacher, { isLoading: isDeleting }] = useDeleteTeacherMutation()
    const [processing, setProcessing] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            profile: "",
            email: "",
            mobile: "",
            password: "",
            classes: "",
            experience: "",
            subject: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Name"),
            profile: yup.string().required(),
            email: yup.string().email("Invalid email").required("Enter email"),
            mobile: yup
                .string()
                .required("Enter phone number")
                .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian mobile number"),

            password: yup.string().required("Enter password"),
            classes: yup.string().required("Enter class"),
            experience: yup.string().required("Enter experience"),
            subject: yup.string().required("Enter subject"),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData();
            for (const key in values) {
                fd.append(key, values[key])
            }
            addTeacher(fd);
            resetForm();
        }
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        await formik.handleSubmit(e);
        setProcessing(false);
    };
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this teacher?")) return;

        try {
            await deleteTeacher(id).unwrap();
            toast.success("Teacher deleted successfully");
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || "Failed to delete teacher");
        }
    };

    const handleClass = (arg) => clsx(
        "w-full px-4 py-2 mb-4 border rounded text-black", {
        "border-red-500": formik.touched[arg] && formik.errors[arg],
        "border-slate-300 focus:border-blue-500 outline-none": !formik.touched[arg] || !formik.errors[arg],
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Teacher added successfully")
            document.getElementById('teacher_modal').close()
            refetch()
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || "Failed to add teacher")
        }
    }, [isError, error])

    return (
        <div className="p-8 bg-slate-50 min-h-full">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold font-serif text-slate-800">Teacher Management</h2>
                    <p className="text-slate-500 text-sm mt-1">Manage faculty members and assignments</p>
                </div>
                <button
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all shadow-md font-medium"
                    onClick={() => document.getElementById('teacher_modal').showModal()}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Add New Teacher
                </button>
            </div>

            <div className="overflow-x-auto rounded-xl">
                <table className="w-full border-separate border-spacing-y-2">
                    <thead className="bg-slate-900">
                        <tr className="text-white text-sm">
                            <th className="text-left px-4 py-3 rounded-l-xl font-serif">Teacher</th>
                            <th className="text-left px-4 py-3 font-serif">Subject</th>
                            <th className="text-left px-4 py-3 font-serif">Class</th>
                            <th className="text-left px-4 py-3 font-serif">Experience</th>
                            <th className="text-center px-4 py-3   rounded-r-xl font-serif">Action</th>
                        </tr>
                    </thead>


                    <tbody>
                        {data && data.map((item) => (
                            <tr
                                key={item._id}
                                className="bg-white shadow-sm hover:shadow-md transition rounded-xl"
                            >
                                {/* Teacher info */}
                                <td className="px-4 py-4 flex items-center gap-4 rounded-l-xl">
                                    <img
                                        src={item.profile || `https://ui-avatars.com/api/?name=${item.name}`}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <div>
                                        <p className="font-medium font-serif text-slate-800">{item.name}</p>
                                        <p className="text-sm font-serif text-slate-400">{item.email}</p>
                                    </div>
                                </td>

                                {/* Subject */}
                                <td className="px-4 py-4 font-serif">
                                    <span className="bg-blue-50 font-serif text-blue-600 px-3 py-1 rounded-full text-sm">
                                        {item.subject}
                                    </span>
                                </td>

                                {/* Class */}
                                <td className="px-4 py-4 font-serif text-slate-700">{item.classes}</td>

                                {/* Experience */}
                                <td className="px-4 py-4 font-serif text-slate-700">{item.experience}</td>

                                {/* Action */}
                                <td className="px-4 py-4 text-center rounded-r-xl">
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        disabled={isDeleting}
                                        className="px-4 py-1.5 border border-red-200 rounded-lg text-sm text-red-600
            hover:bg-red-50 disabled:opacity-50 transition-colors"
                                    >
                                        {isDeleting ? "Deleting..." : "Delete"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* Add Teacher Modal */}
            <dialog id="teacher_modal" className="modal backdrop-blur-sm">
                <div className="modal-box  bg-white rounded-xl shadow-2xl mt-3 max-w-3xl w-full p-0 overflow-y-auto max-h-[95vh]">

                    <div className="bg-slate-900 px-4 py-3 flex justify-between items-center rounded-t-xl">
                        <h3 className="font-bold text-lg text-white font-serif">Add New Teacher</h3>
                        <form method="dialog">
                            <button className="text-slate-400 hover:text-white transition-colors">✕</button>
                        </form>
                    </div>

                    <div className="p-4">
                        <form onSubmit={formik.handleSubmit} className="space-y-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input className={handleClass("name")} {...formik.getFieldProps("name")} type="text" placeholder="Full Name" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input className={handleClass("email")} {...formik.getFieldProps("email")} type="email" placeholder="Email Address" />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        {...formik.getFieldProps("password")}
                                        className={clsx(
                                            "w-full px-4 py-2 border rounded-lg outline-none transition-all",
                                            {
                                                "border-red-500 bg-red-50": formik.touched.password && formik.errors.password,
                                                "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100": !formik.touched.password || !formik.errors.password,
                                            }
                                        )}
                                    />
                                    {formik.touched.password && formik.errors.password && (
                                        <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Phone <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="9876543210"
                                        maxLength={10}
                                        {...formik.getFieldProps("mobile")}
                                        className={clsx(
                                            "w-full px-4 py-2 border rounded-lg outline-none transition-all",
                                            {
                                                "border-red-500 bg-red-50": formik.touched.mobile && formik.errors.mobile,
                                                "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100": !formik.touched.mobile || !formik.errors.mobile,
                                            }
                                        )}
                                    />
                                    {formik.touched.mobile && formik.errors.mobile && (
                                        <p className="text-red-500 text-xs mt-1">{formik.errors.mobile}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Class</label>
                                    <input className={handleClass("classes")} {...formik.getFieldProps("classes")} type="text" placeholder="Class" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                                    <input className={handleClass("subject")} {...formik.getFieldProps("subject")} type="text" placeholder="Subject" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Experience</label>
                                <input className={handleClass("experience")} {...formik.getFieldProps("experience")} type="text" placeholder="Experience (e.g. 5 years)" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Profile Image</label>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered border-gray-300 bg-white w-full"
                                    onChange={e => {
                                        formik.setFieldValue("profile", e.currentTarget.files[0]);
                                    }}
                                />
                                {formik.values.profile && (
                                    <p className="text-green-600 text-sm mt-1">
                                        {formik.values.profile.name} selected
                                    </p>
                                )}
                            </div>


                            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2 mt-4">
                                <form method="dialog">
                                    <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                                </form>
                                <button type="button"
                                    onClick={handleSubmit}
                                    className="px-5 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                                    disabled={processing || isLoading}
                                >
                                    {processing || isLoading ? "Processing..." : "Add Teacher"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    )

}

export default TeacherPanel
