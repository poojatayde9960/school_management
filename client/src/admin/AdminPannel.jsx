import React from 'react';
import { CiUser } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useFetchStudentQuery, useFetchTeacherQuery, useFetchDepartmentQuery, useFetchEventQuery } from '../redux/apis/adminApi';

const AdminPannel = () => {
    const { data: students, isLoading: isStudentsLoading } = useFetchStudentQuery();
    const { data: teachers, isLoading: isTeachersLoading } = useFetchTeacherQuery();
    const { data: departments, isLoading: isDepartmentsLoading } = useFetchDepartmentQuery();
    const { data: events, isLoading: isEventsLoading } = useFetchEventQuery();

    const stats = [
        {
            title: 'Total Students',
            value: students?.length || 0,
            icon: <CiUser className="text-blue-600 text-2xl" />,
            color: 'bg-blue-50',
            loading: isStudentsLoading
        },
        {
            title: 'Total Teachers',
            value: teachers?.length || 0,
            icon: <CiUser className="text-purple-600 text-2xl" />,
            color: 'bg-purple-50',
            loading: isTeachersLoading
        },
        {
            title: 'Departments',
            value: departments?.length || 0,
            icon: <CiUser className="text-green-600 text-2xl" />,
            color: 'bg-green-50',
            loading: isDepartmentsLoading
        },
        {
            title: 'Events',
            value: events?.length || 0,
            icon: <CiUser className="text-amber-600 text-2xl" />,
            color: 'bg-amber-50',
            loading: isEventsLoading
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold font-serif text-slate-800">Dashboard Overview</h2>
                <div className="text-sm text-slate-500">
                    Live Data
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">{stat.title}</p>
                                <p className="text-3xl font-bold text-slate-800 mt-2">
                                    {stat.loading ? "..." : stat.value}
                                </p>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Admissions (Students) */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-800 font-serif">Recent Admissions</h3>
                        <Link to="studentPanel" className="text-blue-600 text-sm font-medium hover:underline">View All</Link>
                    </div>
                    <div className="p-0">
                        <table className="table w-full">
                            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                                <tr>
                                    <th className="pl-6 py-3">Student Name</th>
                                    <th>Class</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {isStudentsLoading ? (
                                    <tr><td colSpan="3" className="text-center py-4 text-slate-500">Loading...</td></tr>
                                ) : students && students.length > 0 ? (
                                    [...students]
                                        .sort((a, b) => {
                                            if (a.createdAt && b.createdAt) return new Date(b.createdAt) - new Date(a.createdAt);
                                            return b._id.localeCompare(a._id);
                                        })
                                        .slice(0, 5)
                                        .map((student) => (
                                            <tr key={student._id} className="hover:bg-slate-50 transition-colors">
                                                <td className="pl-6 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                                            {student.firstName?.[0]}{student.lastName?.[0]}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-slate-800 text-sm">{student.firstName} {student.lastName}</div>
                                                            <div className="text-xs text-slate-500">{student.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-sm text-slate-600">{student.classApplied}</td>
                                                <td className="text-sm text-slate-500">{student.admissionDate || "N/A"}</td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-6 text-slate-400 italic text-sm">
                                            No recent admissions found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Department Overview */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-800 font-serif">Department Overview</h3>
                        <Link to="departmentPanel" className="text-blue-600 text-sm font-medium hover:underline">View All</Link>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {isDepartmentsLoading ? (
                                <p className="text-slate-500 text-sm">Loading departments...</p>
                            ) : departments?.slice(0, 5).map((dept, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-purple-50 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold">
                                            {dept.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-800 group-hover:text-purple-700 transition-colors">{dept.name}</p>
                                            {/* Assuming department object structure, waiting for actual data to be sure */}
                                        </div>
                                    </div>
                                    <button className="p-2 text-slate-400 hover:text-purple-600 transition-colors">
                                        <CiUser className="text-xl" />
                                    </button>
                                </div>
                            ))}
                            {!isDepartmentsLoading && departments?.length === 0 && (
                                <p className="text-slate-500 text-sm text-center">No departments created.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPannel;
