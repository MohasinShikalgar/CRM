import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import GalleryGrid from '../components/GalleryGrid';
import { api, fallbackGallery } from '../services/api';
import { GalleryItem } from '../types';

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(fallbackGallery);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api.getGallery().then((items) => {
      if (isMounted) {
        setGalleryItems(items);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-6 space-y-16">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 bg-brand-blue/10 border border-brand-blue/30 px-3.5 py-1.5 rounded-full text-brand-cyan text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Project Showcases</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-brand-light leading-tight">
          Transforming Spaces, <span className="text-gradient">Spreading Joy</span>
        </h1>
        <p className="text-brand-muted text-sm md:text-base leading-relaxed">
          Inspect our premium playground equipment installations across India. Filter by product type to see how we build child-safe structures in schools, societies, and corporate campuses.
        </p>
      </div>

      {/* Masonry image list */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <GalleryGrid initialItems={galleryItems} />
      )}
    </div>
  );
}
