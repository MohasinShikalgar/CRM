import React from 'react';
import EnquiryForm from '../components/EnquiryForm';
import { Mail, Phone, Sparkles, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-6 space-y-16">
      {/* Title Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 bg-brand-blue/10 border border-brand-blue/30 px-3.5 py-1.5 rounded-full text-brand-cyan text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Contact Us</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-brand-light leading-tight">
          Let’s Build Something <span className="text-gradient">Amazing</span>
        </h1>
        <p className="text-brand-muted text-sm md:text-base leading-relaxed">
          Have a software project, cloud architecture requirement, or general enquiry? Fill out the form, and our engineering team will get back to you within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left column: Contact Info Cards */}
        <div className="lg:col-span-4 space-y-8">
          <div className="flex flex-col gap-6">
            {/* Phone Card */}
            <div className="glass-card p-6 rounded-2xl border border-brand-light/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 flex items-center justify-center text-brand-cyan">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="text-brand-light font-heading font-bold text-base">Phone Number</h4>
              <div className="text-brand-muted text-xs space-y-1">
                <p className="font-semibold text-brand-light">
                  <a href="tel:8805838592" className="hover:text-brand-cyan transition-colors">8805838592</a>
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="glass-card p-6 rounded-2xl border border-brand-light/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/15 flex items-center justify-center text-brand-blue">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="text-brand-light font-heading font-bold text-base">Email Address</h4>
              <div className="text-brand-muted text-xs space-y-1">
                <p className="font-semibold text-brand-light">
                  <a href="mailto:mohsinshikalgar84@gmail.com" className="hover:text-brand-cyan transition-colors">mohsinshikalgar84@gmail.com</a>
                </p>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="glass-card p-6 rounded-2xl border border-brand-light/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-purple/15 flex items-center justify-center text-brand-purple">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-brand-light font-heading font-bold text-base">Business Hours</h4>
              <div className="text-brand-muted text-xs space-y-1">
                <p className="font-semibold text-brand-light">Mon - Sat: 9:00 AM - 6:00 PM</p>
                <p className="text-brand-cyan">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Form */}
        <div className="lg:col-span-8">
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
}
