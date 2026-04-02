import type { Metadata } from "next";
import Script from "next/script";
import { ThankYouClient } from "./ThankYouClient";

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
      <ThankYouClient />
    </>
  );
}
