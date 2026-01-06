import React from 'react';
import { MdOutlineCastForEducation, MdComputer, MdScience, MdMeetingRoom, MdLibraryBooks } from "react-icons/md";
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { useFetchDepartmentQuery, useFetchEventQuery, useFetchFacilitiesQuery } from '../redux/apis/adminApi';

const Home = () => {
    const { data: facilitiesData, isLoading: facilitiesLoading } = useFetchFacilitiesQuery();
    const { data: eventsData, isLoading: eventsLoading } = useFetchEventQuery();
    const { data: departmentsData, isLoading: departmentsLoading } = useFetchDepartmentQuery();

    return (
        <div className="font-sans text-slate-800">
            {/* Hero Section */}
            <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900">
                    <img
                        className="w-full h-full object-cover opacity-30"
                        src="https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg"
                        alt="School Building"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold font-serif text-white mb-6 tracking-tight animate-fade-down">
                        Welcome to <span className="text-blue-400">SkillHub Academy</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-200 mb-10 font-light max-w-3xl mx-auto leading-relaxed">
                        Empowering minds, shaping futures. A place where excellence meets opportunity.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/admission"
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold text-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-900/30"
                        >
                            Apply for Admission
                        </Link>
                        <Link
                            to="/about"
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm rounded-full font-semibold text-lg transition-all"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>

            {/* Principal's Message */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-3"></div>
                                <img
                                    src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    alt="Principal"
                                    className="relative rounded-2xl shadow-xl w-full object-cover h-80"
                                />
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            <h2 className="text-3xl font-bold font-serif text-slate-900 mb-6">Message from the Principal</h2>
                            <blockquote className="text-xl text-slate-600 italic mb-6 border-l-4 border-blue-500 pl-6">
                                "Education is not just about acquiring knowledge, but about developing the character and skills to navigate the world with confidence and compassion. At SkillHub, we nurture every student's potential."
                            </blockquote>
                            <div>
                                <p className="font-bold text-slate-900 text-lg">Dr. Sarah Johnson</p>
                                <p className="text-slate-500">Principal, SkillHub Academy</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Departments Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 mb-4">Our Departments</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Explore our diverse academic and administrative departments.</p>
                    </div>

                    {departmentsLoading ? (
                        <div className="text-center text-slate-500">Loading departments...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {departmentsData && departmentsData.slice(0, 3).map((dept) => (
                                <div key={dept._id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={dept.images && dept.images[0] ? dept.images[0] : "https://placehold.co/600x400?text=Department"}
                                            alt={dept.name}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-slate-800 mb-2 font-serif">{dept.name}</h3>
                                        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{dept.description}</p>
                                        <Link to="/departments" className="text-blue-600 font-medium hover:text-blue-700 text-sm uppercase tracking-wide">
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="mt-10 text-center">
                        <Link to="/departments" className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                            View All Departments
                        </Link>
                    </div>
                </div>
            </section>

            {/* Facilities Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 mb-4">World-Class Facilities</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Providing the best environment for holistic development and learning.</p>
                    </div>

                    {facilitiesLoading ? (
                        <div className="text-center text-slate-500">Loading facilities...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {facilitiesData && facilitiesData.map((facility) => (
                                <div key={facility._id} className="group bg-slate-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
                                    <div className="mb-6 h-40 overflow-hidden rounded-lg">
                                        <img
                                            src={facility.images && facility.images[0] ? facility.images[0] : "https://placehold.co/600x400?text=Facility"}
                                            alt={facility.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{facility.name}</h3>
                                    <p className="text-slate-600 leading-relaxed line-clamp-3">{facility.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Recent Events */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 mb-4">Campus Life</h2>
                            <p className="text-lg text-slate-600">Recent happenings and upcoming events.</p>
                        </div>
                        <Link to="/events" className="hidden md:inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                            View All Events <span className="ml-2">→</span>
                        </Link>
                    </div>

                    {eventsLoading ? (
                        <div className="text-center text-slate-500">Loading events...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {eventsData && eventsData.slice(0, 3).map((event) => (
                                <div key={event._id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-shadow duration-300">
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={event.images && event.images[0] ? event.images[0] : "https://placehold.co/600x400?text=Event"}
                                            alt={event.name}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-800 shadow-sm">
                                            {new Date(event.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h4 className="text-xl font-bold text-slate-900 mb-3 line-clamp-1">{event.name}</h4>
                                        <p className="text-slate-600 mb-6 line-clamp-2">{event.description}</p>
                                        <Link to="/events" className="text-sm font-semibold text-blue-600 uppercase tracking-wider hover:underline">Read More</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-8 text-center md:hidden">
                        <Link to="/events" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                            View All Events <span className="ml-2">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-6">Ready to Join Our Community?</h2>
                    <p className="text-xl text-blue-100 mb-10">Admissions are open for the upcoming academic year. Secure your spot today.</p>
                    <Link
                        to="/admission"
                        className="inline-block px-10 py-4 bg-white text-blue-900 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-xl"
                    >
                        Apply Now
                    </Link>
                </div>
            </section>

            <Footer />

            <style>{`
                @keyframes fade-down {
                    0% { opacity: 0; transform: translateY(-20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-down { animation: fade-down 1s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default Home;
