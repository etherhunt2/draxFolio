import React, { useEffect, useRef, forwardRef } from 'react';
import styles from '@/app/styles/SkillBar.module.css';
import { gsap } from 'gsap';

const SkillBar = forwardRef(({ title, percentage, label }, ref) => {
  const progressRef = useRef(null);
  const numberRef = useRef(null);
  const skillBarRef = useRef(null);
  const yearRef = useRef(null);

  const animateProgress = () => {
    if (!progressRef.current || !numberRef.current) return;
    gsap.to(progressRef.current, {
      width: `${percentage}%`,
      left: `${percentage}%`,
      duration: 2,
      ease: 'power1.out',
      onUpdate: () => {
        if (!progressRef.current || !numberRef.current) return;
        const currentWidth = parseFloat(progressRef.current.style.width) || 0;
        numberRef.current.style.left = `calc(${currentWidth}% - 1.25rem)`;
        numberRef.current.textContent = `${Math.round(currentWidth)}%`;
      },
      onComplete: () => {
        if (progressRef.current) {
          progressRef.current.classList.add(`${styles.glow}`);
        }
      },
    });
  };

  const resetProgress = () => {
    if (!progressRef.current || !numberRef.current) return;
    gsap.to(progressRef.current, {
      width: '0%',
      duration: 0.5,
      ease: 'power1.out',
      onUpdate: () => {
        if (!numberRef.current) return;
        numberRef.current.style.left = '0%';
        numberRef.current.textContent = '0%';
      },
      onComplete: () => {
        if (progressRef.current) {
          progressRef.current.classList.remove(`${styles.glow}`);
        }
      },
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateProgress();
          } else {
            if (progressRef.current && progressRef.current.style && progressRef.current.style.width !== '0%') {
              resetProgress();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (skillBarRef.current) {
      observer.observe(skillBarRef.current);
    }

    return () => {
      if (skillBarRef.current) {
        observer.unobserve(skillBarRef.current);
      }
      if (progressRef.current) {
        gsap.killTweensOf(progressRef.current);
      }
    };
  }, [percentage]);

  return (
    <div className={styles.skillBar} ref={skillBarRef}>
      <div className={styles.title}>
        <span className='titlee'>{title}</span>
        <div className="inline-block mb-2 ms-[calc(25%-1.25rem)] py-0.5 px-1.5 bg-green-50 border border-green-200 text-xs font-semibold text-yellow-600 rounded-lg dark:bg-blue-800/30 dark:border-blue-800 dark:text-slate-500 boxShadowrr" ref={yearRef}>{label}+ years</div>
      </div>
      <div className='relative w-full'>
        <div
          className="absolute inline-block mt-3 py-0.5 px-1.5 bg-blue-50 border border-blue-200 text-xs font-medium text-blue-600 rounded-lg dark:bg-blue-800/30 dark:border-blue-800 dark:text-blue-500"
          ref={numberRef}
          style={{ left: '0%' }}
        >
          0%
        </div>
        <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
          <div className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500" style={{ width: '0%' }} ref={progressRef}></div>
        </div>
      </div>
    </div>
  );
});

export default SkillBar;