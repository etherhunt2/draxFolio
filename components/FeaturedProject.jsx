'use client';

import React from 'react';
import ProjectCard from './LaptopImage/ProjectCard';
import CyberpunkHeading from './CyberpunkHeading';

const projects = [
    {
        title: 'Eva The Label',
        description: 'High-end e-commerce brand platform featuring interactive lookbooks and seamless checkout flow.',
        images: ['/portfolio/evaTheLabel/eva1.png', '/portfolio/evaTheLabel/eva2.png', '/portfolio/evaTheLabel/eva3.png', '/portfolio/evaTheLabel/eva4.png', '/portfolio/evaTheLabel/eva5.png', '/portfolio/evaTheLabel/eva6.png'],
        link: 'https://www.evathelabel.es/',
        github: '',
        tags: ['React', 'Next.js', 'Tailwind CSS'],
    },
    {
        title: 'Samskara',
        description: 'Interactive wellness booking platform built for community engagement and appointment scheduling.',
        images: ['/portfolio/samskara/samskara1.png', '/portfolio/samskara/samskara2.png', '/portfolio/samskara/samskara3.png', '/portfolio/samskara/samskara4.png', '/portfolio/samskara/samskara5.png', '/portfolio/samskara/samskara6.png'],
        link: 'https://samskara.app/',
        github: '',
        tags: ['Next.js', 'TypeScript', 'Node.js'],
    },
    {
        title: 'Prachar',
        description: 'Marketing campaign and advertising platform designed for rapid customer outreach.',
        images: ['/portfolio/prachar/prachar1.png', '/portfolio/prachar/prachar2.png', '/portfolio/prachar/prachar3.png', '/portfolio/prachar/prachar4.png', '/portfolio/prachar/prachar5.png'],
        link: 'https://pracharr.vercel.app/',
        github: 'https://github.com/etherhunt2/prachar',
        tags: ['React.js', 'Next.JS', 'Node.js', 'Vercel'],
    },
    {
        title: 'Asgeics India',
        description: 'Enterprise operations and field service network management system.',
        images: ['/portfolio/asgeicsIndia/asgeics1.png', '/portfolio/asgeicsIndia/asgeics2.png', '/portfolio/asgeicsIndia/asgeics3.png', '/portfolio/asgeicsIndia/asgeics4.png', '/portfolio/asgeicsIndia/asgeics5.png'],
        link: 'https://asgeicsindia.vercel.app/',
        github: 'https://github.com/etherhunt2/asgeics-new',
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

export default function ProjectsShowcase() {
    return (
        <section className="w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
            {/* Cyberpunk 3D Heading */}
            {/* <CyberpunkHeading /> */}

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, idx) => (
                    <ProjectCard key={idx} project={project} index={idx} variant="cyberpunk" priority={idx < 5} />
                ))}
            </div>
        </section>
    );
}