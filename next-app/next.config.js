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
    // Optimize package imports to reduce bundle size
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    // Ensure modern browser targets are used to avoid unnecessary polyfills
    esmExternals: true,
    // Optimize CSS loading
    optimizeCss: true,
  },
  
  // Image optimization settings
  images: {
    formats: ['image/webp', 'image/avif'],
    // Fewer sizes = fewer optimized variants = less egress (still covers common breakpoints)
    deviceSizes: [640, 750, 1080, 1200, 1920],
    imageSizes: [96, 128, 256, 384],
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Headers to improve CSS loading performance, compression, and Core Web Vitals
  async headers() {
    return [
      {
        // Security headers for all pages
        // Cache-Control is set to no-cache for pages, but will be overridden
        // by more specific rules for static assets below
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com https://googleads.g.doubleclick.net https://challenges.cloudflare.com https://cdn.cloudflare.com; script-src-elem 'self' 'unsafe-inline' blob: https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com https://googleads.g.doubleclick.net https://challenges.cloudflare.com https://cdn.cloudflare.com; worker-src 'self' blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://googleads.g.doubleclick.net; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https: https://maps.gstatic.com; connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com https://script.google.com https://*.googleusercontent.com https://*.googleapis.com https://www.google.com https://challenges.cloudflare.com https://cdn.cloudflare.com https://api.indexnow.org https://www.bing.com https://yandex.com https://*.supabase.co https://supabase.co; frame-src 'self' https://www.googletagmanager.com https://www.googletagmanager.com/ns.html https://www.youtube.com https://www.youtube-nocookie.com https://challenges.cloudflare.com https://cdn.cloudflare.com https://www.google.com https://maps.google.com;",
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
      {
        // JavaScript files - never cache to prevent stale bundles with old env vars
        // This ensures users always get fresh code after deployments
        // Note: /_next/static/ files will override this with immutable cache (see below)
        source: '/:path*.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
      {
        // Static assets - long cache, immutable, but don't index in search engines
        // This comes AFTER the JS rule to override it for /_next/static/ files
        // These files have content hashes, so they're safe to cache indefinitely
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      },
      {
        // CSS, JSON, SVG, XML - short cache with revalidation
        // Note: CSS is less critical than JS for preventing stale code issues
        source: '/:path*.{css,json,svg,xml}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
      {
        // API routes and dynamic content - never cache
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
      {
        // Media assets - long cache
        source: '/mediaAssets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
          {
            key: 'Content-Type',
            value: 'video/:ext*',
          },
        ],
      },
      {
        // Images - long cache
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
      {
        // Other assets - long cache
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ];
  },
  compiler: {
    // Target modern browsers to avoid unnecessary polyfills
    // This prevents polyfills for features like Array.prototype.at, Object.fromEntries, etc.
    // that are already supported in modern browsers
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Configure SWC to target modern browsers and avoid unnecessary polyfills
  swcMinify: true,
  
  // Redirects - consolidated from vercel.json to avoid duplicate redirect handling
  // All redirects should be here, not in vercel.json
  async redirects() {
    return [
      // Note: www to non-www redirect is handled in middleware.ts
      // to avoid conflicts and redirect loops
      // Note: /merritt to /Merritt redirect is handled in middleware.ts
      // to ensure case-sensitive matching and prevent redirect loops
      {
        source: '/partners',
        destination: '/partner',
        permanent: true, // 301 redirect
      },
      {
        source: '/the-ryder',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tag/news',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/work',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/projects/',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/impact',
        destination: '/limited-partnership',
        permanent: true,
      },
    ];
  },
  
  // NOTE: Turbopack is enabled by default in Next.js 16
  // Custom webpack configs are NOT compatible with Turbopack
  // 
  // Options:
  // 1. Use Turbopack (recommended) - Remove webpack config, Turbopack has built-in optimizations
  // 2. Use Webpack - Add `--webpack` flag to dev/build scripts and uncomment webpack config below
  //
  // For now, we're using Turbopack which automatically handles:
  // - Code splitting
  // - Tree shaking
  // - Bundle optimization
  // - Faster builds (up to 10x faster than Webpack)
  
  // Uncomment below if you need to use Webpack instead of Turbopack:
  /*
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Optimize chunk splitting for better code splitting
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Separate vendor chunks for better caching
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Separate TipTap/ProseMirror into its own chunk (admin-only)
            tiptap: {
              name: 'tiptap',
              test: /[\\/]node_modules[\\/]@tiptap[\\/]/,
              priority: 30,
              enforce: true,
            },
            // Separate ProseMirror into its own chunk
            prosemirror: {
              name: 'prosemirror',
              test: /[\\/]node_modules[\\/]prosemirror-[\\/]/,
              priority: 30,
              enforce: true,
            },
            // Separate Supabase into its own chunk
            supabase: {
              name: 'supabase',
              test: /[\\/]node_modules[\\/]@supabase[\\/]/,
              priority: 25,
              enforce: true,
            },
            // Separate Radix UI components
            radix: {
              name: 'radix',
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              priority: 20,
              enforce: true,
            },
            // Other vendor libraries
            lib: {
              name: 'lib',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              minChunks: 1,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
  */
};

module.exports = nextConfig;