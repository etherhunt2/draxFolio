"use client";

import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/context/ThemeContext';
import Loader from '@/components/Loader/Loader';
import { useEffect, useState } from 'react';
import localFont from "next/font/local";

import "./globals.css";

// Load the local font
const dysto = localFont({
  src: "./font/Sddystopiandemo-GO7xa.otf",
  display: "swap", // Use 'swap' for better performance
  variable: "--font-dysto", // Assign a CSS variable
});

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleUnhandledRejection = (event) => {
      // Prevent browser crashing / noisy dev overlay on empty or undefined rejections
      if (event.reason === undefined || event.reason === null) {
        event.preventDefault();
      }
    };
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <html lang="en" className={`${dysto.variable}`}>
      <head>
        <title>Freelance Developer — Sharnagat Yogesh</title>
        <meta name="description" content="Welcome to my portfolio website. Explore my projects and skills." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cedarville+Cursive&family=Edu+NSW+ACT+Cursive:wght@400..700&family=Orbitron:wght@400..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto+Mono:wght@700&family=VT323&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          {loading && <Loader />}
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
