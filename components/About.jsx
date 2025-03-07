"use client";

import React, { useEffect, useRef } from 'react';
import { FaCog } from 'react-icons/fa';
import { gsap } from 'gsap';
import styles from '@/app/styles/About.module.css';
import Image from 'next/image';
import profilePic from '@/public/profile.jpg'; // Adjust the path as needed

const About = () => {
    const imageRef = useRef(null); // Ref to track the image element
    const buttonTextRef = useRef(null);
    const wheelIconRef = useRef(null);

    useEffect(() => {
        // GSAP animations for heading, sub-heading, welcome message, and image
        gsap.fromTo(
            `.${styles.heading}`,
            { opacity: 0 }, // Starting state: y: -50,
            { opacity: 1, duration: 1, ease: "elastic.out(1, 0.3)" } // Ending state: y: 0,
        );

        gsap.fromTo(
            `.${styles.subHeading}`,
            { opacity: 0 }, // Starting state: y: -50,
            { opacity: 1, duration: 1, delay: 0.5, ease: "elastic.out(1, 0.3)" } // Ending state: y: 0,
        );

        gsap.fromTo(
            `.${styles.welcomeMessage}`,
            { opacity: 0 }, // Starting state: y: -50,
            { opacity: 1, duration: 1, delay: 1, ease: "elastic.out(1, 0.3)" } // Ending state: y: 0,
        );

        gsap.fromTo(
            `.${styles.profilePic}`,
            { opacity: 0 }, // Starting state: scale: 0.5,
            { opacity: 1, duration: 1, delay: 1.5, ease: "elastic.out(1, 0.3)" } // Ending state: scale: 1,
        );

        // Bubble generation logic
        const bubbleContainer = document.querySelector(`.${styles.bubbleContainer}`);

        if (bubbleContainer && imageRef.current) {
            const imageRect = imageRef.current.getBoundingClientRect();

            // Calculate top-middle and bottom-middle points of the image
            const topMiddle = {
                x: imageRect.left + imageRect.width / 2, // X-coordinate of the top-middle
                y: imageRect.top, // Y-coordinate of the top-middle
            };

            const bottomMiddle = {
                x: imageRect.left + imageRect.width / 2, // X-coordinate of the bottom-middle
                y: imageRect.bottom, // Y-coordinate of the bottom-middle
            };

            const createBubble = (originX, originY) => {
                const bubble = document.createElement('div');
                bubble.className = styles.bubble;

                // Random direction for bubble movement
                const angle = Math.random() * 2 * Math.PI;
                const distance = Math.random() * 200 + 100; // Random distance
                const targetX = originX + Math.cos(angle) * distance;
                const targetY = originY + Math.sin(angle) * distance;

                // Initial position at origin
                bubble.style.left = `${originX}px`;
                bubble.style.top = `${originY}px`;

                // Random size for bubble
                const size = Math.random() * 20 + 10; // Random size between 10px and 30px
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;

                // Append bubble to container
                bubbleContainer.appendChild(bubble);

                // GSAP animation for bubble movement and growth
                gsap.to(bubble, {
                    x: targetX - originX,
                    y: targetY - originY,
                    scale: 2, // Grow bubble size
                    opacity: 0, // Fade out
                    duration: Math.random() * 3 + 2, // Random duration between 2s and 5s
                    ease: "power2.out",
                    onUpdate: function () {
                        const bubbleRect = bubble.getBoundingClientRect();
                        if (bubbleRect.left <= 0 || bubbleRect.right >= window.innerWidth) {
                            gsap.to(bubble, {
                                scale: 3,
                                opacity: 0,
                                duration: 0.2,
                                onComplete: () => {
                                    bubble.remove();
                                },
                            });
                        }
                    },
                    onComplete: () => {
                        bubble.remove(); // Remove bubble after animation
                    },
                });

                // Hover effect to burst bubble
                bubble.addEventListener('mouseenter', () => {
                    gsap.to(bubble, {
                        scale: 3,
                        opacity: 0,
                        duration: 0.2,
                        onComplete: () => {
                            bubble.remove();
                        },
                    });
                });
            };

            // Generate bubbles from top-middle and bottom-middle points
            const interval = setInterval(() => {
                createBubble(topMiddle.x, topMiddle.y);
                createBubble(bottomMiddle.x, bottomMiddle.y);
            }, 500); // Generate bubbles every 500ms

            // Cleanup interval on component unmount
            return () => clearInterval(interval);
        }
        // Scroll event listener for rotating text and icon
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

        // Cleanup scroll event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`${styles.aboutSection} flex items-center justify-between md:p-8 md:mx-20`}>
            <div className={`${styles.textContent} flex-1 md:mr-20`}>
                <h1 className={`${styles.heading} md:text-9xl text-5xl font-bold font-alegreya text-center md:text-end`}>Sharnagat Yogesh</h1>
                <h2 className={`${styles.subHeading} font-rouge-script text-center md:text-end`}>Freelance Developer</h2>
                <p className={`${styles.welcomeMessage} md:mt-4 mt-1 md:text-5xl text-4xl capitalize md:text-end text-center`}>Welcome to my portfolio!</p>
            </div>
            <div className={`${styles.profilePic} flex-shrink-0 md:ml-8 md:pr-24 relative`} ref={imageRef}>
                <Image
                    src={profilePic}
                    alt="Profile Picture"
                    width={350}
                    height={200}
                    className="rounded-full"
                />
                <div className={`${styles.bubbleContainer} absolute top-0 left-0 w-full h-full pointer-events-none`}></div>
            </div>
        </div>
    );
};

export default About;