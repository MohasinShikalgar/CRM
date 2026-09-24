import React, { useEffect, useState } from 'react';
import AdminEnquiriesManager from '../../components/AdminEnquiriesManager';
import { api } from '../../services/api';
import { Enquiry } from '../../types';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = () => {
    setLoading(true);
    api.getEnquiries().then((data) => {
      setEnquiries(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <AdminEnquiriesManager initialEnquiries={enquiries} onRefresh={fetchEnquiries} />;
}
