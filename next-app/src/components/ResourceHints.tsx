import Head from "next/head";

export const ResourceHints = () => {
  return (
    <Head>
      {/* Preconnect for critical external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      {/* Preload critical resources */}
      <link rel="preload" href="/images/anhart-logo-text.png" as="image" type="image/png" fetchPriority="high" />
      {/* Prefetch likely next page resources */}
      <link rel="prefetch" href="/about" />
      <link rel="prefetch" href="/portfolio" />
      <link rel="prefetch" href="/contact" />
    </Head>
  );
};
