import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { dashboardService } from '../services/api';
import StatsCard from '../components/StatsCard';
import { TicketIcon, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockMonthly = [
    { month: 'Oct', tickets: 12 },
    { month: 'Nov', tickets: 18 },
    { month: 'Dec', tickets: 15 },
    { month: 'Jan', tickets: 20 },
    { month: 'Feb', tickets: 16 },
    { month: 'Mar', tickets: 25 },
];
const tooltipStyle = { background: 'rgba(15,15,26,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#e2e8f0', fontSize: '0.8rem', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' };

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
        { icon: TicketIcon, label: 'Open Tickets', value: stats?.openTickets, color: 'orange', change: -3, index: 0 },
        { icon: TicketIcon, label: 'SLA Breached', value: stats?.slaBreachedTickets || 0, color: 'red', change: 0, index: 1 },
    ];

    return (
        <div>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="crm-card" style={{ marginBottom: '1.5rem', padding: '1.5rem 2rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15), rgba(6,182,212,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.25rem' }}>Welcome, Support Team 👋</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Here are your current open tickets and activities.</p>
                </div>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                {cards.map(c => <StatsCard key={c.label} loading={loading} {...c} />)}
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="crm-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}><TicketIcon size={16} style={{ color: '#f59e0b' }} /><span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Monthly Tickets</span></div>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={mockMonthly} barSize={28}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Bar dataKey="tickets" fill="url(#ticketGrad)" radius={[4, 4, 0, 0]} name="Tickets">
                            {mockMonthly.map((_, i) => <Cell key={i} fill={`hsl(${38 + i * 8}, 92%, ${55 + i * 2}%)`} />)}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
}
