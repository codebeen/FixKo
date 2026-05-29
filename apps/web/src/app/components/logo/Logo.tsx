"use client";

import React from "react";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light"; // 'dark' for light backgrounds (default), 'light' for dark backgrounds
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Logo({ className = "", variant = "dark", size = "md" }: LogoProps) {
  // Color configuration
  const blueColor = "#104cba"; // Vibrant professional royal blue from image
  const goldColor = "#dba92e"; // Warm gold from image
  const phColor = variant === "dark" ? "#000000" : "#ffffff"; // Black on light bg, white on dark bg

  // Size mapping
  const sizeClasses = {
    sm: "text-lg sm:text-xl tracking-tight",
    md: "text-2xl sm:text-3xl tracking-tight",
    lg: "text-3xl sm:text-4xl tracking-tighter",
    xl: "text-4xl sm:text-5xl tracking-tighter",
  };

  return (
    <div
      className={`inline-flex items-center select-none font-sans font-black ${sizeClasses[size]} ${className}`}
      style={{
        fontFamily: "'Poppins', var(--font-poppins), sans-serif",
      }}
    >
      <span
        style={{ color: blueColor }}
        className="transition-colors duration-300 hover:text-blue-500"
      >
        Fix
      </span>
      <span
        style={{ color: goldColor }}
        className="transition-colors duration-300 hover:text-amber-400"
      >
        Ko
      </span>
      <span
        style={{ color: phColor }}
        className="transition-colors duration-300"
      >
        PH
      </span>
    </div>
  );
}
