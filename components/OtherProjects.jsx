'use client';

import React, { useEffect, useRef } from 'react';
import ProjectCard from './LaptopImage/ProjectCard';
import Link from 'next/link';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Goblu EV
import goblu1 from '@/public/portfolio/gobluEV/goblu1.png';
import goblu2 from '@/public/portfolio/gobluEV/goblu2.png';
import goblu3 from '@/public/portfolio/gobluEV/goblu3.png';
import goblu4 from '@/public/portfolio/gobluEV/goblu4.png';
import goblu5 from '@/public/portfolio/gobluEV/goblu5.png';
import goblu6 from '@/public/portfolio/gobluEV/goblu6.png';

// Salaada
import salad1 from '@/public/portfolio/Saladaa/salad1.png';
import salad2 from '@/public/portfolio/Saladaa/salad2.png';
import salad3 from '@/public/portfolio/Saladaa/salad3.png';
import salad4 from '@/public/portfolio/Saladaa/salad4.png';
import salad5 from '@/public/portfolio/Saladaa/salad5.png';

// Women Up Fitness
import fitness1 from '@/public/portfolio/womenUP/fitness1.png';
import fitness2 from '@/public/portfolio/womenUP/fitness2.png';
import fitness3 from '@/public/portfolio/womenUP/fitness3.png';
import fitness4 from '@/public/portfolio/womenUP/fitness4.png';
import fitness5 from '@/public/portfolio/womenUP/fitness5.png';
import fitness6 from '@/public/portfolio/womenUP/fitness6.png';
import fitness7 from '@/public/portfolio/womenUP/fitness7.png';

// MR Lioness
import lion1 from '@/public/portfolio/mrLioness/lion1.png';
import lion2 from '@/public/portfolio/mrLioness/lion2.png';
import lion3 from '@/public/portfolio/mrLioness/lion3.png';
import lion4 from '@/public/portfolio/mrLioness/lion4.png';
import lion5 from '@/public/portfolio/mrLioness/lion5.png';
import lion6 from '@/public/portfolio/mrLioness/lion6.png';
import lion7 from '@/public/portfolio/mrLioness/lion7.png';

// Astro baba
import astro1 from '@/public/portfolio/astroBaba/astro1.png';
import astro2 from '@/public/portfolio/astroBaba/astro2.png';
import astro3 from '@/public/portfolio/astroBaba/astro3.png';
import astro4 from '@/public/portfolio/astroBaba/astro4.png';
import astro5 from '@/public/portfolio/astroBaba/astro5.png';

// Ruvazh blue
import ruv1 from '@/public/portfolio/ruvazh/ruv1.png';
import ruv2 from '@/public/portfolio/ruvazh/ruv2.png';
import ruv3 from '@/public/portfolio/ruvazh/ruv3.png';
import ruv4 from '@/public/portfolio/ruvazh/ruv4.png';
import ruv5 from '@/public/portfolio/ruvazh/ruv5.png';

//Funded GenZ
import gen1 from '@/public/portfolio/fundedgenz/fundedgenz1.png';
import gen3 from '@/public/portfolio/fundedgenz/fundedgenz3.png';
import gen2 from '@/public/portfolio/fundedgenz/fundedgenz2.png';

//Real Estate
import re1 from '@/public/portfolio/realEstate/realestate1.png';
import re2 from '@/public/portfolio/realEstate/realestate2.png';
import re3 from '@/public/portfolio/realEstate/realestate3.png';
import re4 from '@/public/portfolio/realEstate/realestate4.png';
import re5 from '@/public/portfolio/realEstate/realestate5.png';

//Zee Care Hospital
import zee1 from '@/public/portfolio/zeeCareHospital/zee1.png';
import zee2 from '@/public/portfolio/zeeCareHospital/zee2.png';
import zee3 from '@/public/portfolio/zeeCareHospital/zee3.png';
import zee4 from '@/public/portfolio/zeeCareHospital/zee4.png';
import zee5 from '@/public/portfolio/zeeCareHospital/zee5.png';

// Build Pro
import build1 from '@/public/portfolio/buildPro/build1.png';
import build2 from '@/public/portfolio/buildPro/build2.png';
import build3 from '@/public/portfolio/buildPro/build3.png';
import build4 from '@/public/portfolio/buildPro/build4.png';
import build5 from '@/public/portfolio/buildPro/build5.png';
import build6 from '@/public/portfolio/buildPro/build6.png';

//PyramidCI
import py1 from '@/public/portfolio/pyramidci/pyramid1.png';
import py2 from '@/public/portfolio/pyramidci/pyramid2.png';
import py3 from '@/public/portfolio/pyramidci/pyramid3.png';
import py4 from '@/public/portfolio/pyramidci/pyramid4.png';

//KukuFM Demo
import kuku1 from '@/public/portfolio/kukuFMdemo/kuku1.png';
import kuku2 from '@/public/portfolio/kukuFMdemo/kuku2.png';
import kuku3 from '@/public/portfolio/kukuFMdemo/kuku3.png';
import kuku4 from '@/public/portfolio/kukuFMdemo/kuku4.png';
import kuku5 from '@/public/portfolio/kukuFMdemo/kuku5.png';

const projects = [
    {
        title: 'Ruvazh',
        description: 'Jewelry Manufacturing platform built for high-throughput retail & wholesale business operations.',
        images: [ruv1, ruv2, ruv3, ruv4, ruv5],
        link: 'https://ruvazh.com/',
        github: '',
        tags: ['PHP', 'Bootstrap', 'jQuery', 'MySQL'],
    },
    {
        title: 'Build Pro',
        description: 'A construction company website built with Next.js and Tailwind CSS',
        images: [build1, build2, build3, build4, build5, build6],
        link: 'https://buildprodemo.vercel.app/',
        github: 'https://github.com/etherhunt2/buildpro',
        tags: ['Next.js', 'Tailwind CSS', 'GSAP', 'Framer-Motion'],
    },
    {
        title: 'Astro Baba',
        description: 'Dynamic astrology consultation and automated horoscope booking service platform.',
        images: [astro1, astro2, astro3, astro4, astro5],
        link: 'https://astrobabademo.vercel.app/',
        github: 'https://github.com/etherhunt2/astrobaba',
        tags: ['React.js', 'Node.js', 'Tailwind CSS'],
    },
    {
        title: 'Funded GenZ',
        description: 'Funded GenZ is a platform that helps students get funding for trading education.',
        images: [gen1, gen3, gen2],
        link: 'https://fundedgenz.vercel.app/',
        github: 'https://github.com/etherhunt2/fundedgenz',
        tags: ['React.js', 'Vite.js', 'Tailwind CSS'],
    },
    {
        title: 'Real Estate',
        description: 'A Cyber Punk Themed, Real Estate platform built for high-throughput real estate business operations.',
        images: [re1, re2, re3, re4, re5],
        link: 'https://realestatevue.vercel.app/',
        github: 'https://github.com/etherhunt2/estate-vue/',
        tags: ['React.js', 'Node.js', 'Tailwind CSS', 'Framer Motion'],
    },
    {
        title: 'Zee Care Hospital',
        description: 'A platform for healthcare management and patient care coordination.',
        images: [zee1, zee2, zee3, zee4, zee5],
        link: 'https://zeecarehospital.vercel.app/',
        github: 'https://github.com/etherhunt2/hospital',
        tags: ['React.js', 'Vite.js', 'Tailwind CSS', 'Python-Flask'],
    },
    {
        title: 'PyramidCI',
        description: 'A platform for Man Power Hiring and Staff Provider Company.',
        images: [py1, py2, py3, py4],
        link: 'https://pyramidci.com/',
        github: '',
        tags: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    },
    {
        title: 'KukuFM Demo',
        description: 'An OTT platform with Audio Stories and Audiobooks.',
        images: [kuku1, kuku2, kuku3, kuku4, kuku5],
        link: 'https://kukufmdemo.vercel.app/',
        github: 'https://github.com/etherhunt2/kukufm',
        tags: ['React.js', 'Vite.js', 'Tailwind CSS'],
    },
    {
        title: 'Goblu EV',
        description: 'Electric mobility management portal with live charging station telemetry and fleet scheduling.',
        images: [goblu1, goblu2, goblu3, goblu4, goblu5, goblu6],
        link: 'https://goblu.in/',
        github: '',
        tags: ['React.js', 'Node.js', 'Tailwind CSS'],
    },
    {
        title: 'Salaada',
        description: 'Fresh organic culinary delivery and subscription marketplace with custom order configurator.',
        images: [salad1, salad2, salad3, salad4, salad5],
        link: 'https://saladaa.com/',
        github: '',
        tags: ['Next.js', 'TypeScript', 'Stripe'],
    },
    {
        title: 'Women Up Fitness',
        description: 'Comprehensive fitness studio community app with on-demand class streaming and habit tracking.',
        images: [fitness1, fitness2, fitness3, fitness4, fitness5, fitness6, fitness7],
        link: 'https://womenup.in/',
        github: '',
        tags: ['React.js', 'Firebase', 'Tailwind'],
    },
    {
        title: 'MR Lioness',
        description: 'Luxury lifestyle portfolio and editorial showcase with responsive lookbook galleries.',
        images: [lion1, lion2, lion3, lion4, lion5, lion6, lion7],
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

            // Parallax Scrub for each column/card
            cardsRef.current.forEach((cardEl, i) => {
                if (!cardEl) return;

                // Alternate parallax speed based on 3-column layout
                const col = i % 3;
                const parallaxDistance = col === 0 ? 35 : col === 1 ? -30 : 20;

                // Initial Stagger Entrance
                gsap.fromTo(
                    cardEl,
                    {
                        opacity: 0,
                        y: 60,
                        scale: 0.92,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.9,
                        delay: (i % 3) * 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: cardEl,
                            scroller: scrollerElement || undefined,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

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