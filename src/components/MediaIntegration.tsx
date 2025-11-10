/**
 * =============================================================================
 * MEDIA INTEGRATION COMPONENT
 * =============================================================================
 * 
 * Comprehensive media and social media integration for enhanced SEO and
 * brand visibility across multiple platforms and provinces.
 * 
 * Features:
 * - Social media meta tags
 * - Media platform integration
 * - Province-specific content
 * - Enhanced sharing capabilities
 * 
 * @author Anhart Development Team
 * @version 1.0.0
 * @since 2025
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MediaIntegrationProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  province?: 'BC' | 'Alberta' | 'Manitoba' | 'Ontario' | 'All';
}

const MediaIntegration: React.FC<MediaIntegrationProps> = ({
  title = "Anhart Affordable Housing - Building Communities Through Housing Solutions",
  description = "Leading non-profit affordable housing development across Canada",
  image = "/images/anhart-logo.png",
  url = "https://anhart.ca",
  province = "All"
}) => {
  const fullImage = image.startsWith("http") ? image : `https://anhart.ca${image}`;
  const fullUrl = url.startsWith("http") ? url : `https://anhart.ca${url}`;

  // Province-specific content
  const provinceContent = {
    BC: {
      title: "Affordable Housing Vancouver BC | Anhart Housing Solutions",
      description: "Leading affordable housing development in British Columbia including Vancouver, Victoria, Surrey. SRO conversion, modular homes, micro-suites.",
      keywords: "affordable housing Vancouver, SRO conversion BC, modular housing British Columbia, micro-suites Victoria, supportive housing Surrey"
    },
    Alberta: {
      title: "Affordable Housing Calgary Alberta | Anhart Housing Solutions", 
      description: "Leading affordable housing development in Alberta including Calgary, Edmonton, Red Deer. SRO conversion, modular homes, micro-suites.",
      keywords: "affordable housing Calgary, SRO conversion Alberta, modular housing Edmonton, micro-suites Red Deer, supportive housing Lethbridge"
    },
    Manitoba: {
      title: "Affordable Housing Winnipeg Manitoba | Anhart Housing Solutions",
      description: "Leading affordable housing development in Manitoba including Winnipeg, Brandon, Steinbach. SRO conversion, modular homes, micro-suites.",
      keywords: "affordable housing Winnipeg, SRO conversion Manitoba, modular housing Brandon, micro-suites Steinbach, supportive housing Manitoba"
    },
    Ontario: {
      title: "Affordable Housing Toronto Ontario | Anhart Housing Solutions",
      description: "Leading affordable housing development in Ontario including Toronto, Ottawa, Hamilton, London. SRO conversion, modular homes, micro-suites.",
      keywords: "affordable housing Toronto, SRO conversion Ontario, modular housing Ottawa, micro-suites Hamilton, supportive housing London"
    },
    All: {
      title,
      description,
      keywords: "affordable housing Canada, SRO conversion, modular homes, micro-suites, supportive housing, non-profit housing development"
    }
  };

  const content = provinceContent[province];

  return (
    <Helmet>
      {/* Enhanced Social Media Meta Tags */}
      <meta property="og:title" content={content.title} />
      <meta property="og:description" content={content.description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Anhart Affordable Housing" />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:updated_time" content={new Date().toISOString()} />
      
      {/* Additional Open Graph Tags */}
      <meta property="og:see_also" content="https://anhart.ca/portfolio" />
      <meta property="og:see_also" content="https://anhart.ca/about" />
      <meta property="og:see_also" content="https://anhart.ca/contact" />
      <meta property="og:see_also" content="https://anhart.ca/media" />
      
      {/* Twitter Card Enhanced */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={content.title} />
      <meta name="twitter:description" content={content.description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@anhart_housing" />
      <meta name="twitter:creator" content="@anhart_housing" />
      <meta name="twitter:domain" content="anhart.ca" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:label1" content="Housing Type" />
      <meta name="twitter:data1" content="Affordable Housing Development" />
      <meta name="twitter:label2" content="Service Area" />
      <meta name="twitter:data2" content={province === 'All' ? 'Canada' : province} />
      
      {/* LinkedIn Specific */}
      <meta property="linkedin:title" content={content.title} />
      <meta property="linkedin:description" content={content.description} />
      <meta property="linkedin:image" content={fullImage} />
      
      {/* Facebook Specific */}
      <meta property="fb:app_id" content="your-facebook-app-id" />
      <meta property="fb:pages" content="your-facebook-page-id" />
      
      {/* Instagram Specific */}
      <meta property="instagram:title" content={content.title} />
      <meta property="instagram:description" content={content.description} />
      <meta property="instagram:image" content={fullImage} />
      
      {/* YouTube Specific */}
      <meta property="youtube:title" content={content.title} />
      <meta property="youtube:description" content={content.description} />
      <meta property="youtube:image" content={fullImage} />
      
      {/* Pinterest Specific */}
      <meta property="pinterest:title" content={content.title} />
      <meta property="pinterest:description" content={content.description} />
      <meta property="pinterest:image" content={fullImage} />
      <meta name="pinterest:rich-pin" content="true" />
      
      {/* TikTok Specific */}
      <meta property="tiktok:title" content={content.title} />
      <meta property="tiktok:description" content={content.description} />
      <meta property="tiktok:image" content={fullImage} />
      
      {/* Medium Specific */}
      <meta property="medium:title" content={content.title} />
      <meta property="medium:description" content={content.description} />
      <meta property="medium:image" content={fullImage} />
      
      {/* Enhanced Keywords for Province */}
      <meta name="keywords" content={content.keywords} />
      
      {/* Province-Specific Geo Tags */}
      {province !== 'All' && (
        <>
          <meta name="geo.region" content={`CA-${province === 'BC' ? 'BC' : province === 'Alberta' ? 'AB' : province === 'Manitoba' ? 'MB' : 'ON'}`} />
          <meta name="geo.placename" content={province} />
        </>
      )}
      
      {/* Media Platform Preconnects */}
      <link rel="preconnect" href="https://www.facebook.com" />
      <link rel="preconnect" href="https://www.twitter.com" />
      <link rel="preconnect" href="https://www.linkedin.com" />
      <link rel="preconnect" href="https://www.instagram.com" />
      <link rel="preconnect" href="https://www.youtube.com" />
      <link rel="preconnect" href="https://www.pinterest.com" />
      <link rel="preconnect" href="https://www.tiktok.com" />
      <link rel="preconnect" href="https://medium.com" />
      
      {/* DNS Prefetch for Performance */}
      <link rel="dns-prefetch" href="//www.facebook.com" />
      <link rel="dns-prefetch" href="//www.twitter.com" />
      <link rel="dns-prefetch" href="//www.linkedin.com" />
      <link rel="dns-prefetch" href="//www.instagram.com" />
      <link rel="dns-prefetch" href="//www.youtube.com" />
      <link rel="dns-prefetch" href="//www.pinterest.com" />
      <link rel="dns-prefetch" href="//www.tiktok.com" />
      <link rel="dns-prefetch" href="//medium.com" />
    </Helmet>
  );
};

export default MediaIntegration;
