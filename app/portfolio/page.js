"use client";

import React from "react";
import Link from "next/link";
import FeaturedProject from "@/components/FeaturedProject";
import OtherProjects from "@/components/OtherProjects";
import Stars from "@/utils/Stars";
import { FaArrowLeft } from "react-icons/fa";

export default function PortfolioPage() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Fixed 3D Space Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Stars
          starCount={1500}
          brightStarCount={80}
          galaxyParticleCount={600}
          nebulaCount={250}
          speed={0.08}
          moveOnHover={true}
        />
      </div>

      {/* Content */}
      <main className="relative z-10 min-h-screen text-white selection:bg-blue-500 selection:text-white bg-transparent">
        {/* Top Bar Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200 text-sm font-medium shadow-sm backdrop-blur-sm"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Main Projects Showcase */}
        <FeaturedProject />
        <OtherProjects />
      </main>
    </div>
  );
}
