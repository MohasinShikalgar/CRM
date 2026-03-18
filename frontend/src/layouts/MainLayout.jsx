import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ThreeBackground from '../components/ThreeBackground';
import { Toaster } from 'react-hot-toast';

export default function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarWidth = collapsed ? 72 : 240;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
            <ThreeBackground />
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div style={{
                marginLeft: sidebarWidth,
                transition: 'margin-left 0.3s ease',
                minHeight: '100vh',
                position: 'relative', zIndex: 1,
                display: 'flex', flexDirection: 'column'
            }}>
                <Navbar sidebarCollapsed={collapsed} onToggleSidebar={() => setCollapsed(c => !c)} />
                <main style={{ flex: 1, padding: '1.5rem', overflow: 'auto' }}>
                    <Outlet />
                </main>
            </div>
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: 'rgba(26,26,46,0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#e2e8f0',
                        backdropFilter: 'blur(12px)',
                        fontFamily: 'Inter, sans-serif',
                    },
                    success: { iconTheme: { primary: '#10b981', secondary: 'white' } },
                    error: { iconTheme: { primary: '#ef4444', secondary: 'white' } },
                }}
            />
        </div>
    );
}
