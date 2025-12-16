'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function ContactClient() {
  return (
    <div className="bg-[#f9f8f6] text-[#1a2621] font-sans antialiased min-h-screen">

      {/* EDITORIAL FRAME */}
      <div className="fixed left-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"></div>
      <div className="fixed right-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"></div>

      <Navbar />

      <div className="flex flex-col md:flex-row min-h-screen pt-24">

        {/* LEFT COLUMN: Contact Info */}
        <div className="w-full md:w-1/2 bg-[#1a2621] text-[#f9f8f6] flex flex-col justify-center p-12 md:p-24 relative overflow-hidden">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

            <div className="relative z-10">
                <span className="text-[#a6906c] text-xs font-bold tracking-widest uppercase mb-6 block">Get in Touch</span>
                <h1 className="font-serif text-4xl md:text-6xl mb-12">Start Your<br/>Journey to<br/>Homeownership.</h1>

                <div className="space-y-8 text-sm tracking-wide font-light">
                    <div className="flex items-start gap-6">
                        <MapPin className="w-5 h-5 text-[#a6906c] mt-1" />
                        <div>
                            <p className="font-bold uppercase tracking-widest mb-1">Vancouver Office</p>
                            <p className="opacity-70">885 W Georgia St Suite 1480<br/>Vancouver, BC V6C 3E8</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-6">
                        <MapPin className="w-5 h-5 text-[#a6906c] mt-1" />
                        <div>
                            <p className="font-bold uppercase tracking-widest mb-1">Merritt Office</p>
                            <p className="opacity-70">Downtown Merritt<br/>British Columbia, Canada</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-6">
                        <Phone className="w-5 h-5 text-[#a6906c] mt-1" />
                        <div>
                            <p className="font-bold uppercase tracking-widest mb-1">Phone</p>
                            <a href="tel:6045296259" className="opacity-70 hover:opacity-100 transition-opacity">
                                604 529 6259
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-6">
                        <Mail className="w-5 h-5 text-[#a6906c] mt-1" />
                        <div>
                            <p className="font-bold uppercase tracking-widest mb-1">Email</p>
                            <a href="mailto:info@anhart.ca" className="opacity-70 hover:opacity-100 transition-opacity">
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
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2603.688!2d-123.122!3d49.2827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673f143a19%3A0x2c2a4386cf559970!2zODg1IFcgR2VvcmdpYSBTdCBTdWl0ZSAxNDgwLCBWYW5jb3V2ZXIsIEJDIFY2QyAzRTg!5e0!3m2!1sen!2sca!4v1703123456789!5m2!1sen!2sca"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Anhart Vancouver Office Location"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>

        {/* RIGHT COLUMN: Form */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-12 md:p-24">
             <div className="max-w-md w-full">
                <h2 className="font-serif text-3xl text-[#1a2621] mb-2">Register Your Interest</h2>
                <p className="text-[#1a2621]/50 text-sm mb-12">Join our interest list for affordable housing in Merritt, BC.</p>

                <form className="space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                        <input type="text" placeholder="First Name" className="bg-transparent border-b border-[#1a2621]/20 py-4 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-sm"/>
                        <input type="text" placeholder="Last Name" className="bg-transparent border-b border-[#1a2621]/20 py-4 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-sm"/>
                    </div>
                    <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-[#1a2621]/20 py-4 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-sm"/>
                    <input type="tel" placeholder="Phone Number" className="w-full bg-transparent border-b border-[#1a2621]/20 py-4 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-sm"/>
                    <select className="w-full bg-transparent border-b border-[#1a2621]/20 py-4 outline-none focus:border-[#a6906c] transition-colors text-[#1a2621]/70 text-sm">
                        <option>Select Unit Type</option>
                        <option>2-Bedroom Garden Flat</option>
                        <option>3-Bedroom Sky Townhome</option>
                        <option>Premium Corner Unit</option>
                        <option>General Inquiry</option>
                    </select>
                    <select className="w-full bg-transparent border-b border-[#1a2621]/20 py-4 outline-none focus:border-[#a6906c] transition-colors text-[#1a2621]/70 text-sm">
                        <option>Current Location</option>
                        <option>Kamloops Area</option>
                        <option>Kelowna Area</option>
                        <option>Vancouver Area</option>
                        <option>Other BC Location</option>
                    </select>
                    <textarea rows={4} placeholder="Tell us about your housing needs and timeline..." className="w-full bg-transparent border-b border-[#1a2621]/20 py-4 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-sm resize-none"></textarea>

                    <button type="button" className="inline-block bg-[#a6906c] text-white px-8 py-4 text-lg font-bold uppercase tracking-wider hover:bg-[#8b7355] transition-colors rounded-lg glow-hover cursor-pointer">
                        Register Interest
                    </button>
                </form>
             </div>
        </div>

      </div>
    </div>
  );
}
