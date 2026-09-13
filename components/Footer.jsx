"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styler from '@/app/styles/Footer.module.css';
import styles from '@/app/styles/Contact.module.css';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsappSquare } from 'react-icons/fa';

const Footer = () => {
  const socialIconsRef = useRef([]);
  const jumpTl = useRef(null);

  useEffect(() => {
    jumpTl.current = gsap.timeline({ repeat: -1 });
    socialIconsRef.current.forEach((icon, index) => {
      if (icon) {
        jumpTl.current.to(icon, {
          y: -20,
          rotation: 180,
          duration: 0.3,
          ease: "power2.out"
        }, index * 0.6)
        .to(icon, {
          y: 0,
          rotation: 360,
          duration: 0.3,
          ease: "power2.in"
        }, index * 0.6 + 0.3)
        .set(icon, { rotation: 0 }, index * 0.6 + 0.6);
      }
    });

    return () => {
      if (jumpTl.current) {
        jumpTl.current.kill();
      }
    };
  }, []);

  const handleMouseEnter = (index) => {
    if (jumpTl.current) jumpTl.current.pause();
    gsap.to(socialIconsRef.current[index], { scale: 1.5, duration: 0.3 });
  };

  const handleMouseLeave = (index) => {
    gsap.to(socialIconsRef.current[index], { scale: 1, duration: 0.3 });
    if (jumpTl.current) jumpTl.current.play();
  };

  return (
    <footer
      className={`${styler.footer} w-full bg-black/90 opacity-70 backdrop-blur-md pb-3`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-6">
          <div className='flex md:flex-col items-center justify-center mt-6'>
            <p className="text-sm text-gray-300">
              &copy; 2022 Sharnagat Yogesh. All rights reserved.
            </p>
          </div>
          <div className={`${styler.socialBox} flex md:flex-col items-center justify-center`}>
            <div className={`${styles.socialContainer} socialContainerr px-5`}>
              <Link href="https://www.instagram.com/raising_swag/" className="text-neon-green" target="_blank" rel="noopener noreferrer" onMouseEnter={() => handleMouseEnter(0)} onMouseLeave={() => handleMouseLeave(0)}>
                <FaInstagram ref={el => socialIconsRef.current[0] = el} className={styles.socialIcon} />
              </Link>
              <Link href="https://www.facebook.com/sharnagat.yogesh.9/" className="text-neon-green" target="_blank" rel="noopener noreferrer" onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={() => handleMouseLeave(1)}>
                <FaFacebook ref={el => socialIconsRef.current[1] = el} className={styles.socialIcon} />
              </Link>
              <Link href="https://www.linkedin.com/in/sharnagat-yogesh/" className="text-neon-green" target="_blank" rel="noopener noreferrer" onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={() => handleMouseLeave(2)}>
                <FaLinkedin ref={el => socialIconsRef.current[2] = el} className={styles.socialIcon} />
              </Link>
              <Link href="https://wa.me/message/7BW2TQQULFA7N1" className="text-neon-green" target="_blank" rel="noopener noreferrer" onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={() => handleMouseLeave(3)}>
                <FaWhatsappSquare ref={el => socialIconsRef.current[3] = el} className={styles.socialIcon} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
