import React, { useEffect } from 'react';
import { useFormik } from 'formik'
import * as yup from 'yup'
import clsx from 'clsx'
import { useClarkLoginMutation } from '../redux/apis/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useAdminRegisterMutation } from '../redux/apis/authApi';

const ClarkLogin = () => {
    const navigate = useNavigate()
    const [loginClark, { isSuccess, isError, error, isLoading }] = useClarkLoginMutation()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",

        },
        validationSchema: yup.object({
            email: yup.string().email("Invalid email format").required("Enter email"),

            password: yup.string().required("Enter password"),

        }),
        onSubmit: (values, { resetForm }) => {
            loginClark(values)
            resetForm()
        }
    })

    const handleClass = (arg) => clsx(
        "w-full px-4 py-2 mb-4 border  rounded text-black", {
        "border-red-500": formik.touched[arg] && formik.errors[arg],
        "border-green-500": formik.touched[arg] && !formik.errors[arg],
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("login success")
            navigate('/clarkPannel')
        }
    })

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

                {/* Left Side - Image/Branding */}
                <div className="md:w-1/2 bg-slate-900 p-12 flex flex-col justify-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-emerald-600 opacity-10 pattern-grid-lg"></div>
                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold font-serif mb-4">Staff Portal</h1>
                        <p className="text-slate-300 text-lg mb-8">
                            Welcome to the Clerk & Staff management system. Please log in to access your dashboard.
                        </p>
                        <div className="flex items-center gap-3 text-sm text-slate-400">
                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                            <span>Authorized Access Only</span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="md:w-1/2 p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 font-serif">Staff Login</h2>
                        <p className="text-slate-500 mt-2">Enter your credentials to continue</p>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                            <input
                                className={clsx(
                                    "w-full px-4 py-3 rounded-lg border bg-slate-50 outline-none transition-all focus:ring-2",
                                    {
                                        "border-red-300 focus:border-red-500 focus:ring-red-200": formik.touched.email && formik.errors.email,
                                        "border-slate-200 focus:border-emerald-600 focus:ring-emerald-100": !(formik.touched.email && formik.errors.email)
                                    }
                                )}
                                {...formik.getFieldProps("email")}
                                type="email"
                                placeholder="staff@skillhub.edu"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                            <input
                                className={clsx(
                                    "w-full px-4 py-3 rounded-lg border bg-slate-50 outline-none transition-all focus:ring-2",
                                    {
                                        "border-red-300 focus:border-red-500 focus:ring-red-200": formik.touched.password && formik.errors.password,
                                        "border-slate-200 focus:border-emerald-600 focus:ring-emerald-100": !(formik.touched.password && formik.errors.password)
                                    }
                                )}
                                {...formik.getFieldProps("password")}
                                type="password"
                                placeholder="••••••••"
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verifying...
                                </span>
                            ) : "Login to Portal"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ClarkLogin;
