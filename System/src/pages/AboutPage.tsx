import React from 'react';
import { Award, ShieldCheck, Heart, User, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const certifications = [
    { title: 'ISO 27001 Certified', desc: 'International information security management systems compliance to secure database and client assets.' },
    { title: 'SOC 2 Type II Compliant', desc: 'Rigorous control audits validating data security, availability, processing integrity, and privacy.' },
    { title: 'CMMI Level 3 Appraised', desc: 'Process maturity model assessment verifying structured project execution and software delivery.' },
    { title: 'NASSCOM Member', desc: 'Official recognition under India’s premier national association of software and service companies.' }
  ];

  const team = [
    { name: 'Mohasin Khan', role: 'Managing Director & Founder', bio: 'With over 16 years of expertise in software development and tech architecture, Mohasin heads the strategic growth of StarLink Verse.' },
    { name: 'Anya Roy', role: 'Head of UI/UX Design', bio: 'A graduate from NID, Anya is the creative force behind our futuristic software layouts and interactive design components.' },
    { name: 'Rajesh Verma', role: 'Chief Technical Architect', bio: 'Rajesh oversees server scalability, database design optimization, and cloud operations across AWS and Azure.' }
  ];

  return (
    <div className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-6 space-y-24">
      {/* Page Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 bg-brand-blue/10 border border-brand-blue/30 px-3.5 py-1.5 rounded-full text-brand-cyan text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-brand-light leading-tight">
          Where Code Meets <span className="text-gradient">Innovation</span>
        </h1>
        <p className="text-brand-muted text-sm md:text-base leading-relaxed">
          From a tiny software consultancy in 2010 to India’s leading premium software development company.
        </p>
      </div>

      {/* Story Timeline grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-3xl font-heading font-black text-brand-light">
            The Journey of <span className="text-gradient">StarLink Verse</span>
          </h2>
          <div className="space-y-4 text-brand-muted text-sm leading-relaxed">
            <p>
              Founded in 2010 as <span className="text-brand-light font-semibold">"StarLink Software Solutions"</span>, we initially focused on building custom database scripts and web components for small businesses. Our core philosophy was simple: write clean, bug-free code that performs under load.
            </p>
            <p>
              By 2018, we recognized that enterprises and startups needed more than just maintenance code. They needed high-fidelity web apps, reactive native mobile UI, and automated cloud systems.
            </p>
            <p>
              In 2020, we rebranded as <span className="text-brand-cyan font-semibold">StarLink Verse Private Limited</span> and established our corporate headquarters in Tech Park Sector-62, Noida. Today, we design complete software architectures utilizing Next.js, Spring Boot microservices, React Native, and Kubernetes.
            </p>
          </div>
        </div>

        {/* Timeline representation */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-brand-light/10 space-y-6 shadow-xl relative">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand-cyan/5 rounded-full blur-[50px] pointer-events-none" />
            
            {/* Step 1 */}
            <div className="flex items-start space-x-4">
              <span className="text-2xl font-heading font-black text-brand-cyan shrink-0">2010</span>
              <div className="space-y-1">
                <h4 className="text-brand-light font-bold text-sm">Consultancy Inception</h4>
                <p className="text-brand-muted text-xs leading-relaxed">Started as a small database script and custom web components studio.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start space-x-4 border-t border-brand-light/10 pt-4">
              <span className="text-2xl font-heading font-black text-brand-blue shrink-0">2018</span>
              <div className="space-y-1">
                <h4 className="text-brand-light font-bold text-sm">Full-Stack Expansion</h4>
                <p className="text-brand-muted text-xs leading-relaxed">Expanded into full-stack web architectures, APIs, and cross-platform mobile apps.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-4 border-t border-brand-light/10 pt-4">
              <span className="text-2xl font-heading font-black text-brand-purple shrink-0">2020</span>
              <div className="space-y-1">
                <h4 className="text-brand-light font-bold text-sm">Noida Corporate Office</h4>
                <p className="text-brand-muted text-xs leading-relaxed">Incorporated as StarLink Verse Private Limited and opened our Noida HQ facility.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-8 rounded-2xl border border-brand-light/10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-brand-cyan/15 flex items-center justify-center text-brand-cyan">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-brand-light font-heading font-bold text-xl">Our Mission</h3>
          <p className="text-brand-muted text-sm leading-relaxed">
            To engineer secure, high-fidelity software products that streamline business operations and unlock digital growth for startups and enterprises.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-brand-light/10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-brand-blue/15 flex items-center justify-center text-brand-blue">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-brand-light font-heading font-bold text-xl">Our Vision</h3>
          <p className="text-brand-muted text-sm leading-relaxed">
            To become India’s most trusted technical partner for custom software engineering, renowned for clean code quality, scalability, and delivery speed.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-brand-light/10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-brand-purple/15 flex items-center justify-center text-brand-purple">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-brand-light font-heading font-bold text-xl">Core Values</h3>
          <p className="text-brand-muted text-sm leading-relaxed">
            Uncompromising data security, continuous software testing, microservice-based loose coupling, and transparent agile delivery cycles.
          </p>
        </div>
      </div>

      {/* Certifications list */}
      <div className="space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-black text-brand-light">
            Our Quality <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-brand-muted text-sm leading-relaxed">
            Every line of code and cloud database query conforms to international safety and security standards.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {certifications.map((c, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-brand-light/10 space-y-3 relative hover:border-brand-cyan/35 transition-colors duration-300">
              <ShieldCheck className="w-8 h-8 text-brand-cyan" />
              <h4 className="text-brand-light font-heading font-bold text-base leading-snug">{c.title}</h4>
              <p className="text-brand-muted text-xs leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team profiles */}
      <div className="space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-black text-brand-light">
            Leadership <span className="text-gradient">Team</span>
          </h2>
          <p className="text-brand-muted text-sm leading-relaxed">
            Led by software engineers, system architects, and design specialists dedicated to technical excellence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((t, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-brand-light/10 space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-brand-blue/10 border border-brand-cyan/20 flex items-center justify-center mx-auto text-brand-cyan">
                <User className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-brand-light font-heading font-bold text-lg">{t.name}</h4>
                <p className="text-brand-cyan text-xs font-semibold">{t.role}</p>
              </div>
              <p className="text-brand-muted text-xs leading-relaxed px-2">
                {t.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
