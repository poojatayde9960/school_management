import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { useAdminLoginMutation } from '../redux/apis/authApi';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [login, { isSuccess, isError, error, isLoading, data }] = useAdminLoginMutation();

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: yup.object({
            email: yup.string().email("Invalid email address").required("Email is required"),
            password: yup.string().required("Password is required")
        }),
        onSubmit: (values, { resetForm }) => {
            login(values);
            // resetForm(); // Don't reset immediately to allow retry if needed, handling via effect
        }
    });

    const getInputClasses = (fieldName) => {
        const hasError = formik.touched[fieldName] && formik.errors[fieldName];
        return clsx(
            "w-full px-5 py-3 border rounded-xl outline-none transition-all duration-300",
            {
                "bg-red-50 border-red-300 focus:border-red-500 text-red-900": hasError,
                "bg-stone-50 border-stone-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 text-stone-800": !hasError
            }
        );
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Welcome back! Login Successful.");
            if (data?.token) localStorage.setItem("adminToken", data.token);
            setTimeout(() => navigate('/adminPanel'), 800);
        }

        if (isError) {
            toast.error(error?.data?.message || "Login failed. Please check your credentials.");
        }
    }, [isSuccess, isError, error, data, navigate]);

    return (
        <div className="min-h-screen flex bg-white font-sans selection:bg-amber-100 selection:text-amber-900">

            {/* Left Panel - Visual */}
            <div className="hidden lg:flex w-5/12 relative overflow-hidden bg-stone-900">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?q=80&w=2070&auto=format&fit=crop"
                        alt="Admin Workspace"
                        className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-900/90 to-amber-900/20"></div>
                </div>

                <div className="relative z-10 p-12 flex flex-col justify-between h-full text-white">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-amber-500 rounded-lg shadow-lg shadow-amber-500/20"></div>
                        <span className="font-serif text-xl tracking-wide">SkillHub Admin</span>
                    </div>

                    <div className="space-y-4 max-w-md">
                        <h1 className="text-4xl lg:text-5xl font-serif font-medium leading-tight">
                            Welcome <br />
                            <span className="text-amber-500 italic">Back.</span>
                        </h1>
                        <p className="text-stone-400 text-lg font-light">
                            Sign in to manage your school ecosystem efficiently and securely.
                        </p>
                    </div>

                    <div className="text-xs text-stone-500">
                        Secure Server Connection • v2.0
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-7/12 flex items-center justify-center p-8 lg:p-12">
                <div className="max-w-md w-full space-y-10">

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-stone-900 mb-2">Sign In</h2>
                        <p className="text-stone-500">Enter your credentials to access the dashboard.</p>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1 ml-1">Email Address</label>
                                <input
                                    className={getInputClasses("email")}
                                    {...formik.getFieldProps("email")}
                                    type="email"
                                    placeholder="admin@school.com"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="mt-1 text-sm text-red-500 ml-1">{formik.errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1 ml-1">Password</label>
                                <input
                                    className={getInputClasses("password")}
                                    {...formik.getFieldProps("password")}
                                    type="password"
                                    placeholder="••••••••"
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <p className="mt-1 text-sm text-red-500 ml-1">{formik.errors.password}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-stone-600 cursor-pointer hover:text-stone-800 transition-colors">
                                <input type="checkbox" className="mr-2 w-4 h-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500" />
                                <span>Remember me</span>
                            </label>
                            <Link to="#" className="text-amber-600 font-medium hover:text-amber-700 hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold tracking-wide hover:bg-stone-800 hover:shadow-xl hover:shadow-stone-900/10 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white group-hover:text-amber-500 transition-colors" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Authenticating...
                                </span>
                            ) : "Access Dashboard"}
                        </button>
                    </form>

                    <p className="text-center text-stone-500">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-amber-600 font-bold hover:underline">
                            Register Admin
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
