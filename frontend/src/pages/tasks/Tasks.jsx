import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tasksService, customersService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import DataTable from '../../components/DataTable';
import ModalForm from '../../components/ModalForm';
import toast from 'react-hot-toast';
import { CheckSquare, Edit2, CheckCircle, Plus } from 'lucide-react';

const STATUS_COLORS = { PENDING: 'badge-yellow', COMPLETED: 'badge-green' };

const emptyForm = { title: '', description: '', status: 'PENDING', dueDate: '', customerId: '' };

export default function Tasks() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [completingId, setCompletingId] = useState(null);

    const load = () => {
        setLoading(true);
        Promise.allSettled([tasksService.getAll(), customersService.getAll()])
            .then(([tr, cr]) => {
                if (tr.status === 'fulfilled') setTasks(tr.value.data || []);
                if (cr.status === 'fulfilled') setCustomers(cr.value.data || []);
            })
            .catch(() => toast.error('Failed to load'))
            .finally(() => setLoading(false));
    };
    useEffect(() => { load(); }, []);

    const openCreate = () => { setEditItem(null); setForm(emptyForm); setModal(true); };
    const openEdit = (row) => {
        setEditItem(row);
        setForm({
            title: row.title || '',
            description: row.description || '',
            status: row.status || 'PENDING',
            dueDate: row.dueDate || '',
            customerId: row.customer?.id || '',
        });
        setModal(true);
    };
    const closeModal = () => { setModal(false); setEditItem(null); setForm(emptyForm); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editItem) {
                await tasksService.update(editItem.id, { title: form.title, description: form.description, status: form.status, dueDate: form.dueDate || null });
                toast.success('Task updated!');
            } else {
                const cId = form.customerId || customers[0]?.id;
                const uId = user?.id;
                await tasksService.create(uId, cId, { title: form.title, description: form.description, status: form.status, dueDate: form.dueDate || null });
                toast.success('Task created!');
            }
            closeModal(); load();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Error saving task');
        } finally { setSaving(false); }
    };

    const handleComplete = (row) => {
        setCompletingId(row.id);
        setTimeout(async () => {
            try {
                await tasksService.delete(row.id);
                toast.success(`"${row.title}" completed! ✅`);
                load();
            } catch { toast.error('Failed to complete'); }
            finally { setCompletingId(null); }
        }, 2000);
    };

    const columns = [
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description', render: (v) => v || '—' },
        {
            key: 'status', label: 'Status', render: (v) => {
                const display = (v || 'PENDING');
                return <span className={`badge ${STATUS_COLORS[v] || 'badge-gray'}`} style={{ fontSize: '0.7rem' }}>{display}</span>;
            }
        },
        { key: 'dueDate', label: 'Due Date', render: (v) => v || '—' },
        { key: 'customer', label: 'Customer', render: (v) => v?.name || '—' },
        { key: 'assignedTo', label: 'Assigned To', render: (v) => v?.name || '—' },
    ];

    return (
        <div>
            <div className="page-header">
                <h2 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckSquare size={22} /> Tasks
                </h2>
                <button className="btn-primary" onClick={openCreate} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={16} /> New Task
                </button>
            </div>

            <DataTable columns={columns} data={tasks} loading={loading}
                rowStyle={(row) => completingId === row.id ? {
                    transition: 'all 2s ease-in-out',
                    transform: 'perspective(600px) rotateX(90deg) scale(0.5)',
                    opacity: 0,
                    background: 'rgba(16,185,129,0.15)',
                } : {}}
                actions={(row) => [
                <button key="edit" className="btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }} onClick={() => openEdit(row)}>
                    <Edit2 size={12} /> Edit
                </button>,
                <button key="complete" className="btn-success" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    onClick={() => handleComplete(row)} disabled={completingId === row.id}>
                    <CheckCircle size={12} /> {completingId === row.id ? 'Completing...' : 'Complete'}
                </button>,
            ]} />

            <ModalForm open={modal} onClose={closeModal} title={editItem ? 'Edit Task' : 'Create Task'} onSubmit={handleSubmit} loading={saving}>
                <div>
                    <label className="form-label">Title</label>
                    <input type="text" className="input-field" placeholder="Follow up with client" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
                </div>
                <div>
                    <label className="form-label">Description</label>
                    <textarea className="input-field" rows={2} placeholder="Task details..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: 'vertical' }} />
                </div>
                <div>
                    <label className="form-label">Status</label>
                    <select className="input-field" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                        <option value="PENDING">PENDING</option>
                        <option value="COMPLETED">COMPLETED</option>
                    </select>
                </div>
                <div>
                    <label className="form-label">Due Date</label>
                    <input type="date" className="input-field" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
                </div>
                <div>
                    <label className="form-label">Customer</label>
                    <select className="input-field" value={form.customerId} onChange={e => setForm(f => ({ ...f, customerId: e.target.value }))}>
                        <option value="">Select customer...</option>
                        {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="form-label">Assigned To</label>
                    <input type="text" className="input-field" value={user?.name || 'Current User'} disabled style={{ opacity: 0.7 }} />
                </div>
            </ModalForm>
        </div>
    );
}
