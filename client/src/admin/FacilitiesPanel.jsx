import React, { useEffect, useState } from 'react'
import { useAddFacilitiesMutation, useDeleteFacilitiesMutation, useFetchFacilitiesQuery, useUpdateFacilitiesMutation } from '../redux/apis/adminApi'
import { useFormik } from 'formik'
import *   as yup from "yup"
import clsx from 'clsx'
import { toast } from 'react-toastify'

const FacilitiesPanel = () => {
    const [updateFacilities, { isSuccess: updateIsSuccess }] = useUpdateFacilitiesMutation()
    const [addFacilities, { isSuccess, error }] = useAddFacilitiesMutation()
    const { data, isLoading, isError } = useFetchFacilitiesQuery()
    const [deleteFacilities, { isSuccess: deleteIsSuccess }] = useDeleteFacilitiesMutation()
    // console.log("data", data);
    const [UpdateData, setUpdateData] = useState()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: UpdateData ? UpdateData.name : "",
            images: UpdateData ? UpdateData.images : "",
            description: UpdateData ? UpdateData.description : "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Name"),
            // images: yup.mixed().required("Enter image"),
            description: yup.string().required("Enter description"),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData();
            console.log(values)
            Object.entries(values).forEach(([key, value]) => {
                if (key === "images") {
                    Array.from(value).forEach((file) => {
                        fd.append(key, file)
                    })
                } else {
                    fd.append(key, values[key]);
                }
            })
            if (UpdateData) {
                updateFacilities({ fd, _id: UpdateData?._id })
            } else {
                addFacilities(fd)
            }
            resetForm();
            setUpdateData(null);
            document.getElementById('facility_modal').close()
            document.getElementById('facility_update_modal').close()
        }
    })
    const handleClass = (arg) => clsx(
        "w-full px-4 py-2 mb-4 border  rounded text-black", {
        "border-red-500": formik.touched[arg] && formik.errors[arg],
        "border-green-500": formik.touched[arg] && !formik.errors[arg],
    })
    useEffect(() => {
        if (isSuccess) {
            toast.success("Facility added successfully")
        }
    }, [isSuccess])
    useEffect(() => {
        if (deleteIsSuccess) {
            // deleteFacilities() // This is likely not needed if the mutation invalidates tags
            toast.success("Facility deleted successfully")
        }
    }, [deleteIsSuccess])
    useEffect(() => {
        if (updateIsSuccess) {
            // updateFacilities()
            toast.success("Facility updated successfully")
        }
    }, [updateIsSuccess])

    return (
        <div className="p-8 bg-slate-50 min-h-full">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold font-serif text-slate-800">Facilities Management</h2>
                    <p className="text-slate-500 text-sm mt-1">Manage school facilities and infrastructure</p>
                </div>
                <button
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all shadow-md font-medium"
                    onClick={() => {
                        setUpdateData(null)
                        formik.resetForm()
                        document.getElementById('facility_modal').showModal()
                    }}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Add Facility
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading && <div className="col-span-full text-center py-10 text-slate-500">Loading facilities...</div>}
                {isError && <div className="col-span-full text-center py-10 text-red-500">Failed to load facilities</div>}
                {data && data.map((item) => (
                    <div key={item._id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all flex flex-col h-full">
                        <div className="h-48 overflow-hidden relative">
                            <img
                                src={item.images && item.images[0] ? item.images[0] : "https://placehold.co/600x400?text=Facility"}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-slate-800 mb-2 font-serif">{item.name}</h3>
                            <p className="text-slate-500 text-sm mb-6 line-clamp-3 flex-1">{item.description}</p>

                            <div className="flex gap-3 pt-4 border-t border-slate-50 mt-auto">
                                <button
                                    onClick={() => {
                                        setUpdateData(item)
                                        document.getElementById('facility_update_modal').showModal()
                                    }}
                                    className="flex-1 px-3 py-2 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={e => deleteFacilities(item._id)}
                                    className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Facility Modal */}
            <dialog id="facility_modal" className="modal backdrop-blur-sm">
                <div className="modal-box bg-white rounded-xl shadow-2xl max-w-lg w-full p-0 overflow-hidden">
                    <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-white font-serif">Add New Facility</h3>
                        <form method="dialog">
                            <button className="text-slate-400 hover:text-white transition-colors">✕</button>
                        </form>
                    </div>

                    <div className="p-6">
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Facility Name</label>
                                <input className={handleClass("name")} {...formik.getFieldProps("name")} type="text" placeholder="e.g. Library" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea className={handleClass("description")} {...formik.getFieldProps("description")} rows={3} placeholder="Brief description of the facility..."></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Facility Image</label>
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
                                    Save Facility
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* Update Facility Modal */}
            <dialog id="facility_update_modal" className="modal backdrop-blur-sm">
                <div className="modal-box bg-white rounded-xl shadow-2xl max-w-lg w-full p-0 overflow-hidden">
                    <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-white font-serif">Update Facility</h3>
                        <form method="dialog">
                            <button className="text-slate-400 hover:text-white transition-colors">✕</button>
                        </form>
                    </div>

                    <div className="p-6">
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Facility Name</label>
                                <input className={handleClass("name")} {...formik.getFieldProps("name")} type="text" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea className={handleClass("description")} {...formik.getFieldProps("description")} rows={3}></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Facility Image</label>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full"
                                    onChange={e => formik.setFieldValue("facilites", e.currentTarget.files)}
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 mt-6">
                                <form method="dialog">
                                    <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                                </form>
                                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                                    Update Facility
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )

}

export default FacilitiesPanel
