import React from 'react';

export default function ThreeBackground() {
    return (
        <div 
            style={{
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                zIndex: -1,
                backgroundColor: '#F8FAFC',
                backgroundImage: 'radial-gradient(circle at 1px 1px, #E2E8F0 1px, transparent 0)',
                backgroundSize: '24px 24px',
            }}
        >
            {/* Soft Ambient Glow 1 */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                left: '10%',
                width: '60vw',
                height: '60vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, rgba(147, 197, 253, 0.02) 60%, transparent 100%)',
                filter: 'blur(80px)',
            }} />
            
            {/* Soft Ambient Glow 2 */}
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                right: '5%',
                width: '50vw',
                height: '50vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.04) 0%, rgba(191, 219, 254, 0.01) 50%, transparent 100%)',
                filter: 'blur(100px)',
            }} />
        </div>
    );
}
