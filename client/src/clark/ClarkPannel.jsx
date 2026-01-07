import React, { useState, useEffect } from 'react'
import { IoSearch } from "react-icons/io5";
import { FaUserGraduate, FaChalkboardTeacher, FaChartPie, FaSignOutAlt } from "react-icons/fa";
import ClarkStudentPanel from './ClarkStudentPanel';
import ClassOverview from './ClassOverview';
import { useClarkLogoutMutation } from '../redux/apis/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const ClarkPannel = () => {
    const [activeTab, setActiveTab] = useState("classOverview");
    const [selectedClassFilter, setSelectedClassFilter] = useState("all");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Logout Logic
    const [clarkLogout, { isSuccess: logoutSuccess }] = useClarkLogoutMutation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await clarkLogout();
        } catch (error) {
            console.error("Logout failed", error);
        }
    }

    useEffect(() => {
        if (logoutSuccess) {
            toast.success("Logged out successfully");
            navigate("/clarkLogin");
        }
    }, [logoutSuccess, navigate]);

    const handleNavigateToClass = (className) => {
        setSelectedClassFilter(className);
        setActiveTab("students");
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-30 w-72 bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 font-serif">Clark Panel</h1>
                        <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">School Management</p>
                    </div>
                    {/* Close button for mobile */}
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden text-slate-400 hover:text-red-500 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <button
                        onClick={() => { setActiveTab("classOverview"); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-4 px-6 py-3.5 rounded-xl transition-all duration-200 group ${activeTab === "classOverview"
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                            : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                            }`}
                    >
                        <FaChartPie className={`text-xl ${activeTab === "classOverview" ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`} />
                        <span className="font-medium">Class Overview</span>
                    </button>

                    <button
                        onClick={() => { setActiveTab("students"); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-4 px-6 py-3.5 rounded-xl transition-all duration-200 group ${activeTab === "students"
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                            : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                            }`}
                    >
                        <FaUserGraduate className={`text-xl ${activeTab === "students" ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`} />
                        <span className="font-medium">Student Management</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-6 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                    >
                        <FaSignOutAlt className="text-lg" />
                        <span>Logout</span>
                    </button>
                    <div className="mt-4 px-2 text-center text-xs text-slate-400">
                        &copy; 2024 SkillHub
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50 relative">
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 px-4 sm:px-8 py-4 flex justify-between items-center border-b border-slate-200/60 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                        <h2 className="text-xl font-bold text-slate-800 font-serif line-clamp-1">
                            {activeTab === "classOverview" ? "Dashboard Overview" : "Students"}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold text-slate-800">Administrator</div>
                            <div className="text-xs text-slate-500">clark@school.com</div>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm">
                            C
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 w-full max-w-7xl mx-auto">
                    {activeTab === "classOverview" && <ClassOverview onNavigate={handleNavigateToClass} />}
                    {activeTab === "students" && <ClarkStudentPanel initialClassFilter={selectedClassFilter} />}
                </main>
            </div>
        </div>
    );
}

export default ClarkPannel
