import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Image, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';
import { Enquiry } from '../../types';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ products: 0, enquiries: 0, gallery: 0 });
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      api.getProducts(),
      api.getEnquiries(),
      api.getGallery(),
    ]).then(([products, enquiries, gallery]) => {
      if (!isMounted) return;
      setStats({
        products: products.length,
        enquiries: enquiries.length,
        gallery: gallery.length,
      });
      setRecentEnquiries(enquiries.slice(0, 5));
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-black text-brand-light">Dashboard Overview</h1>
        <p className="text-brand-muted text-sm mt-1">Real-time statistics and corporate submissions overview.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products Stat */}
        <Link to="/admin/products" className="glass-card p-6 rounded-2xl border border-brand-light/10 flex items-center justify-between hover:border-brand-cyan/30 transition-all duration-300 group">
          <div className="space-y-2">
            <span className="text-brand-muted text-xs uppercase font-bold tracking-wider">Total Products</span>
            <div className="text-3xl font-heading font-black text-brand-light group-hover:text-brand-cyan transition-colors">
              {loading ? '...' : stats.products}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </Link>

        {/* Enquiries Stat */}
        <Link to="/admin/enquiries" className="glass-card p-6 rounded-2xl border border-brand-light/10 flex items-center justify-between hover:border-brand-blue/30 transition-all duration-300 group">
          <div className="space-y-2">
            <span className="text-brand-muted text-xs uppercase font-bold tracking-wider">Total Enquiries</span>
            <div className="text-3xl font-heading font-black text-brand-light group-hover:text-brand-blue transition-colors">
              {loading ? '...' : stats.enquiries}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
            <Mail className="w-6 h-6" />
          </div>
        </Link>

        {/* Gallery Stat */}
        <Link to="/admin/gallery" className="glass-card p-6 rounded-2xl border border-brand-light/10 flex items-center justify-between hover:border-brand-purple/30 transition-all duration-300 group">
          <div className="space-y-2">
            <span className="text-brand-muted text-xs uppercase font-bold tracking-wider">Gallery Projects</span>
            <div className="text-3xl font-heading font-black text-brand-light group-hover:text-brand-purple transition-colors">
              {loading ? '...' : stats.gallery}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple group-hover:scale-110 transition-transform">
            <Image className="w-6 h-6" />
          </div>
        </Link>
      </div>

      {/* Recent Enquiries Panel */}
      <div className="glass-card rounded-2xl border border-brand-light/10 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-brand-light/10 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-heading font-bold text-brand-light">Recent Enquiries</h3>
            <p className="text-brand-muted text-xs">Quick listing of last 5 quotation requests received.</p>
          </div>
          <Link to="/admin/enquiries" className="group flex items-center space-x-1 text-xs font-bold text-brand-cyan hover:text-brand-light transition-colors">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {recentEnquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-brand-light/[0.01] text-brand-muted text-xs uppercase font-bold tracking-wider border-b border-brand-light/10">
                  <th className="px-6 py-4">Client Name</th>
                  <th className="px-6 py-4">Interest Category</th>
                  <th className="px-6 py-4">Contact Detail</th>
                  <th className="px-6 py-4">Date Received</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-light/10 text-brand-light">
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-brand-light/[0.01] transition-colors">
                    <td className="px-6 py-4 font-bold">{enq.name}</td>
                    <td className="px-6 py-4">
                      <span className="bg-brand-blue/10 border border-brand-blue/20 text-brand-cyan px-2 py-0.5 rounded text-xs">
                        {enq.product_interest || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{enq.phone || enq.email}</td>
                    <td className="px-6 py-4 text-xs text-brand-muted">
                      {new Date(enq.created_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                          enq.is_read
                            ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                            : 'bg-brand-blue/20 border border-brand-blue/30 text-brand-cyan animate-pulse'
                        }`}
                      >
                        {enq.is_read ? 'Read' : 'New'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-brand-muted text-sm space-y-2">
            <Mail className="w-10 h-10 mx-auto text-brand-light/10" />
            <p>No enquiries found. Submissions from the contact forms will display here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
