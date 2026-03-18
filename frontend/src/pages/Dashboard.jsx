import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { dashboardService } from '../services/api';
import StatsCard from '../components/StatsCard';
import { Users, UserCheck, Briefcase, TicketIcon, TrendingUp, Activity } from 'lucide-react';
import toast from 'react-hot-toast';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

const mockMonthly = [
    { month: 'Oct', leads: 40, deals: 24, tickets: 12 },
    { month: 'Nov', leads: 55, deals: 31, tickets: 18 },
    { month: 'Dec', leads: 48, deals: 28, tickets: 15 },
    { month: 'Jan', leads: 70, deals: 45, tickets: 20 },
    { month: 'Feb', leads: 62, deals: 39, tickets: 16 },
    { month: 'Mar', leads: 85, deals: 56, tickets: 25 },
];
const pieDealData = [
    { name: 'Prospect', value: 40, color: '#6366f1' },
    { name: 'Negotiation', value: 35, color: '#8b5cf6' },
    { name: 'Closed', value: 25, color: '#10b981' },
];
const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);
    return percent > 0.05 ? (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    ) : null;
};

const tooltipStyle = {
    background: 'rgba(15,15,26,0.95)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    color: '#e2e8f0',
    fontSize: '0.8rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
};

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dashboardService.get()
            .then(res => setStats(res.data))
            .catch(() => toast.error('Could not load dashboard stats'))
            .finally(() => setLoading(false));
    }, []);

    const cards = [
        { icon: Users, label: 'Total Leads', value: stats?.totalLeads, color: 'indigo', change: 12, index: 0 },
        { icon: UserCheck, label: 'Total Customers', value: stats?.totalCustomers, color: 'cyan', change: 8, index: 1 },
        { icon: Briefcase, label: 'Total Deals', value: stats?.totalDeals, color: 'green', change: 5, index: 2 },
        { icon: TicketIcon, label: 'Open Tickets', value: stats?.openTickets, color: 'orange', change: -3, index: 3 },
        { icon: TrendingUp, label: 'Pipeline Forecast', value: stats?.salesForecast ? `$${stats.salesForecast.toLocaleString()}` : '$0', color: 'emerald', change: 15, index: 4 },
        { icon: TicketIcon, label: 'SLA Breached', value: stats?.slaBreachedTickets || 0, color: 'red', change: 0, index: 5 },
        { icon: Activity, label: 'Average ROI', value: stats?.averageRoi ? `${stats.averageRoi}%` : '0%', color: 'blue', change: 4, index: 6 },
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
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15), rgba(6,182,212,0.1))',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'
                }}
            >
                <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.25rem' }}>
                        Welcome to <span className="gradient-text">CRM Pro</span> 👋
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                        Here's what's happening with your business today.
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    <Activity size={16} style={{ color: '#10b981' }} />
                    <span style={{ color: '#10b981', fontWeight: 600 }}>All systems operational</span>
                </div>
            </motion.div>

            {/* Stats cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                {cards.map(c => <StatsCard key={c.label} loading={loading} {...c} />)}
            </div>

            {/* Charts row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                {/* Area chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="crm-card"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                        <TrendingUp size={16} style={{ color: '#6366f1' }} />
                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Monthly Performance</span>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={mockMonthly}>
                            <defs>
                                <linearGradient id="gLeads" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="gDeals" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Area type="monotone" dataKey="leads" stroke="#6366f1" fill="url(#gLeads)" strokeWidth={2} dot={false} name="Leads" />
                            <Area type="monotone" dataKey="deals" stroke="#10b981" fill="url(#gDeals)" strokeWidth={2} dot={false} name="Deals" />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Pie chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="crm-card"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                        <Briefcase size={16} style={{ color: '#8b5cf6' }} />
                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Deal Stages</span>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie data={pieDealData} cx="50%" cy="50%" innerRadius={50} outerRadius={85}
                                labelLine={false} label={renderLabel} dataKey="value">
                                {pieDealData.map((e, i) => <Cell key={i} fill={e.color} />)}
                            </Pie>
                            <Legend formatter={(v) => <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>{v}</span>} />
                            <Tooltip contentStyle={tooltipStyle} />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Bar chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="crm-card"
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <TicketIcon size={16} style={{ color: '#f59e0b' }} />
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Monthly Tickets</span>
                </div>
                <ResponsiveContainer width="100%" height={160}>
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
