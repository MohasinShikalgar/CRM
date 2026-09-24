import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Linkedin, Instagram, Youtube, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-brand-dark border-t border-brand-light/10 pt-20 pb-8 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Column 1: Company Profile */}
        <div className="space-y-6">
          <Link to="/" className="group inline-flex items-center space-x-3">
            <img
              src="/starlink-logo.png"
              alt="StarLink Verse Logo"
              className="w-11 h-11 object-contain rounded-full border border-brand-cyan/40 shadow-[0_0_15px_rgba(0,163,255,0.35)] group-hover:scale-105 transition-transform duration-300"
            />
            <span className="text-3xl font-heading font-black tracking-wider text-brand-light">
              STARLINK<span className="text-brand-cyan"> VERSE</span>
            </span>
          </Link>
          <p className="text-brand-muted text-sm leading-relaxed">
            StarLink Verse is a premium software engineering firm, delivering bespoke web, mobile, and enterprise cloud solutions that drive business growth through innovative technology.
          </p>
          <div className="flex space-x-4">
            <a href="#linkedin" className="p-2.5 rounded-lg bg-brand-light/5 border border-brand-light/10 hover:border-brand-cyan text-brand-muted hover:text-brand-cyan transition-all duration-300">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#instagram" className="p-2.5 rounded-lg bg-brand-light/5 border border-brand-light/10 hover:border-brand-cyan text-brand-muted hover:text-brand-cyan transition-all duration-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#youtube" className="p-2.5 rounded-lg bg-brand-light/5 border border-brand-light/10 hover:border-brand-cyan text-brand-muted hover:text-brand-cyan transition-all duration-300">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="space-y-6">
          <h4 className="text-brand-light font-heading font-bold text-lg tracking-wide border-l-2 border-brand-cyan pl-3">
            Quick Links
          </h4>
          <ul className="space-y-3.5 text-brand-muted text-sm">
            <li>
              <Link to="/" className="hover:text-brand-cyan transition-colors duration-300 flex items-center">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-brand-cyan transition-colors duration-300 flex items-center">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-brand-cyan transition-colors duration-300 flex items-center">
                Our Services
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-brand-cyan transition-colors duration-300 flex items-center">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-brand-cyan transition-colors duration-300 flex items-center">
                Products Catalog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-brand-cyan transition-colors duration-300 flex items-center">
                Get In Touch
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Corporate Details */}
        <div className="space-y-6">
          <h4 className="text-brand-light font-heading font-bold text-lg tracking-wide border-l-2 border-brand-cyan pl-3">
            Corporate Info
          </h4>
          <ul className="space-y-3.5 text-brand-muted text-sm">
            <li className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-brand-cyan tracking-wider">Registered Name</span>
              <span className="text-brand-light mt-1">StarLink Verse Private Limited</span>
            </li>
            <li className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-brand-cyan tracking-wider">Admin Portal</span>
              <Link to="/admin" className="text-brand-cyan hover:underline mt-1">
                Enter Admin Console &rarr;
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div className="space-y-6">
          <h4 className="text-brand-light font-heading font-bold text-lg tracking-wide border-l-2 border-brand-cyan pl-3">
            Contact Details
          </h4>
          <ul className="space-y-4 text-brand-muted text-sm">
            <li className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-brand-cyan shrink-0" />
              <div className="flex flex-col">
                <a href="tel:8805838592" className="hover:text-brand-light transition-colors duration-300">8805838592</a>
              </div>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-brand-cyan shrink-0" />
              <div className="flex flex-col">
                <a href="mailto:mohsinshikalgar84@gmail.com" className="hover:text-brand-light transition-colors duration-300">mohsinshikalgar84@gmail.com</a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-brand-light/10 flex flex-col md:flex-row justify-between items-center relative z-10">
        <p className="text-brand-muted text-xs text-center md:text-left">
          &copy; {new Date().getFullYear()} StarLink Verse Pvt. Ltd. All rights reserved.
        </p>
        <button
          onClick={scrollToTop}
          className="mt-4 md:mt-0 flex items-center space-x-2 text-xs font-semibold text-brand-cyan hover:text-brand-light transition-colors duration-300 group"
        >
          <span>Back to Top</span>
          <span className="p-1 rounded-full bg-brand-light/5 border border-brand-light/10 group-hover:bg-brand-blue group-hover:border-brand-blue transition-all duration-300">
            <ArrowUp className="w-3.5 h-3.5 text-brand-light group-hover:text-white transition-colors duration-300" />
          </span>
        </button>
      </div>
    </footer>
  );
}
