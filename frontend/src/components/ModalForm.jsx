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
                        background: 'rgba(15, 23, 42, 0.4)',
                        backdropFilter: 'blur(2px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '1rem'
                    }}
                    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        style={{
                            width: '100%', maxWidth: width,
                            maxHeight: '90vh',
                            display: 'flex', flexDirection: 'column',
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: 12,
                            overflow: 'hidden',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '1rem 1.5rem',
                            borderBottom: '1px solid #E2E8F0',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            background: '#F8FAFC'
                        }}>
                            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#1F2937', fontFamily: 'var(--font-heading)' }}>
                                {title}
                            </h3>
                            <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', padding: 4, display: 'flex', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#1F2937'} onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>
                                <X size={18} />
                            </button>
                        </div>

                        {/* Body */}
                        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', flex: 1 }}>
                            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', flex: 1 }}>
                                {children}
                            </div>
                            <div style={{
                                padding: '1rem 1.5rem',
                                borderTop: '1px solid #E2E8F0',
                                display: 'flex', gap: '0.75rem', justifyContent: 'flex-end',
                                background: '#F8FAFC'
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
