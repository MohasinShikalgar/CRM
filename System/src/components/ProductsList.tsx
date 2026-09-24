import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import { Search, Filter, HelpCircle } from 'lucide-react';
import { Product } from '../types';

interface ProductsListProps {
  initialProducts: Product[];
}

const categories = ['All', 'Multiplay', 'Swings', 'Slides', 'See Saw', 'Climbers', 'Gym Equipment', 'Spring Riders', 'Benches & Bins'];

export default function ProductsList({ initialProducts }: ProductsListProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products
  const filteredProducts = initialProducts.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.short_description && p.short_description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Search and Filters Bar */}
      <div className="glass-card p-6 rounded-2xl border border-brand-light/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brand-muted" />
          <input
            type="text"
            placeholder="Search catalog (e.g. spiral, slide, dome)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-darkGray/60 border border-brand-light/10 rounded-xl pl-11 pr-4 py-3 text-sm text-brand-light focus:outline-none focus:border-brand-cyan transition-colors"
          />
        </div>

        {/* Categories filters for desktop */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center space-x-1 text-xs text-brand-muted uppercase font-bold mr-2">
            <Filter className="w-4 h-4 text-brand-cyan" />
            <span>Category:</span>
          </div>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold px-4 py-2.5 rounded-xl border transition-all duration-300 ${
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

      {/* Grid Layout of Filtered Products */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 glass-card rounded-2xl border border-brand-light/5 space-y-4 max-w-md mx-auto"
        >
          <div className="inline-flex p-3 rounded-full bg-brand-light/5 text-brand-muted">
            <HelpCircle className="w-12 h-12" />
          </div>
          <div className="space-y-1">
            <h4 className="text-brand-light font-heading font-bold text-lg">No products found</h4>
            <p className="text-brand-muted text-xs">
              We couldn't find anything matching your filters. Try checking your spelling or selecting another category.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-brand-cyan hover:text-brand-light transition-colors duration-300 text-xs font-bold underline cursor-pointer"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
