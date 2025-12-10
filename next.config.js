/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Performance optimizations
  // `swcMinify` is no longer a recognized option in newer Next.js versions.
  // Next automatically uses its optimization/minifier; remove this key to avoid warnings.
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Suppress hydration warnings caused by browser extensions (e.g., Grammarly)
  reactStrictMode: true,
  // Optimize production build
  poweredByHeader: false,
  compress: true,
  // This will suppress the hydration mismatch warnings in development
  ...(process.env.NODE_ENV === 'development' && {
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    },
  }),
};

module.exports = nextConfig;
