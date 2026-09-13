/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Automatically convert and serve modern formats to supported browsers
    formats: ['image/avif', 'image/webp'],

    // Allow full range of quality levels (including default 75, 85, 90, 95, 100)
    qualities: [10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 85, 90, 95, 100],

    // Enable SVG image rendering with security sandbox
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // Standard device breakpoints for responsive image generation
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Allow loading images from external/remote URLs
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
