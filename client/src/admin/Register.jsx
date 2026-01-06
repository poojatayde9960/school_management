import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { useAdminRegisterMutation } from '../redux/apis/authApi';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    const [registerAdmin, { isLoading }] = useAdminRegisterMutation();
    const [profileImage, setProfileImage] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Name"),
            email: yup.string().email().required("Enter Email"),
            mobile: yup.string().required("Enter Mobile"),
            password: yup.string().required("Enter Password"),
            confirmPassword: yup.string().required("Confirm Your Password"),
        }),
        onSubmit: async (values, { resetForm }) => {

            if (!profileImage) {
                toast.error("Please upload profile image!");
                return;
            }

            const fd = new FormData();
            fd.append("name", values.name);
            fd.append("email", values.email);
            fd.append("mobile", values.mobile);
            fd.append("password", values.password);
            fd.append("profile", profileImage);

            try {
                const res = await registerAdmin(fd).unwrap();
                toast.success("Admin Registered Successfully 🎉");
                resetForm();
                setProfileImage(null);
                setTimeout(() => navigate("/login"), 1000);

            } catch (err) {
                const msg = err?.data?.message || "Registration Failed!";
                toast.error(msg);
            }
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

    return (
        <div className="min-h-screen flex bg-white font-sans selection:bg-amber-100 selection:text-amber-900">

            {/* Left Panel - Visual */}
            <div className="hidden lg:flex w-5/12 relative overflow-hidden bg-stone-900">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
                        alt="Admin Workspace"
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-stone-900 via-stone-900/80 to-stone-800/40"></div>
                </div>

                <div className="relative z-10 p-12 flex flex-col justify-between h-full text-white">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-amber-500 rounded-lg"></div>
                        <span className="font-serif text-xl tracking-wide">SkillHub  Admin</span>
                    </div>

                    <div className="space-y-6 max-w-md">
                        <h1 className="text-5xl font-serif font-medium leading-tight">
                            Join the <br />
                            <span className="text-amber-500 italic">Leadership.</span>
                        </h1>
                        <p className="text-stone-300 text-lg font-light leading-relaxed">
                            "Management is doing things right; leadership is doing the right things."
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-stone-400">
                        <span>© 2024 Vidyalaya Inc.</span>
                        <div className="h-1 w-1 bg-stone-600 rounded-full"></div>
                        <span>Privacy Policy</span>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-7/12 flex items-center justify-center p-8 lg:p-12 overflow-y-auto">
                <div className="max-w-md w-full space-y-10">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-stone-900 mb-2">Create Account</h2>
                        <p className="text-stone-500">Enter your details to register as an administrator.</p>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        <div className="space-y-5">
                            <div>
                                <input
                                    className={getInputClasses("name")}
                                    {...formik.getFieldProps("name")}
                                    type="text"
                                    placeholder="Full Name"
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <p className="mt-1 text-sm text-red-500 ml-1">{formik.errors.name}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    className={getInputClasses("email")}
                                    {...formik.getFieldProps("email")}
                                    type="email"
                                    placeholder="Email Address"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="mt-1 text-sm text-red-500 ml-1">{formik.errors.email}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    className={getInputClasses("mobile")}
                                    {...formik.getFieldProps("mobile")}
                                    type="text"
                                    placeholder="Mobile Number"
                                />
                                {formik.touched.mobile && formik.errors.mobile && (
                                    <p className="mt-1 text-sm text-red-500 ml-1">{formik.errors.mobile}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <input
                                        className={getInputClasses("password")}
                                        {...formik.getFieldProps("password")}
                                        type="password"
                                        placeholder="Password"
                                    />
                                    {formik.touched.password && formik.errors.password && (
                                        <p className="mt-1 text-sm text-red-500 ml-1">{formik.errors.password}</p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        className={getInputClasses("confirmPassword")}
                                        {...formik.getFieldProps("confirmPassword")}
                                        type="password"
                                        placeholder="Confirm"
                                    />
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                        <p className="mt-1 text-sm text-red-500 ml-1">{formik.errors.confirmPassword}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-2 border-dashed border-stone-200 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProfileImage(e.target.files[0])}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center justify-center text-center">
                                <span className="text-2xl mb-2">📸</span>
                                <span className="text-sm font-medium text-stone-600">
                                    {profileImage ? profileImage.name : "Upload Profile Photo"}
                                </span>
                                {!profileImage && <span className="text-xs text-stone-400 mt-1">Click to browse files</span>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold tracking-wide hover:bg-stone-800 hover:shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Creating Account...
                                </span>
                            ) : "Register Administrator"}
                        </button>
                    </form>

                    <p className="text-center text-stone-500">
                        Already have an account?{" "}
                        <button onClick={() => navigate("/login")} className="text-amber-600 font-bold hover:underline">
                            Login here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
