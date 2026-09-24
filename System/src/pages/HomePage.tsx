import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { Server, Globe, Smartphone, Shield, Code, Cpu, ArrowRight, Sparkles } from 'lucide-react';

const services = [
  {
    icon: <Code className="w-8 h-8 text-brand-cyan" />,
    title: 'Custom Software Development',
    desc: 'Scale your business operations with custom-engineered enterprise software tailored to your specific workflows.',
  },
  {
    icon: <Globe className="w-8 h-8 text-brand-blue" />,
    title: 'Enterprise Web Apps',
    desc: 'Build highly interactive, responsive, and performance-optimized web systems utilizing Next.js, React, and Node.js.',
  },
  {
    icon: <Smartphone className="w-8 h-8 text-brand-purple" />,
    title: 'Mobile App Engineering',
    desc: 'Create native-like cross-platform and native iOS & Android applications with flawless UI/UX animations and offline support.',
  },
  {
    icon: <Server className="w-8 h-8 text-brand-cyan" />,
    title: 'Cloud & DevOps Automation',
    desc: 'Deploy resilient cloud infrastructure on AWS, Azure, or GCP with automated CI/CD pipelines and Docker/Kubernetes orchestration.',
  },
  {
    icon: <Cpu className="w-8 h-8 text-brand-blue" />,
    title: 'AI & Data Engineering',
    desc: 'Leverage predictive AI models, natural language processing, and advanced analytics pipelines to unlock new capabilities.',
  },
  {
    icon: <Shield className="w-8 h-8 text-brand-purple" />,
    title: 'Cybersecurity Consulting',
    desc: 'Implement zero-trust security architecture, automated threat detection, and rigorous compliance configurations (GDPR, SOC2).',
  },
];

export default function HomePage() {
  return (
    <div className="relative z-10 w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. STATS BAR */}
      <section className="relative py-8 bg-brand-light/[0.02] border-y border-brand-light/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center items-center">
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-heading font-black text-gradient">14+</div>
              <div className="text-xs uppercase font-bold text-brand-muted tracking-wider">Years Experience</div>
            </div>
            <div className="space-y-1 border-l border-brand-light/10 md:border-l-0 md:border-x">
              <div className="text-3xl md:text-4xl font-heading font-black text-gradient">500+</div>
              <div className="text-xs uppercase font-bold text-brand-muted tracking-wider">Projects Delivered</div>
            </div>
            <div className="space-y-1 border-x border-white/5 md:border-r md:border-x-0">
              <div className="text-3xl md:text-4xl font-heading font-black text-gradient">98.5%</div>
              <div className="text-xs uppercase font-bold text-brand-muted tracking-wider">Client Retention</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-heading font-black text-gradient">99.9%</div>
              <div className="text-xs uppercase font-bold text-brand-muted tracking-wider">SLA Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative">
        <div className="space-y-4 text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-brand-blue/10 border border-brand-blue/30 px-3.5 py-1.5 rounded-full text-brand-cyan text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-brand-light leading-tight">
            High-Performance <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-brand-muted text-sm md:text-base leading-relaxed">
            We provide full-stack software development services from conceptualization to engineering and cloud deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => (
            <div key={idx} className="glass-card glass-card-hover p-8 rounded-2xl border border-brand-light/10 space-y-4 hover:border-brand-cyan/25 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-brand-light/5 flex items-center justify-center border border-brand-light/10">
                {svc.icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-light">{svc.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY STARLINK VERSE */}
      <section className="py-24 bg-brand-light/[0.01] border-y border-brand-light/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-1.5 bg-brand-blue/10 border border-brand-blue/30 px-3.5 py-1.5 rounded-full text-brand-cyan text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Why Partner With Us</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-brand-light leading-tight">
              Bespoke Software <br />
              <span className="text-gradient">Engineered to Scale</span>
            </h2>
            <p className="text-brand-muted text-sm md:text-base leading-relaxed">
              We don’t cut corners. Our engineers implement clean code structures, comprehensive automated test coverage, and scalable architecture designs to guarantee project safety and maintainability.
            </p>
            <div className="space-y-4">
              {[
                { title: 'Dedicated Agile Scrum Team', desc: 'Full-time developers, designers, and project managers committed entirely to your project sprint cycles.' },
                { title: 'Complete Intellectual Ownership', desc: '100% code repository ownership, documentation, and IP rights transferred immediately upon project completion.' },
                { title: 'Strict Quality Assurance Checks', desc: 'Automated CI/CD unit testing, vulnerability assessments, and manual regression tests run before every deployment.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0 mt-0.5">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-brand-light font-bold text-sm">{item.title}</h4>
                    <p className="text-brand-muted text-xs leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <Link to="/contact" className="relative group overflow-hidden rounded-xl inline-block">
                <button className="neon-glow-btn px-6 py-3 rounded-xl font-heading text-sm font-bold flex items-center space-x-2 border border-white/5 cursor-pointer">
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex justify-center">
            {/* Ambient glows */}
            <div className="absolute w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
            
            {/* Visual Panel */}
            <div className="glass-card p-8 rounded-3xl border border-brand-light/10 space-y-6 max-w-md w-full shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-brand-light/10">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-[10px] uppercase font-bold text-brand-muted tracking-widest font-mono">starlink-core.sh</span>
              </div>
              <div className="font-mono text-xs text-brand-light/90 space-y-2">
                <p className="text-brand-muted">$ npm run build</p>
                <p className="text-brand-cyan">&gt; starlink-core@1.0.0 build</p>
                <p>&gt; tsc &amp;&amp; vite build</p>
                <p className="text-green-400">✓ compiling TypeScript files (1.2s)</p>
                <p className="text-green-400">✓ optimizing bundle code structure (0.8s)</p>
                <p className="text-brand-purple">dist/assets/index-D78b61.js    142.60 kB │ gzip: 42.10 kB</p>
                <p className="text-green-400">✓ build succeeded. Ready for cloud deployment.</p>
                <p className="text-brand-muted">$ aws s3 sync dist/ s3://starlink-production</p>
                <p className="text-brand-cyan">upload: dist/index.html to s3://starlink-production/index.html</p>
                <p className="text-green-400 font-bold">✓ CDN invalidated. Live at cloud-origin. 🚀</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
