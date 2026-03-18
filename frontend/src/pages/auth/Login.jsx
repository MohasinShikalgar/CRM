import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import ThreeBackground from '../../components/ThreeBackground';
import toast from 'react-hot-toast';
import { Mail, Lock, Zap, Eye, EyeOff } from 'lucide-react';


export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPw, setShowPw] = useState(false);

    const redirectByRole = (role) => {
        const r = (role || '').toLowerCase();
        if (r === 'sales') navigate('/leads');
        else if (r === 'support') navigate('/tickets');
        else navigate('/dashboard');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = await login(form);
            toast.success(`Welcome back, ${user.name || user.email}!`);
            redirectByRole(user.role);
        } catch (err) {
            const data = err?.response?.data;
            const msg = typeof data === 'string'
                ? data
                : data?.message || 'Login failed. Please check your credentials.';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <ThreeBackground />
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                    width: '100%', maxWidth: 420, position: 'relative', zIndex: 10, padding: '0 1rem'
                }}
            >
                <div className="crm-card gradient-border" style={{ padding: '2.5rem 2rem' }}>
                    {/* Logo */}
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                                width: 64, height: 64, borderRadius: 18, margin: '0 auto 1rem',
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 0 30px rgba(99,102,241,0.5)'
                            }}
                        >
                            <Zap size={32} color="white" />
                        </motion.div>
                        <h1 className="gradient-text" style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>CRM</h1>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                        <div>
                            <label className="form-label">Email</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="email" required placeholder="you@example.com"
                                    value={form.email}
                                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                    className="input-field"
                                    style={{ paddingLeft: '2.2rem' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type={showPw ? 'text' : 'password'} required placeholder="••••••••"
                                    value={form.password}
                                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                    className="input-field"
                                    style={{ paddingLeft: '2.2rem', paddingRight: '2.5rem' }}
                                />
                                <button type="button" onClick={() => setShowPw(s => !s)}
                                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                                    {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit" className="btn-primary"
                            disabled={loading}
                            style={{ width: '100%', padding: '0.8rem', fontSize: '0.95rem', marginTop: '0.5rem', position: 'relative', zIndex: 100 }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)', position: 'relative', zIndex: 100 }}>
                        Don't have an account?{' '}
                        <Link to="/register" style={{ color: '#a5b4fc', textDecoration: 'none', fontWeight: 600 }}>Register</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
