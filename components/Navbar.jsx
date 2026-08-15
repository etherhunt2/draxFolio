import { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import styles from '@/app/styles/Navbar.module.css';
import RequestCV from './CV-Box/RequestCV';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`sticky top-0 z-50 bg-black ${isScrolled ? 'bg-opacity-50' : 'bg-opacity-80'} ${styles.navbar}`}>
      <div className={styles.logo}>
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold text-neon-green">The Portfolio</a>
        </Link>
      </div>
      <div className={styles.toggle}>
        <RequestCV />
        <ThemeToggle />
      </div>
    </nav>
  );
}