import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { dashboardService } from '../services/api';
import StatsCard from '../components/StatsCard';
import { Users, Briefcase, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const mockMonthly = [
    { month: 'Oct', leads: 40, deals: 24 },
    { month: 'Nov', leads: 55, deals: 31 },
    { month: 'Dec', leads: 48, deals: 28 },
    { month: 'Jan', leads: 70, deals: 45 },
    { month: 'Feb', leads: 62, deals: 39 },
    { month: 'Mar', leads: 85, deals: 56 },
];

const pieDealData = [
    { name: 'Prospect', value: 40, color: '#1E40AF' },
    { name: 'Negotiation', value: 35, color: '#2563EB' },
    { name: 'Closed', value: 25, color: '#93C5FD' },
];

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);
    return percent > 0.05 ? <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>{`${(percent * 100).toFixed(0)}%`}</text> : null;
};

const tooltipStyle = {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: 8,
    color: '#1F2937',
    fontSize: '0.8rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
};

export default function SalesDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dashboardService.get()
            .then(res => setStats(res.data))
            .catch(() => toast.error('Could not load stats'))
            .finally(() => setLoading(false));
    }, []);

    const cards = [
        { icon: Users, label: 'Total Leads', value: stats?.totalLeads, color: 'indigo', change: 12, index: 0 },
        { icon: Briefcase, label: 'Total Deals', value: stats?.totalDeals, color: 'green', change: 5, index: 1 },
        { icon: TrendingUp, label: 'Pipeline Forecast', value: stats?.salesForecast ? `$${stats.salesForecast.toLocaleString()}` : '$0', color: 'emerald', change: 15, index: 2 },
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
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1F2937', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)' }}>Welcome, Sales Team 👋</h2>
                    <p style={{ color: '#4B5563', fontSize: '0.875rem', fontWeight: 500 }}>Here's what's happening in your pipeline today.</p>
                </div>
            </motion.div>

            {/* Stats cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                {cards.map(c => <StatsCard key={c.label} loading={loading} {...c} />)}
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="crm-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.5rem' }}>
                        <TrendingUp size={16} style={{ color: '#2563EB' }} />
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1F2937' }}>Pipeline Performance</span>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={mockMonthly}>
                            <defs>
                                <linearGradient id="gLeads" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="gDeals" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                            <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Area type="monotone" dataKey="leads" stroke="#2563EB" fill="url(#gLeads)" strokeWidth={2} dot={false} name="Leads" />
                            <Area type="monotone" dataKey="deals" stroke="#60A5FA" fill="url(#gDeals)" strokeWidth={2} dot={false} name="Deals" />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="crm-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.5rem' }}>
                        <Briefcase size={16} style={{ color: '#2563EB' }} />
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1F2937' }}>Deal Stages</span>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie data={pieDealData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} labelLine={false} label={renderLabel} dataKey="value">
                                {pieDealData.map((e, i) => <Cell key={i} fill={e.color} />)}
                            </Pie>
                            <Legend formatter={(v) => <span style={{ color: '#4B5563', fontSize: '0.75rem', fontWeight: 500 }}>{v}</span>} />
                            <Tooltip contentStyle={tooltipStyle} />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
}
