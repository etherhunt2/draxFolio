'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import ProjectCard from './LaptopImage/ProjectCard';
import Link from 'next/link';

const projects = [
    {
        title: 'Eva The Label',
        description: 'High-end e-commerce brand platform featuring interactive lookbooks and seamless checkout flow.',
        images: ['/portfolio/evaTheLabel/eva1.png', '/portfolio/evaTheLabel/eva2.png', '/portfolio/evaTheLabel/eva3.png', '/portfolio/evaTheLabel/eva4.png', '/portfolio/evaTheLabel/eva5.png', '/portfolio/evaTheLabel/eva6.png'],
        link: 'https://www.evathelabel.es/',
        github: 'https://github.com/your-username/eva-the-label', // Replace with your repository URL
        tags: ['React', 'Next.js', 'Tailwind CSS'],
    },
    {
        title: 'Samskara',
        description: 'Interactive wellness booking platform built for community engagement and appointment scheduling.',
        images: ['/portfolio/samskara/samskara1.png', '/portfolio/samskara/samskara2.png', '/portfolio/samskara/samskara3.png', '/portfolio/samskara/samskara4.png', '/portfolio/samskara/samskara5.png', '/portfolio/samskara/samskara6.png'],
        link: 'https://samskara.app/',
        github: '', // Leave blank or provide repository URL
        tags: ['Next.js', 'TypeScript', 'Node.js'],
    },
    {
        title: 'Prachar',
        description: 'Marketing campaign and advertising platform designed for rapid customer outreach.',
        images: ['/portfolio/prachar/prachar1.png', '/portfolio/prachar/prachar2.png', '/portfolio/prachar/prachar3.png', '/portfolio/prachar/prachar4.png', '/portfolio/prachar/prachar5.png'],
        link: 'https://pracharr.vercel.app/',
        github: '',
        tags: ['React.js', 'Next.JS', 'Node.js', 'Vercel'],
    },
    {
        title: 'Asgeics India',
        description: 'Enterprise operations and field service network management system.',
        images: ['/portfolio/asgeicsIndia/asgeics1.png', '/portfolio/asgeicsIndia/asgeics2.png', '/portfolio/asgeicsIndia/asgeics3.png', '/portfolio/asgeicsIndia/asgeics4.png', '/portfolio/asgeicsIndia/asgeics5.png'],
        link: 'https://asgeicsindia.vercel.app/',
        github: '',
        tags: ['MERN Stack', 'Vite.JS'],
    },
    {
        title: 'LilyMin',
        description: 'Minimalist product catalog and custom shopping portal.',
        images: ['/portfolio/lilymin/lilymin1.png', '/portfolio/lilymin/lilymin2.png', '/portfolio/lilymin/lilymin3.png', '/portfolio/lilymin/lilymin4.png', '/portfolio/lilymin/lilymin5.png', '/portfolio/lilymin/lilymin6.png'],
        link: 'https://www.lilymin.in/',
        github: '',
        tags: ['PHP', 'MySQL', 'E-Commerce', 'WordPress'],
    },
    {
        title: 'CIGS',
        description: "CIGS Tech Innovations is an Indian FinTech driving rural financial inclusion via a Phygital model, offering assisted banking, bill payments, insurance, and G2C services through local agents.",
        images: ['/portfolio/cigs/cigs1.png', '/portfolio/cigs/cigs2.png', '/portfolio/cigs/cigs3.png', '/portfolio/cigs/cigs4.png', '/portfolio/cigs/cigs5.png'],
        link: 'https://cigs.in/',
        github: '',
        tags: ['React.js', 'Wix', 'GSAP'],
    }
];

const GLYPHS = "!<>/{}[];_—=*^?#01AZ%$&X97@+~";

export default function ProjectsShowcase() {
    const sectionRef = useRef(null);
    const headingWrapperRef = useRef(null);
    const heading3DRef = useRef(null);
    const glitchRedRef = useRef(null);
    const glitchCyanRef = useRef(null);
    const lettersRef = useRef([]);
    const intervalsRef = useRef(new Map());

    const textWord1 = "FEATURED";
    const textWord2 = "PROJECTS";

    // Cyberpunk Scramble / Decode effect for a letter with active interval management
    const scrambleLetter = useCallback((element, originalChar, duration = 600) => {
        if (!element || !originalChar || originalChar === ' ') return;

        // Clear any existing active interval for this element
        if (intervalsRef.current.has(element)) {
            clearInterval(intervalsRef.current.get(element));
            intervalsRef.current.delete(element);
        }

        const startTime = Date.now();
        const intervalId = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime >= duration) {
                element.textContent = originalChar;
                clearInterval(intervalId);
                intervalsRef.current.delete(element);
            } else {
                element.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }
        }, 35);

        intervalsRef.current.set(element, intervalId);
    }, []);

    // Cyberpunk Glitch burst trigger
    const triggerGlitchBurst = useCallback(() => {
        if (!heading3DRef.current || !glitchRedRef.current || !glitchCyanRef.current) return;

        const tl = gsap.timeline();

        tl.to([glitchRedRef.current, glitchCyanRef.current], {
            opacity: 0.85,
            duration: 0.04,
            ease: "none",
        })
            .to(glitchRedRef.current, {
                x: -8,
                y: 3,
                skewX: -14,
                clipPath: 'polygon(0 15%, 100% 15%, 100% 45%, 0 45%)',
                duration: 0.05,
                ease: "none",
            }, 0)
            .to(glitchCyanRef.current, {
                x: 8,
                y: -3,
                skewX: 14,
                clipPath: 'polygon(0 55%, 100% 55%, 100% 85%, 0 85%)',
                duration: 0.05,
                ease: "none",
            }, 0)
            .to(heading3DRef.current, {
                x: -3,
                y: 2,
                duration: 0.04,
                ease: "none",
            }, 0)
            // Step 2: Slice shift & invert jitter
            .to(glitchRedRef.current, {
                x: 6,
                y: -4,
                skewX: 8,
                clipPath: 'polygon(0 40%, 100% 40%, 100% 70%, 0 70%)',
                duration: 0.05,
                ease: "none",
            })
            .to(glitchCyanRef.current, {
                x: -6,
                y: 4,
                skewX: -8,
                clipPath: 'polygon(0 0%, 100% 0%, 100% 35%, 0 35%)',
                duration: 0.05,
                ease: "none",
            }, "<")
            .to(heading3DRef.current, {
                x: 3,
                y: -2,
                duration: 0.04,
                ease: "none",
            }, "<")
            // Step 3: Snap back to rest
            .to([glitchRedRef.current, glitchCyanRef.current], {
                x: 0,
                y: 0,
                skewX: 0,
                opacity: 0,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                duration: 0.08,
                ease: "power2.out",
            })
            .to(heading3DRef.current, {
                x: 0,
                y: 0,
                duration: 0.08,
                ease: "power2.out",
            }, "<");
    }, []);

    useEffect(() => {
        const intervals = intervalsRef.current;
        const ctx = gsap.context(() => {
            // Set 3D perspective transform styles
            gsap.set(headingWrapperRef.current, { perspective: 1200 });
            gsap.set(heading3DRef.current, { transformStyle: "preserve-3d" });

            // Initial 3D Tumble + Cyberpunk Decode Entrance
            lettersRef.current.forEach((el, index) => {
                if (!el) return;
                const char = el.getAttribute('data-char') || el.textContent;

                // Decode Scramble effect
                scrambleLetter(el, char, 500 + index * 35);

                // 3D Entrance Tween
                gsap.fromTo(
                    el,
                    {
                        opacity: 0,
                        rotateX: -100,
                        rotateY: (index % 2 === 0 ? 40 : -40),
                        z: -260,
                        scale: 0.4,
                        filter: "blur(8px) brightness(2.5)",
                    },
                    {
                        opacity: 1,
                        rotateX: 0,
                        rotateY: 0,
                        z: 0,
                        scale: 1,
                        filter: "blur(0px) brightness(1)",
                        duration: 1.1,
                        delay: 0.1 + index * 0.035,
                        ease: "back.out(2)",
                    }
                );
            });

            // Ambient 3D floating effect
            gsap.to(heading3DRef.current, {
                y: -6,
                rotateX: 3,
                rotateZ: 0.5,
                duration: 3,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
            });

            // Periodic Cyberpunk Random Micro-Glitch
            const glitchInterval = setInterval(() => {
                triggerGlitchBurst();
                // Randomly scramble a couple of random letters during glitch
                const randomIdx = Math.floor(Math.random() * lettersRef.current.length);
                const targetEl = lettersRef.current[randomIdx];
                if (targetEl) {
                    scrambleLetter(targetEl, targetEl.getAttribute('data-char') || targetEl.textContent, 280);
                }
            }, 4000);

            return () => {
                clearInterval(glitchInterval);
            };
        }, sectionRef);

        return () => {
            ctx.revert();
            intervals.forEach((id) => clearInterval(id));
            intervals.clear();
        };
    }, [scrambleLetter, triggerGlitchBurst]);

    // 3D Mouse Parallax Tilt Handlers
    const handleMouseMove = (e) => {
        if (!headingWrapperRef.current || !heading3DRef.current) return;
        const rect = headingWrapperRef.current.getBoundingClientRect();
        const mouseX = e.clientX - (rect.left + rect.width / 2);
        const mouseY = e.clientY - (rect.top + rect.height / 2);

        const xPercent = mouseX / (rect.width / 2);
        const yPercent = mouseY / (rect.height / 2);

        gsap.to(heading3DRef.current, {
            rotateY: xPercent * 22,
            rotateX: -yPercent * 16,
            translateZ: 35,
            duration: 0.35,
            ease: "power2.out",
        });

        // 3D Chromatic aberration separation based on mouse angle
        if (glitchRedRef.current && glitchCyanRef.current) {
            gsap.to(glitchRedRef.current, {
                x: -xPercent * 6,
                y: -yPercent * 4,
                opacity: Math.min(Math.abs(xPercent) * 0.45 + 0.1, 0.6),
                duration: 0.35,
            });
            gsap.to(glitchCyanRef.current, {
                x: xPercent * 6,
                y: yPercent * 4,
                opacity: Math.min(Math.abs(xPercent) * 0.45 + 0.1, 0.6),
                duration: 0.35,
            });
        }
    };

    const handleMouseLeave = () => {
        if (!heading3DRef.current) return;
        gsap.to(heading3DRef.current, {
            rotateX: 0,
            rotateY: 0,
            translateZ: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.4)",
        });
        if (glitchRedRef.current && glitchCyanRef.current) {
            gsap.to([glitchRedRef.current, glitchCyanRef.current], {
                x: 0,
                y: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
            });
        }
        // Ensure all letters restore their character on mouse leave
        lettersRef.current.forEach((el) => {
            if (!el) return;
            const char = el.getAttribute('data-char');
            if (char) el.textContent = char;
        });
    };

    // Hover on entire heading triggers immediate 3D glitch burst
    const handleHeadingMouseEnter = () => {
        triggerGlitchBurst();
    };

    // Hover on individual 3D letter
    const handleLetterHover = (index) => {
        const el = lettersRef.current[index];
        if (!el) return;
        const char = el.getAttribute('data-char') || el.textContent;
        scrambleLetter(el, char, 350);

        gsap.timeline()
            .to(el, {
                z: 60,
                scale: 1.25,
                color: '#00ffff',
                textShadow: '0 0 25px #00ffff, 0 0 50px #00ffff',
                duration: 0.12,
                ease: "power2.out",
            })
            .to(el, {
                z: 0,
                scale: 1,
                color: index < textWord1.length ? '#ffffff' : '#22d3ee',
                textShadow: index < textWord1.length
                    ? '0 1px 0 #d4d4d8, 0 2px 0 #a1a1aa, 0 3px 0 #71717a, 0 4px 0 #52525b, 0 5px 0 #3f3f46, 0 6px 0 #27272a, 0 7px 0 #18181b, 0 10px 20px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.3)'
                    : '0 1px 0 #38bdf8, 0 2px 0 #0ea5e9, 0 3px 0 #0284c7, 0 4px 0 #0369a1, 0 5px 0 #075985, 0 6px 0 #0c4a6e, 0 7px 0 #082f49, 0 10px 20px rgba(0,0,0,0.8), 0 0 25px rgba(0,240,255,0.7), 0 0 50px rgba(14,165,233,0.4)',
                duration: 0.35,
                ease: "back.out(2)",
            });
    };

    let globalLetterIndex = 0;

    return (
        <section ref={sectionRef} className="w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
            {/* Cyberpunk 3D Heading Container */}
            <div
                ref={headingWrapperRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleHeadingMouseEnter}
                className="text-center mb-16 relative cursor-pointer py-6"
                style={{ perspective: '1200px' }}
            >
                {/* Cyberpunk HUD status badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                    SYS.ARCHIVE // PROJECT_INIT
                </div>

                {/* 3D Master Heading Wrapper */}
                <div className="relative inline-block" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Chromatic Aberration Red Glitch Layer */}
                    <h2
                        ref={glitchRedRef}
                        aria-hidden="true"
                        className="font-beon text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider uppercase absolute inset-0 pointer-events-none opacity-0 select-none"
                        style={{
                            color: '#ff0055',
                            textShadow: '0 0 15px #ff0055, 0 0 30px #ff0055',
                            transform: 'translateZ(-15px)',
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <span>{textWord1}</span>{' '}
                        <span>{textWord2}</span>
                    </h2>

                    {/* Chromatic Aberration Cyan Glitch Layer */}
                    <h2
                        ref={glitchCyanRef}
                        aria-hidden="true"
                        className="font-beon text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider uppercase absolute inset-0 pointer-events-none opacity-0 select-none"
                        style={{
                            color: '#00f0ff',
                            textShadow: '0 0 15px #00f0ff, 0 0 30px #00f0ff',
                            transform: 'translateZ(15px)',
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <span>{textWord1}</span>{' '}
                        <span>{textWord2}</span>
                    </h2>

                    {/* Main Interactive 3D Glitch Heading */}
                    <h2
                        ref={heading3DRef}
                        className="font-beon text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider uppercase relative inline-block transition-transform duration-75"
                        style={{
                            transformStyle: 'preserve-3d',
                            willChange: 'transform',
                        }}
                    >
                        {/* Word 1: FEATURED (3D Metallic Titanium & White Extrusion) */}
                        <span
                            className="inline-block text-white mr-3 sm:mr-5"
                            style={{
                                transformStyle: 'preserve-3d',
                                textShadow: '0 1px 0 #d4d4d8, 0 2px 0 #a1a1aa, 0 3px 0 #71717a, 0 4px 0 #52525b, 0 5px 0 #3f3f46, 0 6px 0 #27272a, 0 7px 0 #18181b, 0 10px 20px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.3)',
                            }}
                        >
                            {textWord1.split('').map((char, i) => {
                                const currIdx = globalLetterIndex++;
                                return (
                                    <span
                                        key={`w1-${i}`}
                                        ref={(el) => (lettersRef.current[currIdx] = el)}
                                        data-char={char}
                                        onMouseEnter={() => handleLetterHover(currIdx)}
                                        className="inline-block transition-colors duration-150"
                                        style={{
                                            transformStyle: 'preserve-3d',
                                            display: 'inline-block',
                                            willChange: 'transform',
                                        }}
                                    >
                                        {char}
                                    </span>
                                );
                            })}
                        </span>

                        {/* Word 2: PROJECTS (3D Cyberpunk Neon Cyan/Blue Extrusion) */}
                        <span
                            className="inline-block text-cyan-400"
                            style={{
                                transformStyle: 'preserve-3d',
                                textShadow: '0 1px 0 #38bdf8, 0 2px 0 #0ea5e9, 0 3px 0 #0284c7, 0 4px 0 #0369a1, 0 5px 0 #075985, 0 6px 0 #0c4a6e, 0 7px 0 #082f49, 0 10px 20px rgba(0,0,0,0.8), 0 0 25px rgba(0,240,255,0.7), 0 0 50px rgba(14,165,233,0.4)',
                            }}
                        >
                            {textWord2.split('').map((char, i) => {
                                const currIdx = globalLetterIndex++;
                                return (
                                    <span
                                        key={`w2-${i}`}
                                        ref={(el) => (lettersRef.current[currIdx] = el)}
                                        data-char={char}
                                        onMouseEnter={() => handleLetterHover(currIdx)}
                                        className="inline-block transition-colors duration-150"
                                        style={{
                                            transformStyle: 'preserve-3d',
                                            display: 'inline-block',
                                            willChange: 'transform',
                                        }}
                                    >
                                        {char}
                                    </span>
                                );
                            })}
                        </span>
                    </h2>
                </div>

                {/* Sub-label description */}
                <p className="mt-4 text-xs sm:text-sm font-mono text-zinc-400 max-w-xl mx-auto tracking-widest">
                    [ EXPLORE PRODUCTION BUILDS & CLIENT ARCHITECTURES ]
                </p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, idx) => (
                    <ProjectCard key={idx} project={project} index={idx} variant="cyberpunk" priority={idx < 5} />
                ))}
            </div>
        </section>
    );
}