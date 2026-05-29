"use client";

import React, { useState } from "react";
import {
  IconUser,
  IconBriefcase,
  IconChevronDown,
  IconChevronUp,
  IconDeviceMobile,
  IconShieldCheck,
  IconUserCheck,
  IconCoin,
  IconChecklist,
  IconTruckDelivery,
  IconSparkles,
} from "@tabler/icons-react";

export default function HowToUse() {
  const [activeTab, setActiveTab] = useState<"customer" | "partner">("customer");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const customerSteps = [
    {
      title: "1. Create a Account",
      description: "Sign up via the mobile app or web portal in under 2 minutes. Enter your mobile number, set a password, and verify your details.",
      icon: <IconUser className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "2. Post a Service Job",
      description: "Choose a service category (like Plumbing or Cleaning), describe the issue (or upload a photo), and schedule your ideal date and time.",
      icon: <IconChecklist className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "3. Auto-Match with Experts",
      description: "Our system instantly routes your job to certified technicians in your city. An expert will accept and you can chat with them directly.",
      icon: <IconTruckDelivery className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "4. Verify & Pay Safely",
      description: "The expert finishes the service to high standards. Verify the completed repair and settle payments securely via bank transfer, e-wallets, or cash.",
      icon: <IconCoin className="h-6 w-6 text-blue-600" />,
    },
  ];

  const partnerSteps = [
    {
      title: "1. Apply in Portal",
      description: "Register an account, select 'Apply as Partner', upload your certifications, professional licenses, and mandatory NBI clearance.",
      icon: <IconBriefcase className="h-6 w-6 text-teal-600" />,
    },
    {
      title: "2. Skills & Background Vetting",
      description: "FixKo system administrators evaluate your application, call references, verify certifications, and approve your account profile.",
      icon: <IconUserCheck className="h-6 w-6 text-teal-600" />,
    },
    {
      title: "3. Accept Booking Requests",
      description: "Once approved, toggle your availability to active. You will start receiving booking alerts for jobs in your immediate neighborhood.",
      icon: <IconShieldCheck className="h-6 w-6 text-teal-600" />,
    },
    {
      title: "4. Work, Earn & Cashout",
      description: "Deliver premium service quality, update job status in the mobile dashboard, and request direct bank/GCash payouts from your balance.",
      icon: <IconCoin className="h-6 w-6 text-teal-600" />,
    },
  ];

  const faqs = [
    {
      question: "Are FixKo service partners background checked?",
      answer: "Absolutely. Safety is our primary concern. Every single applicant undergoes background vetting, which requires presenting a valid government-issued ID and a clean NBI Clearance (National Bureau of Investigation) in the Philippines before they are certified to receive client bookings.",
    },
    {
      question: "How much does it cost to request a service?",
      answer: "Pricing is transparently calculated based on the scope and complexity of the job. When posting a job, you will see pre-arranged base labor rates for categories like deep cleaning, basic diagnostics, or minor fixes. Any additional material costs are discussed and approved by you beforehand.",
    },
    {
      question: "What happens if a worker does not show up?",
      answer: "In the rare event of a cancellation or no-show, you can request an immediate reschedule through the customer-service portal. FixKo will match you with a replacement technician as a high priority. No cancellation fees will apply to you.",
    },
    {
      question: "How long does the worker approval take?",
      answer: "For skilled partners submitting applications, our administrative team reviews submissions within 2 to 3 business days. If any uploaded certifications are missing or unclear, our system support agents will reach out to guide you through the remaining steps.",
    },
    {
      question: "How do partners receive payouts for completed jobs?",
      answer: "Partners receive direct customer payments or in-app electronic wallet credits immediately upon job completion. Accrued application balances can be withdrawn directly to nominated Philippine bank accounts or GCash wallets within 24 hours.",
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="w-full bg-[#F5F5F5] min-h-screen pb-24">
      
      {/* 1. HOW TO USE HERO */}
      <section className="bg-gradient-to-r from-[#001851] to-[#18388c] text-white py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/20 text-[#60a5fa] text-xs font-semibold uppercase tracking-widest font-mono">
            <IconSparkles className="h-3.5 w-3.5 animate-spin-slow" />
            Easy Manuals
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            How Fix<span className="text-[#3b82f6]">Ko</span> Works
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Get your household issues fixed in minutes, or build a thriving independent business. Explore the simple steps for both sides.
          </p>
        </div>
      </section>

      {/* 2. TABS SELECTOR */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-center p-1.5 bg-slate-200/80 rounded-2xl max-w-md mx-auto shadow-inner">
          <button
            onClick={() => setActiveTab("customer")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition duration-300 ${
              activeTab === "customer"
                ? "bg-white text-[#18388c] shadow-md"
                : "text-[#4A4A6A] hover:text-[#001851]"
            }`}
          >
            <IconDeviceMobile className="h-4.5 w-4.5" />
            For Customers
          </button>
          <button
            onClick={() => setActiveTab("partner")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition duration-300 ${
              activeTab === "partner"
                ? "bg-white text-teal-700 shadow-md"
                : "text-[#4A4A6A] hover:text-[#001851]"
            }`}
          >
            <IconBriefcase className="h-4.5 w-4.5" />
            For Service Partners
          </button>
        </div>
      </section>

      {/* 3. DYNAMIC TIMELINE STEPS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white border border-slate-200/60 rounded-3xl p-8 sm:p-12 shadow-sm space-y-12 animate-in fade-in zoom-in-95 duration-300">
          
          <div className="border-b border-slate-100 pb-6 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-extrabold text-[#001851]">
                {activeTab === "customer" ? "Customer Booking Flow" : "Partner Application & Gig Flow"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Follow these simple steps to successfully {activeTab === "customer" ? "book a repair expert" : "get verified and earn money"}.
              </p>
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
              activeTab === "customer" ? "bg-blue-50 text-blue-600" : "bg-teal-50 text-teal-600"
            }`}>
              {activeTab === "customer" ? "Client manual" : "Worker manual"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {(activeTab === "customer" ? customerSteps : partnerSteps).map((step, idx) => (
              <div key={idx} className="flex gap-4.5 items-start p-4 hover:bg-slate-50 rounded-2xl transition duration-200">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 shadow-inner ${
                  activeTab === "customer" ? "bg-blue-50" : "bg-teal-50"
                }`}>
                  {step.icon}
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-extrabold text-[#001851]">{step.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. ACCORDION FAQ SECTION */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-[#18388c] uppercase tracking-widest font-mono">Frequently Asked</h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#001851]">
            Common Inquiries
          </h3>
          <p className="text-slate-600 text-sm">
            Can't find what you need? Reach out to our customer care center inside the partner dashboard.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-[#001851] hover:text-[#18388c] hover:bg-slate-50/50 transition-all duration-200"
                >
                  <span className="text-sm sm:text-base leading-relaxed">{faq.question}</span>
                  {isOpen ? (
                    <IconChevronUp className="h-5 w-5 text-[#4A4A6A]" />
                  ) : (
                    <IconChevronDown className="h-5 w-5 text-[#4A4A6A]" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4 animate-in slide-in-from-top-3 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
