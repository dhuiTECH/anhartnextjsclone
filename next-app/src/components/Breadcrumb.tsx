"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { breadcrumbStructuredData } from "@/lib/structuredData";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb Navigation Component
 * 
 * Displays a visible breadcrumb trail with structured data for SEO.
 * Automatically includes Home as the first item.
 * 
 * @example
 * <Breadcrumb items={[
 *   { name: "Blog", url: "/blog" },
 *   { name: "Post Title", url: "/blog/post-slug" }
 * ]} />
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  // Always include Home as the first item
  const allItems: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
    ...items,
  ];

  // Generate structured data
  const structuredData = breadcrumbStructuredData(allItems);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Visible Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}
      >
        <ol className="flex items-center gap-2 flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            const isFirst = index === 0;

            return (
              <li
                key={item.url}
                className="flex items-center gap-2"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {isFirst ? (
                  <Link
                    href={item.url}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                    itemProp="item"
                  >
                    <Home className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">Home</span>
                    <meta itemProp="name" content={item.name} />
                    <meta itemProp="position" content={String(index + 1)} />
                  </Link>
                ) : isLast ? (
                  <span
                    className="text-foreground font-medium"
                    aria-current="page"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.name}</span>
                    <meta itemProp="position" content={String(index + 1)} />
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-foreground transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.name}</span>
                    <meta itemProp="position" content={String(index + 1)} />
                  </Link>
                )}

                {!isLast && (
                  <ChevronRight
                    className="h-4 w-4 text-muted-foreground/50"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

