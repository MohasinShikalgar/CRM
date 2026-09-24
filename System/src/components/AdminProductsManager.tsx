import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Plus, Edit2, Trash2, X, Sparkles, AlertCircle, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { api } from '../services/api';

interface AdminProductsManagerProps {
  initialProducts: Product[];
  onRefresh?: () => void;
}

export default function AdminProductsManager({ initialProducts, onRefresh }: AdminProductsManagerProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  // Sync if initialProducts changes
  React.useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Multiplay',
    short_description: '',
    description: '',
    imageUrl: '',
    is_featured: false,
    age_group: '3-12 Years',
    capacity: '10-15 Kids',
    space_required: '20ft x 15ft',
    material: 'UV-Stabilized LLDPE & Galvanized Steel',
  });

  const productCategories = ['Multiplay', 'Swings', 'Slides', 'See Saw', 'Climbers', 'Gym Equipment', 'Spring Riders', 'Benches & Bins'];

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Multiplay',
      short_description: '',
      description: '',
      imageUrl: '',
      is_featured: false,
      age_group: '3-12 Years',
      capacity: '10-15 Kids',
      space_required: '20ft x 15ft',
      material: 'UV-Stabilized LLDPE & Galvanized Steel',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      short_description: product.short_description || '',
      description: product.description || '',
      imageUrl: product.images?.[0] || '',
      is_featured: product.is_featured || false,
      age_group: product.specifications?.['Age Group'] || '3-12 Years',
      capacity: product.specifications?.['Capacity'] || '10-15 Kids',
      space_required: product.specifications?.['Space Required'] || '20ft x 15ft',
      material: product.specifications?.['Material'] || 'UV-Stabilized LLDPE & Galvanized Steel',
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.imageUrl) {
      toast.error('Product Name and Image URL are required');
      return;
    }

    setLoading(true);

    const payload = {
      name: formData.name,
      category: formData.category,
      short_description: formData.short_description,
      description: formData.description,
      images: [formData.imageUrl],
      is_featured: formData.is_featured,
      specifications: {
        'Age Group': formData.age_group,
        'Capacity': formData.capacity,
        'Space Required': formData.space_required,
        'Material': formData.material,
      },
    };

    try {
      if (editingProduct) {
        const updated = await api.updateProduct({ ...payload, id: editingProduct.id });
        toast.success('Product updated successfully');
        setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? updated : p)));
      } else {
        const created = await api.createProduct(payload);
        toast.success('Product created successfully');
        setProducts((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Submit product error:', err);
      toast.error('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    try {
      await api.deleteProduct(id);
      toast.success('Product deleted successfully');
      setProducts((prev) => prev.filter((p) => p.id !== id));
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Delete product error:', err);
      toast.error('Failed to delete product.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-black text-brand-light">Manage Products</h1>
          <p className="text-brand-muted text-sm mt-1">Create, edit, and delete playground equipment catalog records.</p>
        </div>
        <button
          onClick={openAddModal}
          className="neon-glow-btn px-5 py-3 rounded-xl font-heading font-bold text-sm flex items-center space-x-2 border border-brand-light/10 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Products list table */}
      <div className="glass-card rounded-2xl border border-brand-light/10 shadow-xl overflow-hidden">
        {products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-brand-light/[0.01] text-brand-muted text-xs uppercase font-bold tracking-wider border-b border-brand-light/10">
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Featured</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-light/10 text-brand-light">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-brand-light/[0.01] transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-14 h-10 rounded overflow-hidden bg-brand-light/5 border border-brand-light/10">
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=100'}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold">{p.name}</td>
                    <td className="px-6 py-4">
                      <span className="bg-brand-blue/10 border border-brand-blue/20 text-brand-cyan px-2 py-0.5 rounded text-xs">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-brand-cyan">
                      {p.is_featured ? (
                        <span className="text-brand-cyan text-xs font-bold flex items-center space-x-1">
                          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                          <span>Premium</span>
                        </span>
                      ) : (
                        <span className="text-brand-muted text-xs">Standard</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-2 rounded-lg bg-brand-light/5 border border-brand-light/10 hover:border-brand-cyan text-brand-muted hover:text-brand-cyan transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 rounded-lg bg-brand-light/5 border border-brand-light/10 hover:border-red-500 text-brand-muted hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-brand-muted text-sm space-y-2">
            <ShoppingBag className="w-10 h-10 mx-auto text-brand-light/10" />
            <p>No products found in the catalog database.</p>
          </div>
        )}
      </div>

      {/* Form modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/80 backdrop-blur-md">
          <div className="glass-card w-full max-w-2xl rounded-2xl border border-brand-light/10 shadow-2xl relative max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6">
            {/* Modal Corner Elements */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-cyan rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-cyan rounded-br-2xl" />

            <div className="flex items-center justify-between border-b border-brand-light/10 pb-4">
              <h3 className="text-xl font-heading font-black text-brand-light">
                {editingProduct ? 'Edit Product Details' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-brand-muted hover:text-brand-light hover:bg-brand-light/5 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-brand-cyan tracking-wider">Product Name *</label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Galaxy Orbit slide"
                    className="w-full bg-brand-dark/60 border border-brand-light/10 rounded-xl px-4 py-2.5 text-sm text-brand-light focus:outline-none focus:border-brand-cyan transition-colors"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-brand-cyan tracking-wider">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-brand-dark/60 border border-brand-light/10 rounded-xl px-4 py-2.5 text-sm text-brand-light focus:outline-none focus:border-brand-cyan transition-colors"
                  >
                    {productCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-brand-cyan tracking-wider">Image Link URL *</label>
                <input
                  type="text"
                  required
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-brand-dark/60 border border-brand-light/10 rounded-xl px-4 py-2.5 text-sm text-brand-light focus:outline-none focus:border-brand-cyan transition-colors"
                />
              </div>

              {/* Short Description */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-brand-cyan tracking-wider">Short Summary *</label>
                <input
                  type="text"
                  required
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleInputChange}
                  placeholder="Brief 1-sentence sales tagline..."
                  className="w-full bg-brand-dark/60 border border-brand-light/10 rounded-xl px-4 py-2.5 text-sm text-brand-light focus:outline-none focus:border-brand-cyan transition-colors"
                />
              </div>

              {/* Full Description */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-brand-cyan tracking-wider">Full Specifications Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Detailed explanation of the structure, kids capacity, safe anchor mechanisms, and rust resistance parameters..."
                  className="w-full bg-brand-dark/60 border border-brand-light/10 rounded-xl px-4 py-2.5 text-sm text-brand-light focus:outline-none focus:border-brand-cyan transition-colors resize-none"
                />
              </div>

              {/* Specifications Sub-fields */}
              <div className="border-t border-brand-light/10 pt-4 space-y-3">
                <h4 className="text-xs font-bold uppercase text-brand-cyan tracking-widest flex items-center space-x-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Technical Specifications Parameters</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Age Group */}
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-brand-muted">Target Age Group</label>
                    <input
                      type="text"
                      name="age_group"
                      value={formData.age_group}
                      onChange={handleInputChange}
                      className="w-full bg-brand-dark/60 border border-brand-light/10 rounded-xl px-4 py-2 text-xs text-brand-light focus:outline-none focus:border-brand-cyan"
                    />
                  </div>
                  {/* Capacity */}
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-brand-muted">Kids Capacity</label>
                    <input
                      type="text"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      className="w-full bg-brand-dark/60 border border-brand-light/10 rounded-xl px-4 py-2 text-xs text-brand-light focus:outline-none focus:border-brand-cyan"
                    />
                  </div>
                  {/* Space Required */}
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-brand-muted">Space Required Dimensions</label>
                    <input
                      type="text"
                      name="space_required"
                      value={formData.space_required}
                      onChange={handleInputChange}
                      className="w-full bg-brand-dark/60 border border-brand-light/10 rounded-xl px-4 py-2 text-xs text-brand-light focus:outline-none focus:border-brand-cyan"
                    />
                  </div>
                  {/* Material */}
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-brand-muted">Material Specifications</label>
                    <input
                      type="text"
                      name="material"
                      value={formData.material}
                      onChange={handleInputChange}
                      className="w-full bg-brand-dark/60 border border-brand-light/10 rounded-xl px-4 py-2 text-xs text-brand-light focus:outline-none focus:border-brand-cyan"
                    />
                  </div>
                </div>
              </div>

              {/* Is Featured Checkbox */}
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 bg-brand-darkGray border border-brand-light/10 rounded focus:ring-0 text-brand-blue cursor-pointer"
                />
                <label htmlFor="is_featured" className="text-xs font-bold text-brand-light select-none cursor-pointer">
                  Feature this product on the Home Page (Premium Highlight)
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-brand-light/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-brand-light/10 bg-brand-light/5 text-brand-muted text-sm font-semibold hover:bg-brand-light/10 hover:text-brand-light transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="neon-glow-btn px-6 py-2.5 rounded-xl text-sm font-heading font-bold flex items-center justify-center border border-brand-light/10 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Save Product</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
