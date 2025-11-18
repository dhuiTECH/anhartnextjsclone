'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, Users, Award } from "lucide-react";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { ThreeCardSection } from "@/components/shared/ThreeCardSection";
import { ScrollAnimationWrapper } from "@/components/animations/ScrollAnimationWrapper";
import { Turnstile } from "@/components/Turnstile";
import partnerHeroImg from "@/assets/partner-hero-friendly.jpg";
import { useCallback, useState } from "react";

const partnerHero = typeof partnerHeroImg === 'string' ? partnerHeroImg : partnerHeroImg?.src || '';

const Partner = () => {
  const {
    submitForm,
    isSubmitting
  } = useFormSubmission();
  
  // Turnstile state
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  
  // Turnstile callbacks (memoized to prevent re-render loops)
  const handleTurnstileSuccess = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);
  
  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null);
  }, []);
  
  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
  }, []);
  // Partner benefits data - structured for ThreeCardSection component
  const partnerBenefits = [{
    id: 1,
    icon: DollarSign,
    title: "Funding Opportunities",
    description: "Access to various funding streams and grants available for affordable housing projects, including government and private sector partnerships."
  }, {
    id: 2,
    icon: Users,
    title: "Collaborative Projects",
    description: "Work together on impactful community development initiatives that create lasting change and provide affordable housing solutions."
  }, {
    id: 3,
    icon: Award,
    title: "Community Recognition",
    description: "Gain recognition as a community leader committed to addressing housing affordability and improving lives across Canada."
  }];
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Check honeypot field - if filled, it's likely a bot
    const honeypot = formData.get('website') as string;
    if (honeypot && honeypot.trim() !== "") {
      console.log("Bot detected via honeypot");
      return; // Silently reject the submission
    }
    
    // Validate Turnstile token
    if (!turnstileToken) {
      console.error("Turnstile verification required");
      return;
    }

    // Get form values
    const contact = formData.get('contact') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const organization = formData.get('organization') as string;
    const message = formData.get('message') as string;

    // Client-side validation - form validation is handled by the useFormSubmission hook

    // Log the data being submitted for debugging
    const submissionData = {
      name: contact,
      email: email,
      phone: phone,
      organization: organization || '',
      subject: '',
      message: message,
      form_type: 'partner',
      turnstile_token: turnstileToken || undefined,
    };
    console.log('Submitting partner form data:', submissionData);
    const success = await submitForm(submissionData);
    if (success) {
      form.reset();
      setTurnstileToken(null);
      setTurnstileKey((prev) => prev + 1);
    }
  };
  return <div className="min-h-screen bg-background">
      <SEO title="Partner With Us - Affordable Housing Development" description="Join Anhart in building affordable housing solutions. Partner with us to create sustainable communities and make a lasting impact on housing affordability across Canada." keywords="housing partnership, affordable housing collaboration, community development partnership, housing development partner, anhart partnership, housing collaboration" url="/partner" />
      <Header />
      
      <main>
        {/* Hero Banner */}
        <section className="relative h-80 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-left bg-no-repeat" style={{
          backgroundImage: `url(${partnerHero})`
        }} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-red-400/80" />
          <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, transparent 40%, #E57373cc 40%)`
        }} />
          <div className="relative z-10 flex items-center justify-end h-full px-6 pr-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center max-w-md animate-slide-in-right">
              Collaborate on Affordable Housing
            </h1>
          </div>
        </section>

        {/* Partner with Us Section */}
        <section className="bg-gradient-to-br from-white via-white to-red-50/30 py-10">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <ScrollAnimationWrapper direction="top" delay={0}>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Partner with Us
              </h1>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper direction="top" delay={100}>
              <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium">Join us in building affordable homes that create lasting community impact</p>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper direction="top" delay={200}>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">At Anhart, collaboration fuels our work. We partner with non-profits, municipalities, Indigenous organizations, credit unions, and impact investors, alongside local coordinators, interns, and housing champions, to create affordable housing and vibrant community spaces. As developers and operators, we manage every stage—site acquisition, design, construction, financing, and long-term stewardship—building sustainable homes and stronger communities across Canada.</p>
            </ScrollAnimationWrapper>
          </div>
        </section>

        {/* Infographic Section */}
        <section className="py-2 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            
            
            {/* SINGLE HORIZONTAL ICONS IMAGE */}
            <div className="relative mb-12">
              <img src="/images/anhart-partnership-model-icons-only.png" alt="Anhart partnership model: Community Need + Community Partner + Anhart Support = Sustainable Revenue + Long-term Impact" className="w-full max-w-8xl mx-auto block" loading="lazy" decoding="async" />
            </div>
            
            {/* TEXT SECTIONS BELOW - 4-column layout aligned with icons above */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              
              {/* SECTION 1 - COMMUNITY NEED */}
              <div className="text-center md:border-r md:pr-8">
                <p className="text-gray-600 text-lg leading-relaxed">Anhart partners with non-profits, Indigenous organizations, and municipalities seeking a developer to meet the demand for affordable housing and  community spaces.</p>
                <div className="md:hidden text-4xl font-bold text-accent mt-6 mb-6">+</div>
              </div>
              
              {/* SECTION 2 - COMMUNITY PARTNER */}
              <div className="text-center md:border-r md:pr-8">
                <p className="text-gray-600 text-lg leading-relaxed">Anhart assists in connecting with impact investors, pre-financing options, credit unions, and community-focused investors to foster project development.</p>
                <div className="md:hidden text-4xl font-bold text-accent mt-6 mb-6">+</div>
              </div>
              
              {/* SECTION 3 - ANHART SUPPORT */}
              <div className="text-center md:border-r md:pr-8">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Anhart offers free pre-development assistance and conducts architectural studies for community partners, including organizations, municipalities, and community-focused individuals or investors.
                </p>
                
              </div>
              
              {/* SECTION 4 - SUSTAINABLE REVENUE */}
              <div className="text-center">
                <div className="md:hidden text-4xl font-bold text-accent mb-6">=</div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Partners earn from housing and community spaces; Anhart reinvests revenues into new projects for enduring vibrancy.
                </p>
              </div>
              
            </div>
          </div>
        </section>

        {/* Partner Benefits Section - Using ThreeCardSection Component */}
        <ThreeCardSection title="Partner Benefits" description="Discover the advantages of partnering with Anhart" cards={partnerBenefits} bgColor="default" layout="grid" showImages={false} />

        {/* Partner Form Section */}
        <section className="py-20 bg-muted/20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <ScrollAnimationWrapper direction="top" delay={0}>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Partner Form
                </h2>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper direction="top" delay={100}>
                <p className="text-xl text-muted-foreground">Fill out the form below to begin our conversation or call us at <a href="tel:604-529-6259" className="font-bold text-foreground hover:text-primary transition-colors">604-529-6259</a></p>
              </ScrollAnimationWrapper>
            </div>

            <ScrollAnimationWrapper direction="top" delay={200}>
              <Card className="bg-background shadow-lg">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="contact" className="text-foreground font-medium">Contact Name <span className="text-red-500">*</span></Label>
                        <Input id="contact" name="contact" type="text" required className="bg-background border-border" placeholder="Your full name" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="organization" className="text-foreground font-medium">Organization Name (Optional)</Label>
                        <Input id="organization" name="organization" type="text" className="bg-background border-border" placeholder="Your organization name" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground font-medium">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input id="email" name="email" type="email" required className="bg-background border-border" placeholder="your.email@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-foreground font-medium">
                          Phone <span className="text-red-500">*</span>
                        </Label>
                        <Input id="phone" name="phone" type="tel" required className="bg-background border-border" placeholder="(555) 123-4567" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground font-medium">
                        Message <span className="text-red-500">*</span>
                      </Label>
                      <Textarea id="message" name="message" required rows={6} className="bg-background border-border resize-none" placeholder="Describe your partnership interest..." />
                    </div>

                    {/* Honeypot field - hidden from users but visible to bots */}
                    <div style={{
                    display: 'none'
                  }}>
                      <Label htmlFor="website">Website (leave blank)</Label>
                      <Input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                    </div>

                    {/* Cloudflare Turnstile Widget */}
                    <div className="flex justify-center" key={turnstileKey}>
                      <Turnstile
                        siteKey="0x4AAAAAAChEhfkXf5mcNUA4m"
                        onSuccess={handleTurnstileSuccess}
                        onError={handleTurnstileError}
                        onExpire={handleTurnstileExpire}
                        theme="auto"
                        size="normal"
                      />
                    </div>

                    <div className="flex justify-center">
                      <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 sm:px-12 py-3 w-full sm:w-auto" disabled={isSubmitting || !turnstileToken}>
                        {isSubmitting ? 'Submitting...' : 'Submit Partnership Request'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </ScrollAnimationWrapper>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Partner;