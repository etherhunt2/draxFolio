"use client";

import React, { useEffect, useRef } from 'react';
import { LuShipWheel } from "react-icons/lu";
import '@/app/styles/Blackboard.css';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const handleNailClick = () => {
    const el = document.querySelector('.blackboard');
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

const Blackboard = ({ children }) => {
    const wheelRef = useRef(null);
    const ropeBeforeRef = useRef(null);
    const ropeAfterRef = useRef(null);
    const blackboardRef = useRef(null);

    useEffect(() => {
        if (!blackboardRef.current || !ropeBeforeRef.current || !ropeAfterRef.current) return;

        const ropes = [ropeBeforeRef.current, ropeAfterRef.current];
        const blackboard = blackboardRef.current;

        gsap.set(ropes, { transformOrigin: 'top center', marginTop: '5vh' });
        gsap.set(blackboard, { transformOrigin: 'top center' });

        // Enforce 90-degree angle between ropes
        const enforceRopeAngle = () => {
            if (!ropeBeforeRef.current || !ropeAfterRef.current) return;
            const ropeBeforeRotation = gsap.getProperty(ropeBeforeRef.current, 'rotation') || 0;
            const ropeAfterRotation = gsap.getProperty(ropeAfterRef.current, 'rotation') || 0;

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
        const draggableInstances = Draggable.create(blackboard, {
            type: 'rotation',
            bounds: { minRotation: -45, maxRotation: 45 },
            onDrag: function () {
                if (!blackboardRef.current || !ropeBeforeRef.current || !ropeAfterRef.current) return;
                gsap.set(blackboard, { rotation: this.rotation });
                gsap.set(ropeBeforeRef.current, { rotation: this.rotation + 45 });
                gsap.set(ropeAfterRef.current, { rotation: this.rotation - 45 });

                if (wheelRef.current) {
                    if (this.rotation < 0) {
                        gsap.to(wheelRef.current, {
                            rotation: `+=${-this.rotation}`,
                            ease: "power1.inOut",
                            duration: 0.1,
                        });
                    } else if (this.rotation > 0) {
                        gsap.to(wheelRef.current, {
                            rotation: `-=${this.rotation}`,
                            ease: "power1.inOut",
                            duration: 0.1,
                        });
                    }
                }
            },
            onDragEnd: function () {
                if (!blackboardRef.current || !ropeBeforeRef.current || !ropeAfterRef.current) return;
                gsap.to([blackboard, ropeBeforeRef.current, ropeAfterRef.current], {
                    rotation: 0,
                    duration: 5,
                    ease: 'elastic.out(2, 0.3)',
                    onComplete: enforceRopeAngle,
                });
                if (wheelRef.current) {
                    gsap.to(wheelRef.current, {
                        rotation: 0,
                        duration: 5,
                        ease: 'elastic.out(5, 0.3)',
                    });
                }
            },
        });

        const draggableInstance = draggableInstances && draggableInstances[0];

        const handleResize = () => {
            if (!draggableInstance) return;
            if (window.innerWidth <= 768) {
                draggableInstance.disable();
            } else {
                draggableInstance.enable();
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (draggableInstance && typeof draggableInstance.kill === 'function') {
                draggableInstance.kill();
            }
        };
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
