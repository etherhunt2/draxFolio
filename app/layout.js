"use client";

import Head from 'next/head';
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
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === 'complete') {
      handleLoad();
      return;
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <html lang="en" className={dysto.variable}>
      <Head>
        <title>Freelance Developer — Sharnagat Yogesh</title>
        <meta name="description" content="Welcome to my portfolio website. Explore my projects and skills." />
      </Head>
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
