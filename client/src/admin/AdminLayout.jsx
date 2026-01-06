import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { IoMdPersonAdd } from "react-icons/io";
import { HiMenuAlt2, HiX } from "react-icons/hi";
import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { useClarkRegisterMutation } from '../redux/apis/authApi';
import { toast } from 'react-toastify';


const AdminLayout = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [clarkRegister, { isSuccess, error, isError, isLoading }] = useClarkRegisterMutation()

    const adminJSON = localStorage.getItem("admin");
    const admin = adminJSON ? JSON.parse(adminJSON) : {};

    const formik = useFormik({
        initialValues: {
            name: "",
            profile: "",
            email: "",
            mobile: "",
            password: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Name"),
            profile: yup.string().required(),
            email: yup.string().required("Enter email"),
            mobile: yup.string().required("Enter mobile"),
            password: yup.string().required("Enter password"),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData();
            for (const key in values) {
                if (key === 'profile' && !values[key]) continue;
                fd.append(key, values[key])
            }

            clarkRegister(fd); // ✅ FormData भेजें
            resetForm();
        }
    })
    const handleClass = (arg) => clsx(
        "w-full px-4 py-2 mb-4 border rounded-lg outline-none transition-all placeholder:text-slate-400 text-slate-700", {
        "border-red-500 focus:ring-red-200": formik.touched[arg] && formik.errors[arg],
        "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10": !formik.touched[arg] || !formik.errors[arg],
    })
    useEffect(() => {
        if (isSuccess) {
            toast.success("clark add success")
            navigate('/clarkLogin')
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || "Failed to register clerk")
            console.error("Clerk registration error:", error)
        }
    }, [isError, error])

    const closeSidebar = () => setIsSidebarOpen(false)

    const isActive = (path) => {
        if (path === '/adminPanel' && location.pathname === '/adminPanel') return true
        if (path !== '/adminPanel' && location.pathname.includes(path)) return true
        return false
    }

    const NavLink = ({ to, label, icon }) => (
        <Link
            to={to}
            onClick={closeSidebar}
            className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium",
                isActive(to)
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
        >
            <span className={clsx(
                "w-2 h-2 rounded-full transition-colors",
                isActive(to) ? "bg-white" : "bg-slate-600 group-hover:bg-blue-500"
            )}></span>
            {label}
        </Link>
    )

    return (
        <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={clsx(
                "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                <div className="p-6 flex items-center justify-between lg:block">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold font-serif shadow-lg shadow-blue-600/20">
                            S
                        </div>
                        <div>
                            <h1 className="text-xl font-bold font-serif text-white tracking-wide">SkillHub</h1>
                            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Admin Portal</p>
                        </div>
                    </div>
                    <button onClick={closeSidebar} className="lg:hidden text-slate-400 hover:text-white">
                        <HiX size={24} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
                    <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Overview</p>
                    <NavLink to="/adminPanel" label="Dashboard" />

                    <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mt-8 mb-3">Management</p>
                    <NavLink to="/adminPanel/studentPanel" label="Students" />
                    <NavLink to="/adminPanel/teacherPanel" label="Teachers" />
                    <NavLink to="/adminPanel/departmentPanel" label="Departments" />
                    <NavLink to="/adminPanel/eventPannel" label="Events" />
                    <NavLink to="/adminPanel/facilitiesPanel" label="Facilities" />
                    <NavLink to="/adminPanel/applicationPanel" label="Applications" />
                </nav>

                <div className="p-4 border-t border-slate-800 bg-slate-900">
                    <button
                        onClick={() => document.getElementById('clerk_modal').showModal()}
                        className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-xl transition-all border border-slate-700 hover:border-slate-600 group"
                    >
                        <div className="p-1 bg-slate-700 rounded-lg group-hover:bg-slate-600 transition-colors">
                            <IoMdPersonAdd className="text-lg" />
                        </div>
                        <span className="font-medium">New Clerk</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shadow-sm z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 -ml-2 text-slate-500 hover:text-slate-800 lg:hidden rounded-lg hover:bg-slate-50"
                        >
                            <HiMenuAlt2 size={24} />
                        </button>
                        <h2 className="text-xl lg:text-2xl font-bold font-serif text-slate-800">
                            {location.pathname === '/adminPanel' ? 'Dashboard Overview' :
                                location.pathname.includes('student') ? 'Student Directory' :
                                    location.pathname.includes('teacher') ? 'Faculty Staff' :
                                        location.pathname.includes('department') ? 'Departments' :
                                            location.pathname.includes('event') ? 'Events & Activities' :
                                                location.pathname.includes('application') ? 'Admission Applications' :
                                                    'Admin Dashboard'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 pl-6 lg:border-l border-slate-100">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-800">{admin.name || "Administrator"}</p>
                                <p className="text-xs text-slate-500 font-medium">{admin.email || "admin@school.com"}</p>
                            </div>
                            <div className="w-11 h-11 rounded-full bg-slate-100 border-2 border-slate-200 shadow-sm overflow-hidden p-0.5 pointer-events-none select-none">
                                <img
                                    src={admin.profile || `https://ui-avatars.com/api/?name=${admin.name || 'Admin'}&background=2563EB&color=fff`}
                                    alt="Admin"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-slate-50 p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto h-full">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Modal */}
            <dialog id="clerk_modal" className="modal backdrop-blur-sm ">
                <div className="modal-box bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-0">

                    <div className="bg-slate-900 px-6 py-5 flex justify-between items-center sticky top-0 z-10">
                        <div>
                            <h3 className="font-bold text-lg text-white font-serif tracking-wide">New Registration</h3>
                            <p className="text-slate-400 text-xs mt-0.5">Create a new clerk account</p>
                        </div>
                        <form method="dialog">
                            <button className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded-lg">
                                <HiX size={20} />
                            </button>
                        </form>
                    </div>

                    <div className="p-6 pt-6 max-h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar">
                        <form onSubmit={formik.handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                                <input
                                    className={handleClass("name")}
                                    {...formik.getFieldProps("name")}
                                    type="text"
                                    placeholder="e.g. John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                                <input
                                    className={handleClass("email")}
                                    {...formik.getFieldProps("email")}
                                    type="email"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                                <input
                                    className={handleClass("mobile")}
                                    {...formik.getFieldProps("mobile")}
                                    type="text"
                                    placeholder="+1 234 567 890"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                                <input
                                    className={handleClass("password")}
                                    {...formik.getFieldProps("password")}
                                    type="password"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Profile Image</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 border-dashed rounded-xl hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer group">
                                    <div className="space-y-2 text-center">
                                        <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="text-sm text-slate-600">
                                            <label htmlFor="profile" className="relative cursor-pointer rounded-md font-bold text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                                <span>Upload a file</span>
                                                <input id="profile" name="profile" type="file" className="sr-only" onChange={e => formik.setFieldValue("profile", e.currentTarget.files[0])} />
                                            </label>
                                            <p className="pl-1 inline">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-slate-400">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-600/20 active:scale-[0.98]"
                                >
                                    Register Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default AdminLayout
