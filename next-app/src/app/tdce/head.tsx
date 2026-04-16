export default function Head() {
  const title = 'Anhart | Housing Calculator';
  const description =
    'Plan your housing project with Anhart’s Total Development Cost Estimator. Get feasibility insights and pre-development cost assumptions for municipalities, non-profits, and developers.';
  const siteUrl = 'https://anhart.ca/tdce'; // Replace with your actual domain
  const ogImage = 'https://anhart.ca/images/anhart-logo-tdce.webp'; // Recommended: add a specific social share image

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={siteUrl} />
      
      {/* Robots - Cleaned up to standard defaults */}
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Anhart" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}