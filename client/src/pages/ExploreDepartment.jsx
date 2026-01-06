import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetchDepartmentQuery } from '../redux/apis/adminApi'

const ExploreDepartment = () => {
    const { id } = useParams()
    const { data, isLoading } = useFetchDepartmentQuery()

    if (isLoading) {
        return <p className="text-center mt-20">Loading...</p>
    }

    const department = data?.find(dep => dep._id === id)

    if (!department) {
        return <p className="text-center mt-20">Department not found</p>
    }

    return (
        <div className="bg-slate-50 min-h-screen pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-4">

                {/* Hero Image */}
                <div className="rounded-2xl overflow-hidden shadow-lg mb-10">
                    <img
                        src={department.images?.[0]}
                        alt={department.name}
                        className="w-full h-[420px] object-cover"
                    />
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    {department.name}
                </h1>

                {/* Head */}
                <p className="text-lg text-slate-600 mb-6">
                    <b>Head of Department:</b> {department.head}
                </p>

                {/* Description */}
                <div className="bg-white rounded-xl p-8 shadow-sm mb-10">
                    <h2 className="text-xl font-semibold mb-3">
                        About Department
                    </h2>
                    <p className="text-slate-700 leading-relaxed">
                        {department.description}
                    </p>
                </div>

                {/* Gallery */}
                {department.images?.length > 1 && (
                    <>
                        <h2 className="text-2xl font-semibold mb-6">
                            Department Gallery
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {department.images.map((img, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl overflow-hidden shadow-md"
                                >
                                    <img
                                        src={img}
                                        alt={`department-${index}`}
                                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ExploreDepartment
