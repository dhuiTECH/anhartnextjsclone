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
};

module.exports = nextConfig;