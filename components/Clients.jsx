"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa';
import styles from '@/app/styles/Clients.module.css';

const Clients = () => {
  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const brands = [
    { id: 1, name: 'Crystal Pro', logo: '/brands/crystalpro-logo.svg' },
    { id: 2, name: 'Eva The Label', logo: '/brands/evathelabel.webp' },
    { id: 3, name: 'Funded Gen Z', logo: '/brands/fundedgenz.png' },
    { id: 4, name: 'Goblu EV', logo: '/brands/goblu-ev.png' },
    { id: 5, name: 'Prachar', logo: '/brands/prachar.png' },
    { id: 6, name: 'Ruvazh Blue', logo: '/brands/ruvazhblue.jfif' },
    { id: 7, name: 'Samskara', logo: '/brands/samskara.png' },
    { id: 8, name: 'VCare', logo: '/brands/vcare.png' },
    { id: 9, name: 'Lioness', logo: '/brands/lioness.webp' },
    { id: 10, name: 'ASGEICS', logo: '/brands/ASGEICS.svg' },
    { id: 11, name: 'Varam Solar', logo: '/brands/varam-solar.png' },
    { id: 12, name: 'IFB', logo: '/brands/ifb.png' },
  ];

  const originalBrandsLength = brands.length;

  // Client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Device detection
  useEffect(() => {
    if (!isClient) return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, [isClient]);

  // Initialize carousel animation
  useEffect(() => {
    if (!isClient || !carouselRef.current) return;

    const carousel = carouselRef.current;
    const brandWidth = isMobile ? 136 : 200;
    const totalWidth = brandWidth * originalBrandsLength;

    // Create infinite scroll animation
    animationRef.current = gsap.to(carousel, {
      x: -totalWidth,
      duration: 25,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    });

    // Auto-pause on hover (desktop only)
    const handleMouseEnter = () => {
      if (!isMobile && animationRef.current) {
        setIsHovered(true);
        animationRef.current.pause();
      }
    };

    const handleMouseLeave = () => {
      if (!isMobile && animationRef.current && !isPaused) {
        setIsHovered(false);
        animationRef.current.resume();
      }
    };

    if (!isMobile) {
      carousel.addEventListener('mouseenter', handleMouseEnter);
      carousel.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      if (!isMobile) {
        carousel.removeEventListener('mouseenter', handleMouseEnter);
        carousel.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isClient, isMobile, isPaused, originalBrandsLength]);

  // Update current index based on position
  const updateCurrentIndex = useCallback(() => {
    if (!isClient || !carouselRef.current || !animationRef.current) return;

    const currentX = gsap.getProperty(carouselRef.current, 'x');
    const brandWidth = isMobile ? 136 : 200;
    const newIndex = Math.round(Math.abs(currentX) / brandWidth) % originalBrandsLength;
    setCurrentIndex(newIndex);
  }, [isClient, isMobile, originalBrandsLength]);

  // Track animation progress
  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(updateCurrentIndex, 100);
    return () => clearInterval(interval);
  }, [isClient, updateCurrentIndex]);

  // Desktop control functions
  const handlePlayPause = useCallback(() => {
    if (!isClient || !animationRef.current) return;

    if (isPaused || isHovered) {
      animationRef.current.resume();
      setIsPaused(false);
    } else {
      animationRef.current.pause();
      setIsPaused(true);
    }
  }, [isClient, isPaused, isHovered]);

  const handlePrevious = useCallback(() => {
    if (!isClient || !animationRef.current || !carouselRef.current) return;

    const brandWidth = isMobile ? 136 : 200;
    const currentX = gsap.getProperty(carouselRef.current, 'x');
    const newX = currentX + brandWidth;

    gsap.to(carouselRef.current, {
      x: newX,
      duration: 0.5,
      ease: "power2.out",
      onComplete: updateCurrentIndex
    });
  }, [isClient, isMobile, updateCurrentIndex]);

  const handleNext = useCallback(() => {
    if (!isClient || !animationRef.current || !carouselRef.current) return;

    const brandWidth = isMobile ? 136 : 200;
    const currentX = gsap.getProperty(carouselRef.current, 'x');
    const newX = currentX - brandWidth;

    gsap.to(carouselRef.current, {
      x: newX,
      duration: 0.5,
      ease: "power2.out",
      onComplete: updateCurrentIndex
    });
  }, [isClient, isMobile, updateCurrentIndex]);

  // Brand indicator click
  const handleIndicatorClick = useCallback((index) => {
    if (!isClient || !carouselRef.current) return;

    const brandWidth = isMobile ? 136 : 200;
    const targetX = -index * brandWidth;

    gsap.to(carouselRef.current, {
      x: targetX,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        setCurrentIndex(index);
        updateCurrentIndex();
      }
    });
  }, [isClient, isMobile, updateCurrentIndex]);

  // Mobile touch functions
  const onTouchStart = useCallback((e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, handleNext, handlePrevious]);

  // Keyboard navigation
  useEffect(() => {
    if (!isClient) return;

    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        handlePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isClient, handlePrevious, handleNext, handlePlayPause]);

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) {
    return (
      <section className={styles.clientsSection}>
        <div className={styles.clientsContainer}>
          <h2 className={`${styles.heading}`}>Trusted by Industry Leaders</h2>
          <div className={styles.carouselWrapper}>
            <div className={styles.carousel}>
              {brands.map((brand, index) => (
                <div key={brand.id} className={styles.brandItem}>
                  <div className={styles.brandLogo}>
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} company logo`}
                      width={120}
                      height={60}
                      className={styles.logoImage}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.clientsSection} role="region" aria-label="Client brands showcase">
      <div className={styles.clientsContainer}>
        <h2 className={styles.heading}>Trusted by Founders</h2>

        {/* Desktop Controls */}
        {!isMobile && (
          <div className={styles.desktopControls} role="toolbar" aria-label="Carousel controls">
            <button 
              className={styles.controlButton}
              onClick={handlePrevious}
              aria-label="Previous brands"
              type="button"
            >
              <FaChevronLeft />
            </button>

            <button 
              className={styles.playPauseButton}
              onClick={handlePlayPause}
              aria-label={isPaused || isHovered ? "Resume carousel" : "Pause carousel"}
              type="button"
            >
              {(isPaused || isHovered) ? <FaPlay /> : <FaPause />}
            </button>

            <button 
              className={styles.controlButton}
              onClick={handleNext}
              aria-label="Next brands"
              type="button"
            >
              <FaChevronRight />
            </button>
          </div>
        )}

        <div className={styles.carouselWrapper}>
          <div 
            ref={carouselRef} 
            className={styles.carousel}
            onTouchStart={isMobile ? onTouchStart : undefined}
            onTouchMove={isMobile ? onTouchMove : undefined}
            onTouchEnd={isMobile ? onTouchEnd : undefined}
            role="marquee"
            aria-live="polite"
            aria-label="Brand logos carousel"
          >
            {[...brands, ...brands].map((brand, index) => (
              <div 
                key={`${brand.id}-${index}`} 
                className={styles.brandItem}
                role="img"
                aria-label={`${brand.name} logo`}
              >
                <div className={styles.brandLogo}>
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} company logo`}
                    width={isMobile ? 80 : 120}
                    height={isMobile ? 40 : 60}
                    className={styles.logoImage}
                    loading="lazy"
                    quality={90}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Swipe Indicator */}
        {isMobile && (
          <div className={styles.mobileIndicator} aria-live="polite">
            <span>← Swipe to control →</span>
          </div>
        )}

        {/* Brand indicators */}
        <div 
          className={styles.indicators} 
          role="tablist" 
          aria-label="Brand carousel navigation"
        >
          {Array.from({ length: originalBrandsLength }, (_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === currentIndex ? styles.active : ''
              }`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Go to ${brands[index]?.name || 'brand'} ${index + 1}`}
              aria-selected={index === currentIndex}
              role="tab"
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;