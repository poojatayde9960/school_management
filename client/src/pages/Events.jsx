import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useFetchEventQuery } from '../redux/apis/adminApi';
// import { useAddDepartmentMutation, useFetchDepartmentQuery } from '../redux/apis/adminApi';



// Event data for scalable rendering
// Event data for scalable rendering

const Events = () => {
    const { data } = useFetchEventQuery()
    return <>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}


        <div className="bg-slate-50 min-h-screen w-full pb-20 pt-24">
            {/* Header Section */}
            <div className="text-center mb-16 px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif mb-4">School Events</h1>
                <div className="h-1 w-24 bg-amber-500 mx-auto mb-6"></div>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Participate in our vibrant school life through a variety of events designed to celebrate talent, sportsmanship, and creativity.
                </p>
            </div>

            {/* Events Grid */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data?.map((event) => {
                        const eventDate = new Date(event.date)

                        return (
                            <div
                                key={event._id}
                                className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={event.images?.[0]}
                                        alt={event.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-90"></div>

                                    {/* Date Badge */}
                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm text-center min-w-[60px]">
                                        <span className="block text-lg font-bold text-slate-900 leading-none">
                                            {eventDate.getDate()}
                                        </span>
                                        <span className="block text-xs font-bold text-blue-600 uppercase tracking-wide">
                                            {eventDate.toLocaleString("en-US", { month: "short" })}
                                        </span>
                                    </div>

                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h2 className="text-xl font-bold text-white font-serif tracking-wide mb-1">
                                            {event.name}
                                        </h2>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-1">
                                        {event.description}
                                    </p>

                                    <div className="border-t border-slate-100 pt-4 mt-auto">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                <FaRegUser className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                                                    Category
                                                </p>
                                                <p className="text-sm font-medium text-slate-800">
                                                    {event.category}
                                                </p>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/eventsDetails/${event._id}`}
                                            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                        >
                                            <span>Event Details</span>
                                            <FaArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    </>
}

export default Events

