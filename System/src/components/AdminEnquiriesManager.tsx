import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Mail, MailOpen, Trash2, Eye, X, Calendar, User, Phone, Briefcase, Tag } from 'lucide-react';
import { Enquiry } from '../types';
import { api } from '../services/api';

interface AdminEnquiriesManagerProps {
  initialEnquiries: Enquiry[];
  onRefresh?: () => void;
}

export default function AdminEnquiriesManager({ initialEnquiries, onRefresh }: AdminEnquiriesManagerProps) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  React.useEffect(() => {
    setEnquiries(initialEnquiries);
  }, [initialEnquiries]);

  // Filter list
  const filteredEnquiries = enquiries.filter((e) => {
    if (filter === 'unread') return !e.is_read;
    if (filter === 'read') return e.is_read;
    return true;
  });

  const handleToggleRead = async (id: string, currentReadStatus: boolean) => {
    try {
      await api.updateEnquiryReadStatus(id, !currentReadStatus);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, is_read: !currentReadStatus } : e))
      );
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry((prev) => (prev ? { ...prev, is_read: !currentReadStatus } : null));
      }
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Toggle read status error:', err);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) {
      return;
    }

    try {
      await api.deleteEnquiry(id);
      toast.success('Enquiry deleted successfully');
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(null);
      }
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Delete enquiry error:', err);
      toast.error('Failed to delete enquiry');
    }
  };

  const handleOpenDetail = async (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    if (!enquiry.is_read) {
      await handleToggleRead(enquiry.id, false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-black text-brand-light">Quotation Requests</h1>
          <p className="text-brand-muted text-sm mt-1">Review contact form submissions and product details inquiries.</p>
        </div>
        {/* Filters */}
        <div className="flex bg-brand-light/5 border border-brand-light/10 rounded-xl p-1 self-start">
          {(['all', 'unread', 'read'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`text-xs font-bold px-4 py-2 rounded-lg capitalize transition-colors duration-300 cursor-pointer ${
                filter === tab ? 'bg-brand-blue text-white shadow-neon' : 'text-brand-muted hover:text-brand-light'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid listing */}
      <div className="glass-card rounded-2xl border border-brand-light/10 shadow-xl overflow-hidden">
        {filteredEnquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-brand-light/[0.01] text-brand-muted text-xs uppercase font-bold tracking-wider border-b border-brand-light/10">
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Product Category</th>
                  <th className="px-6 py-4">Contact Detail</th>
                  <th className="px-6 py-4">Date Received</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-light/10 text-brand-light">
                {filteredEnquiries.map((e) => (
                  <tr key={e.id} className="hover:bg-brand-light/[0.01] transition-colors">
                    <td className="px-6 py-4 font-bold flex flex-col">
                      <span>{e.name}</span>
                      {e.company && <span className="text-[10px] text-brand-muted font-normal mt-0.5">{e.company}</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-brand-blue/10 border border-brand-blue/20 text-brand-cyan px-2 py-0.5 rounded text-xs">
                        {e.product_interest || 'General Enquiry'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs flex flex-col space-y-0.5 text-brand-light/80">
                      <span>{e.phone || 'No Phone'}</span>
                      {e.email && <span className="text-[10px] text-brand-muted">{e.email}</span>}
                    </td>
                    <td className="px-6 py-4 text-xs text-brand-muted">
                      {new Date(e.created_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenDetail(e)}
                        className="p-2 rounded-lg bg-brand-light/5 border border-brand-light/10 hover:border-brand-cyan text-brand-muted hover:text-brand-cyan transition-colors cursor-pointer"
                        title="Read message"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleRead(e.id, e.is_read)}
                        className={`p-2 rounded-lg bg-brand-light/5 border border-brand-light/10 transition-colors cursor-pointer ${
                          e.is_read
                            ? 'hover:border-yellow-500 text-brand-muted hover:text-yellow-400'
                            : 'hover:border-green-500 text-brand-muted hover:text-green-400'
                        }`}
                        title={e.is_read ? 'Mark as Unread' : 'Mark as Read'}
                      >
                        {e.is_read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDelete(e.id)}
                        className="p-2 rounded-lg bg-brand-light/5 border border-brand-light/10 hover:border-red-500 text-brand-muted hover:text-red-400 transition-colors cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-brand-muted text-sm space-y-2">
            <Mail className="w-10 h-10 mx-auto text-brand-light/10" />
            <p>No enquiries found matching this filter.</p>
          </div>
        )}
      </div>

      {/* Enquiry Detail Reading Overlay Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/80 backdrop-blur-md">
          <div className="glass-card w-full max-w-lg rounded-2xl border border-brand-light/10 shadow-2xl relative p-6 md:p-8 space-y-6">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-cyan rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-cyan rounded-br-2xl" />

            <div className="flex items-center justify-between border-b border-brand-light/10 pb-4">
              <h3 className="text-xl font-heading font-black text-brand-light">Quotation Request Details</h3>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 rounded-lg text-brand-muted hover:text-brand-light hover:bg-brand-light/5 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-left text-sm">
              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 text-brand-light">
                  <User className="w-4 h-4 text-brand-cyan" />
                  <span className="font-semibold">{selectedEnquiry.name}</span>
                </div>
                <div className="flex items-center space-x-3 text-brand-light">
                  <Phone className="w-4 h-4 text-brand-cyan" />
                  <span className="font-mono text-xs">{selectedEnquiry.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-3 text-brand-light">
                  <Mail className="w-4 h-4 text-brand-cyan" />
                  <span className="text-xs break-all">{selectedEnquiry.email || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-3 text-brand-light">
                  <Briefcase className="w-4 h-4 text-brand-cyan" />
                  <span>{selectedEnquiry.company || 'Private Client'}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex items-center space-x-3 text-brand-light border-y border-brand-light/10 py-3">
                <Tag className="w-4 h-4 text-brand-cyan" />
                <span className="text-xs uppercase font-bold text-brand-muted">Product Interest:</span>
                <span className="bg-brand-blue/20 border border-brand-blue/30 text-brand-cyan px-2.5 py-0.5 rounded text-xs font-bold">
                  {selectedEnquiry.product_interest || 'General Information'}
                </span>
              </div>
 
              {/* Message text block */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] uppercase font-bold text-brand-cyan tracking-wider">Message requirements</span>
                <div className="bg-brand-light/5 border border-brand-light/10 rounded-xl p-4 text-brand-light text-sm whitespace-pre-wrap leading-relaxed max-h-[160px] overflow-y-auto">
                  {selectedEnquiry.message || 'No additional custom requirements provided.'}
                </div>
              </div>

              {/* Timestamp */}
              <div className="flex items-center space-x-2 text-xs text-brand-muted pt-2">
                <Calendar className="w-4 h-4" />
                <span>Submitted: {new Date(selectedEnquiry.created_at).toLocaleString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-brand-light/10">
              <button
                onClick={() => handleDelete(selectedEnquiry.id)}
                className="px-5 py-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-300 text-xs font-bold hover:bg-red-500/20 hover:text-white transition-colors cursor-pointer"
              >
                Delete Enquiry
              </button>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="neon-glow-btn px-6 py-2 rounded-xl text-xs font-bold border border-brand-light/10 cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
