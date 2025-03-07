'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

//Eva The Label
import eva1 from '@/public/portfolio/evaTheLabel/eva1.png';
import eva2 from '@/public/portfolio/evaTheLabel/eva2.png';
import eva3 from '@/public/portfolio/evaTheLabel/eva3.png';
import eva4 from '@/public/portfolio/evaTheLabel/eva4.png';
import eva5 from '@/public/portfolio/evaTheLabel/eva5.png';
import eva6 from '@/public/portfolio/evaTheLabel/eva6.png';

//Goblu EV
import goblu1 from '@/public/portfolio/gobluEV/goblu1.png';
import goblu2 from '@/public/portfolio/gobluEV/goblu2.png';
import goblu3 from '@/public/portfolio/gobluEV/goblu3.png';
import goblu4 from '@/public/portfolio/gobluEV/goblu4.png';
import goblu5 from '@/public/portfolio/gobluEV/goblu5.png';
import goblu6 from '@/public/portfolio/gobluEV/goblu6.png';

//Salaada
import salad1 from '@/public/portfolio/Saladaa/salad1.png';
import salad2 from '@/public/portfolio/Saladaa/salad2.png';
import salad3 from '@/public/portfolio/Saladaa/salad3.png';
import salad4 from '@/public/portfolio/Saladaa/salad4.png';
import salad5 from '@/public/portfolio/Saladaa/salad5.png';

//Women Up Fitness
import fitness1 from '@/public/portfolio/womenUP/fitness1.png';
import fitness2 from '@/public/portfolio/womenUP/fitness2.png';
import fitness3 from '@/public/portfolio/womenUP/fitness3.png';
import fitness4 from '@/public/portfolio/womenUP/fitness4.png';
import fitness5 from '@/public/portfolio/womenUP/fitness5.png';
import fitness6 from '@/public/portfolio/womenUP/fitness6.png';
import fitness7 from '@/public/portfolio/womenUP/fitness7.png';

//MR Lioness
import lion1 from '@/public/portfolio/mrLioness/lion1.png';
import lion2 from '@/public/portfolio/mrLioness/lion2.png';
import lion3 from '@/public/portfolio/mrLioness/lion3.png';
import lion4 from '@/public/portfolio/mrLioness/lion4.png';
import lion5 from '@/public/portfolio/mrLioness/lion5.png';
import lion6 from '@/public/portfolio/mrLioness/lion6.png';
import lion7 from '@/public/portfolio/mrLioness/lion7.png';

const laptopData = [
    {
        images: [eva1, eva2, eva3, eva4, eva5, eva6],
        link: 'https://evathelabel.shop/',
        alt: 'Eva The Label',
        title: 'Eva The Label',
    },
    {
        images: [goblu1, goblu2, goblu3, goblu4, goblu5, goblu6],
        link: 'https://goblu-ev.com/',
        alt: 'Goblu EV',
        title: 'Goblu EV',
    },
    {
        images: [salad1, salad2, salad3, salad4, salad5],
        link: 'https://callowwebsite.code-staging.com/',
        alt: 'Saladaa',
        title: 'Saladaa',
    },
    {
        images: [fitness1, fitness2, fitness3, fitness4, fitness5, fitness6, fitness7],
        link: 'https://fitness2.code-staging.com/',
        alt: 'Woman UP',
        title: 'Woman UP',
    },
    {
        images: [lion1, lion2, lion3, lion4, lion5, lion6, lion7],
        link: 'https://mrlioness.com/',
        alt: 'Mr Lioness',
        title: 'Mr Lioness',
    },
    {
        images: [
            'https://upload.wikimedia.org/wikipedia/commons/1/19/PDF_Portfolio.png',
            'https://marketplace.canva.com/EAFwckKNjDE/2/0/1600w/canva-black-white-grayscale-portfolio-presentation-vzScEqAI__M.jpg',
            'https://cdn.cmsfly.com/635bcad9b8a74e0091632998/screenshot-2023-08-24-at-7.40.44-pm-tmc7W3.webp',
        ],
        link: '#',
        alt: 'Example Portfolio',
        title: 'Example Portfolio',
    },
    // Add more laptops here with different content
];

export default function LaptopMasonry() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-6 min-h-screen">
            {laptopData.map((laptop, index) => (
                <LaptopComponent key={index} images={laptop.images} link={laptop.link} alt={laptop.alt} title={laptop.title} />
            ))}
        </div>
    );
}

function LaptopComponent({ images, link, alt, title }) {
    const [index, setIndex] = useState(0);
    const [powerIndicator, setPowerIndicator] = useState('red');
    const laptopRef = useRef(null);
    const indicatorRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [images.length]);

    useEffect(() => {
        if (laptopRef.current) {
            Draggable.create(laptopRef.current, {
                type: "x,y",
                edgeResistance: 0.65,
                inertia: true,
                onDragEnd: function () {
                    gsap.to(laptopRef.current, {
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out",
                    });
                }
            });
        }
    }, []);

    useEffect(() => {
        if (indicatorRef.current) {
            gsap.to(indicatorRef.current, {
                opacity: 0,
                repeat: -1,
                yoyo: true,
                duration: 0.5,
                ease: "power1.inOut",
            });
        }
    }, []);

    const handleIndicatorClick = () => {
        setPowerIndicator('yellow');
        gsap.to(indicatorRef.current, {
            x: -240,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
                gsap.to(indicatorRef.current, {
                    opacity: 0,
                    repeat: -1,
                    yoyo: true,
                    duration: 0.5,
                    ease: "power1.inOut",
                });
            }
        });
    };

    return (
        <div
            ref={laptopRef}
            className="portfolioLaptop relative w-full max-w-xs bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700 cursor-pointer mx-auto"
            onClick={handleIndicatorClick}
        >
            {/* Circular Camera */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-600 rounded-full border-2 border-gray-400"></div>
            {/* Laptop Screen */}
            <div className="relative w-full h-40 bg-black rounded-md overflow-hidden border border-gray-600">
                <AnimatePresence>
                    <motion.div
                        key={index}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <img
                            src={typeof images[index] === 'string' ? images[index] : images[index].src}
                            alt={alt}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
            {/* Bottom Laptop Base */}
            <div className="w-full h-4 bg-gray-700 mt-2 rounded-b-lg flex items-center justify-center relative">
                {/* Power Indicator */}
                <div
                    ref={indicatorRef}
                    className="power-indicator w-6 h-2 rounded-full absolute"
                    style={{ backgroundColor: powerIndicator, right: '1rem', bottom: '0.3rem' }}
                ></div>
            </div>
            <Link href={link} target="_blank" rel="noopener noreferrer">
                <div className="flex items-center justify-center text-center w-full mt-4 font-bold">
                    {title}
                </div>
            </Link>
        </div>
    );
}
