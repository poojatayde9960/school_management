import React from 'react';
import { FiBookOpen } from "react-icons/fi";
import { useFetchStudentQuery } from '../redux/apis/adminApi';

const ClassOverview = ({ onNavigate }) => {
    const { data: students } = useFetchStudentQuery();

    // Define class list
    const classes = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];

    // Generic normalization helper
    const normalizeClass = (cls) => {
        if (!cls) return "";
        cls = cls.toString().toLowerCase().trim();
        const mapping = {
            "1": "1st", "2": "2nd", "3": "3rd",
            "4": "4th", "5": "5th", "6": "6th",
            "7": "7th", "8": "8th", "9": "9th",
            "10": "10th", "11": "11th", "12": "12th"
        };
        return mapping[cls] || cls;
    }

    // Count students per class
    const studentCounts = classes.map(cls => ({
        className: cls,
        total: students ? students.filter(s => normalizeClass(s.classApplied) === normalizeClass(cls)).length : 0
    }));

    // Recent Admissions (Top 5)
    const recentStudents = students
        ? [...students]
            .sort((a, b) => {
                if (a.createdAt && b.createdAt) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }
                return b._id.localeCompare(a._id);
            })
            .slice(0, 5)
        : [];

    return (
        <div className='bg-gray-50 py-8 space-y-8'>
            {/* Class Cards */}
            <div className='flex flex-wrap justify-center gap-4'>
                {studentCounts.map((cls, index) => (
                    <div key={index} className="card shadow border w-full sm:w-[300px] lg:w-[340px] bg-white p-6 text-center mx-2 sm:mx-0">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <FiBookOpen className="h-8 w-8 text-white" />
                        </div>
                        <div className="card-body items-center p-0 text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Class {cls.className}</h3>
                            <p className="text-3xl font-bold text-blue-600 mb-2">{cls.total}</p>
                            <p className="text-sm text-gray-600">Total Students</p>
                            <button
                                className="btn btn-sm btn-primary mt-4 w-full"
                                onClick={() => onNavigate(cls.className)}
                            >
                                View Students
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Admissions Section */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow border border-slate-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h3 className="text-lg font-bold text-slate-800">Recent Admissions</h3>
                        <span className="text-xs font-medium text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                            Last 5 Students
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                                <tr>
                                    <th className="pl-6">Student Name</th>
                                    <th>Class</th>
                                    <th>Admission Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recentStudents.length > 0 ? (
                                    recentStudents.map((student) => (
                                        <tr key={student._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="pl-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                                                        {student.firstName?.[0]}{student.lastName?.[0]}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-800 text-sm">{student.firstName} {student.lastName}</div>
                                                        <div className="text-xs text-slate-500">{student.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-sm font-medium text-slate-600">{student.classApplied}</td>
                                            <td className="text-sm text-slate-500">{student.admissionDate || "N/A"}</td>
                                            <td>
                                                <span className={`badge badge-xs text-xs px-2 py-2 ${student.status === 'Active' ? 'badge-success text-white' : 'badge-warning text-white'}`}>
                                                    {student.status || 'Active'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-6 text-slate-400 italic text-sm">
                                            No recent admissions found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassOverview;
