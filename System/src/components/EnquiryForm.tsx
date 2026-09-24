import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Send, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

interface EnquiryFormProps {
  prefilledProduct?: string;
}

export default function EnquiryForm({ prefilledProduct }: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    source: prefilledProduct || 'Website',
    status: 'NEW',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend validations
    if (!formData.name.trim()) {
      toast.error('Full Name is required');
      return;
    }

    if (!formData.email.trim()) {
      toast.error('Email Address is required');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!formData.phone.trim()) {
      toast.error('Phone Number is required');
      return;
    }
    const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      toast.error('Please enter a valid phone number (7-20 digits)');
      return;
    }

    setLoading(true);

    try {
      const result = await api.submitLead({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim() || null,
        source: formData.source,
        status: formData.status,
      });

      if (result.success) {
        toast.success('Enquiry submitted successfully!');
        setSubmitted(true);
      } else {
        toast.error(result.message || 'Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Enquiry form submission error:', error);
      toast.error('Unable to submit your enquiry. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-card p-8 rounded-2xl border border-brand-cyan/20 text-center space-y-6 max-w-lg mx-auto py-12 animate-pulse-glow">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-brand-cyan/15 text-brand-cyan mb-2">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-heading font-bold text-brand-light">Thank You!</h3>
          <p className="text-brand-muted text-sm leading-relaxed">
            Thank you! Your enquiry has been submitted successfully. Our team will contact you soon.
          </p>
        </div>
        <button
          onClick={() => {
            setFormData({
              name: '',
              email: '',
              phone: '',
              company: '',
              source: prefilledProduct || 'Website',
              status: 'NEW',
            });
            setSubmitted(false);
          }}
          className="text-brand-cyan hover:text-brand-light transition-colors duration-300 text-sm font-bold underline cursor-pointer"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 rounded-2xl border border-brand-light/10 space-y-5 shadow-2xl relative">
      <div className="space-y-1">
        <h3 className="text-2xl font-heading font-bold text-brand-light tracking-wide">
          Contact Us
        </h3>
        <p className="text-brand-muted text-xs">
          Fill out the form below to get in touch with our team.
        </p>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-bold uppercase text-brand-cyan tracking-wider">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={loading}
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full bg-brand-light/5 border border-brand-light/10 rounded-xl px-4 py-2.5 text-sm text-brand-light focus:outline-none focus:border-brand-cyan transition-colors disabled:opacity-50"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-bold uppercase text-brand-cyan tracking-wider">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={loading}
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full bg-brand-light/5 border border-brand-light/10 rounded-xl px-4 py-2.5 text-sm text-brand-light focus:outline-none focus:border-brand-cyan transition-colors disabled:opacity-50"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-xs font-bold uppercase text-brand-cyan tracking-wider">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            disabled={loading}
            value={formData.phone}
            onChange={handleChange}
            placeholder="9876543210"
            className="w-full bg-brand-light/5 border border-brand-light/10 rounded-xl px-4 py-2.5 text-sm text-brand-light focus:outline-none focus:border-brand-cyan transition-colors disabled:opacity-50"
          />
        </div>

        {/* Company */}
        <div className="space-y-1.5">
          <label htmlFor="company" className="text-xs font-bold uppercase text-brand-cyan tracking-wider">
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            disabled={loading}
            value={formData.company}
            onChange={handleChange}
            placeholder="Acme Corporation"
            className="w-full bg-brand-light/5 border border-brand-light/10 rounded-xl px-4 py-2.5 text-sm text-brand-light focus:outline-none focus:border-brand-cyan transition-colors disabled:opacity-50"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full neon-glow-btn py-3.5 rounded-xl font-heading font-bold text-sm flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 cursor-pointer"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <span>Submit Enquiry</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
