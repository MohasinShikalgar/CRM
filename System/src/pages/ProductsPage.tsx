import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import ProductsList from '../components/ProductsList';
import { api, fallbackProducts } from '../services/api';
import { Product } from '../types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api.getProducts().then((data) => {
      if (isMounted) {
        setProducts(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-6 space-y-16">
      {/* Title Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 bg-brand-blue/10 border border-brand-blue/30 px-3.5 py-1.5 rounded-full text-brand-cyan text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Product Catalog</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-brand-light leading-tight">
          Where Safety Meets <span className="text-gradient">Innovation</span>
        </h1>
        <p className="text-brand-muted text-sm md:text-base leading-relaxed">
          Discover our full catalogue of futuristic play systems. Select a category below or use the search bar to find custom equipment built to endure and inspire.
        </p>
      </div>

      {/* Catalog search/filter and grid list */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <ProductsList initialProducts={products} />
      )}
    </div>
  );
}
