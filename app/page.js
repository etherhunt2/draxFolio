"use client";

import About from '@/components/About';
import Dock from '@/utils/Dock';
import './globals.css';
import Skills from '@/components/Skills';
import Blackboard from '@/components/Blackboard';
import Portfolio from '@/components/Portfolio';
import Particles from '@/utils/Particles';
import { FaHome } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { TbWorldWww } from "react-icons/tb";
import { GiSkills } from "react-icons/gi";
import Contact from '@/components/Contact';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useEffect, useRef, useState } from 'react';

// Register GSAP plugins
gsap.registerPlugin(Draggable);

export default function Home() {
  const [marginTop, setMarginTop] = useState('100vh');
  const dockRef = useRef(null);
  const skillRefs = useRef([]);

  useEffect(() => {
    const updateMarginTop = () => {
      const width = window.innerWidth;
      if (width < 576) {
        // Extra small devices (phones, less than 576px)
        setMarginTop('400vh');
      } else if (width >= 576 && width < 768) {
        // Small devices (tablets, 576px and up)
        setMarginTop('250vh');
      } else if (width >= 576 && width < 768) {
        // Small devices (tablets, 576px and up)
        setMarginTop('200vh');
      } else if (width >= 768 && width < 992) {
        // Medium devices (desktops, 768px and up)
        setMarginTop('190vh');
      } else if (width >= 992 && width < 1200) {
        // Large devices (large desktops, 992px and up)
        setMarginTop('120vh');
      } else {
        // Extra large devices (1200px and up)
        setMarginTop('100vh');
      }
    };

    updateMarginTop();
    window.addEventListener('resize', updateMarginTop);

    if (dockRef.current) {
      Draggable.create(dockRef.current, {
        type: "x,y",
        edgeResistance: 0.65,
        bounds: window,
        inertia: true
      });
    }
  }, []);

  const items = [
    { icon: <FaHome size={18} />, label: 'Home', to: 'about' },
    { icon: <GiSkills size={18} />, label: 'Skills', to: 'skills' },
    { icon: <TbWorldWww size={18} />, label: 'Portfolio', to: 'portfolio' },
    { icon: <IoMdContact size={18} />, label: 'Contact', to: 'contact' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={1000}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={200}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>
      <div id="relative-div" style={{ position: 'relative', zIndex: 1, overflowY: 'scroll', height: '100vh' }}>
        <div id="about">
          <About />
        </div>
        <div id="skills" className="flex container">
          <Blackboard>
            <Skills ref={skillRefs} />
          </Blackboard>
        </div>
        {/*<div style={{ marginTop: `${marginTop}` }}></div>*/}
        <div id="portfolio">
          <Portfolio />
        </div>
        <div id="contact">
          <Contact />
        </div>
        <div className="dock-container" ref={dockRef} style={{ cursor: 'grab' }}>
          <Dock
            items={items.map(item => ({
              ...item,
              icon: (
                <div onClick={() => scrollToSection(item.to)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </div>
              )
            }))}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
          />
        </div>
      </div>
    </div>
  );
}