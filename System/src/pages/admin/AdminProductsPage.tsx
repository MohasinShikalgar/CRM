import React, { useEffect, useState } from 'react';
import AdminProductsManager from '../../components/AdminProductsManager';
import { api } from '../../services/api';
import { Product } from '../../types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    setLoading(true);
    api.getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <AdminProductsManager initialProducts={products} onRefresh={fetchProducts} />;
}
