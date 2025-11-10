import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { Contact } from "@/components/Contact";
import contactHeroImage from "@/assets/contact-hero.jpg";
const ContactPage = () => {
  return <div className="min-h-screen bg-background">
      <SEO 
        title="Contact Us - Get In Touch"
        description="Contact Anhart Affordable Housing for partnership opportunities, project inquiries, or to learn more about our affordable housing development services."
        keywords="contact anhart, housing development contact, affordable housing inquiry, partnership contact, anhart contact, housing services contact"
        url="/contact"
      />
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative h-80 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-left bg-no-repeat" style={{
          backgroundImage: `url(${contactHeroImage})`
        }} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-red-400/80" />
          <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, transparent 40%, #E57373cc 40%)`
        }} />
          <div className="relative z-10 flex items-center justify-end h-full px-6 pr-12">
            <h1 className="text-4xl text-white max-w-md text-center font-bold md:text-5xl animate-slide-in-right">Contact Us</h1>
          </div>
        </section>
        
        <Contact />
      </main>
      <Footer />
    </div>;
};
export default ContactPage;