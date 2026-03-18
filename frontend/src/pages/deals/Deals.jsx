import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { dealsService, customersService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import ModalForm from '../../components/ModalForm';
import toast from 'react-hot-toast';
import { Plus, DollarSign, Calendar, Building, User as UserIcon, Edit2, CheckCircle } from 'lucide-react';

const STAGES = ['NEW', 'CLOSED'];
const STAGE_COLORS = {
    NEW: { from: '#6366f1', to: '#8b5cf6', badge: 'badge-purple' },
    CLOSED: { from: '#10b981', to: '#059669', badge: 'badge-green' },
};
const emptyForm = { dealName: '', value: '', stage: 'NEW', customerId: '', createdDate: '' };

export default function Deals() {
    const { user } = useAuth();
    const [deals, setDeals] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const [dr, cr] = await Promise.allSettled([dealsService.getAll(), customersService.getAll()]);
            if (dr.status === 'fulfilled') setDeals(dr.value.data || []);
            else console.error('Failed to load deals:', dr.reason);
            if (cr.status === 'fulfilled') setCustomers(cr.value.data || []);
            else console.error('Failed to load customers:', cr.reason);
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
                const uId = user?.id;
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
                                    padding: '0.8rem 1rem', borderRadius: '12px 12px 0 0', marginBottom: 0,
                                    background: `linear-gradient(135deg, ${sc.from}22, ${sc.to}11)`,
                                    border: `1px solid ${sc.from}44`, borderBottom: 'none',
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                }}>
                                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-text)' }}>{stage}</span>
                                    <span style={{ background: `${sc.from}33`, color: sc.from, borderRadius: 99, padding: '0.1rem 0.6rem', fontSize: '0.75rem', fontWeight: 700 }}>
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
                                                background: snapshot.isDraggingOver ? `${sc.from}10` : 'var(--glass-bg)',
                                                border: `1px solid ${snapshot.isDraggingOver ? sc.from + '60' : 'var(--glass-border)'}`,
                                                borderTop: 'none', borderRadius: '0 0 12px 12px',
                                                backdropFilter: 'blur(12px)', transition: 'background 0.2s, border-color 0.2s',
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
                                                                    background: snap.isDragging ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
                                                                    border: `1px solid ${snap.isDragging ? sc.from + '80' : 'var(--glass-border)'}`,
                                                                    borderRadius: 12, padding: '1rem',
                                                                    boxShadow: snap.isDragging ? `0 8px 24px ${sc.from}30` : 'none',
                                                                    cursor: 'grab',
                                                                    display: 'flex', flexDirection: 'column', gap: '0.6rem'
                                                                }}
                                                            >
                                                                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-text)' }}>
                                                                    {deal.dealName || 'Unnamed Deal'}
                                                                </div>
                                                                
                                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                                        <DollarSign size={12} style={{ color: '#10b981' }} />
                                                                        <span style={{ color: 'var(--color-text)' }}>Amount: {deal.value != null ? Number(deal.value).toLocaleString() : '0'}</span>
                                                                    </div>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                                        <Calendar size={12} style={{ color: '#8b5cf6' }} />
                                                                        <span style={{ color: 'var(--color-text)' }}>{deal.createdDate || 'No Date'}</span>
                                                                    </div>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                                        <Building size={12} style={{ color: '#06b6d4' }} />
                                                                        <span style={{ color: 'var(--color-text)' }}>{deal.customer?.name || 'Unknown Customer'}</span>
                                                                    </div>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                                        <UserIcon size={12} style={{ color: '#ec4899' }} />
                                                                        <span style={{ color: 'var(--color-text)' }}>
                                                                            Sales: {deal.assignedTo?.name || 'Unassigned'}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {/* Action Buttons */}
                                                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem' }}>
                                                                    <button
                                                                        className="btn-secondary"
                                                                        style={{ padding: '0.25rem 0.6rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}
                                                                        onClick={(e) => { e.stopPropagation(); openEdit(deal); }}
                                                                    >
                                                                        <Edit2 size={11} /> Edit
                                                                    </button>
                                                                    {(deal.stage || '').toUpperCase() !== 'CLOSED' && (
                                                                        <button
                                                                            className="btn-success"
                                                                            style={{ padding: '0.25rem 0.6rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}
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
                                                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
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
            </ModalForm>
        </div>
    );
}
