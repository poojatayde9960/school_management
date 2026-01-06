import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"
import clsx from 'clsx'
import { toast } from 'react-toastify'
import { useAddEventMutation, useDeleteEventMutation, useFetchEventQuery, useUpdateEventMutation } from '../redux/apis/adminApi'

const EventPannel = () => {
    const [UpdateData, setUpdateData] = useState(null)

    const [updateEvent, { isSuccess: updateIsSuccess }] = useUpdateEventMutation()
    const [addEvent, { isSuccess, error }] = useAddEventMutation()
    const { data, isLoading, isError, refetch } = useFetchEventQuery()
    const [deleteEvent, { isSuccess: deleteIsSuccess }] = useDeleteEventMutation()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: UpdateData ? UpdateData.name : "",
            images: UpdateData ? UpdateData.images : "",
            date: UpdateData ? UpdateData.date : "",
            time: UpdateData ? UpdateData.time : "",
            category: UpdateData ? UpdateData.category : "",
            description: UpdateData ? UpdateData.description : "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Name"),
            date: yup.mixed().required("Enter date"),
            time: yup.mixed().required("Enter time"),
            description: yup.string().required("Enter description"),
            category: yup.string().required("Enter category"),
            images: yup.mixed().when([], {
                is: () => !UpdateData,
                then: schema => schema.required("Enter image"),
                otherwise: schema => schema.notRequired()
            })
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (key === "images") {
                    if (value && value.length > 0) {
                        Array.from(value).forEach((file) => {
                            fd.append(key, file)
                        })
                    }
                } else {
                    fd.append(key, value);
                }
            })

            if (UpdateData) {
                updateEvent({ fd, _id: UpdateData._id })
            } else {
                addEvent(fd)
            }
            resetForm();
        }
    })

    const handleClass = (arg) => clsx(
        "w-full px-4 py-2 mb-4 border rounded text-black", {
        "border-red-500": formik.touched[arg] && formik.errors[arg],
        "border-green-500": formik.touched[arg] && !formik.errors[arg],
    })

    const closeModal = (id) => {
        const modal = document.getElementById(id)
        if (modal) modal.close()
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("Event added successfully")
            closeModal("department_modal")
            formik.resetForm()
            refetch()
        }
    }, [isSuccess])

    useEffect(() => {
        if (deleteIsSuccess) {
            toast.success("Event deleted successfully")
            refetch()
        }
    }, [deleteIsSuccess])

    useEffect(() => {
        if (updateIsSuccess) {
            toast.success("Event updated successfully")
            closeModal("department_update_modal")
            setUpdateData(null)
            formik.resetForm()
            refetch()
        }
    }, [updateIsSuccess])

    return (
        <div className="p-8 bg-slate-50 min-h-full">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold font-serif text-slate-800">Event Management</h2>
                    <p className="text-slate-500 text-sm mt-1">Schedule and manage school events</p>
                </div>
                <button
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all shadow-md font-medium"
                    onClick={() => document.getElementById('department_modal').showModal()}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Add Event
                </button>
            </div>

            <div className="overflow-x-auto rounded-xl">
                <table className="min-w-[900px] w-full table-fixed border-separate border-spacing-y-2">

                    {/* ===== TABLE HEAD ===== */}
                    <thead className="bg-slate-900">
                        <tr className="text-white text-sm">
                            <th className="px-4 py-3 text-left w-[240px] rounded-l-xl">Event</th>
                            <th className="px-4 py-3 text-left w-[120px]">Date</th>
                            <th className="px-4 py-3 text-left w-[100px]">Time</th>
                            <th className="px-4 py-3 text-left w-[160px]">Category</th>
                            <th className="px-4 py-3 text-left w-[300px]">Description</th>
                            <th className="px-4 py-3 text-center w-[160px] rounded-r-xl">Action</th>
                        </tr>
                    </thead>

                    {/* ===== TABLE BODY ===== */}
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-slate-500">
                                    Loading events...
                                </td>
                            </tr>
                        )}

                        {isError && (
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-red-500">
                                    Failed to load events
                                </td>
                            </tr>
                        )}

                        {data && data.map((item) => (
                            <tr
                                key={item._id}
                                className="bg-white shadow-sm hover:shadow-md transition rounded-xl"
                            >

                                {/* EVENT */}
                                <td className="px-4 py-4 flex  gap-4 rounded-l-xl align-top">
                                    <img
                                        src={item.images?.[0] || "https://placehold.co/60x60"}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <p className="font-medium text-slate-800 break-words">
                                        {item.name}
                                    </p>
                                </td>

                                {/* DATE */}
                                <td className="px-4 py-4  text-slate-700 align-top">
                                    {new Date(item.date).toLocaleDateString()}
                                </td>

                                {/* TIME */}
                                <td className="px-4 py-4 text-slate-700 align-top">
                                    {item.time}
                                </td>

                                {/* CATEGORY */}
                                <td className="px-4 py-4 align-top">
                                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm break-words">
                                        {item.category}
                                    </span>
                                </td>

                                {/* DESCRIPTION (TEXT KHALI YENAR) */}
                                <td className="px-4 py-4 text-slate-600 
                                   whitespace-normal break-words 
                                   max-w-[300px] align-top">
                                    {item.description}
                                </td>

                                {/* ACTION */}
                                <td className="px-4 py-4 text-center rounded-r-xl align-top">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => {
                                                document
                                                    .getElementById('department_update_modal')
                                                    .showModal()
                                                setUpdateData(item)
                                            }}
                                            className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => deleteEvent(item._id)}
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


            {/* Add Event Modal */}
            <dialog id="department_modal" className="modal backdrop-blur-sm">
                <div className="modal-box bg-white rounded-xl shadow-2xl max-w-lg w-full p-0 overflow-hidden">
                    <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-white font-serif">Add New Event</h3>
                        <button
                            type="button"
                            onClick={() => closeModal("department_modal")}
                            className="text-slate-400 hover:text-white transition-colors text-2xl"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="p-6">
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Event Name</label>
                                <input className={handleClass("name")} {...formik.getFieldProps("name")} type="text" placeholder="e.g. Annual Sports Day" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                                    <input className={handleClass("date")} {...formik.getFieldProps("date")} type="date" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                                    <input className={handleClass("time")} {...formik.getFieldProps("time")} type="time" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                <input className={handleClass("category")} {...formik.getFieldProps("category")} type="text" placeholder="e.g. Sports, Academic, Cultural" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea className={handleClass("description")} {...formik.getFieldProps("description")} rows={3} placeholder="Event details..."></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Event Image</label>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full"
                                    onChange={e => formik.setFieldValue("images", e.currentTarget.files)}
                                    multiple
                                />
                            </div>
                            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => closeModal("department_modal")}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                                    Save Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* Update Event Modal */}
            <dialog id="department_update_modal" className="modal backdrop-blur-sm">
                <div className="modal-box bg-white rounded-xl shadow-2xl max-w-lg w-full p-0 overflow-hidden">
                    <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-white font-serif">Update Event</h3>
                        <button
                            type="button"
                            onClick={() => closeModal("department_update_modal")}
                            className="text-slate-400 hover:text-white transition-colors text-2xl"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="p-6">
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Event Name</label>
                                <input className={handleClass("name")} {...formik.getFieldProps("name")} type="text" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                                    <input className={handleClass("date")} {...formik.getFieldProps("date")} type="date" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                                    <input className={handleClass("time")} {...formik.getFieldProps("time")} type="time" />
                                </div>
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
                                <label className="block text-sm font-medium text-slate-700 mb-1">Event Image (Optional)</label>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full"
                                    onChange={e => formik.setFieldValue("images", e.currentTarget.files)}
                                    multiple
                                />
                            </div>
                            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => closeModal("department_update_modal")}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                                    Update Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default EventPannel