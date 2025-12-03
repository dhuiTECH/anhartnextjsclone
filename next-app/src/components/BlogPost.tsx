"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { logger } from "@/utils/logger";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ScrollAnimationWrapper } from "@/components/animations/ScrollAnimationWrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import {
  getPostBySlug,
  getRelatedPosts,
  BlogPost as BlogPostType,
} from "@/data/blog";
import { getBlogPostAltText, getBlogListingAltText } from "@/lib/altText";

/**
 * Individual Blog Post Page
 *
 * Displays full blog post content with SEO optimization,
 * featured image, and related posts.
 */
const BlogPost = ({ initialPost }: { initialPost: BlogPostType }) => {
  const params = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | undefined>(initialPost);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(!initialPost);

  useEffect(() => {
    // This effect now only fetches related posts
    const fetchRelated = async () => {
      if (post) {
        try {
          const related = await getRelatedPosts(post);
          setRelatedPosts(related);
        } catch (error) {
          logger.error("BlogPost component: Error fetching related posts", error, { component: 'BlogPost' });
        }
      }
    };

    fetchRelated();
    window.scrollTo(0, 0);
  }, [post]); // It now runs when the 'post' prop is available

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Blog post not found</p>
            <Link href="/blog" className="text-primary hover:underline">
              Return to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to normalize image URLs
  const normalizeImageUrl = (url: string | undefined | null): string => {
    if (!url) return "/blog/default.jpg";
    
    // If it's already a full URL (http/https), return as is
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    
    // If it's a data URL, return as is
    if (url.startsWith("data:")) {
      return url;
    }
    
    // If it starts with /, it's an absolute path - add domain
    if (url.startsWith("/")) {
      return `https://anhart.ca${url}`;
    }
    
    // Otherwise, treat as relative path and add domain
    return `https://anhart.ca/${url}`;
  };


  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage?.startsWith("http")
      ? post.featuredImage
      : `https://anhart.ca${post.featuredImage || "/blog/default.jpg"}`,
    author: {
      "@type": "Organization",
      name: post.author || "Anhart",
      url: "https://anhart.ca",
    },
    publisher: {
      "@type": "Organization",
      name: "Anhart",
      logo: {
        "@type": "ImageObject",
        url: "https://anhart.ca/images/anhart-logo.png",
      },
    },
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://anhart.ca/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.seo?.keywords?.join(", ") || "",
    wordCount: Math.ceil((post.content?.length || 0) / 5),
    timeRequired: post.readingTime ? `PT${post.readingTime}M` : "PT5M",
    inLanguage: "en-CA",
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={post.seo.metaTitle}
        description={post.seo.metaDescription}
        keywords={post.seo.keywords.join(", ")}
        url={`/blog/${post.slug}`}
        image={post.featuredImage}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main>
        {/* Hero Section with Featured Image */}
        <section className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] lg:h-[800px] overflow-visible pb-3">
          <div className="absolute inset-0 bg-muted">
            <img
              src={normalizeImageUrl(post.featuredImage)}
              alt={getBlogPostAltText(post.title, post.category)}
              className="w-full h-full object-cover"
              loading="eager"
              onError={(e) => {
                logger.warn("Failed to load blog header image", { component: 'BlogPost', imageUrl: post.featuredImage });
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="relative min-h-[300px] sm:min-h-[350px] md:min-h-[600px] lg:min-h-[700px] flex items-end">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-8 sm:pb-16 pt-12 sm:pt-32 w-full">
              <ScrollAnimationWrapper direction="bottom">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <Badge className="bg-primary text-primary-foreground text-xs sm:text-sm">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-white/90 text-xs sm:text-sm">
                    <Calendar className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{formatDate(post.publishDate)}</span>
                  </div>
                </div>

                <h1 
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight"
                  style={{
                    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.7)'
                  }}
                >
                  {post.title}
                </h1>
                {post.subtitle && (
                  <p 
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-light mb-3 sm:mb-4 max-w-3xl italic leading-snug"
                    style={{
                      textShadow: '1px 1px 6px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    {post.subtitle}
                  </p>
                )}
                <p 
                  className="hidden sm:block text-xs sm:text-sm md:text-base text-white/80 max-w-xl leading-relaxed"
                  style={{
                    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)'
                  }}
                >
                  {post.excerpt}
                </p>
              </ScrollAnimationWrapper>
            </div>
          </div>
        </section>

        {/* Breadcrumb Navigation - After Hero */}
        <section className="bg-background border-b border-muted">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <Breadcrumb
              items={[
                { name: "Blog", url: "/blog" },
                { name: post.title, url: `/blog/${post.slug}` },
              ]}
            />
          </div>
        </section>

        {/* Article Content */}
        <section className="py-8 sm:py-12 md:py-16 bg-background w-full overflow-x-hidden">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
            <ScrollAnimationWrapper direction="bottom">
              <style jsx global>{`
                .prose pre {
                  background: #282c34 !important;
                  color: #abb2bf !important;
                  font-family:
                    "JetBrainsMono", "Fira Code", "Courier New", monospace !important;
                  padding: 1.5em !important;
                  border-radius: 0.5em !important;
                  overflow-x: auto !important;
                  margin: 1.5em 0 !important;
                  max-width: 100% !important;
                  word-break: break-word !important;
                }
                .prose pre code {
                  background: none !important;
                  color: inherit !important;
                  font-size: 0.9em !important;
                  padding: 0 !important;
                  border-radius: 0 !important;
                  word-break: break-word !important;
                }
                .prose code {
                  background: #f3f4f6 !important;
                  color: #d63384 !important;
                  padding: 0.2em 0.4em !important;
                  border-radius: 0.25em !important;
                  font-family:
                    "JetBrainsMono", "Fira Code", "Courier New", monospace !important;
                  font-size: 0.9em !important;
                  word-break: break-word !important;
                }
                .prose pre code.hljs {
                  padding: 0 !important;
                }
                .prose {
                  width: 100% !important;
                  overflow-x: auto !important;
                }
                .prose p, .prose li, .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
                  word-break: break-word !important;
                  overflow-wrap: break-word !important;
                }
                .prose img {
                  max-width: 100% !important;
                  height: auto !important;
                }
              `}</style>
              <article className="prose sm:prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary-dark prose-strong:text-foreground prose-img:rounded-lg prose-img:shadow-lg w-full">
                <div 
                  className="w-full overflow-x-hidden"
                  dangerouslySetInnerHTML={{ 
                    __html: post.content
                  }} 
                />
              </article>
              {/* Return to Blogs Link */}
              <div className="flex justify-end mt-8 pt-4">
                <Link 
                  href="/blog"
                  className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                >
                  ← Return to blogs
                </Link>
              </div>
              {/* Author and Reading Time - REMOVED from here */}
            </ScrollAnimationWrapper>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <ScrollAnimationWrapper direction="bottom">
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  Related Articles
                </h2>
              </ScrollAnimationWrapper>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <ScrollAnimationWrapper
                    key={relatedPost.id}
                    direction="bottom"
                    delay={index * 0.1}
                  >
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border bg-card">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={normalizeImageUrl(relatedPost.featuredImage)}
                            alt={getBlogListingAltText(relatedPost.title, relatedPost.category)}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              logger.warn("Failed to load related post image", { component: 'BlogPost', imageUrl: relatedPost.featuredImage });
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                            }}
                          />
                        </div>
                        <CardContent className="p-6">
                          <Badge className="mb-3 bg-primary text-primary-foreground">
                            {relatedPost.category}
                          </Badge>
                          <h3 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center text-primary font-semibold hover:gap-3 transition-all">
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </ScrollAnimationWrapper>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <ScrollAnimationWrapper direction="bottom">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Learn More About Our Work
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Discover how Anhart is creating quality affordable housing
                across British Columbia
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/portfolio"
                  onClick={() => window.scrollTo(0, 0)}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary-dark transition-colors"
                >
                  View Our Projects
                </Link>
                <Link
                  href="/contact"
                  onClick={() => window.scrollTo(0, 0)}
                  className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-base font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
