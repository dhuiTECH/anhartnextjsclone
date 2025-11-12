import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { LimitedPartnership } from "@/components/LimitedPartnership";
import limitedPartnershipHeroImage from "@/assets/partner-hero.jpg";

const LimitedPartnershipPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Limited Partnership Investment - Anhart Affordable Housing"
        description="Learn about investment opportunities in Anhart's Limited Partnership program. Support affordable housing development while earning returns on your impact investment."
        keywords="limited partnership investment, affordable housing investment, impact investing, housing finance, community investment, anhart investment, housing returns"
        url="/limited-partnership"
      />
      <Header />
      <main>
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
            <h1 className="text-4xl text-white max-w-md text-center font-bold md:text-5xl animate-slide-in-right">
              Impact Investing
            </h1>
          </div>
        </section>

        <LimitedPartnership />
      </main>
      <Footer />
    </div>
  );
};

export default LimitedPartnershipPage;
