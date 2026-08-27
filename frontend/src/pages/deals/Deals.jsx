import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { dealsService, customersService, usersService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import ModalForm from '../../components/ModalForm';
import toast from 'react-hot-toast';
import { Plus, DollarSign, Calendar, Building, User as UserIcon, Edit2, CheckCircle } from 'lucide-react';

const STAGES = ['NEW', 'CLOSED'];
const STAGE_COLORS = {
    NEW: { from: '#2563EB', to: '#1E40AF', badge: 'badge-blue' },
    CLOSED: { from: '#10B981', to: '#059669', badge: 'badge-green' },
};
const emptyForm = { dealName: '', value: '', stage: 'NEW', customerId: '', createdDate: '', assignedToId: '' };

export default function Deals() {
    const { user } = useAuth();
    const [deals, setDeals] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [salesUsers, setSalesUsers] = useState([]);

    const load = async () => {
        setLoading(true);
        try {
            const [dr, cr, ur] = await Promise.allSettled([dealsService.getAll(), customersService.getAll(), usersService.getByRole('SALES')]);
            if (dr.status === 'fulfilled') setDeals(dr.value.data || []);
            else console.error('Failed to load deals:', dr.reason);
            if (cr.status === 'fulfilled') setCustomers(cr.value.data || []);
            else console.error('Failed to load customers:', cr.reason);
            if (ur.status === 'fulfilled') setSalesUsers(ur.value.data || []);
            else console.error('Failed to load sales users:', ur.reason);
        } catch (e) { console.error('Load error:', e); toast.error('Failed to load'); }
        finally { setLoading(false); }
    };
    useEffect(() => { load(); }, []);

    // Workaround for React 18 StrictMode bug with react-beautiful-dnd / hello-pangea
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));
        return () => { cancelAnimationFrame(animation); setEnabled(false); };
    }, []);

    const byStage = (stage) => deals.filter(d => (d.stage || '').toUpperCase() === stage);

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const newStage = result.destination.droppableId;
        const dealId = result.draggableId;
        setDeals(prev => prev.map(d => d.id?.toString() === dealId ? { ...d, stage: newStage } : d));
        toast.success(`Deal moved to ${newStage}`);
    };

    const openCreate = () => { setEditItem(null); setForm(emptyForm); setModal(true); };
    const openEdit = (deal) => {
        setEditItem(deal);
        setForm({
            dealName: deal.dealName || '',
            value: deal.value || '',
            stage: deal.stage || 'NEW',
            customerId: deal.customer?.id || '',
            createdDate: deal.createdDate || '',
            assignedToId: deal.assignedTo?.id || '',
        });
        setModal(true);
    };
    const closeModal = () => { setModal(false); setEditItem(null); setForm(emptyForm); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editItem) {
                await dealsService.update(editItem.id, { dealName: form.dealName, value: form.value, stage: form.stage, createdDate: form.createdDate || null });
                toast.success('Deal updated!');
            } else {
                const cId = form.customerId || customers[0]?.id;
                const uId = form.assignedToId || salesUsers[0]?.id || user?.id;
                await dealsService.create(cId, uId, { dealName: form.dealName, value: form.value, stage: form.stage, createdDate: form.createdDate || null });
                toast.success('Deal created!');
            }
            closeModal(); load();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Error saving deal');
        } finally { setSaving(false); }
    };

    const handleClose = async (deal) => {
        try {
            await dealsService.update(deal.id, { ...deal, stage: 'CLOSED' });
            toast.success(`"${deal.dealName}" moved to CLOSED`);
            load();
        } catch { toast.error('Failed to close deal'); }
    };

    return (
        <div>
            <div className="page-header">
                <h2 className="page-title">Deals</h2>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary" onClick={openCreate}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={16} /> New Deal
                </motion.button>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {STAGES.map(stage => {
                        const sc = STAGE_COLORS[stage];
                        const stageDeal = byStage(stage);
                        return (
                            <div key={stage}>
                                {/* Column header */}
                                <div style={{
                                    padding: '0.8rem 1rem', borderRadius: '8px 8px 0 0', marginBottom: 0,
                                    background: '#F8FAFC',
                                    border: '1px solid #E2E8F0', borderBottom: 'none',
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                }}>
                                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1F2937', fontFamily: 'var(--font-heading)' }}>{stage}</span>
                                    <span style={{ background: sc.from + '15', color: sc.from, borderRadius: 99, padding: '0.1rem 0.6rem', fontSize: '0.75rem', fontWeight: 700 }}>
                                        {stageDeal.length}
                                    </span>
                                </div>

                                {enabled && (
                                    <Droppable droppableId={stage}>
                                        {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef} {...provided.droppableProps}
                                            style={{
                                                minHeight: 400, padding: '0.5rem',
                                                background: snapshot.isDraggingOver ? '#EFF6FF' : '#FFFFFF',
                                                border: '1px solid #E2E8F0',
                                                borderTop: 'none', borderRadius: '0 0 8px 8px',
                                                transition: 'background 0.2s, border-color 0.2s',
                                                display: 'flex', flexDirection: 'column', gap: '0.5rem'
                                            }}
                                        >
                                            {stageDeal.map((deal, i) => (
                                                <Draggable key={deal.id?.toString()} draggableId={deal.id?.toString()} index={i}>
                                                    {(prov, snap) => (
                                                        <div
                                                            ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}
                                                            style={{ ...prov.draggableProps.style }}
                                                        >
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                                                style={{
                                                                    background: snap.isDragging ? '#EFF6FF' : '#FFFFFF',
                                                                    border: snap.isDragging ? `1px solid ${sc.from}` : '1px solid #E2E8F0',
                                                                    borderRadius: 8, padding: '1rem',
                                                                    boxShadow: snap.isDragging ? '0 10px 15px -3px rgba(37, 99, 235, 0.1)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                                                    cursor: 'grab',
                                                                    display: 'flex', flexDirection: 'column', gap: '0.6rem'
                                                                }}
                                                            >
                                                                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1F2937' }}>
                                                                    {deal.dealName || 'Unnamed Deal'}
                                                                </div>
                                                                
                                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', fontSize: '0.75rem', color: '#4B5563' }}>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                                        <DollarSign size={12} style={{ color: '#10B981' }} />
                                                                        <span style={{ color: '#1F2937', fontWeight: 500 }}>{deal.value != null ? Number(deal.value).toLocaleString() : '0'}</span>
                                                                    </div>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                                        <Calendar size={12} style={{ color: '#2563EB' }} />
                                                                        <span style={{ color: '#1F2937', fontWeight: 500 }}>{deal.createdDate || 'No Date'}</span>
                                                                    </div>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                                        <Building size={12} style={{ color: '#2563EB' }} />
                                                                        <span style={{ color: '#1F2937', fontWeight: 500 }}>{deal.customer?.name || 'Unknown Customer'}</span>
                                                                    </div>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                                        <UserIcon size={12} style={{ color: '#2563EB' }} />
                                                                        <span style={{ color: '#1F2937', fontWeight: 500 }}>
                                                                            {deal.assignedTo?.name || 'Unassigned'}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {/* Action Buttons */}
                                                                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.3rem' }}>
                                                                    <button
                                                                        className="btn-secondary"
                                                                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer', borderRadius: '4px' }}
                                                                        onClick={(e) => { e.stopPropagation(); openEdit(deal); }}
                                                                    >
                                                                        <Edit2 size={11} /> Edit
                                                                    </button>
                                                                    {(deal.stage || '').toUpperCase() !== 'CLOSED' && (
                                                                        <button
                                                                            className="btn-success"
                                                                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer', borderRadius: '4px' }}
                                                                            onClick={(e) => { e.stopPropagation(); handleClose(deal); }}
                                                                        >
                                                                            <CheckCircle size={11} /> Close
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </motion.div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                            {stageDeal.length === 0 && !loading && (
                                                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#6B7280', fontSize: '0.8rem' }}>
                                                    Drop deals here
                                                </div>
                                            )}
                                        </div>
                                    )}
                                 </Droppable>
                                )}
                            </div>
                        );
                    })}
                </div>
            </DragDropContext>

            <ModalForm open={modal} onClose={closeModal} title={editItem ? 'Edit Deal' : 'Create Deal'} onSubmit={handleSubmit} loading={saving}>
                <div>
                    <label className="form-label">Deal Title</label>
                    <input type="text" className="input-field" placeholder="Enterprise License" value={form.dealName} onChange={e => setForm(f => ({ ...f, dealName: e.target.value }))} required />
                </div>
                <div>
                    <label className="form-label">Amount ($)</label>
                    <input type="number" className="input-field" placeholder="50000" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} />
                </div>
                <div>
                    <label className="form-label">Stage</label>
                    <select className="input-field" value={form.stage} onChange={e => setForm(f => ({ ...f, stage: e.target.value }))}>
                        {STAGES.map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>
                {!editItem && (
                    <div>
                        <label className="form-label">Customer</label>
                        <select className="input-field" value={form.customerId} onChange={e => setForm(f => ({ ...f, customerId: e.target.value }))}>
                            <option value="">Select customer...</option>
                            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                )}
                <div>
                    <label className="form-label">Created Date</label>
                    <input type="date" className="input-field" value={form.createdDate} onChange={e => setForm(f => ({ ...f, createdDate: e.target.value }))} />
                </div>
                <div>
                    <label className="form-label">Assign To</label>
                    <select className="input-field" value={form.assignedToId} onChange={e => setForm(f => ({ ...f, assignedToId: e.target.value }))}>
                        <option value="">Select sales rep...</option>
                        {salesUsers.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                </div>
            </ModalForm>
        </div>
    );
}
