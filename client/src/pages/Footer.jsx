import React from 'react'
import { LuGraduationCap } from "react-icons/lu";
import { FiMapPin } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";



const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <LuGraduationCap className="h-8 w-8 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white font-serif tracking-wide">Skillhub</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Empowering the next generation of leaders through excellence in education, character building, and holistic development.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            {/* Social Icons Placeholder */}
                            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                                <a key={social} href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                                    <span className="sr-only">{social}</span>
                                    <div className="w-4 h-4 bg-current rounded-sm opacity-50"></div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-serif font-bold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="/about" className="hover:text-amber-500 transition-colors flex items-center gap-2"><span className="text-blue-500">›</span> About Us</a></li>
                            <li><a href="/admission" className="hover:text-amber-500 transition-colors flex items-center gap-2"><span className="text-blue-500">›</span> Admissions</a></li>
                            <li><a href="/events" className="hover:text-amber-500 transition-colors flex items-center gap-2"><span className="text-blue-500">›</span> Events</a></li>
                            <li><a href="/contact" className="hover:text-amber-500 transition-colors flex items-center gap-2"><span className="text-blue-500">›</span> Contact</a></li>
                        </ul>
                    </div>

                    {/* Departments */}
                    <div>
                        <h3 className="text-white font-serif font-bold text-lg mb-6">Departments</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="/departments" className="hover:text-amber-500 transition-colors flex items-center gap-2"><span className="text-blue-500">›</span> Science & Tech</a></li>
                            <li><a href="/departments" className="hover:text-amber-500 transition-colors flex items-center gap-2"><span className="text-blue-500">›</span> Arts & Humanities</a></li>
                            <li><a href="/departments" className="hover:text-amber-500 transition-colors flex items-center gap-2"><span className="text-blue-500">›</span> Sports Academy</a></li>
                            <li><a href="/departments" className="hover:text-amber-500 transition-colors flex items-center gap-2"><span className="text-blue-500">›</span> Music & Culture</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-serif font-bold text-lg mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start space-x-3">
                                <FiMapPin className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span>123 Education Lane, Knowledge City, State - 400001</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FiPhone className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                <span>+91 123 456 7890</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <HiOutlineMail className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                <span>info@skillhub.edu</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800 bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© 2025 Skillhub International School. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
