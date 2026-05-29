"use client";

import React from "react";
import Link from "next/link";
import {
  IconTools,
  IconBolt,
  IconTrash,
  IconHammer,
  IconPlant,
  IconTool,
  IconShieldCheck,
  IconClock,
  IconStar,
  IconDeviceMobile,
  IconArrowRight,
  IconUserCheck,
  IconBrandGooglePlay,
  IconBrandApple,
} from "@tabler/icons-react";

export default function Home() {
  const services = [
    {
      title: "Plumbing Services",
      description: "Leaking pipes, toilet repairs, faucet installations, and expert drainage unclogging.",
      icon: <IconTools className="h-6 w-6 text-blue-600" />,
      tag: "Popular",
    },
    {
      title: "Electrical Works",
      description: "Appliance repairs, circuit breaker fixing, light installations, and full wiring inspections.",
      icon: <IconBolt className="h-6 w-6 text-yellow-500" />,
      tag: "Emergency",
    },
    {
      title: "Home Cleaning",
      description: "Deep house disinfection, regular housekeeping, post-renovation cleaning, and disinfection.",
      icon: <IconTrash className="h-6 w-6 text-teal-500" />,
      tag: "Best Value",
    },
    {
      title: "Carpentry & Masonry",
      description: "Custom cabinet installations, furniture repairs, door replacements, and general woodworking.",
      icon: <IconHammer className="h-6 w-6 text-orange-500" />,
      tag: "Premium",
    },
    {
      title: "Gardening & Lawn",
      description: "Lawn mowing, garden landscaping, yard clearing, soil preparation, and weeding.",
      icon: <IconPlant className="h-6 w-6 text-green-500" />,
      tag: "Eco Friendly",
    },
    {
      title: "General Maintenance",
      description: "Wall painting, smart lock installations, picture hanging, and miscellaneous handiwork.",
      icon: <IconTool className="h-6 w-6 text-indigo-500" />,
      tag: "Flexible",
    },
  ];

  const coreBenefits = [
    {
      title: "Fully Vetted Workers",
      description: "Every worker undergoes deep background check verification, employment history review, and skills testing.",
      icon: <IconShieldCheck className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Express Booking",
      description: "Match with a local expert in under 15 minutes. Simple scheduling whenever you need help.",
      icon: <IconClock className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Certified Skills",
      description: "Our professionals have proven track records and certifications verified by our system admin.",
      icon: <IconUserCheck className="h-8 w-8 text-blue-600" />,
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Request a Service",
      description: "Choose the job category and explain the issue you are facing. Set your preferred time.",
    },
    {
      step: "02",
      title: "Get Instantly Matched",
      description: "Our system matches you with the highest-rated, verified professional near your area.",
    },
    {
      step: "03",
      title: "Get It Fixed & Pay Safely",
      description: "The worker completes the service to high standards. Pay digitally or cash after verification.",
    },
  ];

  return (
    <div className="w-full bg-[#F5F5F5] min-h-screen">

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#001851] via-[#082269] to-[#18388c] text-white py-24 px-4 sm:px-6 lg:px-8">
        {/* Soft background decor blur */}
        <div className="absolute top-1/4 left-1/4 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Hero text content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">

            {/* Tagline pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-[#60a5fa] text-xs font-semibold uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-[#3b82f6] animate-pulse" />
              Empowering Skilled Filipinos
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Professional Service, <br />
              <span className="text-[#3b82f6] bg-gradient-to-r from-[#60a5fa] to-white bg-clip-text text-transparent">Vetted & Trusted</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Book certified plumbers, electricians, cleaners, and carpenters in Metro Manila and neighboring areas in minutes. Safe, reliable, and background-checked for your peace of mind.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-[#3b82f6] to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 active:scale-[0.98] transition-all duration-200"
              >
                Book a Service
                <IconArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/login?register=true"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-slate-100 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-2xl backdrop-blur-sm transition-all duration-200"
              >
                Become a Fixer
              </Link>
            </div>

            {/* Quick stats grid */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/10 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#3b82f6]">10k+</p>
                <p className="text-xs text-slate-300">Bookings Completed</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#3b82f6]">500+</p>
                <p className="text-xs text-slate-300">Vetted Professionals</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#3b82f6]">4.9/5</p>
                <p className="text-xs text-slate-300">Customer Rating</p>
              </div>
            </div>

          </div>

          {/* Hero visual card */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-md p-8 flex flex-col justify-between shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 h-40 w-40 bg-blue-500/10 rounded-full blur-2xl" />

              {/* Card visual details */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold uppercase text-blue-400 tracking-wider">FixKo Booking Live View</span>
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <div className="space-y-3">
                  <div className="h-6 w-32 bg-slate-700/60 rounded-lg animate-pulse" />
                  <div className="h-10 w-full bg-slate-700/30 rounded-xl animate-pulse" />
                  <div className="h-10 w-full bg-slate-700/30 rounded-xl animate-pulse" />
                </div>
              </div>

              {/* Verified Professional badge */}
              <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-4 flex items-center gap-4.5 backdrop-blur shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shrink-0">
                  <IconShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Kuya Mario Dela Cruz</h4>
                  <p className="text-xs text-slate-300">Certified Master Plumber • Taguig</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <IconStar key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-[10px] text-yellow-400 font-bold ml-1">5.0 (184 reviews)</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. CORE SERVICES SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-[#18388c] uppercase tracking-widest">Our Professional Care</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#001851]">
            Comprehensive Home Services for Households
          </h3>
          <p className="text-slate-600 text-base">
            Select from our highly trained, verified local professionals. We specialize in everyday household fixes, deep maintenance, and emergencies.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 group-hover:bg-blue-50 transition-colors duration-300">
                  {service.icon}
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100 text-[#4A4A6A]">
                  {service.tag}
                </span>
              </div>
              <h4 className="text-lg font-bold text-[#001851] group-hover:text-[#18388c] transition-colors duration-200 mb-3">
                {service.title}
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE BENEFITS SECTION */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {coreBenefits.map((benefit, index) => (
            <div key={index} className="flex gap-5 items-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 shrink-0 shadow-inner">
                {benefit.icon}
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-extrabold text-[#001851]">{benefit.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-[#18388c] uppercase tracking-widest font-mono">Workflow Overview</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#001851]">How FixKo PH Works</h3>
          <p className="text-slate-600 text-sm">
            We simplified the process of getting local handymen, electricians, and cleaners. Follow these three quick steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-0.5 bg-slate-200 z-0" />

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center space-y-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-[#18388c] to-[#3b82f6] text-white text-xl font-bold shadow-lg shadow-blue-500/10">
                {step.step}
              </div>
              <h4 className="text-lg font-bold text-[#001851]">{step.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. APP PROMOTION & APP DOWNLOAD */}
      <section className="bg-gradient-to-tr from-[#001851] to-[#082269] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h2 className="text-sm font-bold text-[#3b82f6] uppercase tracking-widest">Mobile First Experience</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold">Download the FixKo PH App Today</h3>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl mx-auto lg:mx-0">
              Manage your services, chat with your assigned worker, track their location in real-time, and make secure digital payments. Available for both iOS and Android.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700/60 hover:bg-black transition text-left">
                <IconBrandGooglePlay className="h-6 w-6 text-white" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Get it on</span>
                  <span className="block text-sm font-bold text-white">Google Play</span>
                </div>
              </button>
              <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700/60 hover:bg-black transition text-left">
                <IconBrandApple className="h-6 w-6 text-white" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Download on the</span>
                  <span className="block text-sm font-bold text-white">App Store</span>
                </div>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            {/* Floating visual phone frame */}
            <div className="relative border-4 border-slate-700/80 w-64 h-[450px] rounded-[36px] bg-slate-950 shadow-2xl p-3 flex flex-col justify-between overflow-hidden">
              <div className="mx-auto w-24 h-4.5 bg-slate-700 rounded-full mb-3" /> {/* Notch */}
              <div className="flex-1 rounded-2xl bg-slate-900/40 p-4 flex flex-col justify-between text-slate-300">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                    <span>9:41 AM</span>
                    <span>100%</span>
                  </div>
                  <div className="h-5 w-20 bg-slate-700 rounded animate-pulse" />
                  <div className="p-3 bg-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold block">ACTIVE BOOKING</span>
                    <span className="text-xs text-white font-bold block">Kuya Mario Arriving</span>
                    <span className="text-[9px] text-blue-400 font-bold block mt-1">Est: 3 mins away</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-[#18388c] rounded-xl text-center cursor-pointer justify-center text-xs font-bold text-white">
                  <IconDeviceMobile className="h-4 w-4" />
                  Open Live Chat
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-[#18388c] uppercase tracking-widest">Happy Stakeholders</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#001851]">Trusted by Thousands in PH</h3>
          <p className="text-slate-600 text-sm">
            Read stories from our valued customers and local service partners who grow their businesses with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm flex flex-col justify-between">
            <p className="text-slate-500 italic text-sm leading-relaxed mb-6">
              "We encountered a massive leak in our master bathroom at 10:00 PM on a Saturday. FixKo PH matched us with an emergency plumber within 15 minutes. He was professional, fully geared, and repaired it easily. Incredible response time!"
            </p>
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-full bg-blue-100 flex items-center justify-center font-bold text-[#18388c] text-sm shrink-0">
                CR
              </div>
              <div>
                <h5 className="text-sm font-bold text-[#001851]">Shanella Cagulang</h5>
                <p className="text-xs text-slate-400">Homeowner • Quezon City</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm flex flex-col justify-between">
            <p className="text-slate-500 italic text-sm leading-relaxed mb-6">
              "I have been working as an independent electrician in Metro Manila for 10 years, but finding stable customers was always tough. FixKo changed everything. I pass background checks, and the portal feeds me regular gigs. My income is more stable than ever!"
            </p>
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-full bg-blue-100 flex items-center justify-center font-bold text-[#18388c] text-sm shrink-0">
                JB
              </div>
              <div>
                <h5 className="text-sm font-bold text-[#001851]">Darben Lamonte</h5>
                <p className="text-xs text-slate-400">Verified Electrician Partner • Paranaque</p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
