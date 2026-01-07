import React, { useEffect, useState } from 'react'
import { useAddDepartmentMutation, useDeleteDepartmentMutation, useFetchDepartmentQuery, useUpdateDepartmentMutation } from '../redux/apis/adminApi'
import { useFormik } from 'formik'
import *   as yup from "yup"
import clsx from 'clsx'
import { toast } from 'react-toastify'

const DepartmentPanel = () => {
    // const [selectedUser, setselectedUser] = useState({})
    const [updateDepartment, { isSuccess: updateIsSuccess }] = useUpdateDepartmentMutation()
    const [addDepartment, { isSuccess, error }] = useAddDepartmentMutation()
    const { data, isLoading, isError, refetch } = useFetchDepartmentQuery()
    const [deleteDepartment, { isSuccess: deleteIsSuccess }] = useDeleteDepartmentMutation()
    console.log("data", data);
    const [UpdateData, setUpdateData] = useState()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: UpdateData ? UpdateData.name : "",
            images: UpdateData ? UpdateData.images : "",
            head: UpdateData ? UpdateData.head : "",
            category: UpdateData ? UpdateData.category : "",
            description: UpdateData ? UpdateData.description : "",
            // _id: UpdateData ? UpdateData._id : "",

        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Name"),
            head: yup.string().required("Enter head"),
            description: yup.string().required("Enter description"),
            category: yup.string().required("Enter category"),
            images: yup.mixed().when([], {
                is: () => !UpdateData?._id,   // ADD mode
                then: schema => schema.required("Enter image"),
                otherwise: schema => schema.notRequired()
            })
        }),

        onSubmit: (values, { resetForm }) => {
            const fd = new FormData();

            Object.entries(values).forEach(([key, value]) => {
                if (key === "images" && value) {
                    if (value instanceof FileList) {
                        Array.from(value).forEach(file => fd.append("images", file));
                    } else {
                        fd.append("images", value);
                    }
                } else {
                    fd.append(key, value);
                }
            });

            if (UpdateData?._id) {
                updateDepartment({ _id: UpdateData._id, fd });
            } else {
                addDepartment(fd);
            }

            resetForm();
        }


    })
    const handleClass = (arg) => clsx(
        "w-full px-4 py-2 mb-4 border  rounded text-black", {
        "border-red-500": formik.touched[arg] && formik.errors[arg],
        "border-green-500": formik.touched[arg] && !formik.errors[arg],
    })
    useEffect(() => {
        if (isSuccess) {
            toast.success("department add success")
            formik.resetForm();                // ⭐ HERE
            setUpdateData(undefined);
            document.getElementById('department_modal').close()
            refetch()
        }
    }, [isSuccess])
    useEffect(() => {
        if (deleteIsSuccess) {
            deleteDepartment()
            toast.success("department delete success")
            refetch()
        }
    }, [deleteIsSuccess])
    useEffect(() => {
        if (updateIsSuccess) {
            toast.success("department update success")
            document.getElementById('department_update_modal').close()
            refetch()
        }
    }, [updateIsSuccess])
    // console.log(formik.values, "DDR");

    return (
        <div className="p-8 bg-slate-50 min-h-full">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold font-serif text-slate-800">Department Management</h2>
                    <p className="text-slate-500 text-sm mt-1">Oversee academic and administrative departments</p>
                </div>
                <button
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all shadow-md font-medium"
                    onClick={() => {
                        setUpdateData(undefined);   // ⭐
                        formik.resetForm();         // ⭐
                        document.getElementById('department_modal').showModal();
                    }}

                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Add Department
                </button>
            </div>

            <div className="overflow-x-auto  rounded-xl   ">
                <table className="w-full border-separate border-spacing-y-2">
                    <thead className="bg-slate-900">
                        <tr className="text-white text-sm">
                            <th className="px-4 py-3 text-left rounded-l-xl">Department</th>
                            <th className="px-4 py-3 text-left">Head</th>
                            <th className="px-4 py-3 text-left">Category</th>
                            <th className="px-4 py-3 text-left">Description</th>
                            <th className="px-4 py-3 text-center rounded-r-xl">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan="5" className="text-center py-8 text-slate-500">
                                    Loading departments...
                                </td>
                            </tr>
                        )}

                        {isError && (
                            <tr>
                                <td colSpan="5" className="text-center py-8 text-red-500">
                                    Failed to load departments
                                </td>
                            </tr>
                        )}

                        {data && data.map((item) => (
                            <tr
                                key={item._id}
                                className="bg-white shadow-sm hover:shadow-md transition rounded-xl"
                            >
                                {/* Department */}
                                <td className="px-4 py-4 flex items-center gap-4 rounded-l-xl">
                                    <img
                                        src={item.images?.[0] || "https://placehold.co/60x60"}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <div className="flex flex-col justify-center">
                                        <p className="font-medium text-slate-800">{item.name}</p>
                                    </div>
                                </td>

                                {/* Head */}
                                <td className="px-4 py-4 text-slate-700 text-center align-middle">
                                    {item.head}
                                </td>

                                {/* Category */}
                                <td className="px-4 py-4 text-center align-middle">
                                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                                        {item.category}
                                    </span>
                                </td>

                                {/* Description */}
                                <td className="px-4 py-4 text-slate-600 break-words whitespace-normal align-middle">
                                    {item.description}
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-4 text-center align-middle rounded-r-xl">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => {
                                                document.getElementById('department_update_modal').showModal()
                                                setUpdateData(item)
                                            }}
                                            className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteDepartment(item._id)}
                                            className="px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* Add Department Modal */}
            <dialog id="department_modal" className="modal backdrop-blur-sm">
                <div className="modal-box bg-white rounded-xl shadow-2xl max-w-2xl  w-full p-0 overflow-hidden">
                    <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-white font-serif">Add New Department</h3>
                        <form method="dialog">
                            <button className="text-slate-400 hover:text-white transition-colors">✕</button>
                        </form>
                    </div>

                    <div className="p-6">
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Department Name</label>
                                <input className={handleClass("name")} {...formik.getFieldProps("name")} type="text" placeholder="e.g. Science Department" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Head of Department</label>
                                <input className={handleClass("head")} {...formik.getFieldProps("head")} type="text" placeholder="e.g. Dr. Smith" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                <input className={handleClass("category")} {...formik.getFieldProps("category")} type="text" placeholder="e.g. Academic" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea className={handleClass("description")} {...formik.getFieldProps("description")} rows={3} placeholder="Brief description of the department..."></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Department Image</label>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full"
                                    onChange={e => formik.setFieldValue("images", e.currentTarget.files)}
                                    multiple
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 mt-6">
                                <form method="dialog">
                                    <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                                </form>
                                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                                    Save Department
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* Update Department Modal */}
            <dialog id="department_update_modal" className="modal backdrop-blur-sm">
                <div className="modal-box bg-white rounded-xl shadow-2xl max-w-2xl w-full p-0 overflow-hidden">
                    <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-white font-serif">Update Department</h3>
                        <form method="dialog">
                            <button className="text-slate-400 hover:text-white transition-colors">✕</button>
                        </form>
                    </div>

                    <div className="p-6">
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            {/* Reusing fields for update */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Department Name</label>
                                <input className={handleClass("name")} {...formik.getFieldProps("name")} type="text" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Head of Department</label>
                                <input className={handleClass("head")} {...formik.getFieldProps("head")} type="text" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                <input className={handleClass("category")} {...formik.getFieldProps("category")} type="text" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea className={handleClass("description")} {...formik.getFieldProps("description")} rows={3}></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Department Image</label>
                                <input
                                    type="file"
                                    multiple
                                    className="file-input file-input-bordered w-full"
                                    onChange={e => formik.setFieldValue("images", e.currentTarget.files)}
                                />

                            </div>

                            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 mt-6">
                                <form method="dialog">
                                    <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                                </form>
                                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                                    Update Department
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )

}

export default DepartmentPanel
