import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DataTable({ columns, data, actions, onSearch, loading, pageSize = 8, rowStyle }) {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');

    const filtered = data?.filter(row =>
        Object.values(row).some(v =>
            String(v ?? '').toLowerCase().includes(query.toLowerCase())
        )
    ) ?? [];

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

    const handleSearch = (e) => {
        setQuery(e.target.value);
        setPage(1);
        onSearch?.(e.target.value);
    };

    return (
        <div className="crm-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
            {/* Search bar */}
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#F8FAFC' }}>
                <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
                    <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
                    <input
                        type="text" value={query} onChange={handleSearch}
                        placeholder="Search records..."
                        className="input-field"
                        style={{ paddingLeft: '2.25rem', fontSize: '0.85rem', height: 38 }}
                    />
                </div>
                <div style={{ fontSize: '0.8rem', color: '#4B5563', fontWeight: 500 }}>
                    {filtered.length} record{filtered.length !== 1 ? 's' : ''}
                </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                <table className="crm-table">
                    <thead>
                        <tr>
                            {columns.map(col => (
                                <th key={col.key}>{col.label}</th>
                            ))}
                            {actions && <th style={{ textAlign: 'right', backgroundColor: '#F8FAFC' }}>Actions</th>}
                        </tr>
                    </thead>
                    <AnimatePresence mode="wait">
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={columns.length + (actions ? 1 : 0)} style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
                                        <div style={{ display: 'inline-block', width: 24, height: 24, border: '2.5px solid #E2E8F0', borderTopColor: '#2563EB', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: '0.5rem' }} />
                                        <div>Loading data...</div>
                                    </td>
                                </tr>
                            ) : paged.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length + (actions ? 1 : 0)} style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
                                        No records found
                                    </td>
                                </tr>
                            ) : paged.map((row, i) => (
                                <motion.tr
                                    key={row.id ?? i}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2, delay: i * 0.02 }}
                                    style={{ cursor: 'default', ...(rowStyle ? rowStyle(row) : {}) }}
                                >
                                    {columns.map(col => (
                                        <td key={col.key}>
                                            {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                                        </td>
                                    ))}
                                    {actions && (
                                        <td style={{ textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>{actions(row)}</div>
                                        </td>
                                    )}
                                </motion.tr>
                            ))}
                        </tbody>
                    </AnimatePresence>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC' }}>
                    <span style={{ fontSize: '0.8rem', color: '#4B5563', fontWeight: 500 }}>Page {page} of {totalPages}</span>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button 
                            onClick={() => setPage(p => Math.max(1, p - 1))} 
                            disabled={page === 1} 
                            className="btn-secondary" 
                            style={{ padding: '0.35rem 0.5rem', display: 'flex', alignItems: 'center' }}
                        >
                            <ChevronLeft size={14} />
                        </button>
                        <button 
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                            disabled={page === totalPages} 
                            className="btn-secondary" 
                            style={{ padding: '0.35rem 0.5rem', display: 'flex', alignItems: 'center' }}
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
