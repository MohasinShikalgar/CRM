import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function ModalForm({ open, onClose, title, children, onSubmit, loading, width = 500 }) {
    if (!open) return null;

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 1000,
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '1rem'
                    }}
                    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        style={{
                            width: '100%', maxWidth: width,
                            background: 'rgba(15,15,26,0.95)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: 20,
                            overflow: 'hidden',
                            boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.1)',
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '1.1rem 1.5rem',
                            borderBottom: '1px solid var(--glass-border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.05))'
                        }}>
                            <h3 style={{ fontWeight: 700, fontSize: '1rem', background: 'linear-gradient(135deg,#a5b4fc,#c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {title}
                            </h3>
                            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: 4, display: 'flex' }}>
                                <X size={18} />
                            </button>
                        </div>

                        {/* Body */}
                        <form onSubmit={onSubmit}>
                            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {children}
                            </div>
                            <div style={{
                                padding: '1rem 1.5rem',
                                borderTop: '1px solid var(--glass-border)',
                                display: 'flex', gap: '0.75rem', justifyContent: 'flex-end'
                            }}>
                                <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
                                <button type="submit" className="btn-primary" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
