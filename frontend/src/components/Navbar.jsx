import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, Bell, Menu } from 'lucide-react';

const routeLabels = {
    '/dashboard': 'Dashboard',
    '/leads': 'Leads',
    '/customers': 'Customers',
    '/deals': 'Deals',
    '/tasks': 'Tasks',
    '/interactions': 'Interactions',
    '/tickets': 'Support Tickets',
    '/campaigns': 'Campaigns',
    '/ads': 'Ad Tracking',
    '/reports': 'Reports',
};

export default function Navbar({ sidebarCollapsed, onToggleSidebar }) {
    const { dark, toggle } = useTheme();
    const { user } = useAuth();
    const location = useLocation();

    const pageTitle = routeLabels[location.pathname] || 'CRM Pro';

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
                height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 1.5rem',
                background: 'rgba(15,15,26,0.8)',
                borderBottom: '1px solid var(--glass-border)',
                backdropFilter: 'blur(20px)',
                position: 'sticky', top: 0, zIndex: 50,
            }}
        >
            {/* Left */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                    onClick={onToggleSidebar}
                    style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: 4 }}
                >
                    <Menu size={20} />
                </button>
                <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)' }}>{pageTitle}</h1>
            </div>

            {/* Right */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Theme toggle */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggle}
                    style={{
                        background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
                        borderRadius: 10, padding: '0.4rem 0.6rem', color: 'var(--color-text-muted)',
                        cursor: 'pointer', display: 'flex', alignItems: 'center'
                    }}
                >
                    {dark ? <Sun size={16} /> : <Moon size={16} />}
                </motion.button>

                {/* Notifications */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
                        borderRadius: 10, padding: '0.4rem 0.6rem', color: 'var(--color-text-muted)',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', position: 'relative'
                    }}
                >
                    <Bell size={16} />
                    <span style={{
                        position: 'absolute', top: 4, right: 4, width: 7, height: 7,
                        borderRadius: '50%', background: '#ef4444', border: '2px solid var(--color-bg)'
                    }} />
                </motion.button>

                {/* Avatar */}
                <div style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.8rem', color: 'white',
                    boxShadow: '0 0 12px rgba(99,102,241,0.4)',
                    cursor: 'pointer'
                }}>
                    {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                </div>
            </div>
        </motion.header>
    );
}
