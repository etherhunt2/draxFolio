'use client';

import React, { useEffect, useRef } from 'react';
import ProjectCard from './LaptopImage/ProjectCard';
import Link from 'next/link';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: 'Ruvazh',
        description: 'Jewelry Manufacturing platform built for high-throughput retail & wholesale business operations.',
        images: ['/portfolio/ruvazh/ruv1.png', '/portfolio/ruvazh/ruv2.png', '/portfolio/ruvazh/ruv3.png', '/portfolio/ruvazh/ruv4.png', '/portfolio/ruvazh/ruv5.png'],
        link: 'https://ruvazh.com/',
        github: '',
        tags: ['PHP', 'Bootstrap', 'jQuery', 'MySQL'],
    },
    {
        title: 'Build Pro',
        description: 'A construction company website built with Next.js and Tailwind CSS',
        images: ['/portfolio/buildPro/build1.png', '/portfolio/buildPro/build2.png', '/portfolio/buildPro/build3.png', '/portfolio/buildPro/build4.png', '/portfolio/buildPro/build5.png', '/portfolio/buildPro/build6.png'],
        link: 'https://buildprodemo.vercel.app/',
        github: 'https://github.com/etherhunt2/buildpro',
        tags: ['Next.js', 'Tailwind CSS', 'GSAP', 'Framer-Motion'],
    },
    {
        title: 'Astro Baba',
        description: 'Dynamic astrology consultation and automated horoscope booking service platform.',
        images: ['/portfolio/astroBaba/astro1.png', '/portfolio/astroBaba/astro2.png', '/portfolio/astroBaba/astro3.png', '/portfolio/astroBaba/astro4.png', '/portfolio/astroBaba/astro5.png'],
        link: 'https://astrobabademo.vercel.app/',
        github: 'https://github.com/etherhunt2/astrobaba',
        tags: ['React.js', 'Node.js', 'Tailwind CSS'],
    },
    {
        title: 'Funded GenZ',
        description: 'Funded GenZ is a platform that helps students get funding for trading education.',
        images: ['/portfolio/fundedgenz/fundedgenz1.png', '/portfolio/fundedgenz/fundedgenz3.png', '/portfolio/fundedgenz/fundedgenz2.png'],
        link: 'https://fundedgenz.vercel.app/',
        github: 'https://github.com/etherhunt2/fundedgenz',
        tags: ['React.js', 'Vite.js', 'Tailwind CSS'],
    },
    {
        title: 'Real Estate',
        description: 'A Cyber Punk Themed, Real Estate platform built for high-throughput real estate business operations.',
        images: ['/portfolio/realEstate/realestate1.png', '/portfolio/realEstate/realestate2.png', '/portfolio/realEstate/realestate3.png', '/portfolio/realEstate/realestate4.png', '/portfolio/realEstate/realestate5.png'],
        link: 'https://realestatevue.vercel.app/',
        github: 'https://github.com/etherhunt2/estate-vue/',
        tags: ['React.js', 'Node.js', 'Tailwind CSS', 'Framer Motion'],
    },
    {
        title: 'Zee Care Hospital',
        description: 'A platform for healthcare management and patient care coordination.',
        images: ['/portfolio/zeeCareHospital/zee1.png', '/portfolio/zeeCareHospital/zee2.png', '/portfolio/zeeCareHospital/zee3.png', '/portfolio/zeeCareHospital/zee4.png', '/portfolio/zeeCareHospital/zee5.png'],
        link: 'https://zeecarehospital.vercel.app/',
        github: 'https://github.com/etherhunt2/hospital',
        tags: ['React.js', 'Vite.js', 'Tailwind CSS', 'Python-Flask'],
    },
    {
        title: 'PyramidCI',
        description: 'A platform for Man Power Hiring and Staff Provider Company.',
        images: ['/portfolio/pyramidci/pyramid1.png', '/portfolio/pyramidci/pyramid2.png', '/portfolio/pyramidci/pyramid3.png', '/portfolio/pyramidci/pyramid4.png'],
        link: 'https://pyramidci.com/',
        github: '',
        tags: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    },
    {
        title: 'KukuFM Demo',
        description: 'An OTT platform with Audio Stories and Audiobooks.',
        images: ['/portfolio/kukuFMdemo/kuku1.png', '/portfolio/kukuFMdemo/kuku2.png', '/portfolio/kukuFMdemo/kuku3.png', '/portfolio/kukuFMdemo/kuku4.png', '/portfolio/kukuFMdemo/kuku5.png'],
        link: 'https://kukufmdemo.vercel.app/',
        github: 'https://github.com/etherhunt2/kukufm',
        tags: ['React.js', 'Vite.js', 'Tailwind CSS'],
    },
    {
        title: 'Goblu EV',
        description: 'Electric mobility management portal with live charging station telemetry and fleet scheduling.',
        images: ['/portfolio/gobluEV/goblu1.png', '/portfolio/gobluEV/goblu2.png', '/portfolio/gobluEV/goblu3.png', '/portfolio/gobluEV/goblu4.png', '/portfolio/gobluEV/goblu5.png', '/portfolio/gobluEV/goblu6.png'],
        link: 'https://goblu.in/',
        github: '',
        tags: ['React.js', 'Node.js', 'Tailwind CSS'],
    },
    {
        title: 'Salaada',
        description: 'Fresh organic culinary delivery and subscription marketplace with custom order configurator.',
        images: ['/portfolio/Saladaa/salad1.png', '/portfolio/Saladaa/salad2.png', '/portfolio/Saladaa/salad3.png', '/portfolio/Saladaa/salad4.png', '/portfolio/Saladaa/salad5.png'],
        link: 'https://saladaa.com/',
        github: '',
        tags: ['Next.js', 'TypeScript', 'Stripe'],
    },
    {
        title: 'Women Up Fitness',
        description: 'Comprehensive fitness studio community app with on-demand class streaming and habit tracking.',
        images: ['/portfolio/womenUP/fitness1.png', '/portfolio/womenUP/fitness2.png', '/portfolio/womenUP/fitness3.png', '/portfolio/womenUP/fitness4.png', '/portfolio/womenUP/fitness5.png', '/portfolio/womenUP/fitness6.png', '/portfolio/womenUP/fitness7.png'],
        link: 'https://womenup.in/',
        github: '',
        tags: ['React.js', 'Firebase', 'Tailwind'],
    },
    {
        title: 'MR Lioness',
        description: 'Luxury lifestyle portfolio and editorial showcase with responsive lookbook galleries.',
        images: ['/portfolio/mrLioness/lion1.png', '/portfolio/mrLioness/lion2.png', '/portfolio/mrLioness/lion3.png', '/portfolio/mrLioness/lion4.png', '/portfolio/mrLioness/lion5.png', '/portfolio/mrLioness/lion6.png', '/portfolio/mrLioness/lion7.png'],
        link: 'https://mrlioness.com/',
        github: '',
        tags: ['Next.js', 'GSAP', 'CSS Modules'],
    },
];

export default function OlderProjects() {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);

    // Continuous Scroll-Driven Scrub & Multi-Layer Parallax
    useEffect(() => {
        const scrollerElement = typeof document !== 'undefined' ? document.getElementById('relative-div') : null;

        const ctx = gsap.context(() => {
            // Header Entrance
            if (headerRef.current) {
                gsap.fromTo(
                    headerRef.current,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: headerRef.current,
                            scroller: scrollerElement || undefined,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }

            // Batch Stagger Entrance
            const validCards = cardsRef.current.filter(Boolean);
            if (validCards.length > 0) {
                gsap.set(validCards, { opacity: 0, y: 60, scale: 0.92 });
                ScrollTrigger.batch(validCards, {
                    scroller: scrollerElement || undefined,
                    start: 'top 90%',
                    onEnter: (batch) => {
                        gsap.to(batch, {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.9,
                            stagger: 0.1,
                            ease: 'power3.out',
                        });
                    },
                });
            }

            // Parallax Scrub for each column/card
            cardsRef.current.forEach((cardEl, i) => {
                if (!cardEl) return;

                // Alternate parallax speed based on 3-column layout
                const col = i % 3;
                const parallaxDistance = col === 0 ? 35 : col === 1 ? -30 : 20;

                // Continuous Scroll-Driven Scrub Parallax
                gsap.to(cardEl, {
                    y: parallaxDistance,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        scroller: scrollerElement || undefined,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5,
                    },
                });

                // Center Sweet Spot Highlight
                gsap.to(cardEl, {
                    scale: 1.02,
                    duration: 0.4,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: cardEl,
                        scroller: scrollerElement || undefined,
                        start: 'top 65%',
                        end: 'bottom 35%',
                        toggleActions: 'play reverse play reverse',
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none"
        >
            {/* Header */}
            <div ref={headerRef} className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-blue-950/40 border border-blue-500/30 text-blue-400 text-xs font-mono tracking-widest uppercase">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_#3b82f6]" />
                    PORTFOLIO ARCHIVE // DEMO PROJECTS
                </div>

                <h2
                    className={`font-vt323 text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-widest uppercase`}
                    style={{ fontFamily: "var(--font-vt323), 'VT323', monospace" }}
                >
                    Archived &amp; <span className="text-blue-500">Client Works</span>
                </h2>
                <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
                    Continuous timeline of enterprise web applications, e-commerce architectures, and bespoke interfaces.
                </p>
            </div>

            {/* Continuous Parallax Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, idx) => (
                    <div
                        key={idx}
                        ref={(el) => (cardsRef.current[idx] = el)}
                        className="will-change-transform"
                    >
                        <ProjectCard project={project} index={idx} variant="default" />
                    </div>
                ))}
            </div>

            {/* Return Button */}
            <div className="text-center mt-16">
                <Link
                    href="/"
                    className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-[0_6px_0_0_#1d4ed8] active:shadow-none active:translate-y-[6px] transition-all duration-150"
                >
                    Back to Home
                </Link>
            </div>
        </section>
    );
}