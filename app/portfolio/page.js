"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaHardHat, FaTools } from 'react-icons/fa';
import Link from 'next/link';

export default function PortfolioConstruction() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-4">
      <div className="max-w-2xl w-full text-center space-y-8 relative">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 1 }}
          className="flex justify-center items-center gap-6 text-orange-500 text-6xl md:text-8xl mb-8"
        >
          <FaHardHat className="drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <FaTools className="drop-shadow-[0_0_15px_rgba(249,115,22,0.5)] text-5xl md:text-7xl" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
            Under Construction
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
            I'm currently building something awesome for this portfolio section. 
            Check back soon to see my latest work!
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="pt-8"
        >
          <div className="w-full max-w-md mx-auto h-2 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
              initial={{ width: "0%" }}
              animate={{ width: "65%" }}
              transition={{ delay: 1, duration: 2, ease: "easeOut" }}
            />
          </div>
          <p className="text-zinc-500 text-sm mt-4 font-mono tracking-widest uppercase">
            Progress: 65%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-8"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
