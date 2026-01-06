import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetchEventQuery } from '../redux/apis/adminApi'

const EventDetails = () => {
    const { id } = useParams()
    const { data, isLoading } = useFetchEventQuery()

    if (isLoading) {
        return <p className="text-center mt-20 text-lg">Loading event...</p>
    }

    const event = data?.find(item => item._id === id)

    if (!event) {
        return <p className="text-center mt-20 text-lg">Event not found</p>
    }

    return (
        <div className="bg-slate-50 min-h-screen pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-4">

                {/* 🔹 Hero Image */}
                <div className="rounded-2xl overflow-hidden shadow-lg mb-10">
                    <img
                        src={event.images?.[0]}
                        alt={event.name}
                        className="w-full h-[420px] object-cover"
                    />
                </div>

                {/* 🔹 Title & Meta */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        {event.name}
                    </h1>

                    <div className="flex flex-wrap gap-4 text-sm">
                        <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
                            {event.category}
                        </span>
                        <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                            {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold">
                            {event.time}
                        </span>
                    </div>
                </div>

                {/* 🔹 Description */}
                <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
                    <h2 className="text-xl font-semibold mb-3">About the Event</h2>
                    <p className="text-slate-700 leading-relaxed text-base">
                        {event.description}
                    </p>
                </div>

                {/* 🔹 Image Gallery */}
                {event.images?.length > 1 && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">
                            Event Gallery
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {event.images.map((img, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                                >
                                    <img
                                        src={img}
                                        alt={`event-${index}`}
                                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default EventDetails
