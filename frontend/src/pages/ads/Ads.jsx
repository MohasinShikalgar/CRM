import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { adsService, campaignsService } from '../../services/api';
import ModalForm from '../../components/ModalForm';
import toast from 'react-hot-toast';
import { Plus, BarChart2, Eye, MousePointer, TrendingUp } from 'lucide-react';

const emptyForm = { platform: '', leadsGenerated: '', createdDate: new Date().toISOString().split('T')[0] };

export default function Ads() {
    const [data, setData] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [editId, setEditId] = useState(null);

    const load = async () => {
        setLoading(true);
        try {
            const [ar, cr] = await Promise.all([adsService.getAll(), campaignsService.getAll()]);
            setData(ar.data || []);
            setCampaigns(cr.data || []);
        } catch { toast.error('Failed to load ads'); }
        finally { setLoading(false); }
    };
    useEffect(() => { load(); }, []);

    const handleEdit = (ad) => {
        setEditId(ad.id);
        setForm({
            platform: ad.platform || '',
            leadsGenerated: ad.leadsGenerated || '',
            createdDate: ad.createdDate ? new Date(ad.createdDate).toISOString().split('T')[0] : ''
        });
        setModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this ad?')) return;
        try {
            await adsService.delete(id);
            toast.success('Ad deleted!');
            load();
        } catch { toast.error('Failed to delete ad'); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const formData = {
                platform: form.platform,
                leadsGenerated: parseInt(form.leadsGenerated) || 0,
                createdDate: form.createdDate
            };
            
            if (editId) {
                await adsService.update(editId, formData);
                toast.success('Ad updated!');
            } else {
                // If the user wants to add an ad, we need a campaign ID. We'll pick the first available or default to 1 for now if empty
                const cmpId = form.campaignId || campaigns[0]?.id || 1;
                await adsService.create(cmpId, formData);
                toast.success('Ad created!');
            }
            
            setModal(false); setForm(emptyForm); setEditId(null); load();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Error saving ad');
        } finally { setSaving(false); }
    };



    return (
        <div>
            <div className="page-header">
                <h2 className="page-title">Ad Tracking</h2>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary" onClick={() => { setEditId(null); setForm(emptyForm); setModal(true); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={16} /> New Ad
                </motion.button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>Loading...</div>
            ) : data.length === 0 ? (
                <div className="crm-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                    <BarChart2 size={40} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                    <p>No ads tracked yet.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                    {data.map((ad, i) => (
                        <motion.div
                            key={ad.id ?? i}
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}
                            className="crm-card"
                            style={{ position: 'relative', overflow: 'hidden' }}
                        >
                            <div style={{ position: 'absolute', top: -15, right: -15, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>Ad #{ad.id}</div>
                                    {ad.platform && <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{ad.platform}</div>}
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => handleEdit(ad)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: '0.2rem' }} title="Edit">✏️</button>
                                    <button onClick={() => handleDelete(ad.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem' }} title="Delete">🗑️</button>
                                </div>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                <div style={{ textAlign: 'center', padding: '0.5rem', borderRadius: 8, background: 'rgba(99,102,241,0.08)' }}>
                                    <Eye size={14} style={{ color: '#6366f1', margin: '0 auto 0.3rem' }} />
                                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)' }}>{ad.leadsGenerated || 0}</div>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>Leads Generated</div>
                                </div>
                                <div style={{ textAlign: 'center', padding: '0.5rem', borderRadius: 8, background: 'rgba(16,185,129,0.08)' }}>
                                    <TrendingUp size={14} style={{ color: '#10b981', margin: '0 auto 0.3rem' }} />
                                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981' }}>{ad.createdDate ? new Date(ad.createdDate).toLocaleDateString() : '—'}</div>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>Created Date</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <ModalForm open={modal} onClose={() => { setModal(false); setForm(emptyForm); setEditId(null); }} title={editId ? "Edit Ad" : "Create Ad"} onSubmit={handleSubmit} loading={saving}>
                <div>
                    <label className="form-label">Platform</label>
                    <input type="text" className="input-field" placeholder="Google / Facebook / Instagram" value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value }))} required />
                </div>
                <div>
                    <label className="form-label">Leads Generated</label>
                    <input type="number" className="input-field" placeholder="50" value={form.leadsGenerated} onChange={e => setForm(f => ({ ...f, leadsGenerated: e.target.value }))} />
                </div>
                <div>
                    <label className="form-label">Created Date</label>
                    <input type="date" className="input-field" value={form.createdDate} onChange={e => setForm(f => ({ ...f, createdDate: e.target.value }))} required />
                </div>
                
                {!editId && (
                    <div>
                        <label className="form-label">Campaign</label>
                        <select className="input-field" value={form.campaignId} onChange={e => setForm(f => ({ ...f, campaignId: e.target.value }))}>
                            <option value="">Select campaign...</option>
                            {campaigns.map(c => <option key={c.id} value={c.id}>{c.campaignName}</option>)}
                        </select>
                    </div>
                )}
            </ModalForm>
        </div>
    );
}
