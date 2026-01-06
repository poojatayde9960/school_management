import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { GiMusicalNotes, GiOpenBook, GiSoccerField, GiRank3, GiTeacher } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useFetchDepartmentQuery } from '../redux/apis/adminApi';

const Departments = () => {
    const { data, isLoading, isError, error } = useFetchDepartmentQuery();

    return (
        <div className="bg-slate-50 min-h-screen w-full pb-20 pt-24">
            {/* Header Section */}
            <div className="text-center mb-16 px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif mb-4">Academic Departments</h1>
                <div className="h-1 w-24 bg-amber-500 mx-auto mb-6"></div>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Discover our specialized faculties dedicated to fostering academic excellence, creativity, and holistic development in every student.
                </p>
            </div>

            {/* Departments Grid */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {isLoading && <div className="text-center text-slate-500 py-10">Loading departments...</div>}
                {isError && (
                    <div className="text-center text-red-500 py-10">
                        Failed to load departments. <br />
                        <span className="text-sm text-slate-400">{JSON.stringify(error)}</span>
                    </div>
                )}

                {!isLoading && !isError && (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {data && data.map((dep) => (
                            <div
                                key={dep._id}
                                className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={dep.images && dep.images[0] ? dep.images[0] : "https://placehold.co/600x400?text=Department"}
                                        alt={dep.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80"></div>
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm text-slate-800">
                                        <GiTeacher className="text-3xl text-blue-600 drop-shadow" />
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h2 className="text-xl font-bold text-white font-serif tracking-wide">{dep.name}</h2>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-1 line-clamp-3">{dep.description}</p>

                                    <div className="border-t border-slate-100 pt-4 mt-auto">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                <FaRegUser className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Head of Dept.</p>
                                                <p className="text-sm font-medium text-slate-800">{dep.head}</p>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/exploreDepartment/${dep._id}`}
                                            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-slate-50 text-blue-700 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 group-hover:shadow-md"
                                        >
                                            <span>Explore Department</span>
                                            <FaArrowRight className="h-4 w-4" />
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Departments
