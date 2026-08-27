import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { campaignsService } from '../../services/api';
import ModalForm from '../../components/ModalForm';
import toast from 'react-hot-toast';
import { Plus, Megaphone, Mail, Users, Calendar, Edit2, Trash2 } from 'lucide-react';

const emptyForm = { name: '', emailSubject: '', emailMessage: '', targetGroup: '', budget: '', revenueGenerated: '' };

export default function Campaigns() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [editId, setEditId] = useState(null);

    const load = () => {
        setLoading(true);
        campaignsService.getAll()
            .then(r => setData(r.data || []))
            .catch(() => toast.error('Failed to load campaigns'))
            .finally(() => setLoading(false));
    };
    useEffect(() => { load(); }, []);

    const handleEdit = (camp) => {
        setEditId(camp.id);
        setForm({
            name: camp.campaignName || '',
            emailSubject: camp.emailSubject || '',
            emailMessage: camp.emailMessage || '',
            targetGroup: camp.targetGroup || '',
            budget: camp.budget || '',
            revenueGenerated: camp.revenueGenerated || ''
        });
        setModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this campaign?')) return;
        try {
            await campaignsService.delete(id);
            toast.success('Campaign deleted!');
            load();
        } catch { toast.error('Failed to delete campaign'); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const formData = { 
                campaignName: form.name, 
                emailSubject: form.emailSubject, 
                emailMessage: form.emailMessage, 
                targetGroup: form.targetGroup,
                budget: parseFloat(form.budget) || null,
                revenueGenerated: parseFloat(form.revenueGenerated) || null
            };

            if (editId) {
                await campaignsService.update(editId, formData);
                toast.success('Campaign updated!');
            } else {
                await campaignsService.create(formData);
                toast.success('Campaign created!');
            }
            setModal(false); setForm(emptyForm); setEditId(null); load();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Error saving campaign');
        } finally { setSaving(false); }
    };

    return (
        <div>
            <div className="page-header">
                <h2 className="page-title">Campaigns</h2>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary" onClick={() => { setEditId(null); setForm(emptyForm); setModal(true); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={16} /> New Campaign
                </motion.button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>Loading...</div>
            ) : data.length === 0 ? (
                <div className="crm-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                    <Megaphone size={40} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                    <p>No campaigns yet. Create your first one!</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                    {data.map((camp, i) => (
                        <motion.div
                            key={camp.id ?? i}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                            className="crm-card"
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 8, background: '#EFF6FF', border: '1px solid #DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Megaphone size={18} color="#2563EB" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1F2937' }}>{camp.campaignName}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#4B5563', fontWeight: 500 }}>{camp.targetGroup}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.4rem' }}>
                                    <button onClick={() => handleEdit(camp)} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '4px', cursor: 'pointer', padding: '0.3rem', display: 'flex', alignItems: 'center' }} title="Edit">
                                        <Edit2 size={12} style={{ color: '#4B5563' }} />
                                    </button>
                                    <button onClick={() => handleDelete(camp.id)} style={{ background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: '4px', cursor: 'pointer', padding: '0.3rem', display: 'flex', alignItems: 'center' }} title="Delete">
                                        <Trash2 size={12} style={{ color: '#EF4444' }} />
                                    </button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                <Mail size={12} />
                                <span style={{ fontWeight: 600 }}>{camp.emailSubject}</span>
                            </div>
                            {camp.emailMessage && (
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '0.75rem', WebkitLineClamp: 2, overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                                    {camp.emailMessage}
                                </p>
                            )}
                             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.5rem', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '0.5rem', borderRadius: '6px' }}>
                                <div><span style={{color: '#4B5563'}}>Budget:</span> <span style={{fontWeight: 600, color: '#1F2937'}}>${camp.budget || 0}</span></div>
                                <div><span style={{color: '#4B5563'}}>Revenue:</span> <span style={{color: '#10B981', fontWeight: 600}}>${camp.revenueGenerated || 0}</span></div>
                                <div><span style={{color: '#4B5563'}}>ROI:</span> <span style={{fontWeight: 600, color: '#2563EB'}}>{camp.budget ? (((camp.revenueGenerated || 0) - camp.budget) / camp.budget * 100).toFixed(0) : 0}%</span></div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                                <Calendar size={11} />
                                <span>{camp.createdAt ? new Date(camp.createdAt).toLocaleDateString() : '—'}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <ModalForm open={modal} onClose={() => { setModal(false); setForm(emptyForm); setEditId(null); }} title={editId ? "Edit Campaign" : "Create Campaign"} onSubmit={handleSubmit} loading={saving} width={540}>
                <div>
                    <label className="form-label">Campaign Name</label>
                    <input type="text" className="input-field" placeholder="Spring Promotion 2025" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                </div>
                <div>
                    <label className="form-label">Email Subject</label>
                    <input type="text" className="input-field" placeholder="Exclusive offer just for you!" value={form.emailSubject} onChange={e => setForm(f => ({ ...f, emailSubject: e.target.value }))} required />
                </div>
                <div>
                    <label className="form-label">Email Message</label>
                    <textarea className="input-field" rows={4} placeholder="Write your campaign email body..." value={form.emailMessage} onChange={e => setForm(f => ({ ...f, emailMessage: e.target.value }))} required style={{ resize: 'vertical' }} />
                </div>
                <div>
                    <label className="form-label">Target Group</label>
                    <input type="text" className="input-field" placeholder="All Customers / Enterprise / SMB" value={form.targetGroup} onChange={e => setForm(f => ({ ...f, targetGroup: e.target.value }))} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label className="form-label">Budget ($)</label>
                        <input type="number" className="input-field" placeholder="5000" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} />
                    </div>
                    <div>
                        <label className="form-label">Expected/Actual Revenue ($)</label>
                        <input type="number" className="input-field" placeholder="15000" value={form.revenueGenerated} onChange={e => setForm(f => ({ ...f, revenueGenerated: e.target.value }))} />
                    </div>
                </div>
            </ModalForm>
        </div>
    );
}
