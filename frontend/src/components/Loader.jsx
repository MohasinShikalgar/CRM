import React from 'react';
import { motion } from 'framer-motion';

export default function Loader({ text = 'Loading...' }) {
    return (
        <div style={{
            position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: 'var(--color-bg)', zIndex: 9999
        }}>
            <motion.div
                style={{
                    width: 64, height: 64, borderRadius: '50%',
                    border: '3px solid transparent',
                    borderTopColor: '#6366f1',
                    borderRightColor: '#8b5cf6',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ marginTop: '1rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}
            >
                {text}
            </motion.p>
        </div>
    );
}
