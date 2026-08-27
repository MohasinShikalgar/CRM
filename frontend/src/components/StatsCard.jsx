import React from 'react';
import { motion } from 'framer-motion';

const colorMap = {
    indigo: { bg: '#EFF6FF', text: '#2563EB' },
    cyan: { bg: '#ECFEFF', text: '#0891B2' },
    green: { bg: '#ECFDF5', text: '#059669' },
    emerald: { bg: '#ECFDF5', text: '#059669' },
    orange: { bg: '#FFFBEB', text: '#D97706' },
    pink: { bg: '#FDF2F8', text: '#DB2777' },
    red: { bg: '#FEF2F2', text: '#DC2626' },
};

export default function StatsCard({ icon: Icon, label, value, color = 'indigo', change, index = 0 }) {
    const c = colorMap[color] || colorMap.indigo;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4, ease: 'easeOut' }}
            whileHover={{ y: -4, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)' }}
            className="crm-card"
            style={{ 
                cursor: 'default',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                position: 'relative'
            }}
        >
            <div>
                {/* Header Row: Label & Icon */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {label}
                    </span>
                    <div style={{
                        width: 38, height: 38, borderRadius: 8,
                        background: c.bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Icon size={18} color={c.text} />
                    </div>
                </div>

                {/* Value */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
                    style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1F2937', fontFamily: 'var(--font-heading)', lineHeight: 1.2, marginBottom: '0.5rem' }}
                >
                    {value ?? '—'}
                </motion.div>
            </div>

            {/* Change Indicator */}
            {change !== undefined && (
                <div style={{
                    fontSize: '0.75rem', fontWeight: 600,
                    color: change >= 0 ? '#10B981' : '#EF4444',
                    display: 'flex', alignItems: 'center', gap: '0.25rem',
                    marginTop: 'auto'
                }}>
                    <span style={{ fontSize: '0.65rem' }}>{change >= 0 ? '▲' : '▼'}</span>
                    <span>{Math.abs(change)}% this month</span>
                </div>
            )}
        </motion.div>
    );
}
