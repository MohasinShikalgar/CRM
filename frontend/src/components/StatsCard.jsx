import React from 'react';
import { motion } from 'framer-motion';

const colorMap = {
    indigo: { from: '#6366f1', to: '#8b5cf6', shadow: 'rgba(99,102,241,0.35)' },
    cyan: { from: '#06b6d4', to: '#0891b2', shadow: 'rgba(6,182,212,0.35)' },
    green: { from: '#10b981', to: '#059669', shadow: 'rgba(16,185,129,0.35)' },
    orange: { from: '#f59e0b', to: '#d97706', shadow: 'rgba(245,158,11,0.35)' },
    pink: { from: '#ec4899', to: '#db2777', shadow: 'rgba(236,72,153,0.35)' },
};

export default function StatsCard({ icon: Icon, label, value, color = 'indigo', change, index = 0 }) {
    const c = colorMap[color] || colorMap.indigo;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
            whileHover={{ y: -6, boxShadow: `0 16px 40px ${c.shadow}` }}
            className="crm-card"
            style={{ position: 'relative', overflow: 'hidden', cursor: 'default' }}
        >
            {/* BG gradient orb */}
            <div style={{
                position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%',
                background: `radial-gradient(circle, ${c.from}30, transparent 70%)`,
                pointerEvents: 'none'
            }} />

            {/* Icon */}
            <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1rem', boxShadow: `0 8px 20px ${c.shadow}`
            }}>
                <Icon size={22} color="white" />
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                {label}
            </div>

            <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text)', lineHeight: 1.1, marginBottom: '0.4rem' }}
            >
                {value ?? '—'}
            </motion.div>

            {change !== undefined && (
                <div style={{
                    fontSize: '0.75rem', fontWeight: 600,
                    color: change >= 0 ? '#10b981' : '#ef4444',
                    display: 'flex', alignItems: 'center', gap: '0.25rem'
                }}>
                    <span>{change >= 0 ? '▲' : '▼'}</span>
                    <span>{Math.abs(change)}% this month</span>
                </div>
            )}

            {/* Bottom gradient line */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${c.from}, ${c.to})`
            }} />
        </motion.div>
    );
}
