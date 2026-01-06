import React, { useState } from 'react';
import { IoMdMenu } from "react-icons/io";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-xl font-bold font-serif shadow-md">
                            S
                        </div>
                        <span className="font-bold text-2xl font-serif tracking-wide text-white">SkillHub <span className="text-blue-400">Academy</span></span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-slate-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wider">Home</Link>

                        <Link to="/departments" className="text-slate-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wider">Departments</Link>
                        <Link to="/events" className="text-slate-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wider">Events</Link>

                        <Link to="/about" className="text-slate-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wider">About</Link>
                        <Link to="/admission" className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-500 transition-all transform hover:-translate-y-0.5 text-sm uppercase tracking-wider">
                            Admission
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white focus:outline-none">
                            <IoMdMenu size={28} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-slate-800 border-t border-slate-700">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">Home</Link>
                        <Link to="/departments" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700">Departments</Link>
                        <Link to="/events" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700">Events</Link>
                        <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700">About</Link>
                        <Link to="/admission" className="block px-3 py-2 rounded-md text-base font-medium text-blue-400 hover:text-blue-300 hover:bg-slate-700">Admission</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
