'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import Footer from '../components/Footer';
import { GoogleMapEmbed } from '@/components/shared/GoogleMaps';
import { AddressUtils } from '@/config/address';
import { useTurnstile } from '@/hooks/useTurnstile';
import { Turnstile } from '@/components/Turnstile';
// Navbar is now in layout.tsx - no need to import here

export default function ContactClient() {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    unitType: '',
    currentLocation: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Cloudflare Turnstile
  const { token: turnstileToken, key: turnstileKey, reset: resetTurnstile, handlers: turnstileHandlers } = useTurnstile();

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('=== FORM SUBMIT HANDLER CALLED ===');
    console.log('Form submit triggered', formData);
    console.log('Event:', e);
    
    // Validate required fields before proceeding
    if (!formData.firstName || !formData.lastName || !formData.email) {
      console.error('Validation failed - missing required fields');
      setSubmitStatus('error');
      alert('Please fill in all required fields (First Name, Last Name, Email)');
      return;
    }

    // Validate Turnstile token
    if (!turnstileToken) {
      console.error('Turnstile verification required');
      setSubmitStatus('error');
      alert('Please complete the verification. The form is verifying your request...');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare JSON data matching the Google Apps Script expectations
      const jsonData = {
        formSource: 'Contact Page',
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || '',
        unitType: formData.unitType || '',
        currentLocation: formData.currentLocation || '',
        referralSource: '', // Contact page doesn't have this field
        message: formData.message || ''
      };

      console.log('Submitting form data:', jsonData);

      // Send JSON data to Google Apps Script
      // Use 'no-cors' mode to avoid CORS issues with Google Apps Script
      // Note: With no-cors, we can't set custom headers, but JSON body should still work
      // The script expects JSON in e.postData.contents
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxgDQSGyo5GbWuSXs68FUW2S_E6Nio_TI8RFMDuclYpqulveMdHPmzQ6_INc7Lk5hv1jw/exec', {
          method: 'POST',
          mode: 'no-cors', // Required for Google Apps Script to avoid CORS errors
          // Note: Can't set Content-Type header with no-cors, but body will still be sent
          body: JSON.stringify(jsonData),
        });

        // With no-cors mode, we can't read the response, but the data was sent
        // Assume success if no error was thrown
        console.log('Form data sent successfully (no-cors mode - cannot verify response)');
        
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          unitType: '',
          currentLocation: '',
          message: ''
        });
        resetTurnstile(); // Reset Turnstile after successful submission
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } catch (fetchError) {
        // If fetch fails, try alternative method using form submission
        console.log('Fetch failed, trying alternative method:', fetchError);
        throw fetchError;
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Button click handler as backup
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked directly!', formData);
    // Don't prevent default - let the form handle it naturally
    // This is just for debugging
  };
  return (
    <div className="bg-[#f9f8f6] text-[#1a2621] font-sans antialiased min-h-screen">

      {/* EDITORIAL FRAME - Hidden on mobile for better usability */}
      <div className="hidden md:block fixed left-0 top-0 w-16 h-full bg-white z-[60]"></div>
      <div className="hidden md:block fixed right-0 top-0 w-16 h-full bg-white z-[60]"></div>

      {/* Navbar is now in layout.tsx */}

      <div className="flex flex-col md:flex-row min-h-screen pt-24">

        {/* LEFT COLUMN: Contact Info */}
        <div className="w-full md:w-1/2 bg-[#1a2621] text-[#f9f8f6] flex flex-col justify-center p-6 md:p-12 lg:p-24 relative overflow-hidden">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

            <div className="relative z-10">
                <span className="text-[#a6906c] text-xs font-bold tracking-widest uppercase mb-4 md:mb-6 block">Get in Touch</span>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-6xl mb-8 md:mb-12 leading-tight">Express Interest in<br/>Potential<br/>Homeownership.</h1>

                <div className="space-y-6 md:space-y-8 text-sm tracking-wide font-light">
                    <div className="flex items-start gap-4 md:gap-6">
                        <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#a6906c] mt-1 flex-shrink-0" />
                        <div>
                            <p className="font-bold uppercase tracking-widest mb-1 text-xs md:text-sm">Vancouver Office</p>
                            <p className="opacity-70 text-xs md:text-sm leading-relaxed">
                                {AddressUtils.getAddressLines().map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        {index < AddressUtils.getAddressLines().length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-6">
                        <MapPin className="w-5 h-5 text-[#a6906c] mt-1" />
                        <div>
                            <p className="font-bold uppercase tracking-widest mb-1">Merritt Office</p>
                            <p className="opacity-70">Downtown Merritt<br/>British Columbia, Canada</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 md:gap-6">
                        <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#a6906c] mt-1 flex-shrink-0" />
                        <div>
                            <p className="font-bold uppercase tracking-widest mb-1 text-xs md:text-sm">Phone</p>
                            <a href="tel:6045296259" className="opacity-70 hover:opacity-100 transition-opacity text-xs md:text-sm">
                                604 529 6259
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 md:gap-6">
                        <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#a6906c] mt-1 flex-shrink-0" />
                        <div>
                            <p className="font-bold uppercase tracking-widest mb-1 text-xs md:text-sm">Email</p>
                            <a href="mailto:info@anhart.ca" className="opacity-70 hover:opacity-100 transition-opacity text-xs md:text-sm">
                                info@anhart.ca
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <p className="text-[#f9f8f6]/60 text-sm mb-4">Follow our progress</p>
                    <div className="flex gap-6">
                        <div className="p-3 border border-[#f9f8f6]/20 rounded-full">
                            <span className="text-xs font-bold">MR</span>
                        </div>
                        <div className="p-3 border border-[#f9f8f6]/20 rounded-full">
                            <span className="text-xs font-bold">BC</span>
                        </div>
                    </div>
                </div>

                {/* Google Maps */}
                <div className="mt-12">
                    <h3 className="font-bold uppercase tracking-widest mb-4 text-[#f9f8f6]/90">Vancouver Office Location</h3>
                    <div className="rounded-lg overflow-hidden shadow-lg bg-transparent">
                        <div className="opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                            <GoogleMapEmbed 
                                address={AddressUtils.getGoogleMapsAddress()} 
                                height="h-[300px]" 
                                showDirections={true}
                                className="rounded-lg border-0 shadow-none bg-transparent [&>div]:bg-transparent"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* RIGHT COLUMN: Form */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-6 md:p-12 lg:p-24">
             <div className="max-w-md w-full">
                <h2 className="font-serif text-2xl md:text-3xl text-[#1a2621] mb-3 md:mb-2">Register for Priority Updates</h2>
                <p className="text-[#1a2621]/50 text-sm mb-8 md:mb-12">Join our interest list for affordable housing in Merritt, BC.</p>

                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        <input 
                            type="text" 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="First Name" 
                            required
                            className="bg-transparent border-b border-[#1a2621]/20 py-4 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-sm"/>
                        <input 
                            type="text" 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Last Name" 
                            required
                            className="bg-transparent border-b border-[#1a2621]/20 py-4 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-sm"/>
                    </div>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address" 
                        required
                        className="w-full bg-transparent border-b border-[#1a2621]/20 py-4 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-sm"/>
                    <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number" 
                        required
                        className="w-full bg-transparent border-b border-[#1a2621]/20 py-4 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-sm"/>
                    <select 
                        name="unitType"
                        value={formData.unitType}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-transparent border-b border-[#1a2621]/20 py-4 outline-none focus:border-[#a6906c] transition-colors text-[#1a2621]/70 text-sm">
                        <option value="">Select Unit Type</option>
                        <option value="2-Bedroom Garden Flat">2-Bedroom Garden Flat</option>
                        <option value="3-Bedroom Sky Townhome">3-Bedroom Sky Townhome</option>
                        <option value="Premium Corner Unit">Premium Corner Unit</option>
                        <option value="General Inquiry">General Inquiry</option>
                    </select>
                    <select 
                        name="currentLocation"
                        value={formData.currentLocation}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-transparent border-b border-[#1a2621]/20 py-4 outline-none focus:border-[#a6906c] transition-colors text-[#1a2621]/70 text-sm">
                        <option value="">Current Location</option>
                        <option value="Kamloops Area">Kamloops Area</option>
                        <option value="Kelowna Area">Kelowna Area</option>
                        <option value="Vancouver Area">Vancouver Area</option>
                        <option value="Other Location">Other Location</option>
                    </select>
                    <textarea 
                        rows={4} 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your housing needs and timeline..." 
                        className="w-full bg-transparent border-b border-[#1a2621]/20 py-4 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-sm resize-none"></textarea>

                    {submitStatus === 'success' && (
                        <div className="text-center text-green-600 text-sm">
                            Thank you! Your interest has been registered successfully.
                        </div>
                    )}
                    {submitStatus === 'error' && (
                        <div className="text-center text-red-600 text-sm">
                            There was an error submitting your form. Please try again.
                        </div>
                    )}

                    {/* Cloudflare Turnstile */}
                    <div className="flex justify-center py-4" key={turnstileKey}>
                        <Turnstile
                            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAACHSP48uvsbyUZG1"}
                            onSuccess={turnstileHandlers.onSuccess}
                            onError={turnstileHandlers.onError}
                            onExpire={turnstileHandlers.onExpire}
                            theme="auto"
                            size="invisible"
                        />
                    </div>

                    <button 
                        type="submit" 
                        onClick={handleButtonClick}
                        disabled={isSubmitting || !turnstileToken}
                        className={`inline-block px-8 py-4 text-lg font-bold uppercase tracking-wider transition-colors rounded-lg ${
                            !turnstileToken 
                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                                : 'bg-[#a6906c] text-white hover:bg-[#8b7355] glow-hover cursor-pointer'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}>
                        {!turnstileToken 
                            ? 'Verifying User...' 
                            : isSubmitting 
                                ? 'Submitting...' 
                                : 'Register Interest'}
                    </button>
                </form>
             </div>
        </div>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
