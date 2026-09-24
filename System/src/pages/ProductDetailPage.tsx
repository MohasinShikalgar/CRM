import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import EnquiryForm from '../components/EnquiryForm';
import { ArrowLeft, ShieldAlert, Sparkles, Scale, Users, Calendar, Settings } from 'lucide-react';
import { api, fallbackProducts } from '../services/api';
import { Product } from '../types';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (!slug) return;

    setLoading(true);
    api.getProductBySlug(slug).then((found) => {
      if (!isMounted) return;
      if (!found) {
        // Fallback search
        const fb = fallbackProducts.find((p) => p.slug === slug);
        if (!fb) {
          navigate('/products', { replace: true });
          return;
        }
        setProduct(fb);
      } else {
        setProduct(found);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [slug, navigate]);

  useEffect(() => {
    if (!product) return;
    api.getProducts().then((all) => {
      const related = all
        .filter((p) => p.category === product.category && p.slug !== product.slug)
        .slice(0, 3);
      setRelatedProducts(related);
    });
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="w-10 h-10 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const specIcons: Record<string, React.ReactNode> = {
    'Age Group': <Calendar className="w-5 h-5 text-brand-cyan" />,
    'Capacity': <Users className="w-5 h-5 text-brand-cyan" />,
    'Space Required': <Scale className="w-5 h-5 text-brand-cyan" />,
    'Material': <Settings className="w-5 h-5 text-brand-cyan" />,
  };

  const imagesList = product.images && product.images.length > 0 ? product.images : [fallbackProducts[0].images?.[0] || ''];

  return (
    <div className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-6 space-y-16">
      {/* Back button */}
      <div>
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 text-sm font-semibold text-brand-muted hover:text-brand-light transition-colors duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Products</span>
        </Link>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side - Image Gallery & Specifications */}
        <div className="lg:col-span-7 space-y-10">
          {/* Image display */}
          <div className="glass-card overflow-hidden rounded-2xl border border-white/10 relative h-[450px] shadow-2xl flex items-center justify-center">
            <img
              src={imagesList[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.is_featured && (
              <span className="absolute top-4 right-4 bg-brand-blue border border-brand-cyan/20 text-white text-xs font-bold uppercase px-3 py-1 rounded-full flex items-center space-x-1 shadow-neon">
                <Sparkles className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
                <span>Featured Range</span>
              </span>
            )}
          </div>

          {/* Specifications Table */}
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-bold text-brand-light tracking-wider flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan" />
              <span>Technical Specifications</span>
            </h3>
            <div className="glass-card rounded-2xl border border-brand-light/10 divide-y divide-brand-light/10 shadow-xl">
              {product.specifications && Object.keys(product.specifications).length > 0 ? (
                Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center space-x-3 text-brand-muted">
                      {specIcons[key] || <Settings className="w-5 h-5 text-brand-cyan" />}
                      <span className="text-sm font-semibold">{key}</span>
                    </div>
                    <span className="text-sm font-bold text-brand-light">{val as string}</span>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-brand-muted text-sm">
                  Technical specification files not uploaded yet. Contact sales engineers.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Information & Enquiry Form */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="inline-block bg-brand-blue/15 border border-brand-blue/30 text-brand-cyan text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-widest">
              {product.category} Equipment
            </span>
            <h1 className="text-3xl sm:text-4xl font-heading font-black text-brand-light leading-tight">
              {product.name}
            </h1>
            {product.specifications?.Price && (
              <div className="text-2xl font-black text-brand-cyan tracking-wide font-heading">
                Price: {product.specifications.Price}
              </div>
            )}
            <p className="text-brand-muted text-sm leading-relaxed">
              {product.description || product.short_description}
            </p>
          </div>

          {/* Alert card regarding compliance */}
          <div className="glass-card p-4 rounded-xl border border-brand-cyan/20 bg-brand-cyan/[0.02] flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-brand-light/95">
              <span className="font-bold text-brand-light">Safety Warning:</span> This system must be installed on a certified impact-absorbing safety floor (rubber flooring, EPDM, sand bed, or artificial turf). Ask our layout experts for help.
            </div>
          </div>

          {/* Enquiry Form */}
          <div id="enquiry-section">
            <EnquiryForm prefilledProduct={`${product.name} (${product.specifications?.Price || '₹ 50,000 / Piece'})`} />
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-16 border-t border-brand-light/10 space-y-10">
          <div className="space-y-2">
            <h2 className="text-2xl font-heading font-bold text-brand-light tracking-wide">
              Related <span className="text-gradient">Products</span>
            </h2>
            <p className="text-brand-muted text-xs">
              Explore similar playground installations in the same category.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
