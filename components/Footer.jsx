"use client";

import React, { useRef } from 'react';
import styler from '@/app/styles/Footer.module.css';
import styles from '@/app/styles/Contact.module.css';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsappSquare } from 'react-icons/fa';

const Footer = () => {
  const socialIconsRef = useRef([]);

  return (
    <footer
      className={`${styler.footer}fixed bottom-0 left-0 w-full bg-black/90 opacity-70 backdrop-blur-md pb-3`}
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
