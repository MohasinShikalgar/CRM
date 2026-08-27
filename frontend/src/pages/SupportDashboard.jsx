import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { dashboardService } from '../services/api';
import StatsCard from '../components/StatsCard';
import { Mail, CheckSquare, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockMonthly = [
    { month: 'Oct', interactions: 12 },
    { month: 'Nov', interactions: 18 },
    { month: 'Dec', interactions: 15 },
    { month: 'Jan', interactions: 20 },
    { month: 'Feb', interactions: 16 },
    { month: 'Mar', interactions: 25 },
];

const tooltipStyle = {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: 8,
    color: '#1F2937',
    fontSize: '0.8rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
};

export default function SupportDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dashboardService.get()
            .then(res => setStats(res.data))
            .catch(() => toast.error('Could not load stats'))
            .finally(() => setLoading(false));
    }, []);

    const cards = [
        { icon: Mail, label: 'Total Interactions', value: stats?.totalInteractions || 0, color: 'indigo', change: 12, index: 0 },
        { icon: CheckSquare, label: 'Pending Tasks', value: stats?.pendingTasks || 0, color: 'orange', change: 0, index: 1 },
    ];

    return (
        <div>
            {/* Welcome banner */}
            <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="crm-card" 
                style={{ 
                    marginBottom: '1.5rem', padding: '1.5rem 2rem', 
                    background: '#EFF6FF', 
                    border: '1px solid #DBEAFE', 
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' 
                }}
            >
                <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1F2937', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)' }}>Welcome, Support Team 👋</h2>
                    <p style={{ color: '#4B5563', fontSize: '0.875rem', fontWeight: 500 }}>Here are your current customer communications and tasks.</p>
                </div>
            </motion.div>

            {/* Stats cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                {cards.map(c => <StatsCard key={c.label} loading={loading} {...c} />)}
            </div>

            {/* Bar chart */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="crm-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.5rem' }}>
                    <MessageSquare size={16} style={{ color: '#2563EB' }} />
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1F2937' }}>Monthly Customer Interactions</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={mockMonthly} barSize={28}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                        <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Bar dataKey="interactions" radius={[4, 4, 0, 0]} name="Interactions">
                            {mockMonthly.map((_, i) => (
                                <Cell key={i} fill={`hsl(221, 83%, ${45 + i * 5}%)`} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
}
