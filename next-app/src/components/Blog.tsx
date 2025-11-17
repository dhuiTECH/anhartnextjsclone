"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { ScrollAnimationWrapper } from "@/components/animations/ScrollAnimationWrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Search, ArrowRight } from "lucide-react";
import { getSortedPosts, BlogPost as BlogPostType } from "@/data/blog";
import { useState, useMemo, useEffect } from "react";
import { HeroBanner } from "@/components/shared/HeroBanner";

/**
 * Blog Listing Page
 */
const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allPosts, setAllPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const posts = await getSortedPosts();
      setAllPosts(posts);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(allPosts.map((post) => post.category));
    return ["All", ...Array.from(cats)];
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      return matchesCategory && matchesSearch;
    });
  }, [allPosts, selectedCategory, searchQuery]);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Blog"
        description="Read the latest insights, news, and resources about affordable housing in BC. Expert guides, community stories, and practical advice for finding housing solutions."
        keywords="affordable housing blog, housing resources, BC housing news, housing guides, community impact stories"
        url="/blog"
      />
      <Header />
      <main>
        {/* Hero Banner - Blog insights and resources */}
        <HeroBanner
          backgroundImage="blog-hero"
          title="Anhart Blog"
          subtitle="Insights, resources, and stories about affordable housing"
          contentPosition="right"
        />

        {/* Search and Filter */}
        <section className="py-8 bg-background border-b border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading posts...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No articles found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <ScrollAnimationWrapper
                    key={post.id}
                    direction="bottom"
                    delay={index * 0.1}
                  >
                    <Link href={`/blog/${post.slug}`} className="block h-full">
                      <Card className="h-full hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                        {post.featuredImage && (
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={normalizeImageUrl(post.featuredImage)}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              onError={(e) => {
                                console.error(
                                  "Failed to load blog listing image:",
                                  post.featuredImage,
                                );
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                              }}
                            />
                          </div>
                        )}
                        <CardHeader>
                          <Badge className="mb-3 w-fit bg-primary text-primary-foreground">
                            {post.category}
                          </Badge>
                          <h3 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors line-clamp-5">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(post.publishDate)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {post.readingTime} min
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4 line-clamp-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center text-primary font-semibold hover:gap-3 transition-all">
                            Read Article
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </ScrollAnimationWrapper>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <ScrollAnimationWrapper direction="bottom">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Stay Updated
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Follow our blog for the latest news, resources, and insights
                about affordable housing in BC
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
                  Contact Us
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

export default Blog;
