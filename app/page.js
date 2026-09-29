import HomeClient from "./HomeClient";

export const metadata = {
  title: 'Freelance Developer Portfolio',
  description: `Freelance full-stack developer skilled in React, Node.js, Next.js, and Python.
   Building modern e-commerce, ERP, and bespoke web apps tailored for founders. Hire now!`,
  keywords: [
    'full-stack developer',
    'React developer',
    'Node.js developer',
    'Next.js developer',
    'PHP developer',
    'web development',
    'e-commerce development',
    'ERP development',
    'bespoke web apps',
    'freelance developer',
    'hire developer',
  ],
  author: 'Sharnagat Yogesh',
};

export default function Home() {
  return <HomeClient />;
}
