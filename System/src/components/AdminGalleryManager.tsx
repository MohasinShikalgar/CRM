import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../types';
import { api } from '../services/api';

interface AdminGalleryManagerProps {
  initialItems: GalleryItem[];
  onRefresh?: () => void;
}

export default function AdminGalleryManager({ initialItems, onRefresh }: AdminGalleryManagerProps) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    category: 'Multiplay',
  });

  const galleryCategories = ['Multiplay', 'Swings', 'Slides', 'See Saw', 'Climbers', 'Gym Equipment', 'Spring Riders', 'Benches & Bins'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl || !formData.category) {
      toast.error('Image URL and Category are required');
      return;
    }

    setLoading(true);

    try {
      const created = await api.addGalleryItem({
        title: formData.title || 'New Installation',
        image_url: formData.imageUrl,
        category: formData.category,
      });

      toast.success('Gallery photo added successfully');
      setIsModalOpen(false);
      setFormData({ title: '', imageUrl: '', category: 'Multiplay' });
      setItems((prev) => [created, ...prev]);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Submit gallery error:', err);
      toast.error('Failed to add image');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery photo? This action cannot be undone.')) {
      return;
    }

    try {
      await api.deleteGalleryItem(id);
      toast.success('Gallery photo deleted successfully');
      setItems((prev) => prev.filter((i) => i.id !== id));
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Delete gallery item error:', err);
      toast.error('Failed to delete gallery item');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-black text-brand-light">Manage Gallery</h1>
          <p className="text-brand-muted text-sm mt-1">Upload and manage photographs of completed playground installations.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="neon-glow-btn px-5 py-3 rounded-xl font-heading font-bold text-sm flex items-center space-x-2 border border-brand-light/10 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Upload Image</span>
        </button>
      </div>

      {/* Grid listing */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl border border-brand-light/10 overflow-hidden group shadow-lg flex flex-col justify-between"
            >
              {/* Image Area */}
              <div className="relative h-48 w-full overflow-hidden bg-brand-light/5 border-b border-brand-light/10">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Category badge overlay */}
                <span className="absolute top-3 left-3 bg-brand-dark/80 backdrop-blur-sm border border-brand-light/10 text-brand-cyan text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded">
                  {item.category}
                </span>

                {/* Delete button overlay */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                  title="Delete image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Title Area */}
              <div className="p-4 bg-brand-darkGray/40">
                <h4 className="text-brand-light text-xs font-bold leading-normal truncate">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center text-brand-muted text-sm space-y-2 glass-card rounded-2xl border border-brand-light/10">
          <ImageIcon className="w-10 h-10 mx-auto text-brand-light/10" />
          <p>No project photographs found in the gallery database.</p>
        </div>
      )}

      {/* Form modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/80 backdrop-blur-md">
          <div className="glass-card w-full max-w-md rounded-2xl border border-brand-light/10 shadow-2xl relative p-6 md:p-8 space-y-6">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-cyan rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-cyan rounded-br-2xl" />

            <div className="flex items-center justify-between border-b border-brand-light/10 pb-4">
              <h3 className="text-xl font-heading font-black text-brand-light">Upload Gallery Image</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-brand-muted hover:text-brand-light hover:bg-brand-light/5 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Category */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-brand-cyan tracking-wider">Installation Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-brand-darkGray border border-brand-light/10 rounded-xl px-4 py-2.5 text-sm text-brand-light focus:outline-none focus:border-brand-cyan transition-colors"
                >
                  {galleryCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-brand-cyan tracking-wider">Installation Title / Location</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Swingset at DLF Heights"
                  className="w-full bg-brand-dark/60 border border-brand-light/10 rounded-xl px-4 py-2.5 text-sm text-brand-light focus:outline-none focus:border-brand-cyan transition-colors"
                />
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
                    <span>Add Photo</span>
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
