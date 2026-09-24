import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Motion values for 3D tilt effect
  const x = useMotionValue(150);
  const y = useMotionValue(200);

  // Map mouse coordinates to rotation values
  const rotateX = useTransform(y, [0, 400], [12, -12]);
  const rotateY = useTransform(x, [0, 300], [-12, 12]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  function handleMouseLeave() {
    x.set(150);
    y.set(200);
  }

  const firstImage = product.images?.[0] || 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800';

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-container relative w-full h-[460px] rounded-2xl cursor-pointer group"
    >
      {/* Glow Effect Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-cyan/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

      {/* Card Content Wrapper */}
      <div className="relative h-full w-full rounded-2xl border border-brand-light/10 bg-brand-light/[0.02] backdrop-blur-md px-6 py-6 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 group-hover:border-brand-cyan/50 group-hover:bg-brand-light/[0.05]">
        {/* Animated Corner Border Highlight */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-br-2xl" />

        {/* Card Top - Image and Category */}
        <div style={{ transform: 'translateZ(30px)' }} className="space-y-4">
          <div className="relative w-full h-[220px] rounded-xl overflow-hidden bg-brand-light/5 border border-brand-light/10">
            <img
              src={firstImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Category tag */}
            <span className="absolute top-3 left-3 bg-brand-dark/85 backdrop-blur-sm border border-brand-light/10 text-brand-cyan text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
              {product.category}
            </span>
            {/* Featured Badge */}
            {product.is_featured && (
              <span className="absolute top-3 right-3 bg-brand-blue border border-brand-cyan/30 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full flex items-center space-x-1 shadow-[0_0_10px_rgba(0,102,255,0.5)]">
                <Sparkles className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
                <span>Premium</span>
              </span>
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-brand-light font-heading font-bold text-xl leading-snug group-hover:text-brand-cyan transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-brand-muted text-xs line-clamp-2 leading-relaxed">
              {product.short_description}
            </p>
          </div>
        </div>

        {/* Card Bottom - Enquiry Button */}
        <div style={{ transform: 'translateZ(15px)' }} className="pt-4 border-t border-brand-light/10 flex items-center justify-between">
          {product.specifications?.Price ? (
            <span className="text-sm font-black text-brand-cyan font-heading">
              {product.specifications.Price.split(' /')[0]}
            </span>
          ) : (
            <span className="text-[10px] uppercase font-bold text-brand-cyan tracking-widest">
              IPPLAY original
            </span>
          )}
          <Link to={`/products/${product.slug}`} className="flex items-center space-x-2 text-sm font-bold text-brand-cyan group-hover:text-brand-blue transition-colors duration-300">
            <span>Enquire Now</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
