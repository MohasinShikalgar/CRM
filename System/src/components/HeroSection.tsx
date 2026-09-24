import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Server, Globe, Smartphone } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(9,13,26,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(9,13,26,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center gap-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Side: Headlines & Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black leading-[1.1] tracking-tight text-brand-light">
                Engineering the <br />
                <span className="text-gradient">Digital Future</span>
              </h1>
              <p className="text-brand-light/80 text-lg md:text-xl font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                We design and build bespoke software solutions, enterprise cloud architectures, and premium mobile applications that empower companies and scale start-ups globally.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/services" className="w-full sm:w-auto relative group overflow-hidden rounded-xl inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-cyan opacity-80 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                <button className="relative w-full sm:w-auto neon-glow-btn px-8 py-4 rounded-xl font-heading text-base font-bold flex items-center justify-center space-x-2 border border-brand-light/10">
                  <span>Explore Services</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
   
              <Link to="/contact" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-light/5 border border-brand-light/10 hover:border-brand-cyan hover:bg-brand-light/10 text-brand-light font-heading text-base font-bold transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Get Free Quote</span>
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Futuristic 3D Render */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] perspective-container flex items-center justify-center">
              {/* Spinning background rings */}
              <div className="absolute w-[95%] h-[95%] border border-dashed border-brand-cyan/20 rounded-full animate-[spin_40s_linear_infinite]" />
              <div className="absolute w-[80%] h-[80%] border border-brand-blue/30 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute w-[50%] h-[50%] border border-double border-brand-purple/20 rounded-full animate-[spin_10s_linear_infinite]" />

              {/* Glowing core */}
              <div className="absolute w-[120px] h-[120px] bg-brand-cyan/10 rounded-full blur-2xl animate-pulse-glow" />

              {/* Floating CSS 3D Structure */}
              <div className="perspective-card absolute w-[240px] h-[240px] animate-float flex items-center justify-center">
                {/* Outer floating node: Mobile Apps */}
                <div
                  className="absolute w-24 h-24 glass-card border-brand-cyan/30 rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-lg transition-all duration-500 hover:border-brand-cyan hover:scale-105"
                  style={{ transform: 'translate3d(-80px, -60px, 40px) rotateX(15deg) rotateY(-15deg)' }}
                >
                  <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center mb-2 text-brand-cyan">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-brand-cyan">Mobile Apps</span>
                </div>

                {/* Inner floating node: STARLINK CORE */}
                <div
                  className="absolute w-36 h-36 glass-card border-brand-blue/40 rounded-3xl flex flex-col items-center justify-center p-4 text-center shadow-2xl transition-all duration-500 hover:border-brand-blue hover:scale-105"
                  style={{ transform: 'translate3d(0, 0, 80px) rotateX(-5deg) rotateY(5deg)' }}
                >
                  <div className="w-12 h-12 rounded-full bg-brand-blue/20 flex items-center justify-center mb-2 animate-pulse-glow text-brand-cyan">
                    <Server className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-heading font-black tracking-wide text-brand-light">STARLINK CORE</span>
                  <span className="text-[8px] uppercase font-bold tracking-widest text-brand-muted mt-1">Cloud Engine</span>
                </div>

                {/* Outer floating node: Enterprise Web */}
                <div
                  className="absolute w-24 h-24 glass-card border-brand-purple/30 rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-lg transition-all duration-500 hover:border-brand-purple hover:scale-105"
                  style={{ transform: 'translate3d(90px, 70px, 30px) rotateX(-10deg) rotateY(15deg)' }}
                >
                  <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center mb-2 text-brand-purple">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-brand-purple">Web Apps</span>
                </div>

                {/* DevOps CI/CD Node */}
                <div
                  className="absolute w-28 h-28 border border-brand-light/15 rounded-full flex items-center justify-center animate-[spin_8s_linear_infinite]"
                  style={{ transform: 'translate3d(-40px, 80px, -50px) rotateX(45deg)' }}
                >
                  <div className="w-full h-[1px] bg-brand-cyan/20 absolute" />
                  <div className="h-full w-[1px] bg-brand-cyan/20 absolute" />
                  <span className="text-[7px] uppercase font-bold text-brand-muted">DevOps CI/CD</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
