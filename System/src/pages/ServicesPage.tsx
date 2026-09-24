import React from 'react';
import { Server, Globe, Smartphone, Shield, Code, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

const servicesDetail = [
  {
    icon: <Code className="w-8 h-8 text-brand-cyan" />,
    title: 'Custom Software Development',
    desc: 'Scale your business operations with custom-engineered enterprise software tailored to your specific workflows.',
    details: [
      'Bespoke CRM & ERP platforms',
      'API design and integration',
      'Legacy software migration',
      'Service-Oriented Architecture (SOA)'
    ]
  },
  {
    icon: <Globe className="w-8 h-8 text-brand-blue" />,
    title: 'Enterprise Web Apps',
    desc: 'Build highly interactive, responsive, and performance-optimized web systems utilizing modern tech stacks.',
    details: [
      'React and Next.js applications',
      'Secure Spring Boot microservices',
      'Server-side rendering (SSR) optimization',
      'Headless CMS integrations'
    ]
  },
  {
    icon: <Smartphone className="w-8 h-8 text-brand-purple" />,
    title: 'Mobile App Engineering',
    desc: 'Create native-like cross-platform and native iOS & Android applications with flawless UI/UX performance.',
    details: [
      'React Native development',
      'iOS App Store & Android Play Store deployment',
      'Push notification automation',
      'Offline-first data sync functionality'
    ]
  },
  {
    icon: <Server className="w-8 h-8 text-brand-cyan" />,
    title: 'Cloud & DevOps Automation',
    desc: 'Deploy resilient cloud infrastructure with automated CI/CD pipelines and Docker/Kubernetes orchestration.',
    details: [
      'AWS, Azure, and GCP configurations',
      'Kubernetes cluster management',
      'Infrastructure as Code (Terraform)',
      'GitLab / GitHub Actions CI/CD pipelines'
    ]
  },
  {
    icon: <Cpu className="w-8 h-8 text-brand-blue" />,
    title: 'AI & Data Engineering',
    desc: 'Leverage predictive AI models, natural language processing, and advanced analytics to unlock business data insights.',
    details: [
      'Custom LLM integrations',
      'Data warehousing & ETL pipelines',
      'Predictive analytics dashboards',
      'Automated data scraping & cleaning'
    ]
  },
  {
    icon: <Shield className="w-8 h-8 text-brand-purple" />,
    title: 'Cybersecurity Consulting',
    desc: 'Implement zero-trust security architecture, automated threat detection, and compliance configurations.',
    details: [
      'Zero-trust network architecture',
      'SOC2 and GDPR compliance audits',
      'Vulnerability scanning & penetration testing',
      'Secure credential vaulting (Vault)'
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-6 space-y-24">
      {/* Title Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 bg-brand-blue/10 border border-brand-blue/30 px-3.5 py-1.5 rounded-full text-brand-cyan text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Solutions</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-brand-light leading-tight">
          What We <span className="text-gradient">Deliver</span>
        </h1>
        <p className="text-brand-muted text-sm md:text-base leading-relaxed">
          From full-stack development to cloud orchestration, we engineer bespoke digital products that scale.
        </p>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesDetail.map((svc, idx) => (
          <div key={idx} className="glass-card p-8 rounded-2xl border border-brand-light/10 space-y-5 flex flex-col justify-between hover:border-brand-cyan/25 transition-all duration-300">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-brand-light/5 flex items-center justify-center border border-brand-light/10">
                {svc.icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-light">{svc.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{svc.desc}</p>
              
              <div className="pt-4 border-t border-brand-light/5 space-y-2">
                {svc.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center space-x-2 text-xs text-brand-muted">
                    <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
