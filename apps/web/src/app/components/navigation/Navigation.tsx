"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import fixkoLogo from "../../assets/logo_fixko.png";
import { IconMenu2, IconX, IconArrowRight, IconUserCircle } from "@tabler/icons-react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/aboutus" },
    { label: "How to Use", href: "/howtouse" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo and Brand */}
        <Link href="/" className="flex items-center group transition">
          <Image
            src={fixkoLogo}
            alt="FixKo Philippines"
            height={70}
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 text-sm font-medium transition-colors duration-200 hover:text-[#18388c] ${active ? "text-[#18388c]" : "text-[#4A4A6A]"
                  }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-[#18388c] to-[#3b82f6]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-xl p-2.5 text-[#001851] hover:bg-slate-100 focus:outline-none transition-colors duration-200"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <IconX className="h-6 w-6" aria-hidden="true" />
            ) : (
              <IconMenu2 className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/50 bg-white/95 backdrop-blur-lg animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="space-y-1.5 px-4 py-6">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  href={link.href}
                  className={`block rounded-xl px-4 py-3 text-base font-semibold transition-all duration-200 ${active
                    ? "bg-blue-50/60 text-[#18388c] border-l-4 border-[#18388c]"
                    : "text-[#4A4A6A] hover:bg-slate-50 hover:text-[#001851]"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Actions for Mobile */}
            <div className="mt-6 pt-6 border-t border-slate-200/60 flex flex-col gap-3.5 px-2">
              <Link
                onClick={() => setMobileMenuOpen(false)}
                href="/login"
                className="flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-[#18388c] border border-[#18388c]/20 hover:bg-[#18388c]/5 rounded-xl transition duration-200"
              >
                <IconUserCircle className="h-5 w-5" />
                Portal Sign In
              </Link>
              <Link
                onClick={() => setMobileMenuOpen(false)}
                href="/login?register=true"
                className="flex items-center justify-center gap-2 px-4 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-[#18388c] to-[#3b82f6] rounded-xl shadow-md transition duration-200"
              >
                Join as Partner
                <IconArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
