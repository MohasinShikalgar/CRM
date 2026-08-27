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
        else if (r === 'support') navigate('/interactions');
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                    width: '100%', maxWidth: 420, position: 'relative', zIndex: 10, padding: '0 1rem'
                }}
            >
                <div className="crm-card" style={{ padding: '2.5rem 2rem', background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)' }}>
                    {/* Logo */}
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                                width: 54, height: 54, borderRadius: 10, margin: '0 auto 1.25rem',
                                background: '#2563EB',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
                            }}
                        >
                            <Zap size={24} color="white" />
                        </motion.div>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1F2937', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)' }}>CRM</h1>
                        <p style={{ color: '#6B7280', fontSize: '0.875rem', fontWeight: 500 }}>Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                        <div>
                            <label className="form-label">Email</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
                                <input
                                    type="email" required placeholder="you@example.com"
                                    value={form.email}
                                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                    className="input-field"
                                    style={{ paddingLeft: '2.25rem' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
                                <input
                                    type={showPw ? 'text' : 'password'} required placeholder="••••••••"
                                    value={form.password}
                                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                    className="input-field"
                                    style={{ paddingLeft: '2.25rem', paddingRight: '2.5rem' }}
                                />
                                <button type="button" onClick={() => setShowPw(s => !s)}
                                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}>
                                    {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit" className="btn-primary"
                            disabled={loading}
                            style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem', marginTop: '0.5rem' }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#6B7280' }}>
                        Don't have an account?{' '}
                        <Link to="/register" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 600 }}>Register</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
