"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '@/app/styles/About.module.css';
import Image from 'next/image';
import profilePic from '@/public/profile.jpg';

const About = () => {
    const headingRef = useRef(null);
    const subHeadingRef = useRef(null);
    const welcomeMessageRef = useRef(null);
    const profilePicRef = useRef(null);
    const imageRef = useRef(null);
    const bubbleContainerRef = useRef(null);
    const buttonTextRef = useRef(null);
    const wheelIconRef = useRef(null);
    const activeBubblesRef = useRef([]);

    useEffect(() => {
        // Direct React ref animations for heading, sub-heading, welcome message, and image
        if (headingRef.current) {
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: -30 },
                { opacity: 1, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" }
            );
        }

        if (subHeadingRef.current) {
            gsap.fromTo(
                subHeadingRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "elastic.out(1, 0.3)" }
            );
        }

        if (welcomeMessageRef.current) {
            gsap.fromTo(
                welcomeMessageRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "elastic.out(1, 0.3)" }
            );
        }

        if (profilePicRef.current) {
            gsap.fromTo(
                profilePicRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 1, delay: 0.8, ease: "elastic.out(1, 0.3)" }
            );
        }

        // Bubble generation logic
        const bubbleContainer = bubbleContainerRef.current;
        let bubbleInterval = null;
        let cleanupInterval = null;

        if (bubbleContainer && imageRef.current) {
            const createBubble = (originX, originY) => {
                if (!bubbleContainerRef.current) return;
                const bubble = document.createElement('div');
                bubble.className = styles.bubble || 'bubble';

                const angle = Math.random() * 2 * Math.PI;
                const distance = Math.random() * 200 + 100;
                const targetX = originX + Math.cos(angle) * distance;
                const targetY = originY + Math.sin(angle) * distance;

                bubble.style.left = `${originX}px`;
                bubble.style.top = `${originY}px`;

                const size = Math.random() * 20 + 10;
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;

                bubbleContainer.appendChild(bubble);

                const bubbleEntry = { element: bubble, createdAt: Date.now() };
                activeBubblesRef.current.push(bubbleEntry);

                gsap.to(bubble, {
                    x: targetX - originX,
                    y: targetY - originY,
                    scale: 2,
                    opacity: 0,
                    duration: Math.random() * 3 + 2,
                    ease: "power2.out",
                    onUpdate: function () {
                        if (!bubble.parentNode) return;
                        const bubbleRect = bubble.getBoundingClientRect();
                        if (bubbleRect.left <= 0 || bubbleRect.right >= window.innerWidth) {
                            gsap.to(bubble, {
                                scale: 3,
                                opacity: 0,
                                duration: 0.2,
                                onComplete: () => {
                                    if (bubble.parentNode) bubble.remove();
                                    activeBubblesRef.current = activeBubblesRef.current.filter(b => b.element !== bubble);
                                },
                            });
                        }
                    },
                    onComplete: () => {
                        if (bubble.parentNode) bubble.remove();
                        activeBubblesRef.current = activeBubblesRef.current.filter(b => b.element !== bubble);
                    },
                });

                bubble.addEventListener('mouseenter', () => {
                    gsap.to(bubble, {
                        scale: 3,
                        opacity: 0,
                        duration: 0.2,
                        onComplete: () => {
                            if (bubble.parentNode) bubble.remove();
                            activeBubblesRef.current = activeBubblesRef.current.filter(b => b.element !== bubble);
                        },
                    });
                });
            };

            bubbleInterval = setInterval(() => {
                if (!imageRef.current || !bubbleContainerRef.current) return;
                const imageRect = imageRef.current.getBoundingClientRect();
                const containerRect = bubbleContainerRef.current.getBoundingClientRect();

                const topMiddle = {
                    x: imageRect.left - containerRect.left + imageRect.width / 2,
                    y: imageRect.top - containerRect.top,
                };

                const bottomMiddle = {
                    x: imageRect.left - containerRect.left + imageRect.width / 2,
                    y: imageRect.bottom - containerRect.top,
                };

                createBubble(topMiddle.x, topMiddle.y);
                createBubble(bottomMiddle.x, bottomMiddle.y);
            }, 600);

            cleanupInterval = setInterval(() => {
                const now = Date.now();
                const oldBubbles = activeBubblesRef.current.filter(b => now - b.createdAt > 5000);
                oldBubbles.forEach(b => {
                    gsap.killTweensOf(b.element);
                    if (b.element.parentNode) {
                        b.element.remove();
                    }
                });
                activeBubblesRef.current = activeBubblesRef.current.filter(b => now - b.createdAt <= 5000);
            }, 5000);
        }

        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (buttonTextRef.current && wheelIconRef.current) {
                gsap.to(buttonTextRef.current, {
                    rotation: scrollY,
                    ease: "none",
                    duration: 0,
                });
                gsap.to(wheelIconRef.current, {
                    rotation: -scrollY,
                    ease: "none",
                    duration: 0,
                });
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            if (bubbleInterval) clearInterval(bubbleInterval);
            if (cleanupInterval) clearInterval(cleanupInterval);
            window.removeEventListener('scroll', handleScroll);
            activeBubblesRef.current.forEach(b => {
                gsap.killTweensOf(b.element);
                if (b.element.parentNode) {
                    b.element.remove();
                }
            });
            activeBubblesRef.current = [];
        };
    }, []);

    return (
        <div className={`${styles.aboutSection || ''} flex flex-col md:flex-row items-center justify-between w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-12`}>
            {/* Left 50% Text Content */}
            <div className={`${styles.textContent || ''} w-full md:w-1/2 flex flex-col justify-center items-center md:items-end text-center md:text-end md:pr-8 lg:pr-12`}>
                <h1 ref={headingRef} className={`${styles.heading || ''} text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold font-alegreya leading-tight`}>
                    Sharnagat Yogesh
                </h1>
                <h2 ref={subHeadingRef} className={`${styles.subHeading || ''} font-rouge-script`}>
                    Freelance Developer
                </h2>
                <p ref={welcomeMessageRef} className={`${styles.welcomeMessage || ''} mt-2 md:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl capitalize`}>
                    Welcome to my portfolio!
                </p>
            </div>

            {/* Right 50% Image Container */}
            <div ref={profilePicRef} className={`${styles.profilePic || ''} w-full md:w-1/2 flex justify-center items-center relative mt-10 md:mt-0`}>
                <div 
                    ref={imageRef} 
                    className="relative w-56 h-72 sm:w-64 sm:h-[340px] md:w-[320px] md:h-[440px] lg:w-[380px] lg:h-[520px] xl:w-[430px] xl:h-[580px] rounded-[50%] overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.25)] border-4 border-cyan-500/40"
                >
                    <Image
                        src={profilePic}
                        alt="Profile Picture"
                        fill
                        sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 320px, (max-width: 1280px) 380px, 430px"
                        className="object-cover"
                        priority
                    />
                </div>
                <div ref={bubbleContainerRef} className={`${styles.bubbleContainer || ''} absolute top-0 left-0 w-full h-full pointer-events-none`}></div>
            </div>
        </div>
    );
};

export default About;