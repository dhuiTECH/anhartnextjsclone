import type { Metadata } from "next";
import "./merritt-styles.css";
import MerrittNavbar from "./components/MerrittNavbar";
import RevealObserver from "./components/RevealObserver";

export const metadata: Metadata = {
  title: {
    default: "Affordable Townhomes in Merritt, BC | Anhart",
    template: "%s | Anhart",
  },
  description:
    "Vancouver-based developer Anhart offers 48 affordable townhomes in Merritt, BC starting at $249k. Entry-level homeownership in the scenic Nicola Valley.",
};

/**
 * Merritt Nested Layout
 * 
 * This layout wraps all Merritt routes with a scoped CSS wrapper.
 * The .merritt-wrapper class ensures Merritt-specific styles don't conflict
 * with the main site's global styles.
 * 
 * All Merritt styles in merritt-styles.css are scoped to .merritt-wrapper
 */
export default function MerrittLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="merritt-wrapper">
      <MerrittNavbar />
      <RevealObserver />
      {children}
    </div>
  );
}
