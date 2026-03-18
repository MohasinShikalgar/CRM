import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { interactionsService, customersService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import ModalForm from '../../components/ModalForm';
import toast from 'react-hot-toast';
import { Plus, Mail, Send, Clock, User as UserIcon, Building } from 'lucide-react';

export default function Interactions() {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState({ subject: '', message: '', customerId: '' });
    const [saving, setSaving] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const [ir, cr] = await Promise.all([interactionsService.getAll(), customersService.getAll()]);
            setData(ir.data || []);
            setCustomers(cr.data || []);
        } catch { toast.error('Failed to load interactions'); }
        finally { setLoading(false); }
    };
    useEffect(() => { load(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const cId = form.customerId || customers[0]?.id;
            const uId = user?.id;
            const payload = {
                customerId: cId,
                sentById: uId,
                subject: form.subject || 'No Subject',
                message: form.message || 'No Message'
            };
            await interactionsService.create(payload);
            toast.success('Email sent!');
            setModal(false); setForm({ subject: '', message: '', customerId: '' }); load();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to send email');
        } finally { setSaving(false); }
    };

    const formatDate = (d) => {
        if (!d) return '';
        try { return new Date(d).toLocaleString(); } catch { return d; }
    };

    return (
        <div>
            <div className="page-header">
                <h2 className="page-title">Email Interactions</h2>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary" onClick={() => setModal(true)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Send size={16} /> Send Email
                </motion.button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>Loading...</div>
            ) : data.length === 0 ? (
                <div className="crm-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                    <Mail size={40} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                    <p>No email interactions yet</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {data.map((item, i) => (
                        <motion.div
                            key={item.id ?? i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="timeline-item"
                        >
                            <div className="timeline-dot" />
                            <div className="crm-card" style={{ marginLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Mail size={16} style={{ color: '#6366f1' }} />
                                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.emailSubject || item.subject || '(No subject)'}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                        <Clock size={12} />
                                        <span>{formatDate(item.sentDate || item.createdAt || item.sentAt)}</span>
                                    </div>
                                </div>
                                
                                <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8, border: '1px solid var(--glass-border)' }}>
                                    {item.emailMessage || item.message || item.content || 'No message content provided.'}
                                </div>
                                
                                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <UserIcon size={14} style={{ color: '#06b6d4' }} />
                                        <span>To: {item.customer?.name || item.customerName || 'Unknown Customer'}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <Mail size={14} style={{ color: '#8b5cf6' }} />
                                        <span>From: {item.sentBy?.name || 'System'}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <ModalForm open={modal} onClose={() => { setModal(false); }} title="Send Email" onSubmit={handleSubmit} loading={saving}>
                <div>
                    <label className="form-label">Customer</label>
                    <select className="input-field" value={form.customerId} onChange={e => setForm(f => ({ ...f, customerId: e.target.value }))}>
                        <option value="">Select customer...</option>
                        {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="form-label">Subject</label>
                    <input type="text" className="input-field" placeholder="Email subject" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required />
                </div>
                <div>
                    <label className="form-label">Message</label>
                    <textarea className="input-field" rows={5} placeholder="Write your email..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required style={{ resize: 'vertical' }} />
                </div>
            </ModalForm>
        </div>
    );
}
