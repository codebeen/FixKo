"use client";

import React from "react";
import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer";

export default function BaseWebsite({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-[#001851]">
      {/* Dynamic Navigation */}
      <Navigation />

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-x-hidden">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}