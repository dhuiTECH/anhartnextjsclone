'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { GoogleMapEmbed } from "@/components/shared/GoogleMaps";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { CONTACT_INFO, AddressUtils } from "@/config/address";
import { ScrollAnimationWrapper } from "@/components/animations/ScrollAnimationWrapper";
import React, { useState } from "react";
import contactHeroImg from "@/assets/baseAssets/contact-hero-1280x720.webp";

const contactHero = typeof contactHeroImg === 'string' ? contactHeroImg : contactHeroImg?.src || '';

// Contact information using centralized address configuration
const contactInfo = [
  {
    icon: MapPin,
    title: "Main Office",
    details: AddressUtils.getAddressLines(),
  },
  {
    icon: Phone,
    title: "Phone",
    details: [CONTACT_INFO.phone],
  },
  {
    icon: Mail,
    title: "Email",
    details: [CONTACT_INFO.email],
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: [CONTACT_INFO.officeHours.weekdays],
  },
];
export const Contact = () => {
  const { submitForm, isSubmitting } = useFormSubmission();
  const [isSubscribing, setIsSubscribing] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Check honeypot field - if filled, it's likely a bot
    const honeypot = formData.get("website") as string;
    if (honeypot && honeypot.trim() !== "") {
      console.log("Bot detected via honeypot");
      return; // Silently reject the submission
    }
    const name = formData.get("name") as string;
    const success = await submitForm({
      name,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      organization: formData.get("organization") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      form_type: "contact",
    });
    if (success) {
      form.reset();
    }
  };
  const handleSubscribeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check
    const honeypot = formData.get("website") as string;
    if (honeypot && honeypot.trim() !== "") {
      return;
    }
    setIsSubscribing(true);
    try {
      const success = await submitForm({
        name: (formData.get("name") as string) || "",
        email: formData.get("email") as string,
        phone: "",
        organization: "",
        subject: "Newsletter Subscription",
        message: "Please subscribe me to the newsletter.",
        form_type: "newsletter_subscribe",
      });
      if (success) {
        form.reset();
      }
    } finally {
      setIsSubscribing(false);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Contact Us - Anhart Affordable Housing"
        description="Get in touch with Anhart Affordable Housing. Contact us for inquiries about affordable housing solutions, partnerships, or investment opportunities."
        keywords="contact anhart, affordable housing contact, housing inquiries, anhart team"
        url="/contact"
      />
      <Header />
      
      <main>
        {/* Hero Banner */}
        <section className="relative h-80 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
            style={{ backgroundImage: `url(${contactHero})` }} 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-red-400/80" />
          <div 
            className="absolute inset-0" 
            style={{ background: `linear-gradient(135deg, transparent 40%, #E57373cc 40%)` }} 
          />
          <div className="relative z-10 flex items-center justify-end h-full px-6 pr-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center max-w-md animate-slide-in-right">
              Connect With Us Today
            </h1>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-muted/30 sm:py-[50px]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <ScrollAnimationWrapper direction="top" delay={0}>
              <div className="mx-auto max-w-2xl lg:text-center">
                <p className="mt-6 leading-8 text-muted-foreground text-xl">
                  Chat with us about anything, from housing dreams to community ideas. Reach out for an open conversation
                  with Anhart's team or call us at <a href="tel:604-529-6259" className="font-bold text-foreground hover:text-primary transition-colors">604-529-6259</a>
                </p>
              </div>
            </ScrollAnimationWrapper>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Information + Newsletter */}
          <ScrollAnimationWrapper direction="left" delay={200}>
            <div>
              {/* Newsletter subscribe */}
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="text-xl">Subscribe to our Newsletter</CardTitle>
                </CardHeader>
                <CardContent className="pb-5">
                  <form onSubmit={handleSubscribeSubmit} className="space-y-3 pb-2">
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Get updates on news, projects, and community impact. No spam.
                    </p>
                    <div>
                      <Label htmlFor="newsletter-name">Name (optional)</Label>
                      <Input id="newsletter-name" name="name" placeholder="Your name" className="h-9" />
                    </div>
                    <div>
                      <Label htmlFor="newsletter-email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="newsletter-email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="h-9"
                      />
                    </div>
                    {/* Honeypot */}
                    <div
                      style={{
                        display: "none",
                      }}
                    >
                      <Label htmlFor="newsletter-website">Website (leave blank)</Label>
                      <Input id="newsletter-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                    </div>
                    <Button type="submit" size="sm" className="w-full" disabled={isSubscribing}>
                      {isSubscribing ? "Subscribing…" : "Subscribe"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 gap-2 md:gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {contactInfo.map((info, index) => (
                  <ScrollAnimationWrapper key={info.title} direction="left" delay={300 + index * 50}>
                    <Card className="hover:shadow-md transition-shadow duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
                            <info.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                            {info.details.map((detail, index) => (
                              <p key={index} className="text-muted-foreground leading-tight text-sm">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollAnimationWrapper>
                ))}
              </div>
            </div>
          </ScrollAnimationWrapper>

          {/* Contact Form */}
          <ScrollAnimationWrapper direction="right" delay={200}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input id="name" name="name" placeholder="Enter your full name" required />
                  </div>

                  <div>
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input id="email" name="email" type="email" placeholder="Enter your email address" required />
                  </div>

                  <div>
                    <Label htmlFor="phone">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input id="phone" name="phone" type="tel" placeholder="Enter your phone number" required />
                  </div>

                  <div>
                    <Label htmlFor="organization">Organization (Optional)</Label>
                    <Input id="organization" name="organization" placeholder="Enter your organization name" />
                  </div>

                  <div>
                    <Label htmlFor="subject">
                      Subject <span className="text-destructive">*</span>
                    </Label>
                    <Input id="subject" name="subject" placeholder="Enter the subject of your message" required />
                  </div>

                  <div>
                    <Label htmlFor="message">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Enter your message here..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  {/* Honeypot field - hidden from users but visible to bots */}
                  <div
                    style={{
                      display: "none",
                    }}
                  >
                    <Label htmlFor="website">Website (leave blank)</Label>
                    <Input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  <Button size="lg" className="w-full" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </ScrollAnimationWrapper>
        </div>

        {/* Map Section */}
        <ScrollAnimationWrapper direction="top" delay={300}>
          <div className="mx-auto mt-16 max-w-6xl">
            <div className="mb-6">
              <h3 className="text-2xl font-bold tracking-tight text-foreground mb-2">Find Us</h3>
              <p className="text-muted-foreground">
                Visit our main office in downtown Vancouver or get directions to our location.
              </p>
            </div>

            <GoogleMapEmbed address={AddressUtils.getGoogleMapsAddress()} height="h-80" showDirections={true} />
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
      </main>
      <Footer />
    </div>
  );
};
