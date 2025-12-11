import Link from "next/link";
import { ScrollAnimationWrapper } from "@/components/animations/ScrollAnimationWrapper";

const internalLinks = [
  { name: "Our Story", href: "/about" },
  { name: "News & Media", href: "/media" },
  { name: "Partner With Us", href: "/partner" },
  { name: "Limited Partnership", href: "/limited-partnership" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export const InternalLinksSection = () => (
  <section className="py-16 bg-background">
    <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
      <ScrollAnimationWrapper direction="bottom">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Learn More About Our Work
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Explore our story, media coverage, partnerships, and ways to connect with the team.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {internalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center justify-center rounded-md border border-border bg-muted/40 px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </ScrollAnimationWrapper>
    </div>
  </section>
);

export default InternalLinksSection;

