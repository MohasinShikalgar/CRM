import React, { useEffect, useState } from 'react';
import AdminGalleryManager from '../../components/AdminGalleryManager';
import { api } from '../../services/api';
import { GalleryItem } from '../../types';

export default function AdminGalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = () => {
    setLoading(true);
    api.getGallery().then((data) => {
      setGalleryItems(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <AdminGalleryManager initialItems={galleryItems} onRefresh={fetchGallery} />;
}
