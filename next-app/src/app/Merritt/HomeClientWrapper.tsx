'use client';

import HomeClient from './HomeClient';

/**
 * Wrapper component to force Turbopack recompilation
 * This helps resolve HMR cache issues with styled-jsx
 */
export default function HomeClientWrapper() {
  return <HomeClient />;
}

