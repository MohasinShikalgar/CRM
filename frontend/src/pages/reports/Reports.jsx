import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { reportsService } from '../../services/api';
import toast from 'react-hot-toast';
import { Users, UserCheck, Briefcase, TrendingUp } from 'lucide-react';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const tooltipStyle = {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: 8,
    color: '#1F2937',
    fontSize: '0.8rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
};

export default function Reports() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        reportsService.getAll()
            .then(r => setData(r.data))
            .catch(() => toast.error('Failed to load reports'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
            Loading reports...
        </div>
    );

    if (!data) return null;

    // ── Aggregated counts ──────────────────────────────────────────────────
    const leads = data.leads;
    const customers = data.customers;
    const deals = data.deals;

    const summaryCards = [];
    if (leads !== null) summaryCards.push({ icon: Users, label: 'Total Leads', value: leads.length, color: '#6366f1' });
    if (customers !== null) summaryCards.push({ icon: UserCheck, label: 'Total Customers', value: customers.length, color: '#06b6d4' });
    if (deals !== null) summaryCards.push({ icon: Briefcase, label: 'Total Deals', value: deals.length, color: '#10b981' });

    // Lead status breakdown
    const leadPieData = leads ? Object.entries(leads.reduce((acc, l) => {
        const s = l.status || 'UNKNOWN';
        acc[s] = (acc[s] || 0) + 1;
        return acc;
    }, {})).map(([name, value]) => ({ name, value })) : [];
    const LEAD_COLORS = { NEW: '#6366f1', CONTACTED: '#f59e0b', QUALIFIED: '#10b981', LOST: '#ef4444', UNKNOWN: '#94a3b8' };

    // Deal stage breakdown
    const dealBarData = deals ? Object.entries(deals.reduce((acc, d) => {
        const s = d.stage || 'UNKNOWN';
        acc[s] = (acc[s] || 0) + 1;
        return acc;
    }, {})).map(([stage, count]) => ({ stage, count })) : [];

    return (
        <div>
            <div className="page-header">
                <h2 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <TrendingUp size={22} style={{ color: '#2563EB' }} /> Reports & Analytics
                </h2>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                {summaryCards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <motion.div
                            key={card.label}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                            className="crm-card"
                            style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                        >
                            <div style={{
                                width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                                background: `${card.color}15`, display: 'flex', alignItems: 'center',
                                justifyContent: 'center', border: `1px solid ${card.color}30`
                            }}>
                                <Icon size={22} style={{ color: card.color }} />
                            </div>
                            <div>
                                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1F2937' }}>{card.value}</div>
                                <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>{card.label}</div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                {/* Lead Status Pie */}
                {leads !== null && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="crm-card" style={{ flex: '1 1 400px' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Users size={16} style={{ color: '#6366f1' }} /> Lead Status Breakdown
                        </div>
                        {leads.length === 0 ? (
                            <div style={{ textAlign: 'center', color: '#6B7280', padding: '2rem' }}>No leads yet</div>
                        ) : (
                            <ResponsiveContainer width="100%" height={220}>
                                <PieChart>
                                    <Pie data={leadPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="value" labelLine={false}>
                                        {leadPieData.map((entry, i) => (
                                             <Cell key={i} fill={LEAD_COLORS[entry.name] || '#94a3b8'} />
                                        ))}
                                    </Pie>
                                    <Legend formatter={v => <span style={{ color: '#4B5563', fontSize: '0.75rem' }}>{v}</span>} />
                                    <Tooltip contentStyle={tooltipStyle} />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </motion.div>
                )}

                {/* Deal Stage Bar */}
                {deals !== null && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="crm-card" style={{ flex: '1 1 400px' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Briefcase size={16} style={{ color: '#10b981' }} /> Deal Stages
                        </div>
                        {deals.length === 0 ? (
                            <div style={{ textAlign: 'center', color: '#6B7280', padding: '2rem' }}>No deals yet</div>
                        ) : (
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={dealBarData} barSize={36}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                                    <XAxis dataKey="stage" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                                    <Tooltip contentStyle={tooltipStyle} />
                                    <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Deals">
                                        {dealBarData.map((_, i) => (
                                            <Cell key={i} fill={['#6366f1', '#f59e0b', '#10b981'][i % 3]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
