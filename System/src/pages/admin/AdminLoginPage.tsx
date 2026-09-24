import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Lock, User, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const result = await login(username, password);
      if (result.success) {
        toast.success('Access granted! Entering dashboard...');
        const from = (location.state as any)?.from?.pathname || '/admin';
        navigate(from, { replace: true });
      } else {
        toast.error(result.error || 'Invalid username or password');
      }
    } catch (err) {
      console.error('Login submit error:', err);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-brand-dark">
      {/* Background neon flares */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brand-blue/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-brand-purple/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-card p-8 rounded-2xl border border-brand-light/10 space-y-6 shadow-2xl relative">
          {/* Neon Borders */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-cyan rounded-tl-2xl opacity-80" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-cyan rounded-br-2xl opacity-80" />

          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-heading font-black tracking-wider text-brand-light">
              IP<span className="text-brand-cyan">PLAY</span> SYSTEM
            </h1>
            <p className="text-brand-muted text-xs uppercase font-bold tracking-widest flex items-center justify-center space-x-1">
              <Lock className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Admin Gateway</span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-brand-cyan tracking-wider">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter administrator username"
                  className="w-full bg-brand-darkGray/60 border border-brand-light/10 rounded-xl pl-11 pr-4 py-3 text-sm text-brand-light focus:outline-none focus:border-brand-cyan transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-brand-cyan tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter security key"
                  className="w-full bg-brand-darkGray/60 border border-brand-light/10 rounded-xl pl-11 pr-4 py-3 text-sm text-brand-light focus:outline-none focus:border-brand-cyan transition-colors"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full neon-glow-btn py-3.5 rounded-xl font-heading font-bold text-sm flex items-center justify-center space-x-2 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Authenticate Access</span>
                  <LogIn className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
