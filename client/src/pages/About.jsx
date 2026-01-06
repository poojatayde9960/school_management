import React, { useState } from 'react';
import { useFetchFacilitiesQuery, useFetchTeacherQuery } from '../redux/apis/adminApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import schoollife from "../../public/schoollife.jpg";

const About = () => {
    const { data: facilitiesData, isLoading: isFacilitiesLoading } = useFetchFacilitiesQuery();
    const { data: teachersData, isLoading: isTeachersLoading } = useFetchTeacherQuery();

    return (
        <div className="bg-stone-50 min-h-screen font-sans selection:bg-orange-200 selection:text-orange-900 pb-20">

            {/* Header / Hero Section - Asymmetric & Bold */}
            <header className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50/50 -skew-x-12 transform translate-x-32 -z-10"></div>
                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 relative z-10">
                        <div className="inline-block px-4 py-1.5 mb-6 border border-stone-800 rounded-full text-xs font-bold uppercase tracking-widest text-stone-800">
                            Since 1998
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-stone-900 leading-[0.9] tracking-tighter mb-8 font-serif">
                            Beyond <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Academics.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-stone-600 max-w-lg leading-relaxed font-light">
                            We don't just teach. We cultivate curiosity, character, and the courage to change the world.
                        </p>
                    </div>
                    <div className="lg:col-span-5 relative">
                        <div className="relative z-10  overflow-hidden aspect-square border-8 border-white shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                            <img
                                src={schoollife}
                                alt="School Life"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-stone-900 rounded-full mix-blend-multiply opacity-10 blur-xl animate-pulse"></div>
                    </div>
                </div>
            </header>

            {/* Principal Section - Premium Re-design */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
                <div className="relative bg-gradient-to-br from-blue-900 via-slate-900 to-black rounded-[2.5rem] p-10 md:p-14 text-white overflow-hidden shadow-2xl border border-white/10">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3"></div>

                    <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">

                        {/* Image Section */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-start">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-b from-white/10 to-transparent border border-white/20 backdrop-blur-sm">
                                    <img
                                        src="https://i.pinimg.com/736x/64/f7/74/64f774755ab1cd969f274850d0b69b3d.jpg"
                                        alt="Dr. Pooja Tayde"
                                        className="w-full h-full object-cover rounded-full shadow-inner grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                                    />
                                </div>
                                {/* Decorative Badge */}
                                <div className="absolute bottom-4 right-4 bg-amber-500 text-stone-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border-2 border-slate-900">
                                    PRINCIPAL
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="lg:col-span-7 text-center lg:text-left">
                            <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-8">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">
                                    "Education is the kindling of a flame,
                                </span>
                                <span className="block text-slate-400 mt-2 text-2xl md:text-3xl font-light italic">
                                    not the filling of a vessel."
                                </span>
                            </h2>

                            <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                <p>
                                    At <strong className="text-white font-medium">SkillHub Academy</strong>, we believe every child carries a unique universe within them. Our role is simple yet profound: to provide the telescope.
                                </p>
                                <p>
                                    As we navigate a rapidly evolving world, our commitment remains rooted in timeless values—integrity, empathy, and resilience. We are not just building a school; we are building a sanctuary for the mind.
                                </p>
                            </div>

                            <div className="mt-10 pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center gap-6 justify-center lg:justify-start">
                                <div>
                                    <h4 className="text-2xl font-bold font-serif tracking-wide text-white">Dr. Pooja Tayde</h4>
                                    <p className="text-sm text-slate-400 mt-1 uppercase tracking-widest">Principal, SkillHub Academy</p>
                                </div>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" alt="Signature" className="h-10 opacity-50 invert" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The "Bento" Grid - Stats & Vision */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">

                    {/* Large Stat Box */}
                    <div className="md:col-span-2 lg:col-span-2 row-span-2 bg-orange-100 rounded-3xl p-10 flex flex-col justify-between group hover:bg-orange-200 transition-colors cursor-default">
                        <div className="flex justify-between items-start">
                            <span className="p-3 bg-white rounded-full text-2xl">🏆</span>
                            <span className="text-sm font-bold uppercase tracking-wider text-orange-800">Key Milestone</span>
                        </div>
                        <div>
                            <h3 className="text-6xl md:text-8xl font-black text-stone-900 mb-2 group-hover:scale-105 transition-transform origin-left">#1</h3>
                            <p className="text-xl text-stone-700">Ranked Top School in the Region for Holistic Development used by 500+ families.</p>
                        </div>
                    </div>

                    {/* Standard Vision Cards */}
                    {[
                        { title: "Creativity", icon: "🎨", color: "bg-blue-100", text: "text-blue-900" },
                        { title: "Innovation", icon: "🚀", color: "bg-purple-100", text: "text-purple-900" },
                        { title: "Integrity", icon: "⚖️", color: "bg-green-100", text: "text-green-900" },
                        { title: "Community", icon: "🤝", color: "bg-yellow-100", text: "text-yellow-900" }
                    ].map((item, idx) => (
                        <div key={idx} className={`${item.color} rounded-3xl p-6 flex flex-col justify-center items-center text-center gap-4 transition-transform hover:-translate-y-1`}>
                            <span className="text-4xl">{item.icon}</span>
                            <span className={`font-bold text-lg ${item.text}`}>{item.title}</span>
                        </div>
                    ))}

                    {/* Long Text Block */}
                    <div className="md:col-span-2 lg:col-span-2 bg-stone-900 rounded-3xl p-10 flex flex-col justify-center text-white">
                        <h3 className="text-2xl font-serif mb-4">Our Vision</h3>
                        <p className="text-stone-400 font-light leading-relaxed">
                            To create a dynamic educational ecosystem where learning is not confined to classrooms, but is a continuous journey of discovery, innovation, and self-realization for every student.
                        </p>
                    </div>

                    {/* Another Stat */}
                    <div className="bg-stone-200 rounded-3xl p-6 flex flex-col justify-center items-center text-center">
                        <span className="text-4xl font-black text-stone-800">100%</span>
                        <span className="text-sm text-stone-600 mt-2">University Placement</span>
                    </div>
                    <div className="bg-stone-800 rounded-3xl p-6 flex flex-col justify-center items-center text-center text-white">
                        <span className="text-4xl font-black text-orange-400">24:1</span>
                        <span className="text-sm text-stone-400 mt-2">Student-Teacher Ratio</span>
                    </div>

                </div>
            </section>

            {/* Dynamic Content Columns */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20">

                    {/* Facilities - Vertical List Style */}
                    <div>
                        <h2 className="text-4xl font-black text-stone-900 mb-10 flex items-end gap-3 font-serif">
                            Campus <span className="text-lg font-sans font-normal text-stone-500 mb-2">(Facilities)</span>
                        </h2>
                        <div className="space-y-6">
                            {facilitiesData?.slice(0, 4).map((facility, i) => (
                                <div key={i} className="group border-b border-stone-200 pb-6 cursor-pointer">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-2xl font-bold text-stone-800 group-hover:text-orange-600 transition-colors">0{i + 1}. {facility.name}</h3>
                                        <span className="text-stone-300 group-hover:text-orange-600 transition-colors text-2xl">↗</span>
                                    </div>
                                    <div className="h-0 overflow-hidden group-hover:h-48 transition-all duration-500 ease-in-out">
                                        <img
                                            src={facility.images?.[0] || 'https://via.placeholder.com/600x400'}
                                            alt={facility.name}
                                            className="w-full h-48 object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    </div>
                                </div>
                            )) || <p>Loading facilities...</p>}
                        </div>
                    </div>

                    {/* Teachers - Stacked Card / Spotlight */}
                    <div className="relative">
                        <h2 className="text-4xl font-black text-stone-900 mb-10 text-right font-serif">
                            Mentors <span className="text-lg font-sans font-normal text-stone-500 mb-2">(Our Team)</span>
                        </h2>

                        <div className="relative h-[600px] w-full flex items-center justify-center bg-stone-100 rounded-[3rem] overflow-hidden">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #78716c 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                            <Swiper
                                modules={[Autoplay, EffectCreative]}
                                grabCursor={true}
                                effect={'creative'}
                                creativeEffect={{
                                    prev: {
                                        shadow: true,
                                        translate: [0, 0, -400],
                                    },
                                    next: {
                                        translate: ['100%', 0, 0],
                                    },
                                }}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                className="w-[80%] h-[80%]"
                            >
                                {teachersData?.map((teacher, idx) => (
                                    <SwiperSlide key={idx} className="bg-white rounded-3xl p-2 shadow-2xl">
                                        <div className="h-full w-full relative rounded-2xl overflow-hidden group">
                                            <img
                                                src={teacher.heroImage || "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611765.jpg"}
                                                alt={teacher.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                                                <h3 className="text-white text-2xl font-bold">{teacher.name}</h3>
                                                <p className="text-orange-400 font-mono">{teacher.designation}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default About;
