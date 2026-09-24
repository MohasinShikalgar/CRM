import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-32 pb-24 text-center">
      <div className="glass-card p-12 rounded-3xl border border-brand-light/10 max-w-md w-full space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-brand-cyan/15 text-brand-cyan flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-heading font-black text-brand-light">404</h1>
          <h2 className="text-xl font-heading font-bold text-brand-light">Page Not Found</h2>
          <p className="text-brand-muted text-sm leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
        <div>
          <Link
            to="/"
            className="neon-glow-btn px-6 py-3 rounded-xl font-heading font-bold text-sm inline-flex items-center space-x-2 border border-brand-light/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
