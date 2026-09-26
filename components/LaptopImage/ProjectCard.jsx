'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Transition from '../Transition';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
    }),
    center: {
        x: '0%',
    },
    exit: (direction) => ({
        x: direction > 0 ? '-100%' : '100%',
    }),
};

export default function ProjectCard({ project, variant = 'default', index = 0, priority = false }) {
    const { title, description, images = [], link, github, tags = [] } = project;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const [transitionUrl, setTransitionUrl] = useState(null);
    const [isBooted, setIsBooted] = useState(variant !== 'cyberpunk');
    const [isVisible, setIsVisible] = useState(false);

    const cardRef = useRef(null);
    const scanlineRef = useRef(null);
    const screenRef = useRef(null);
    const statusLedRef = useRef(null);

    // Visibility Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    // Auto slideshow for screenshots: 1s static display + seamless slide transition
    useEffect(() => {
        if (!images || images.length <= 1 || isHovered || !isVisible) return;
        const interval = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 1800);
        return () => clearInterval(interval);
    }, [images, isHovered, isVisible]);

    // Cyberpunk Tech Boot Sequence with ScrollTrigger
    useEffect(() => {
        if (variant !== 'cyberpunk') return;

        const scrollerElement = typeof document !== 'undefined' ? document.getElementById('relative-div') : null;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: cardRef.current,
                    scroller: scrollerElement || undefined,
                    start: 'top 88%',
                    toggleActions: 'play none none reverse',
                },
            });

            // Step 1: Initial Card Hologram Materialization
            tl.fromTo(
                cardRef.current,
                {
                    opacity: 0,
                    y: 45,
                    scale: 0.94,
                    filter: 'brightness(1.8) contrast(1.2)',
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'brightness(1) contrast(1)',
                    duration: 0.8,
                    delay: (index % 3) * 0.12,
                    ease: 'power3.out',
                    onComplete: () => setIsBooted(true),
                }
            );

            // Step 2: Screen CRT Power-On & Scanline Sweep
            if (scanlineRef.current) {
                tl.fromTo(
                    scanlineRef.current,
                    { y: '-100%', opacity: 1 },
                    {
                        y: '220%',
                        opacity: 0,
                        duration: 0.9,
                        ease: 'power1.inOut',
                    },
                    '-=0.4'
                );
            }

            // Step 3: LED Status Indicator Online Flip
            if (statusLedRef.current) {
                tl.fromTo(
                    statusLedRef.current,
                    { scale: 0.2, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        ease: 'back.out(2)',
                    },
                    '-=0.3'
                );
            }
        }, cardRef);

        return () => ctx.revert();
    }, [variant, index]);

    const getDomain = (url) => {
        try {
            const hostname = new URL(url).hostname;
            return hostname.replace('www.', '');
        } catch (e) {
            return '';
        }
    };

    const isCyber = variant === 'cyberpunk';

    return (
        <div
            ref={cardRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative flex flex-col justify-between rounded-2xl overflow-hidden transition-all duration-300 ${
                isCyber
                    ? `bg-[#0f1117]/95 border ${
                          isHovered
                              ? 'border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.35)] -translate-y-1'
                              : 'border-cyan-900/40 shadow-xl'
                      }`
                    : `bg-[#151518] border ${
                          isHovered
                              ? 'border-blue-500/70 shadow-[0_0_25px_rgba(59,130,246,0.3)] -translate-y-1'
                              : 'border-zinc-800 shadow-xl'
                      }`
            }`}
        >
            {/* Cyberpunk HUD Tech Corner Accents */}
            {isCyber && (
                <>
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />
                </>
            )}

            <div>
                {/* Header Bar */}
                <div
                    className={`flex items-center px-4 py-3 border-b ${
                        isCyber
                            ? 'bg-[#0a0d14] border-cyan-900/40'
                            : 'bg-[#1e1e24] border-zinc-800/80'
                    }`}
                >
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        {isCyber ? (
                            <div
                                ref={statusLedRef}
                                className="flex items-center gap-1.5 font-mono text-[10px] text-cyan-400 tracking-wider font-semibold"
                            >
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                                <span>SYS_OK // 0x{index + 1}</span>
                            </div>
                        ) : (
                            <>
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                            </>
                        )}
                    </div>

                    <div className="flex-1 flex justify-center ml-2 mr-4 sm:mr-8">
                        <div
                            className={`flex items-center justify-center px-3 py-1 rounded-md text-[11px] font-mono w-full max-w-[190px] truncate border ${
                                isCyber
                                    ? 'bg-cyan-950/40 text-cyan-300 border-cyan-800/50'
                                    : 'bg-[#2a2a30] text-zinc-400 border-zinc-800'
                            }`}
                        >
                            {link ? getDomain(link) : 'project.local'}
                        </div>
                    </div>

                    {isCyber && (
                        <div className="text-[10px] font-mono text-cyan-500/70 hidden sm:block">
                            [200 OK]
                        </div>
                    )}
                </div>

                {/* Image Preview Container */}
                <div
                    ref={screenRef}
                    className="relative w-full h-48 sm:h-56 bg-black overflow-hidden border-b border-zinc-800/80"
                >
                    <AnimatePresence initial={false} custom={direction}>
                        {images.length > 0 ? (
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.8, ease: 'easeInOut' }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    src={images[currentIndex]}
                                    alt={`${title} screenshot ${currentIndex + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    priority={priority && currentIndex === 0}
                                    loading={!(priority && currentIndex === 0) ? "lazy" : undefined}
                                />
                            </motion.div>
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-zinc-600 text-sm font-mono">
                                NO SIGNAL
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Cyber Laser Scanline Beam */}
                    {isCyber && (
                        <div
                            ref={scanlineRef}
                            className="pointer-events-none absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent shadow-[0_0_15px_#22d3ee] z-20"
                            style={{ willChange: 'transform' }}
                        />
                    )}

                    {/* CRT Scanline Grid Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:3px_3px] opacity-40 z-10" />

                    {/* Transition overlay inside image container */}
                    {transitionUrl && (
                        <Transition
                            images={images}
                            targetUrl={transitionUrl}
                            onClose={() => setTransitionUrl(null)}
                        />
                    )}

                    {/* Gradient Overlay for bottom shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none z-10" />

                    {/* Image indicator dots */}
                    {images.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (idx !== currentIndex) {
                                            setDirection(idx > currentIndex ? 1 : -1);
                                            setCurrentIndex(idx);
                                        }
                                    }}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                        idx === currentIndex
                                            ? isCyber
                                                ? 'bg-cyan-400 scale-125 shadow-[0_0_6px_#22d3ee]'
                                                : 'bg-white scale-125'
                                            : 'bg-white/40 hover:bg-white/80'
                                    }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <div
                            className={`flex-shrink-0 ${
                                isCyber ? 'text-cyan-400' : 'text-yellow-500'
                            }`}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5" />
                                <path d="M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white tracking-wide">
                            {title}
                        </h3>
                    </div>

                    <p className="mb-4 text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                        {description}
                    </p>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-1">
                            {tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className={`text-[11px] px-2.5 py-1 rounded-md font-mono font-medium border ${
                                        isCyber
                                            ? 'bg-cyan-950/30 text-cyan-300 border-cyan-800/40 shadow-[0_0_10px_rgba(6,182,212,0.1)]'
                                            : 'bg-[#2a2a30] text-zinc-300 border-zinc-700/50'
                                    }`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Links / Footer */}
            <div className="px-5 pb-5 pt-3 flex items-center gap-3">
                {link && (
                    <a
                        href={link}
                        onClick={(e) => {
                            e.preventDefault();
                            if (!transitionUrl) setTransitionUrl(link);
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 text-white text-sm font-medium py-2 px-4 rounded-xl transition-all duration-200 ${
                            isCyber
                                ? 'bg-cyan-600 hover:bg-cyan-500 shadow-[0_0_18px_rgba(6,182,212,0.35)] active:shadow-none'
                                : 'bg-[#2175f3] hover:bg-[#1a5fce] shadow-lg shadow-blue-500/20'
                        } ${
                            transitionUrl === link
                                ? 'bg-gray-600 cursor-not-allowed opacity-50'
                                : ''
                        }`}
                    >
                        <span>
                            {transitionUrl === link
                                ? 'Loading...'
                                : isCyber
                                ? 'Execute //'
                                : 'Visit Site'}
                        </span>
                        <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                )}
                {github && (
                    <a
                        href={github}
                        onClick={(e) => {
                            e.preventDefault();
                            if (!transitionUrl) setTransitionUrl(github);
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 text-zinc-200 text-sm font-medium py-2 px-4 rounded-xl border border-zinc-700/50 transition-all duration-200 ${
                            isCyber
                                ? 'bg-[#121622] hover:bg-[#182030] hover:text-cyan-300 hover:border-cyan-500/40'
                                : 'bg-[#2a2a30] hover:bg-[#35353d] hover:text-white'
                        } ${
                            transitionUrl === github
                                ? 'bg-gray-700 cursor-not-allowed opacity-50'
                                : ''
                        }`}
                        aria-label="GitHub Repository"
                    >
                        <FaGithub className="text-[15px]" />
                        <span>
                            {transitionUrl === github
                                ? 'Loading...'
                                : isCyber
                                ? 'Source //'
                                : 'GitHub'}
                        </span>
                    </a>
                )}
            </div>
        </div>
    );
}
