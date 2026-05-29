"use client";

import React from "react";
import {
  IconTarget,
  IconEye,
  IconShieldLock,
  IconHeartHandshake,
  IconUsers,
  IconAward,
  IconSparkles,
} from "@tabler/icons-react";

export default function AboutUs() {
  const values = [
    {
      title: "Trust & Safety First",
      description: "We enforce absolute transparency and rigorous background screening to guarantee peace of mind for every homeowner.",
      icon: <IconShieldLock className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Worker Livelihood Focus",
      description: "We believe in empowering skilled local technicians, ensuring fair wages, digital tools, and stable income paths.",
      icon: <IconHeartHandshake className="h-6 w-6 text-teal-600" />,
    },
    {
      title: "Quality Excellence",
      description: "Our admin vette and verify applicant certifications, ensuring only skilled professionals perform repairs.",
      icon: <IconAward className="h-6 w-6 text-amber-500" />,
    },
    {
      title: "Community Driven",
      description: "Bridging the gap between active Filipino households and exceptional local experts to build safer communities.",
      icon: <IconUsers className="h-6 w-6 text-indigo-600" />,
    },
  ];

  return (
    <div className="w-full bg-[#F5F5F5] min-h-screen pb-20">
      
      {/* 1. ABOUT HERO BANNER */}
      <section className="bg-gradient-to-r from-[#001851] to-[#18388c] text-white py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/20 text-[#60a5fa] text-xs font-semibold uppercase tracking-widest">
            <IconSparkles className="h-3.5 w-3.5" />
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Uplifting Communities, <br />
            <span className="text-[#3b82f6]">One Service at a Time</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed text-justify">
            FixKo PH is the premier professional service marketplace in the Philippines. We connect independent local handymen with homeowners and offices for reliable repairs.
          </p>
        </div>
      </section>

      {/* 2. THE STORY / JOURNEY */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-[#18388c] uppercase tracking-widest">Why FixKo Started</h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#001851] leading-tight">
            Bridging the gap between certified technicians and homeowners
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed text-justify">
            Finding certified plumbers, electrical experts, and professional cleaning services in major Philippine cities was traditionally a slow and risky process. Households had to rely on word-of-mouth with no insurance of skills or safety check checks.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed text-justify">
            At the same time, thousands of skilled independent technicians lacked a digital portal to find regular customers and build stable livelihoods. FixKo PH arose in 2024 to create a safe, efficient, and technology-driven marketplace that standardizes quality and empowers both clients and partners.
          </p>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm space-y-6">
          <h4 className="text-lg font-bold text-[#001851] border-b border-slate-100 pb-4">Our Core Directives</h4>
          
          <div className="flex gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
              <IconTarget className="h-5 w-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-[#001851]">Our Mission</h5>
              <p className="text-xs text-slate-500 mt-1 text-justify">
                To uplift local blue-collar livelihoods by connecting certified professionals with premium opportunities, while offering households unparalleled reliability, security, and quality.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600 shrink-0">
              <IconEye className="h-5 w-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-[#001851]">Our Vision</h5>
              <p className="text-xs text-slate-500 mt-1 text-justify">
                To become the most reliable, trusted services platform in Southeast Asia, starting right here in the Philippines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-[#18388c] uppercase tracking-widest">Our Guiding Beliefs</h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#001851]">
            Values that Drive FixKo PH
          </h3>
          <p className="text-slate-600 text-sm text-justify">
            Everything we do revolves around these four foundational columns. They dictate how we vet, how we support, and how we deliver services.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {values.map((val, idx) => (
            <div key={idx} className="bg-white border border-slate-200/60 rounded-2xl p-8 shadow-sm flex gap-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 shrink-0">
                {val.icon}
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-bold text-[#001851]">{val.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed text-justify">{val.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. STATISTICS IMPACT SECTION */}
      <section className="bg-gradient-to-r from-[#001851] to-[#082269] text-white mt-24 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <h4 className="text-4xl font-extrabold text-[#3b82f6] mb-1">500+</h4>
            <p className="text-xs text-slate-300 font-semibold tracking-wider uppercase">Vetted Livelihoods</p>
          </div>
          <div>
            <h4 className="text-4xl font-extrabold text-[#3b82f6] mb-1">10k+</h4>
            <p className="text-xs text-slate-300 font-semibold tracking-wider uppercase">Served Households</p>
          </div>
          <div>
            <h4 className="text-4xl font-extrabold text-[#3b82f6] mb-1">98%</h4>
            <p className="text-xs text-slate-300 font-semibold tracking-wider uppercase">Satisfied Ratings</p>
          </div>
          <div>
            <h4 className="text-4xl font-extrabold text-[#3b82f6] mb-1">100%</h4>
            <p className="text-xs text-slate-300 font-semibold tracking-wider uppercase">NBI / Skills Cleared</p>
          </div>
        </div>
      </section>

      {/* 5. MEET THE TEAM SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pb-4">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-[#18388c] uppercase tracking-widest">The People Behind FixKo</h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#001851]">
            Meet the Team
          </h3>
          <p className="text-slate-600 text-sm text-justify">
            FixKo PH was built by a passionate team of Filipino students dedicated to uplifting local communities through technology, design, and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Shanella A. Cagulang",     role: "Project Manager\nUI/UX Designer",          initials: "SC", color: "from-blue-600 to-blue-400" },
            { name: "Miyuki Mharie C. Parocha", role: "Quality Assurance\nDocumentation Analyst", initials: "MP", color: "from-teal-600 to-teal-400" },
            { name: "Miguel Hope R. Bernardo",  role: "Business Analyst",                          initials: "MB", color: "from-indigo-600 to-indigo-400" },
            { name: "Louraine Mercado",         role: "Marketing Specialist",                      initials: "LM", color: "from-purple-600 to-purple-400" },
            { name: "Althea Amor J. Asis",      role: "Frontend Developer\nUI/UX Designer",        initials: "AA", color: "from-pink-600 to-pink-400" },
            { name: "Ma. Nadine A. Borja",      role: "Frontend Developer",                        initials: "NB", color: "from-rose-600 to-rose-400" },
            { name: "Darben V. Lamonte",        role: "Lead Developer",                            initials: "DL", color: "from-[#18388c] to-[#3b82f6]" },
            { name: "Ma. Alex P. Halili",       role: "Graphic Designer",                          initials: "AH", color: "from-amber-600 to-amber-400" },
          ].map((member, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr ${member.color} text-white text-xl font-extrabold shadow-lg`}>
                {member.initials}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#001851] leading-snug">{member.name}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed whitespace-pre-line">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
