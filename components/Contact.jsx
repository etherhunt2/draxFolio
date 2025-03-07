"use client";

import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { gsap } from 'gsap';
import { FaInstagram, FaFacebook, FaLinkedin, FaWhatsappSquare } from 'react-icons/fa';
import styles from '@/app/styles/Contact.module.css';
import Link from 'next/link';

const Contact = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const infoRef = useRef(null);
    const socialIconsRef = useRef([]);
    const formRef = useRef(null);
    const headingRef = useRef([]);
    const contactRef = useRef(null);
    const letterRef = useRef([]);
    const letterRef2 = useRef([]);
    const cursor0Ref = useRef(null);
    const cursor1Ref = useRef(null);
    const tl = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Contact info animation
                        gsap.fromTo(infoRef.current, { opacity: 0, x: -150 }, { opacity: 1, x: 0, duration: 2.5, ease: 'power3.out' });

                        // Contact form animation
                        gsap.fromTo(formRef.current, { opacity: 0, x: 150 }, { opacity: 1, x: 0, duration: 2.5, ease: 'power3.out' });

                        // Heading animation
                        if (!tl.current) {
                            tl.current = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });

                            // Heading animation
                            headingRef.current.forEach((span, index) => {
                                tl.current.to(span, { textShadow: "0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff", duration: 0.5, ease: 'power3.out' }, index * 1.1)
                                    .to(span, { textShadow: "none", duration: 1.5, ease: 'power3.out' });
                            });
                            tl.current.to(headingRef.current, { textShadow: "0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff", duration: 0.5, ease: 'power3.out' })
                                .to(headingRef.current, { textShadow: "none", duration: 1.7, ease: 'power3.out' })
                                .to(headingRef.current, { textShadow: "0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff", duration: 0.5, ease: 'power3.out' })
                                .to(headingRef.current, { textShadow: "none", duration: 1.5, ease: 'power3.out' });

                            // Step 1: Type the first sentence ("Have Requirement?")
                            letterRef.current.forEach((letter, index) => {
                                tl.current.to(letter, { opacity: 1, duration: 0.2, ease: 'power3.out' }, index * 0.2)
                                    .to(cursor0Ref.current, { x: `+=${letter.offsetWidth}`, duration: 0.2, ease: 'power3.out' }, index * 0.2);
                            });

                            // Step 2: Glow neon effect for the first sentence (once)
                            tl.current.to(letterRef.current, { textShadow: "0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff", duration: 0.5, ease: 'power3.out' })
                                .to(letterRef.current, { textShadow: "none", duration: 1.1, ease: 'power3.out' });

                            // Step 3: Delete the first sentence letter by letter
                            letterRef.current.slice().reverse().forEach((letter, index) => {
                                tl.current.to(letter, { opacity: 0, duration: 0.05, ease: 'power3.out' })
                                    .to(cursor0Ref.current, { x: `-=${letter.offsetWidth}`, duration: 0.05, ease: 'power3.out' });
                            });

                            // Step 4: Type the second sentence ("Let's Discuss")
                            letterRef2.current.forEach((letter, index) => {
                                tl.current.to(letter, { opacity: 1, duration: 0.2, ease: 'power3.out' })
                                    .to(cursor1Ref.current, { x: `+=${letter.offsetWidth}`, duration: 0.2, ease: 'power3.out' });
                            });

                            // Step 5: Glow neon effect for the second sentence (twice)
                            tl.current.to(letterRef2.current, { textShadow: "0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff", duration: 0.5, ease: 'power3.out' })
                                .to(letterRef2.current, { textShadow: "none", duration: 1.7, ease: 'power3.out' })
                                .to(letterRef2.current, { textShadow: "0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff", duration: 0.5, ease: 'power3.out' })
                                .to(letterRef2.current, { textShadow: "none", duration: 1.5, ease: 'power3.out' });

                            // Step 6: Delete the second sentence letter by letter
                            letterRef2.current.slice().reverse().forEach((letter, index) => {
                                tl.current.to(letter, { opacity: 0, duration: 0.05, ease: 'power3.out' })
                                    .to(cursor1Ref.current, { x: `-=${letter.offsetWidth}`, duration: 0.05, ease: 'power3.out' });
                            });
                        } else {
                            tl.current.play();
                        }
                    } else {
                        if (tl.current) {
                            tl.current.pause();
                        }
                    }
                });
            },
            { threshold: 0.2 } // Adjust the threshold as needed
        );

        if (contactRef.current) {
            observer.observe(contactRef.current);
        }

        return () => {
            if (contactRef.current) {
                observer.unobserve(contactRef.current);
            }
        };
    }, []);

    const onSubmit = data => {
        <Link to={'https://wa.me/message/7BW2TQQULFA7N1'} target='_blank' legacyBehavior />;
    };

    return (
        <div className={styles.contactContainer} ref={contactRef}>
            <div className={styles.infoContainer} ref={infoRef}>
                <h2 className={`text-5xl md:text-8xl font-semibold ${styles.heading}`}>
                    <span ref={el => headingRef.current[0] = el}>Get</span>
                    <span ref={el => headingRef.current[1] = el}>In</span>
                    <span ref={el => headingRef.current[2] = el}>Touch</span>
                </h2>
                <p>Phone: +91 6287 658728</p>
                <p>Email: sharnagatyogesh2@gmail.com</p>
                <p>Address: Kankarbagh, Patna, Bihar, India</p>
                <div className={`${styles.socialContainer} socialContainerr`}>
                    <Link href="https://www.instagram.com/raising_swag/" legacyBehavior>
                        <a className="text-neon-green" target="_blank" rel="noopener noreferrer">
                            <FaInstagram ref={el => socialIconsRef.current[0] = el} className={styles.socialIcon} />
                        </a>
                    </Link>
                    <Link href="https://www.facebook.com/sharnagat.yogesh.9/" legacyBehavior>
                        <a className="text-neon-green" target="_blank" rel="noopener noreferrer">
                            <FaFacebook ref={el => socialIconsRef.current[1] = el} className={styles.socialIcon} />
                        </a>
                    </Link>
                    <Link href="https://www.linkedin.com/in/sharnagat-yogesh/" legacyBehavior>
                        <a className="text-neon-green" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin ref={el => socialIconsRef.current[2] = el} className={styles.socialIcon} />
                        </a>
                    </Link>
                    <Link href="https://wa.me/message/7BW2TQQULFA7N1" legacyBehavior>
                        <a className="text-neon-green" target="_blank" rel="noopener noreferrer">
                            <FaWhatsappSquare ref={el => socialIconsRef.current[3] = el} className={styles.socialIcon} />
                        </a>
                    </Link>
                </div>
            </div>
            <div className={styles.formContainer} ref={formRef}>
                <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} formm`}>
                    <h2 className={`text-xl font-beon ${styles.subHeading}`} style={{ position: 'relative', height: '1.5em', zIndex: 100 }}>
                        <span className='firstSentence' style={{ position: 'absolute', left: '0px' }}>
                            <span ref={el => letterRef.current[0] = el} style={{ opacity: 0 }}>
                                H <span ref={cursor0Ref} className={styles.cursor}>|</span>
                            </span>
                            <span ref={el => letterRef.current[1] = el} style={{ opacity: 0 }}>a</span>
                            <span ref={el => letterRef.current[2] = el} style={{ opacity: 0 }}>v</span>
                            <span ref={el => letterRef.current[3] = el} style={{ opacity: 0 }}>e</span>
                            <span ref={el => letterRef.current[4] = el} style={{ opacity: 0 }}>{` `}</span> {/*Space between two words*/}
                            <span ref={el => letterRef.current[5] = el} style={{ opacity: 0 }}>R</span>
                            <span ref={el => letterRef.current[6] = el} style={{ opacity: 0 }}>e</span>
                            <span ref={el => letterRef.current[7] = el} style={{ opacity: 0 }}>q</span>
                            <span ref={el => letterRef.current[8] = el} style={{ opacity: 0 }}>u</span>
                            <span ref={el => letterRef.current[9] = el} style={{ opacity: 0 }}>i</span>
                            <span ref={el => letterRef.current[10] = el} style={{ opacity: 0 }}>r</span>
                            <span ref={el => letterRef.current[11] = el} style={{ opacity: 0 }}>e</span>
                            <span ref={el => letterRef.current[12] = el} style={{ opacity: 0 }}>m</span>
                            <span ref={el => letterRef.current[13] = el} style={{ opacity: 0 }}>e</span>
                            <span ref={el => letterRef.current[14] = el} style={{ opacity: 0 }}>n</span>
                            <span ref={el => letterRef.current[15] = el} style={{ opacity: 0 }}>t</span>
                            <span ref={el => letterRef.current[16] = el} style={{ opacity: 0 }}>?</span>
                        </span>
                        <span className='secondSentence' style={{ position: 'absolute', left: '0px' }}>
                            <span ref={el => letterRef2.current[0] = el} style={{ opacity: 0 }}>
                                L <span ref={cursor1Ref} className={styles.cursor}>|</span>
                            </span>
                            <span ref={el => letterRef2.current[1] = el} style={{ opacity: 0 }}>e</span>
                            <span ref={el => letterRef2.current[2] = el} style={{ opacity: 0 }}>t'</span>
                            <span ref={el => letterRef2.current[3] = el} style={{ opacity: 0 }}>s</span>
                            <span ref={el => letterRef2.current[4] = el} style={{ opacity: 0 }}>{` `}</span>{/*space between two words*/}
                            <span ref={el => letterRef2.current[5] = el} style={{ opacity: 0 }}>D</span>
                            <span ref={el => letterRef2.current[6] = el} style={{ opacity: 0 }}>i</span>
                            <span ref={el => letterRef2.current[7] = el} style={{ opacity: 0 }}>s</span>
                            <span ref={el => letterRef2.current[8] = el} style={{ opacity: 0 }}>c</span>
                            <span ref={el => letterRef2.current[9] = el} style={{ opacity: 0 }}>u</span>
                            <span ref={el => letterRef2.current[10] = el} style={{ opacity: 0 }}>s</span>
                            <span ref={el => letterRef2.current[11] = el} style={{ opacity: 0 }}>s</span>
                        </span>
                    </h2>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input id="name" {...register('name', { required: true })} />
                        {errors.name && <span className={styles.error}>This field is required</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" {...register('email', { required: true })} />
                        {errors.email && <span className={styles.error}>This field is required</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="message">Message</label>
                        <textarea id="message" {...register('message', { required: true })}></textarea>
                        {errors.message && <span className={styles.error}>This field is required</span>}
                    </div>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </div>
        </div >
    );
};

export default Contact;