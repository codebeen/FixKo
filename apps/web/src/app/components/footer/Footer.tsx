"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "../logo/Logo";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
  IconPhone,
  IconMapPin,
  IconSend,
} from "@tabler/icons-react";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <footer className="bg-[#001851] text-white pt-16 pb-8 border-t border-[#18388c]/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Upper Layout: Brand + Links + Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-slate-700/50">

          {/* Column 1: Brand details */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center group">
              <Logo
                variant="light"
                size="lg"
                className="group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              The premier professional service marketplace in the Philippines. Connecting reliable local experts with homeowners and businesses for plumbing, electrical, cleaning, and general repairs.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                { icon: <IconBrandFacebook className="h-5 w-5" />, href: "#" },
                { icon: <IconBrandTwitter className="h-5 w-5" />, href: "#" },
                { icon: <IconBrandInstagram className="h-5 w-5" />, href: "#" },
                { icon: <IconBrandLinkedin className="h-5 w-5" />, href: "#" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/60 hover:bg-[#3b82f6] hover:text-white text-slate-300 hover:-translate-y-1 transition-all duration-300"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-base font-bold text-[#3b82f6] tracking-wide mb-6 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-white transition duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/aboutus" className="hover:text-white transition duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/howtouse" className="hover:text-white transition duration-200">
                  How to Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-base font-bold text-[#3b82f6] tracking-wide mb-6 uppercase">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <IconMapPin className="h-5 w-5 text-[#3b82f6] shrink-0 mt-0.5" />
                <span>BGC, Taguig City, Metro Manila, Philippines</span>
              </li>
              <li className="flex items-center gap-2.5">
                <IconPhone className="h-5 w-5 text-[#3b82f6] shrink-0" />
                <span>+63 (2) 8888-FIXKO</span>
              </li>
              <li className="flex items-center gap-2.5">
                <IconMail className="h-5 w-5 text-[#3b82f6] shrink-0" />
                <span>support@fixko.com.ph</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-[#3b82f6] tracking-wide mb-2 uppercase">
              Newsletter
            </h4>
            <p className="text-xs text-slate-300 leading-normal">
              Subscribe to get updates on seasonal discounts, safety tips, and new services!
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-4 pr-11 py-3 text-sm rounded-xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:border-[#3b82f6] transition duration-200"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-[#18388c] to-[#3b82f6] text-white hover:from-[#3b82f6] hover:to-[#60a5fa] transition-all duration-200"
                >
                  <IconSend className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Lower Layout: Copyright + Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} FixKo Philippines. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
