import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object | object[];
}

const SEO = ({
  title = "Anhart Affordable Housing - Building Communities Through Housing Solutions",
  description = "Anhart Affordable Housing provides innovative affordable housing solutions coast to coast to coast. We lead, support, and advocate for non-profit housing that creates inclusive communities.",
  keywords = "affordable housing, SROs, modular homes, non-profit housing, low-income housing, subsidized housing, below-market housing, supportive housing, inclusionary housing, affordability, micro-suites, micro-units, vacancy development, derelict homes, single room occupancy, social housing, community housing, rental housing, housing continuum, transitional housing, Vancouver, Toronto, Calgary, Edmonton, Winnipeg, Ottawa, Hamilton, London, BC, Alberta, Manitoba, Ontario, Canada, housing development, housing solutions, community development, sustainable housing, housing policy, housing finance, community planning, affordable housing Vancouver, affordable housing Toronto, affordable housing Calgary, affordable housing Edmonton, affordable housing Winnipeg, SRO conversion Vancouver, SRO conversion Toronto, modular housing BC, modular housing Alberta, modular housing Ontario, micro-suites Vancouver, micro-suites Toronto, supportive housing Calgary, supportive housing Winnipeg",
  image = "/images/anhart-logo.png",
  url = "https://anhart.ca",
  type = "website",
  structuredData
}: SEOProps) => {
  const fullTitle = title.includes("Anhart") ? title : `${title} | Anhart Affordable Housing`;
  const fullUrl = url.startsWith("http") ? url : `https://anhart.ca${url}`;
  const fullImage = image.startsWith("http") ? image : `https://anhart.ca${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Anhart Affordable Housing" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Anhart Affordable Housing" />
      <meta property="og:locale" content="en_CA" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@anhart_housing" />
      <meta name="twitter:creator" content="@anhart_housing" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Enhanced SEO Meta Tags */}
      <meta name="language" content="en-CA" />
      <meta name="geo.region" content="CA" />
      <meta name="geo.placename" content="Canada" />
      <meta name="geo.position" content="49.2827;-123.1207" />
      <meta name="ICBM" content="49.2827, -123.1207" />
      <meta name="geo.region" content="CA-BC" />
      <meta name="geo.region" content="CA-AB" />
      <meta name="geo.region" content="CA-MB" />
      <meta name="geo.region" content="CA-ON" />
      <meta name="geo.placename" content="Vancouver, Toronto, Calgary, Edmonton, Winnipeg, Ottawa, Hamilton, London" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      <meta name="target" content="all" />
      <meta name="audience" content="all" />
      <meta name="coverage" content="worldwide" />
      <meta name="classification" content="business" />
      <meta name="category" content="non-profit housing development" />
      <meta name="subject" content="affordable housing, community development, social housing" />
      <meta name="abstract" content="Anhart Affordable Housing develops innovative affordable housing solutions including SROs, modular homes, micro-suites, and supportive housing across Canada." />
      <meta name="summary" content="Leading non-profit affordable housing development organization creating inclusive communities through innovative housing solutions." />
      <meta name="designer" content="Anhart Development Team" />
      <meta name="copyright" content="Anhart Affordable Housing" />
      <meta name="reply-to" content="info@anhart.ca" />
      <meta name="owner" content="Anhart Affordable Housing" />
      <meta name="url" content={fullUrl} />
      <meta name="identifier-URL" content={fullUrl} />
      <meta name="directory" content="submission" />
      <meta name="pagename" content={title} />
      <meta name="category" content="Housing, Non-Profit, Community Development" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />
      <meta name="expires" content="never" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Additional Open Graph Tags */}
      <meta property="og:updated_time" content={new Date().toISOString()} />
      <meta property="og:see_also" content="https://anhart.ca/portfolio" />
      <meta property="og:see_also" content="https://anhart.ca/about" />
      <meta property="og:see_also" content="https://anhart.ca/contact" />
      
      {/* Additional Twitter Tags */}
      <meta name="twitter:domain" content="anhart.ca" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:label1" content="Housing Type" />
      <meta name="twitter:data1" content="Affordable Housing Development" />
      <meta name="twitter:label2" content="Service Area" />
      <meta name="twitter:data2" content="Canada" />
      
      {/* Mobile and App Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Anhart Housing" />
      <meta name="application-name" content="Anhart Affordable Housing" />
      <meta name="msapplication-tooltip" content="Anhart Affordable Housing - Building Communities Through Housing Solutions" />
      <meta name="msapplication-starturl" content="/" />
      <meta name="msapplication-navbutton-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      <meta name="msapplication-TileImage" content="/images/anhart-logo.png" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />

      {/* Structured Data */}
      {structuredData && (
        <>
          {Array.isArray(structuredData) ? (
            structuredData.map((data, index) => (
              <script key={index} type="application/ld+json">
                {JSON.stringify(data)}
              </script>
            ))
          ) : (
            <script type="application/ld+json">
              {JSON.stringify(structuredData)}
            </script>
          )}
        </>
      )}
    </Helmet>
  );
};

export default SEO;
