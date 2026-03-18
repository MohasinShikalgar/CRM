import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { customersService } from '../../services/api';
import DataTable from '../../components/DataTable';
import ModalForm from '../../components/ModalForm';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, UserCheck } from 'lucide-react';

const emptyForm = { name: '', email: '', phone: '', company: '' };

export default function Customers() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [editItem, setEdit] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const load = () => {
        setLoading(true);
        customersService.getAll()
            .then(r => setData(r.data || []))
            .catch(() => toast.error('Failed to load customers'))
            .finally(() => setLoading(false));
    };
    useEffect(() => { load(); }, []);

    const openCreate = () => { setEdit(null); setForm(emptyForm); setModal(true); };
    const openEdit = (row) => { setEdit(row); setForm({ name: row.name || '', email: row.email || '', phone: row.phone || '', company: row.company || '' }); setModal(true); };
    const closeModal = () => { setModal(false); setEdit(null); setForm(emptyForm); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editItem) {
                await customersService.update(editItem.id, form);
                toast.success('Customer updated!');
            } else {
                await customersService.create(form);
                toast.success('Customer created!');
            }
            closeModal(); load();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Error saving customer');
        } finally { setSaving(false); }
    };

    const handleDelete = async (row) => {
        if (!confirm(`Delete customer "${row.name}"?`)) return;
        try {
            await customersService.delete(row.id);
            toast.success('Customer deleted');
            load();
        } catch { toast.error('Failed to delete'); }
    };

    const columns = [
        {
            key: 'name', label: 'Name', render: (v, row) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'white', flexShrink: 0 }}>
                        {v?.[0]?.toUpperCase() || '?'}
                    </div>
                    <span>{v}</span>
                </div>
            )
        },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'company', label: 'Company' },
    ];

    return (
        <div>
            <div className="page-header">
                <h2 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <UserCheck size={22} /> Customers
                </h2>
            </div>

            <DataTable columns={columns} data={data} loading={loading} actions={(row) => [
                <button key="edit" className="btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }} onClick={() => openEdit(row)}>
                    <Edit2 size={12} /> Edit
                </button>,
                <button key="del" className="btn-danger" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }} onClick={() => handleDelete(row)}>
                    <Trash2 size={12} /> Delete
                </button>,
            ]} />

            <ModalForm open={modal} onClose={closeModal} title={editItem ? 'Edit Customer' : 'Create Customer'} onSubmit={handleSubmit} loading={saving}>
                {[
                    ['name', 'Full Name', 'text', 'John Smith'],
                    ['email', 'Email', 'email', 'john@corp.com'],
                    ['phone', 'Phone', 'text', '+1 234 567 8900'],
                    ['company', 'Company', 'text', 'Corp Ltd'],
                ].map(([key, label, type, ph]) => (
                    <div key={key}>
                        <label className="form-label">{label}</label>
                        <input type={type} className="input-field" placeholder={ph} value={form[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                    </div>
                ))}
            </ModalForm>
        </div>
    );
}
