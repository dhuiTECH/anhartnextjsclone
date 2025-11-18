/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has TypeScript type errors.
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  eslint: {
    // Allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  experimental: {
    // Enable CSS optimization to inline critical CSS and defer non-critical CSS
    // This reduces render-blocking resources and improves LCP
    optimizeCss: true,
  },
  compiler: {
    // Target modern browsers to avoid unnecessary polyfills
    // This prevents polyfills for features like Array.prototype.at, Object.fromEntries, etc.
    // that are already supported in modern browsers
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Configure SWC to target modern browsers
  swcMinify: true,
};

module.exports = nextConfig;