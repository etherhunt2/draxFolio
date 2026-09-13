'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
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

function LaptopComponent({ images = [], link = '#', alt = 'Project Preview', title = 'Project' }) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [powerIndicator, setPowerIndicator] = useState('red');
    const [isHovered, setIsHovered] = useState(false);

    const cardContainerRef = useRef(null);
    const laptopRef = useRef(null);
    const indicatorRef = useRef(null);
    const sheenRef = useRef(null);

    // Auto slideshow for screenshots: 1s static display + seamless slide transition
    useEffect(() => {
        if (!images || images.length <= 1 || isHovered) return;
        const interval = setInterval(() => {
            setDirection(1);
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 1800);
        return () => clearInterval(interval);
    }, [images, isHovered]);

    // GSAP ScrollTrigger 3D Unfold & Power-On Sequence
    useEffect(() => {
        if (!cardContainerRef.current || !laptopRef.current) return;

        const scrollerElement = typeof document !== 'undefined' ? document.getElementById('relative-div') : null;

        const ctx = gsap.context(() => {
            // Initial setting for 3D perspective
            gsap.set(cardContainerRef.current, { perspective: 1200 });
            gsap.set(laptopRef.current, {
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
            });

            // 3D Spatial Unfold Entrance Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: cardContainerRef.current,
                    scroller: scrollerElement || undefined,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                },
            });

            // Card unfolds and floats up from depth
            tl.fromTo(
                laptopRef.current,
                {
                    opacity: 0,
                    y: 65,
                    rotateX: 16,
                    rotateY: -6,
                    scale: 0.92,
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
                }
            );

            // Screen glare sheen sweep across display
            if (sheenRef.current) {
                tl.fromTo(
                    sheenRef.current,
                    { x: '-120%', opacity: 0.8 },
                    {
                        x: '180%',
                        opacity: 0,
                        duration: 1.1,
                        ease: 'power2.out',
                    },
                    '-=0.6'
                );
            }

            // Power LED active boot pulse
            if (indicatorRef.current) {
                tl.fromTo(
                    indicatorRef.current,
                    { scale: 0.4, opacity: 0.3 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        ease: 'back.out(2)',
                        onComplete: () => {
                            if (indicatorRef.current) {
                                gsap.to(indicatorRef.current, {
                                    opacity: 0.35,
                                    duration: 0.8,
                                    repeat: -1,
                                    yoyo: true,
                                    ease: 'sine.inOut',
                                });
                            }
                        },
                    },
                    '-=0.5'
                );
            }
        }, cardContainerRef);

        return () => ctx.revert();
    }, []);

    // Interactive 3D Mouse Parallax Tilt
    const handleMouseMove = useCallback((e) => {
        if (!cardContainerRef.current || !laptopRef.current) return;
        const rect = cardContainerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - (rect.left + rect.width / 2);
        const mouseY = e.clientY - (rect.top + rect.height / 2);

        const xPercent = mouseX / (rect.width / 2);
        const yPercent = mouseY / (rect.height / 2);

        gsap.to(laptopRef.current, {
            rotateY: xPercent * 14,
            rotateX: -yPercent * 12,
            translateZ: 25,
            duration: 0.3,
            ease: 'power2.out',
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        if (!laptopRef.current) return;
        gsap.to(laptopRef.current, {
            rotateX: 0,
            rotateY: 0,
            translateZ: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.4)',
        });
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handleIndicatorClick = (e) => {
        e.stopPropagation();
        setPowerIndicator('yellow');
        if (indicatorRef.current) {
            gsap.to(indicatorRef.current, {
                x: -240,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    if (indicatorRef.current) {
                        gsap.to(indicatorRef.current, {
                            x: 0,
                            duration: 0.5,
                            ease: 'power2.out',
                        });
                    }
                },
            });
        }
    };

    return (
        <div
            ref={cardContainerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-xs mx-auto py-4 select-none"
            style={{ perspective: '1200px' }}
        >
            {/* Laptop 3D Body */}
            <div
                ref={laptopRef}
                className="portfolioLaptop group relative w-full bg-[#1e2029] rounded-xl p-3 sm:p-4 shadow-2xl border border-zinc-700/80 hover:border-blue-500/60 transition-colors duration-300"
                style={{
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                }}
            >
                {/* Subtle 3D Top Camera Notch */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 z-20 pointer-events-none">
                    <div className="w-2.5 h-2.5 bg-zinc-800 rounded-full border border-zinc-500/70 flex items-center justify-center">
                        <div className="w-1 h-1 bg-cyan-400/80 rounded-full" />
                    </div>
                </div>

                {/* Laptop Screen Bezel */}
                <div className="relative w-full h-44 sm:h-48 bg-black rounded-md overflow-hidden border border-zinc-700 shadow-inner mt-2">
                    <AnimatePresence initial={false} custom={direction}>
                        {images && images.length > 0 ? (
                            <motion.div
                                key={index}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.8, ease: 'easeInOut' }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    src={images[index]}
                                    alt={alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 320px"
                                    className="object-cover object-top"
                                    quality={85}
                                    priority={index === 0}
                                />
                            </motion.div>
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-zinc-600 text-xs font-mono">
                                NO SIGNAL
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Glass Reflection Glare Sheen */}
                    <div
                        ref={sheenRef}
                        className="pointer-events-none absolute inset-0 w-[60%] h-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45 -top-1/2"
                        style={{ willChange: 'transform' }}
                    />

                    {/* Screen Scanlines Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3px_3px] opacity-40" />
                </div>

                {/* Bottom Laptop Hinge & Base */}
                <div className="w-full h-4 bg-zinc-800 mt-2.5 rounded-b-lg flex items-center justify-between px-3 relative border-t border-zinc-700/60 shadow-md">
                    {/* Laptop Center Opening Notch */}
                    <div className="w-12 h-1 bg-zinc-900 rounded-full mx-auto" />

                    {/* Power LED Indicator */}
                    <div
                        ref={indicatorRef}
                        className="power-indicator w-3.5 h-1.5 rounded-full cursor-pointer transition-all duration-300 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                        style={{
                            backgroundColor: powerIndicator === 'red' ? '#ef4444' : '#eab308',
                            boxShadow: powerIndicator === 'red' ? '0 0 8px #ef4444' : '0 0 8px #eab308',
                        }}
                        onClick={handleIndicatorClick}
                        title="Toggle Power LED"
                    />
                </div>

                {/* Project Title and Live Link */}
                <Link
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-3 text-center"
                >
                    <div className="flex items-center justify-center gap-1.5 text-zinc-200 font-semibold text-sm hover:text-cyan-400 transition-colors py-1">
                        <span>{title}</span>
                        <svg
                            className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 transition-colors transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default LaptopComponent;