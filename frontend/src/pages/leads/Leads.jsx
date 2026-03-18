import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { leadsService } from '../../services/api';
import DataTable from '../../components/DataTable';
import ModalForm from '../../components/ModalForm';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, ArrowRightCircle, UserCheck } from 'lucide-react';

const STATUS_COLORS = { NEW: 'badge-blue', CONTACTED: 'badge-yellow', QUALIFIED: 'badge-green', LOST: 'badge-red' };
const emptyForm = { name: '', email: '', phone: '', company: '', status: 'NEW', source: '' };

export default function Leads() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [editItem, setEdit] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const load = () => {
        setLoading(true);
        leadsService.getAll()
            .then(r => setData(r.data || []))
            .catch(() => toast.error('Failed to load leads'))
            .finally(() => setLoading(false));
    };
    useEffect(() => { load(); }, []);

    const openCreate = () => { setEdit(null); setForm(emptyForm); setModal(true); };
    const openEdit = (row) => { setEdit(row); setForm({ ...row }); setModal(true); };
    const closeModal = () => { setModal(false); setEdit(null); setForm(emptyForm); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editItem) {
                await leadsService.update(editItem.id, form);
                toast.success('Lead updated!');
            } else {
                await leadsService.create(form);
                toast.success('Lead created!');
            }
            closeModal(); load();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Error saving lead');
        } finally { setSaving(false); }
    };

    const handleDelete = async (row) => {
        if (!confirm(`Delete lead "${row.name}"?`)) return;
        try {
            await leadsService.delete(row.id);
            toast.success('Lead deleted');
            load();
        } catch { toast.error('Failed to delete'); }
    };

    const handleConvert = async (row) => {
        try {
            await leadsService.convert(row.id);
            toast.success(`${row.name} converted to customer!`);
            load();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Conversion failed');
        }
    };

    const columns = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'company', label: 'Company' },
        { key: 'source', label: 'Source' },
        { 
            key: 'followUpDate', 
            label: 'Follow-Up', 
            render: (v) => v ? new Date(v).toLocaleDateString() : '—' 
        },
        { 
            key: 'leadScore', 
            label: 'Score', 
            render: (v) => v ? (
                <span style={{ fontWeight: 600, color: v > 80 ? '#ef4444' : 'inherit' }}>
                    {v} {v > 80 && '🔥'}
                </span>
            ) : '—' 
        },
        { key: 'status', label: 'Status', render: (v) => <span className={`badge ${STATUS_COLORS[v] || 'badge-gray'}`}>{v}</span> },
    ];

    return (
        <div>
            <div className="page-header">
                <h2 className="page-title">Leads</h2>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary" onClick={openCreate}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={16} /> New Lead
                </motion.button>
            </div>

            <DataTable columns={columns} data={data} loading={loading} actions={(row) => {
                const isNewOrContacted = ['NEW', 'CONTACTED'].includes(row.status || 'NEW');
                return [
                    <button key="edit" className="btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }} onClick={() => openEdit(row)}>
                        <Edit2 size={12} /> Edit
                    </button>,
                    <button key="conv" className="btn-success" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }} onClick={() => handleConvert(row)}>
                        <UserCheck size={12} /> Convert
                    </button>,
                    <button key="del" className="btn-danger" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }} onClick={() => handleDelete(row)}>
                        <Trash2 size={12} /> Delete
                    </button>,
                ].filter(Boolean);
            }} />

            <ModalForm open={modal} onClose={closeModal} title={editItem ? 'Edit Lead' : 'Create Lead'} onSubmit={handleSubmit} loading={saving}>
                {[
                    ['name', 'Full Name', 'text', 'Jane Doe'],
                    ['email', 'Email', 'email', 'jane@company.com'],
                    ['phone', 'Phone', 'text', '+1 234 567 8900'],
                    ['company', 'Company', 'text', 'Acme Corp'],
                    ['source', 'Source', 'text', 'Website / LinkedIn / Referral'],
                ].map(([key, label, type, ph]) => (
                    <div key={key}>
                        <label className="form-label">{label}</label>
                        <input type={type} className="input-field" placeholder={ph} value={form[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                    </div>
                ))}
                
                <div>
                    <label className="form-label">Follow-Up Date</label>
                    <input type="date" className="input-field" value={form.followUpDate || ''} onChange={e => setForm(f => ({ ...f, followUpDate: e.target.value }))} />
                </div>
                <div>
                    <label className="form-label">Status</label>
                    <select className="input-field" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                        {['NEW', 'CONTACTED', 'QUALIFIED', 'LOST'].map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>
            </ModalForm>
        </div>
    );
}
