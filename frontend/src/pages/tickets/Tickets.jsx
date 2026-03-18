import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ticketsService, customersService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import DataTable from '../../components/DataTable';
import ModalForm from '../../components/ModalForm';
import toast from 'react-hot-toast';
import { Plus, CheckCircle, TicketIcon } from 'lucide-react';

const PRIORITY_COLORS = { LOW: 'badge-blue', MEDIUM: 'badge-yellow', HIGH: 'badge-red', CRITICAL: 'badge-red' };
const emptyForm = { 
    issue: '', 
    createdDate: new Date().toISOString().split('T')[0], 
    resolvedDate: '', 
    status: 'PENDING', 
    assignedTo: '', 
    customerId: '' 
};

export default function Tickets() {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [editId, setEditId] = useState(null);

    const load = async () => {
        setLoading(true);
        try {
            const [tr, cr] = await Promise.all([ticketsService.getAll(), customersService.getAll()]);
            setData(tr.data || []);
            setCustomers(cr.data || []);
        } catch { toast.error('Failed to load tickets'); }
        finally { setLoading(false); }
    };
    useEffect(() => { load(); }, []);

    const handleResolve = async (row) => {
        try {
            await ticketsService.resolve(row.id);
            toast.success('Ticket resolved!');
            load();
        } catch { toast.error('Failed to resolve ticket'); }
    };

    const handleEdit = (row) => {
        setEditId(row.id);
        setForm({
            issue: row.subject || '',
            createdDate: row.createdDate ? new Date(row.createdDate).toISOString().split('T')[0] : '',
            resolvedDate: row.resolvedDate ? new Date(row.resolvedDate).toISOString().split('T')[0] : '',
            status: row.status || 'PENDING',
            assignedTo: row.assignedTo?.name || '',
            customerId: row.customer?.id || ''
        });
        setModal(true);
    };

    const handleDelete = async (row) => {
        if (!window.confirm('Are you sure you want to delete this ticket?')) return;
        try {
            await ticketsService.delete(row.id);
            toast.success('Ticket deleted!');
            load();
        } catch { toast.error('Failed to delete ticket'); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const formData = { 
                subject: form.issue, 
                description: '', 
                priority: 'MEDIUM', 
                status: form.status,
                createdDate: form.createdDate ? new Date(form.createdDate).toISOString() : null,
                resolvedDate: form.resolvedDate ? new Date(form.resolvedDate).toISOString() : null
            };

            if (editId) {
                await ticketsService.update(editId, formData);
                toast.success('Ticket updated!');
            } else {
                const cId = form.customerId || customers[0]?.id;
                const uId = user?.id; 
                await ticketsService.create(cId, uId, formData);
                toast.success('Ticket created!');
            }
            setModal(false); setForm(emptyForm); setEditId(null); load();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Error saving ticket');
        } finally { setSaving(false); }
    };

    const columns = [
        { key: 'subject', label: 'Issue' },
        { key: 'createdDate', label: 'Created Date', render: (v, row) => row.createdDate ? new Date(row.createdDate).toLocaleDateString() : '—' },
        { key: 'resolvedDate', label: 'Resolved Date', render: (v, row) => row.resolvedDate ? new Date(row.resolvedDate).toLocaleDateString() : '—' },
        {
            key: 'status', label: 'Status', render: (v, row) => {
                const resolved = (v || '').toUpperCase() === 'RESOLVED';
                return (
                    <span className={`badge ${resolved ? 'badge-green' : 'badge-yellow'}`}>{v || 'PENDING'}</span>
                );
            }
        },
        { key: 'assignedTo', label: 'Assigned To', render: (v, row) => row.assignedTo?.name || 'Unassigned' },
        { key: 'customerId', label: 'Customer ID', render: (v, row) => row.customer?.id || '—' }
    ];

    return (
        <div>
            <div className="page-header" style={{ marginBottom: '1rem' }}>
                <h2 className="page-title">Support Tickets</h2>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary" onClick={() => { setEditId(null); setForm(emptyForm); setModal(true); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={16} /> New Ticket
                </motion.button>
            </div>

            <DataTable columns={columns} data={data} loading={loading} actions={(row) => [
                <button key="edit" className="btn-secondary" style={{ padding: '0.3rem 0.7rem', fontSize: '0.75rem' }} onClick={() => handleEdit(row)}>
                    Edit
                </button>,
                <button key="delete" className="btn-danger" style={{ padding: '0.3rem 0.7rem', fontSize: '0.75rem' }} onClick={() => handleDelete(row)}>
                    Delete
                </button>
            ]} />

            <ModalForm open={modal} onClose={() => { setModal(false); setForm(emptyForm); setEditId(null); }} title={editId ? "Edit Ticket" : "Create Ticket"} onSubmit={handleSubmit} loading={saving}>
                <div>
                    <label className="form-label">Issue</label>
                    <input type="text" className="input-field" placeholder="Issue description" value={form.issue} onChange={e => setForm(f => ({ ...f, issue: e.target.value }))} required />
                </div>
                <div>
                    <label className="form-label">Created Date</label>
                    <input type="date" className="input-field" value={form.createdDate} onChange={e => setForm(f => ({ ...f, createdDate: e.target.value }))} />
                </div>
                <div>
                    <label className="form-label">Resolved Date</label>
                    <input type="date" className="input-field" value={form.resolvedDate} onChange={e => setForm(f => ({ ...f, resolvedDate: e.target.value }))} />
                </div>
                <div>
                    <label className="form-label">Status</label>
                    <select className="input-field" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                        <option value="PENDING">PENDING</option>
                        <option value="RESOLVED">RESOLVED</option>
                    </select>
                </div>
                <div>
                    <label className="form-label">Assigned To</label>
                    <input type="text" className="input-field" placeholder="User ID / Name" value={form.assignedTo} onChange={e => setForm(f => ({ ...f, assignedTo: e.target.value }))} />
                </div>
                <div>
                    <label className="form-label">Customer ID</label>
                    <select className="input-field" value={form.customerId} onChange={e => setForm(f => ({ ...f, customerId: e.target.value }))} required>
                        <option value="">Select customer...</option>
                        {customers.map(c => <option key={c.id} value={c.id}>{c.name} (ID: {c.id})</option>)}
                    </select>
                </div>
            </ModalForm>
        </div>
    );
}
