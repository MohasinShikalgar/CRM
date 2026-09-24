import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Products', path: '/products' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-4 bg-brand-dark/75 backdrop-blur-md border-b border-brand-light/5 shadow-lg'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="group flex items-center space-x-3">
          <img
            src="/starlink-logo.png"
            alt="StarLink Verse Logo"
            className="w-10 h-10 object-contain rounded-full border border-brand-cyan/40 shadow-[0_0_15px_rgba(0,163,255,0.35)] group-hover:scale-105 transition-transform duration-300"
          />
          <span className="text-2xl font-heading font-black tracking-wider text-brand-light">
            STARLINK<span className="text-brand-cyan group-hover:text-brand-blue transition-colors duration-300"> VERSE</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 ml-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative text-sm font-semibold tracking-wide transition-colors duration-300"
              >
                <span className={isActive ? 'text-brand-cyan font-bold' : 'text-brand-muted hover:text-brand-light'}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 text-brand-muted hover:text-brand-light transition-colors duration-300 rounded-lg hover:bg-brand-light/5 border border-transparent hover:border-brand-light/10"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-b border-brand-light/10 bg-brand-dark/95 backdrop-blur-xl absolute top-full left-0 w-full overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-heading font-semibold transition-colors duration-300 py-1 ${
                      isActive ? 'text-brand-cyan pl-2 border-l-2 border-brand-cyan' : 'text-brand-muted hover:text-brand-light'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
