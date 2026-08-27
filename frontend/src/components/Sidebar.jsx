import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, Users, UserCheck, Briefcase, CheckSquare,
    Mail, FileText, LogOut, Zap
} from 'lucide-react';

const links = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/leads', icon: Users, label: 'Leads' },
    { to: '/customers', icon: UserCheck, label: 'Customers' },
    { to: '/deals', icon: Briefcase, label: 'Deals' },
    { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { to: '/interactions', icon: Mail, label: 'Interactions' },
    { to: '/reports', icon: FileText, label: 'Reports' },
];

export default function Sidebar({ collapsed, setCollapsed }) {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    let displayLinks = links;
    if (user?.role === 'SALES') {
        displayLinks = [
            { to: '/sales', icon: LayoutDashboard, label: 'Sales Dashboard' },
            { to: '/leads', icon: Users, label: 'Leads' },
            { to: '/customers', icon: UserCheck, label: 'Customers' },
            { to: '/deals', icon: Briefcase, label: 'Deals' },
            { to: '/reports', icon: FileText, label: 'Reports' },
        ];
    } else if (user?.role === 'SUPPORT') {
        displayLinks = [
            { to: '/support', icon: LayoutDashboard, label: 'Support Dashboard' },
            { to: '/interactions', icon: Mail, label: 'Interactions' },
            { to: '/reports', icon: FileText, label: 'Reports' },
        ];
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <motion.aside
            animate={{ width: collapsed ? 72 : 240 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
                height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 100,
                background: '#FFFFFF',
                borderRight: '1px solid #E2E8F0',
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden',
                flexShrink: 0,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
            }}
        >
            {/* Logo */}
            <div style={{
                padding: '1.25rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
                borderBottom: '1px solid #E2E8F0', cursor: 'pointer'
            }} onClick={() => setCollapsed(!collapsed)}>
                <div style={{
                    width: 38, height: 38, borderRadius: 8, flexShrink: 0,
                    background: '#2563EB',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)'
                }}>
                    <Zap size={20} color="white" />
                </div>
                {!collapsed && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                        <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#1F2937', fontFamily: 'var(--font-heading)' }}>
                            CRM
                        </div>
                        <div style={{ fontSize: '0.65rem', color: '#6B7280', marginTop: '-2px', fontWeight: 500 }}>Management Suite</div>
                    </motion.div>
                )}
            </div>

            {/* Nav Links */}
            <nav style={{ flex: 1, padding: '0.75rem 0.5rem', overflowY: 'auto', overflowX: 'hidden' }}>
                {displayLinks.map(({ to, icon: Icon, label }) => (
                    <NavLink key={to} to={to} style={{ textDecoration: 'none', display: 'block', marginBottom: '0.2rem' }}>
                        {({ isActive }) => (
                            <motion.div
                                whileHover={{ x: 3 }}
                                className={`sidebar-link${isActive ? ' active' : ''}`}
                                title={collapsed ? label : undefined}
                                style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
                            >
                                <Icon size={18} style={{ flexShrink: 0 }} />
                                {!collapsed && (
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}>
                                        {label}
                                    </motion.span>
                                )}
                            </motion.div>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* User + Logout */}
            <div style={{ padding: '0.75rem 0.5rem', borderTop: '1px solid #E2E8F0' }}>
                {!collapsed && user && (
                    <div style={{ padding: '0.5rem 0.75rem', marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1F2937' }}>{user.name || user.email}</div>
                        <div style={{ 
                            display: 'inline-block',
                            marginTop: '0.25rem',
                            padding: '0.15rem 0.4rem', 
                            borderRadius: '4px',
                            fontSize: '0.65rem', 
                            fontWeight: 700,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            background: user.role === 'ADMIN' ? '#FEF2F2' : 
                                        user.role === 'SALES' ? '#ECFDF5' : 
                                        '#EFF6FF',
                            color: user.role === 'ADMIN' ? '#EF4444' : 
                                   user.role === 'SALES' ? '#10B981' : 
                                   '#2563EB',
                            border: `1px solid ${user.role === 'ADMIN' ? '#FEE2E2' : user.role === 'SALES' ? '#D1FAE5' : '#DBEAFE'}`
                        }}>
                            {user.role} USER
                        </div>
                    </div>
                )}
                <motion.button
                    whileHover={{ x: 3 }}
                    onClick={handleLogout}
                    className="sidebar-link"
                    style={{ width: '100%', border: 'none', background: 'none', justifyContent: collapsed ? 'center' : 'flex-start', cursor: 'pointer' }}
                    title={collapsed ? 'Logout' : undefined}
                >
                    <LogOut size={18} style={{ flexShrink: 0, color: '#EF4444' }} />
                    {!collapsed && <span style={{ color: '#EF4444' }}>Logout</span>}
                </motion.button>
            </div>
        </motion.aside>
    );
}
