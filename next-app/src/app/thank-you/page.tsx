import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thank you for contacting Anhart.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      {/* Event snippet for Submit lead form (1) conversion page — after Google tag (root layout) */}
      <Script id="google-ads-lead-conversion" strategy="afterInteractive">
        {`gtag('event', 'conversion', {'send_to': 'AW-17630924755/KUO-CIXqqNgbENOfitdB'});`}
      </Script>
      <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="mb-4 font-semibold text-2xl tracking-tight">Thank you</h1>
        <p className="mb-8 text-muted-foreground">
          We have received your message and will get back to you as soon as possible.
        </p>
        <Link
          href="/"
          className="text-primary underline-offset-4 hover:underline"
        >
          Back to home
        </Link>
      </main>
    </>
  );
}
