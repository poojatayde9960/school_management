import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="bg-slate-50 min-h-screen pb-20 pt-24">

            {/* Header Section */}
            <div className="text-center mb-16 px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif mb-4">Contact Us</h1>
                <div className="h-1 w-24 bg-amber-500 mx-auto mb-6"></div>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    We'd love to hear from you. Whether you have a question about admissions, academics, or anything else, our team is ready to answer all your questions.
                </p>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 font-serif mb-6">Send us a Message</h2>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                                <select
                                    id="subject"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-white"
                                >
                                    <option>General Inquiry</option>
                                    <option>Admissions</option>
                                    <option>Academics</option>
                                    <option>Careers</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
                                    placeholder="How can we help you?"
                                    required
                                />
                            </div>

                            <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">

                        {/* Info Cards */}
                        <div className="grid gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                                    <FaMapMarkerAlt className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-lg mb-1">Visit Us</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Vidyalaya International School,<br />
                                        123 Education Lane, Knowledge City,<br />
                                        State, Country - 400001
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                                    <FaPhoneAlt className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-lg mb-1">Call Us</h3>
                                    <p className="text-slate-600 mb-1">Main Office: +91 123 456 7890</p>
                                    <p className="text-slate-600">Admissions: +91 987 654 3210</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                                    <FaEnvelope className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-lg mb-1">Email Us</h3>
                                    <p className="text-slate-600 mb-1">info@vidyalayaschool.com</p>
                                    <p className="text-slate-600">admissions@vidyalayaschool.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-slate-200 rounded-xl overflow-hidden h-64 shadow-inner relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d73.91411937501422!3d18.562253982539413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1716136194563!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="School Location"
                            ></iframe>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
