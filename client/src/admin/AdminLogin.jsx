import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { useAdminLoginMutation } from '../redux/apis/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [login, { isSuccess, isError, error, isLoading, data }] = useAdminLoginMutation();

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: yup.object({
            email: yup.string().email("Valid email required").required("Enter email"),
            password: yup.string().required("Enter password")
        }),
        onSubmit: (values, { resetForm }) => {
            login(values);
            resetForm();
        }
    });

    // Input border handling
    const handleClass = (field) =>
        clsx("w-full px-4 py-2 mb-4 border rounded text-black", {
            "border-red-500": formik.touched[field] && formik.errors[field],
            "border-green-500": formik.touched[field] && !formik.errors[field],
        });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Login Successful 🎉");

            // Token save (जर backend token देत असेल)
            if (data?.token) localStorage.setItem("adminToken", data.token);

            // 0.5 सेकंदाने admin panel वर redirect
            setTimeout(() => navigate('/adminPanel'), 500);
        }

        if (isError) {
            toast.error(error?.data?.message || "Login failed!");
        }
    }, [isSuccess, isError, error, data, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">

                {/* Left side */}
                <div className="md:w-1/2 bg-slate-900 p-12 text-white relative">
                    <h1 className="text-4xl font-bold mb-4">Skillhub Admin</h1>
                    <p className="text-slate-300">Secure dashboard. Manage students, teachers, departments.</p>
                </div>

                {/* Right side */}
                <div className="md:w-1/2 p-8 md:p-12">
                    <h2 className="text-2xl font-bold mb-4 text-slate-800">Welcome Back</h2>
                    <p className="text-slate-500 mb-6">Sign in to continue</p>

                    <form onSubmit={formik.handleSubmit}>

                        <input
                            {...formik.getFieldProps("email")}
                            type="email"
                            placeholder="Email"
                            className={handleClass("email")}
                        />

                        <input
                            {...formik.getFieldProps("password")}
                            type="password"
                            placeholder="Password"
                            className={handleClass("password")}
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-70"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
