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
    '/reports': 'Reports',
    '/sales': 'Sales Dashboard',
    '/support': 'Support Dashboard',
};

export default function Navbar({ sidebarCollapsed, onToggleSidebar }) {
    const { dark, toggle } = useTheme();
    const { user } = useAuth();
    const location = useLocation();

    const pageTitle = routeLabels[location.pathname] || 'CRM';

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
                height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 1.5rem',
                background: '#FFFFFF',
                borderBottom: '1px solid #E2E8F0',
                position: 'sticky', top: 0, zIndex: 50,
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
            }}
        >
            {/* Left */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                    onClick={onToggleSidebar}
                    style={{ background: 'none', border: 'none', color: '#4B5563', cursor: 'pointer', padding: 4 }}
                >
                    <Menu size={20} />
                </button>
                <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1F2937', fontFamily: 'var(--font-heading)' }}>{pageTitle}</h1>
            </div>

            {/* Right */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Theme toggle */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggle}
                    style={{
                        background: '#FFFFFF', border: '1px solid #E2E8F0',
                        borderRadius: 8, padding: '0.4rem 0.6rem', color: '#4B5563',
                        cursor: 'pointer', display: 'flex', alignItems: 'center',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }}
                >
                    {dark ? <Sun size={16} /> : <Moon size={16} />}
                </motion.button>

                {/* Notifications */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        background: '#FFFFFF', border: '1px solid #E2E8F0',
                        borderRadius: 8, padding: '0.4rem 0.6rem', color: '#4B5563',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', position: 'relative',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }}
                >
                    <Bell size={16} />
                    <span style={{
                        position: 'absolute', top: 4, right: 4, width: 7, height: 7,
                        borderRadius: '50%', background: '#EF4444', border: '2px solid #FFFFFF'
                    }} />
                </motion.button>

                {/* Avatar */}
                <div style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: '#2563EB',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.8rem', color: '#FFFFFF',
                    boxShadow: '0 2px 6px rgba(37, 99, 235, 0.2)',
                    cursor: 'pointer'
                }}>
                    {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                </div>
            </div>
        </motion.header>
    );
}
