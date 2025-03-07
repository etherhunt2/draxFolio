"use client";

import React, { useEffect, useRef } from 'react';
import { LuShipWheel } from "react-icons/lu";
import '@/app/styles/Blackboard.css';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const handleNailClick = () => {
    document.querySelector('.blackboard').scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Blackboard = ({ children }) => {
    const wheelRef = useRef(null);
    const ropeBeforeRef = useRef(null);
    const ropeAfterRef = useRef(null);
    const blackboardRef = useRef(null);

    useEffect(() => {
        const ropes = [ropeBeforeRef.current, ropeAfterRef.current];
        const blackboard = blackboardRef.current;

        gsap.set(ropes, { transformOrigin: 'top center', marginTop: '5vh' });
        gsap.set(blackboard, { transformOrigin: 'top center' });

        // Enforce 90-degree angle between ropes
        const enforceRopeAngle = () => {
            const ropeBeforeRotation = gsap.getProperty(ropeBeforeRef.current, 'rotation');
            const ropeAfterRotation = gsap.getProperty(ropeAfterRef.current, 'rotation');

            const isMobile = window.innerWidth <= 768;
            const angleDifference = isMobile ? 35 : 45;

            // Ensure the angle between ropes is always the specified degrees
            if (Math.abs(ropeBeforeRotation - ropeAfterRotation) !== -angleDifference) {
                gsap.to(ropeAfterRef.current, {
                    rotation: ropeBeforeRotation + angleDifference,
                    duration: 0.1,
                    ease: 'power1.inOut',
                });
                gsap.to(ropeBeforeRef.current, {
                    rotation: ropeAfterRotation - angleDifference,
                    duration: 0.1,
                    ease: 'power1.inOut',
                });
            }
        };

        // Blackboard drag animation
        Draggable.create(blackboard, {
            type: 'rotation',
            bounds: { minRotation: -45, maxRotation: 45 }, // Adjust rotation bounds
            onDrag: function () {
                // Rotate the blackboard and ropes together
                gsap.set(blackboard, { rotation: this.rotation });
                gsap.set(ropeBeforeRef.current, { rotation: this.rotation + 45 }); // Maintain 45-degree angle
                gsap.set(ropeAfterRef.current, { rotation: this.rotation - 45 }); // Maintain 45-degree angle

                //enforceRopeAngle(); // Enforce the 45-degree rule during drag
                // Rotate the wheel icon based on drag direction
                if (this.rotation < 0) {
                    // Drag to the left (clockwise rotation)
                    gsap.to(wheelRef.current, {
                        rotation: `+=${-this.rotation}`,
                        ease: "power1.inOut",
                        duration: 0.1,
                    });
                } else if (this.rotation > 0) {
                    // Drag to the right (anti-clockwise rotation)
                    gsap.to(wheelRef.current, {
                        rotation: `-=${this.rotation}`,
                        ease: "power1.inOut",
                        duration: 0.1,
                    });
                }
            },
            onDragEnd: function () {
                // Return the blackboard and ropes to their original positions
                gsap.to([blackboard, ropeBeforeRef.current, ropeAfterRef.current], {
                    rotation: 0,
                    duration: 5,
                    ease: 'elastic.out(2, 0.3)',
                    onComplete: enforceRopeAngle, // Enforce the 45-degree rule after animation
                });
                // Return the wheel icon to its original position
                gsap.to(wheelRef.current, {
                    rotation: 0,
                    duration: 5,
                    ease: 'elastic.out(5, 0.3)',
                });
            },
        });
    }, []);

    return (
        <div className="blackboard-container" style={{ marginBottom: '20vh' }}>
            <div className="nail" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} onClick={handleNailClick}>
                <LuShipWheel size={100} ref={wheelRef} />
            </div>
            <div className="blackboard" style={{ marginTop: '20vh' }} ref={blackboardRef}>
                {children}
            </div>
            <div className="blackboard-rope-before" ref={ropeBeforeRef}></div>
            <div className="blackboard-rope-after" ref={ropeAfterRef}></div>
        </div>
    );
};

export default Blackboard;
