import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LimitedPartnership } from "@/components/LimitedPartnership";
import limitedPartnershipHeroImage from "@/assets/partner-hero.jpg";
import { InternalLinksSection } from "@/components/InternalLinksSection";
import { FAQSchema } from "@/components/FAQSchema";

const LimitedPartnershipPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <FAQSchema
          pageUrl="https://anhart.ca/limited-partnership"
          faqs={[
            {
              question: "Who can invest in Anhart’s Limited Partnership?",
              answer: "The Limited Partnership is open to accredited investors, with a minimum investment of $100,000 as outlined in the offering materials.",
            },
            {
              question: "What are the key terms of the investment?",
              answer: "The offering targets a 2% preferred return, paid semi-annually based on available distributable cash, with a minimum 3-year hold and a 50-year partnership term.",
            },
            {
              question: "How do I request offering documents?",
              answer: "Use the investment inquiry form on this page to contact Keith Gordon and request the Limited Partnership Agreement, Term Sheet, and Business Plan.",
            },
          ]}
        />
        {/* Hero Banner */}
        <section className="relative h-80 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${typeof limitedPartnershipHeroImage === 'string' ? limitedPartnershipHeroImage : limitedPartnershipHeroImage.src})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-red-400/80" />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, transparent 40%, #E57373cc 40%)`,
            }}
          />
          <div className="relative z-10 flex items-center justify-end h-full px-6 pr-12">
            <h2 className="text-4xl text-white max-w-md text-center font-bold md:text-5xl animate-slide-in-right">
              Impact Investing in Canadian Housing
            </h2>
          </div>
        </section>

        <LimitedPartnership />
      </main>
      <InternalLinksSection />
      <Footer />
    </div>
  );
};

export default LimitedPartnershipPage;
