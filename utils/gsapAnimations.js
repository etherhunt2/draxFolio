export const fadeIn = (element) => {
  gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 1 });
};

export const slideIn = (element) => {
  gsap.fromTo(element, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
};

export const bounce = (element) => {
  gsap.to(element, { y: -30, yoyo: true, repeat: 1, duration: 0.5 });
};