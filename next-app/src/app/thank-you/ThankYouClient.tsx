"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const REDIRECT_MS = 10_000;
const REDIRECT_SEC = REDIRECT_MS / 1000;

/** Matches `InternalLinksSection` link tiles */
const linkClassName =
  "inline-flex min-h-[3rem] items-center justify-center rounded-md border border-border bg-muted/40 px-3 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:bg-muted sm:min-h-0 sm:px-4";

const homeLinkClassName =
  "mt-8 inline-block text-base font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function ThankYouClient() {
  const router = useRouter();

  useEffect(() => {
    const id = window.setTimeout(() => {
      router.replace("/");
    }, REDIRECT_MS);
    return () => window.clearTimeout(id);
  }, [router]);

  return (
    <section className="min-h-[100dvh] bg-background">
      <div className="mx-auto max-w-5xl -mt-8 px-6 pb-16 pt-[clamp(2.5rem,40vh,22rem)] text-center lg:px-8">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
          Thank you
        </h1>
        <p className="mb-2 text-lg text-muted-foreground">
          We have received your message and will get back to you as soon as possible.
        </p>
        <p className="mb-8 text-lg text-muted-foreground">
          Returning to the home page in {REDIRECT_SEC} seconds…
        </p>

        <h2 className="mb-4 text-3xl font-bold text-foreground">
          Learn More About Our Work
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Explore our projects, tools, and communities we&apos;re building with partners.
        </p>

        <nav
          className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
          aria-label="Where to next"
        >
          <Link href="/portfolio" className={linkClassName}>
            Check out our projects
          </Link>
          <Link href="/tdce?view=simplified" className={linkClassName}>
            TDCE Affordable Housing Calculator
          </Link>
          <Link href="/Merritt" className={linkClassName}>
            What we&apos;re doing in Merritt
          </Link>
        </nav>

        <Link href="/" className={homeLinkClassName}>
          Back to home
        </Link>
      </div>
    </section>
  );
}
