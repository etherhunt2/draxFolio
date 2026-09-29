"use client";

import About from "@/components/About";
import Dock from "@/utils/Dock";
import "./globals.css";
import Skills from "@/components/Skills";
import Blackboard from "@/components/Blackboard";
import Portfolio from "@/components/Portfolio";
import Particles from "@/utils/Particles";
import { FaHome } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { TbWorldWww } from "react-icons/tb";
import { GiSkills } from "react-icons/gi";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { useEffect, useMemo, useRef, useState } from "react";
import Testimony from "@/components/Testimony";
import Clients from "@/components/Clients";
import dynamic from "next/dynamic";

// Register GSAP plugins
gsap.registerPlugin(Draggable);

// Stable reference — prevents Particles WebGL from re-initializing on every render
const PARTICLE_COLORS = ["#ffffff", "#ffffff"];

export default function HomeClient() {
  const [marginTop, setMarginTop] = useState("100vh");
  const dockRef = useRef(null);
  const skillRefs = useRef([]);

  useEffect(() => {
    const updateMarginTop = () => {
      const blackboard = document.querySelector('.blackboard');
      if (blackboard) {
        const windowHeight = window.innerHeight;
        // The container is 100vh. The blackboard is absolute, starting at ~20vh.
        const blackboardBottom = (windowHeight * 0.2) + blackboard.offsetHeight;
        
        // If the blackboard is taller than the 100vh container, calculate the overflow
        if (blackboardBottom > windowHeight) {
          // Add overflow amount + 150px padding to prevent overlap with Portfolio
          const extraMargin = blackboardBottom - windowHeight + 150;
          setMarginTop(`${extraMargin}px`);
        } else {
          // Default small padding if it fits perfectly
          setMarginTop("15vh");
        }
      } else {
        // Fallback for when blackboard is not found yet
        const width = window.innerWidth;
        if (width < 576) {
          setMarginTop("150vh");
        } else if (width >= 576 && width < 768) {
          setMarginTop("180vh");
        } else if (width >= 768 && width < 992) {
          setMarginTop("50vh");
        } else {
          setMarginTop("30vh");
        }
      }
    };

    updateMarginTop();
    window.addEventListener("resize", updateMarginTop);

    let resizeObserver;
    const observeBlackboard = () => {
      const blackboard = document.querySelector('.blackboard');
      if (blackboard) {
        resizeObserver = new ResizeObserver(() => {
          updateMarginTop();
        });
        resizeObserver.observe(blackboard);
      } else {
        // Retry after a short delay if it's not rendered yet
        setTimeout(observeBlackboard, 100);
      }
    };
    observeBlackboard();

    if (dockRef.current) {
      Draggable.create(dockRef.current, {
        type: "x,y",
        edgeResistance: 0.65,
        bounds: window,
        inertia: true,
        allowEventDefault: true,
      });
    }

    return () => {
      window.removeEventListener("resize", updateMarginTop);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  const items = [
    { icon: <FaHome size={18} />, label: "Home", to: "about" },
    { icon: <GiSkills size={18} />, label: "Skills", to: "skills" },
    { icon: <TbWorldWww size={18} />, label: "Portfolio", to: "portfolio" },
    { icon: <IoMdContact size={18} />, label: "Contact", to: "contact" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0,
        }}
      >
        <Particles
          particleColors={PARTICLE_COLORS}
          particleCount={500}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={200}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>
      <div
        id="relative-div"
        style={{
          position: "relative",
          zIndex: 1,
          overflowY: "scroll",
          height: "100vh",
        }}
      >
        <div id="about">
          <About />
        </div>
        <div id="clients">
          <Clients />
        </div>
        <div id="skills" className="flex container">
          <Blackboard>
            <Skills ref={skillRefs} />
          </Blackboard>
        </div>
        <div style={{ marginTop: `${marginTop}` }}></div>
        <div id="portfolio">
          <Portfolio />
        </div>
        <div id="testimony">
          <Testimony />
        </div>
        <div id="contact">
          <Contact />
        </div>
        <Footer />
        <div
          className="dock-container"
          ref={dockRef}
          style={{ cursor: "grab" }}
        >
          <Dock
            items={items.map((item) => ({
              ...item,
              icon: (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToSection(item.to);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </div>
              ),
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
