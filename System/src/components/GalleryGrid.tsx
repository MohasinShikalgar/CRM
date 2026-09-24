import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryGridProps {
  initialItems: GalleryItem[];
}

const filterCategories = ['All', 'Multiplay', 'Swings', 'Slides', 'See Saw', 'Climbers', 'Gym Equipment', 'Spring Riders', 'Benches & Bins'];

export default function GalleryGrid({ initialItems }: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Filter items
  const filteredItems = initialItems.filter(
    (item) => activeFilter === 'All' || item.category.toLowerCase() === activeFilter.toLowerCase()
  );

  const handleOpenLightbox = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const handleNext = () => {
    setPhotoIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setPhotoIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems.length]);

  return (
    <div className="space-y-12">
      {/* Filters bar */}
      <div className="glass-card p-6 rounded-2xl border border-brand-light/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center space-x-1.5 text-xs text-brand-muted uppercase font-bold">
          <Filter className="w-4 h-4 text-brand-cyan" />
          <span>Filter Projects:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto py-1">
          {filterCategories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-xs font-bold px-4 py-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-brand-blue text-white border-brand-cyan shadow-neon'
                    : 'bg-brand-light/5 text-brand-muted border-brand-light/5 hover:border-brand-light/20 hover:text-brand-light'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry-style Grid Layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => handleOpenLightbox(idx)}
              className="break-inside-avoid relative rounded-2xl border border-brand-light/10 overflow-hidden cursor-pointer group shadow-lg bg-brand-light/[0.02]"
            >
              {/* Image */}
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 space-y-2">
                <span className="text-[9px] uppercase font-bold text-brand-cyan tracking-wider">
                  {item.category} Installation
                </span>
                <h4 className="text-brand-light font-heading font-bold text-base leading-snug">
                  {item.title}
                </h4>
                <div className="flex items-center space-x-1.5 text-xs text-brand-cyan font-semibold pt-1">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Enlarge Photo</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modern Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isOpen && filteredItems[photoIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-brand-dark/95 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-brand-light/10 text-brand-light hover:bg-brand-light/20 transition-colors z-50 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-brand-light/10 text-brand-light hover:bg-brand-light/20 transition-colors z-50 cursor-pointer"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-brand-light/10 text-brand-light hover:bg-brand-light/20 transition-colors z-50 cursor-pointer"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image & Caption Container */}
            <motion.div
              key={photoIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center space-y-4"
            >
              <img
                src={filteredItems[photoIndex].image_url}
                alt={filteredItems[photoIndex].title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-brand-light/10"
              />
              <div className="text-center space-y-1 px-4">
                <span className="inline-block text-[10px] uppercase font-bold text-brand-cyan tracking-widest bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/20">
                  {filteredItems[photoIndex].category}
                </span>
                <h3 className="text-lg font-heading font-bold text-brand-light">
                  {filteredItems[photoIndex].title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
