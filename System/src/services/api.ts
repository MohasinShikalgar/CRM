import { supabase, isSupabaseConfigured } from './supabase';
import { Product, GalleryItem, Enquiry } from '../types';

export const fallbackProducts: Product[] = [
  {
    id: 'p1',
    name: 'Multiplay Triple Slide',
    slug: 'multiplay-triple-slide',
    category: 'Slides',
    description: 'A classic multi-activity play system featuring three parallel bright color slides. Specifically designed for school playgrounds and child care centers. Manufactured from heavy-duty galvanized pipe and LLDPE plastic parts.',
    short_description: 'Three parallel colorful slides for multiple kids to race down together.',
    images: ['/triple-lane-slide.jpg'],
    specifications: {
      'Age Group': '3-12 Years',
      'Capacity': '3 Children',
      'Space Required': '15ft x 10ft',
      'Material': 'Heavy-duty LLDPE & Galvanized Iron',
      'Price': '₹ 50,000 / Piece'
    },
    is_featured: true
  },
  {
    id: 'p2',
    name: 'Yellow Duck See Saw',
    slug: 'yellow-duck-seesaw',
    category: 'See Saw',
    description: 'Fun duck-themed double-seat seesaw with central ball bearing pivot and spring bumpers. Crafted from weather-proof powder-coated steel tubes and high quality LLDPE seats.',
    short_description: 'Fun duck-themed double-seat seesaw with rubber bumper springs.',
    images: ['/duck-seesaw.png'],
    specifications: {
      'Age Group': '2-8 Years',
      'Capacity': '2 Children',
      'Space Required': '10ft x 4ft',
      'Material': 'Powder Coated Steel & LLDPE Seats',
      'Price': '₹ 18,000 / Piece'
    },
    is_featured: true
  },
  {
    id: 'p3',
    name: 'Double Wave Playground Slide',
    slug: 'double-wave-playground-slide',
    category: 'Slides',
    description: 'Double wave slide system featuring custom guard arches, protective safety panels, and sturdy steps. Made from UV-stabilized rotomolded LLDPE parts.',
    short_description: 'Double wave slide system featuring a protective roof canopy and stairs.',
    images: ['/double-slide-arch.jpg'],
    specifications: {
      'Age Group': '3-12 Years',
      'Capacity': '2 Children',
      'Space Required': '18ft x 12ft',
      'Material': 'UV-Stabilized LLDPE & Steel Frame',
      'Price': '₹ 95,000 / Piece'
    },
    is_featured: true
  },
  {
    id: 'p4',
    name: 'Single Deck Straight Slide',
    slug: 'single-deck-straight-slide',
    category: 'Slides',
    description: 'Classic straight single slide with support frame, guard rails, and safe ladders. Highly durable and perfect for compact residential play areas.',
    short_description: 'Classic straight single slide with sturdy ladder and guardrails.',
    images: ['/single-slide-blue-frame.jpg'],
    specifications: {
      'Age Group': '3-10 Years',
      'Capacity': '1 Child',
      'Space Required': '12ft x 5ft',
      'Material': 'FRP Slide & Painted Iron Support',
      'Price': '₹ 32,000 / Piece'
    },
    is_featured: true
  },
  {
    id: 'p5',
    name: 'Classic Wave Slide',
    slug: 'classic-wave-slide',
    category: 'Slides',
    description: 'Ergonomic orange wave slide mounted on robust powder-coated structural steel frames. Complete with handrails for complete safety.',
    short_description: 'Ergonomic wave slide with weather-resistant support stairs.',
    images: ['/orange-wave-slide.jpg'],
    specifications: {
      'Age Group': '3-10 Years',
      'Capacity': '1 Child',
      'Space Required': '12ft x 5ft',
      'Material': 'LLDPE & Galvanized Iron Scaffold',
      'Price': '₹ 25,000 / Piece'
    },
    is_featured: true
  }
];

export const fallbackGallery: GalleryItem[] = [
  { id: 'g1', title: 'NPS-MPS-70 Installation at Ryan International School', image_url: 'https://images.unsplash.com/photo-1579684389782-64d84b5e905d?auto=format&fit=crop&q=80&w=800', category: 'Multiplay' },
  { id: 'g2', title: 'Chest Press Equipment at Cyber Hub Green Park', image_url: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&q=80&w=800', category: 'Gym Equipment' },
  { id: 'g3', title: 'Orbit Climber installation at Hiranandani Estate', image_url: 'https://images.unsplash.com/photo-1584988771415-3b965f979148?auto=format&fit=crop&q=80&w=800', category: 'Climbers' },
  { id: 'g4', title: 'Seesaw Balance Station at DLF City Phase 3', image_url: 'https://images.unsplash.com/photo-1596464716151-a968eb1a92e1?auto=format&fit=crop&q=80&w=800', category: 'See Saw' },
  { id: 'g5', title: 'Double Wave Slide setup at Greenfield Play Area', image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800', category: 'Slides' },
  { id: 'g6', title: 'Swingset Installation at Greenwood High Campus', image_url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800', category: 'Swings' },
  { id: 'g7', title: 'Premium FRP Benches set up at IT Tech Park Garden', image_url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800', category: 'Benches & Bins' }
];

export const fallbackEnquiries: Enquiry[] = [
  {
    id: 'e1',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@example.com',
    phone: '9876543210',
    company: 'DLF Properties',
    product_interest: 'Multiplay Triple Slide',
    message: 'Need 3 units installed for DLF Phase 5 playground by end of month.',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'e2',
    name: 'Pooja Hegde',
    email: 'pooja@greenwoodschool.edu',
    phone: '9812345678',
    company: 'Greenwood High Campus',
    product_interest: 'Yellow Duck See Saw',
    message: 'Looking for child-safe equipment quotation for nursery campus.',
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  }
];

// LocalStorage persistence helpers for seamless offline/standalone React operation
const getLocalData = <T>(key: string, fallback: T[]): T[] => {
  try {
    const saved = localStorage.getItem(`ipplay_${key}`);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const setLocalData = <T>(key: string, data: T[]) => {
  try {
    localStorage.setItem(`ipplay_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
};

export const api = {
  // PRODUCTS
  async getProducts(): Promise<Product[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch products error, using local fallback:', err);
      }
    }
    return getLocalData<Product>('products', fallbackProducts);
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase fetch product by slug error:', err);
      }
    }
    const products = getLocalData<Product>('products', fallbackProducts);
    return products.find((p) => p.slug === slug) || null;
  },

  async createProduct(product: Partial<Product>): Promise<Product> {
    const baseSlug = (product.name || 'product').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newProduct: Product = {
      id: `p-${Date.now()}`,
      name: product.name || '',
      slug,
      category: product.category || 'Multiplay',
      description: product.description || '',
      short_description: product.short_description || '',
      specifications: product.specifications || {},
      images: product.images || [],
      is_featured: !!product.is_featured,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('products').insert([newProduct]).select();
        if (!error && data?.[0]) return data[0];
      } catch (err) {
        console.warn('Supabase insert product error:', err);
      }
    }

    const current = getLocalData<Product>('products', fallbackProducts);
    const updated = [newProduct, ...current];
    setLocalData('products', updated);
    return newProduct;
  },

  async updateProduct(product: Partial<Product> & { id: string }): Promise<Product> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('products').update(product).eq('id', product.id).select();
        if (!error && data?.[0]) return data[0];
      } catch (err) {
        console.warn('Supabase update product error:', err);
      }
    }

    const current = getLocalData<Product>('products', fallbackProducts);
    const updated = current.map((p) => (p.id === product.id ? { ...p, ...product } : p));
    setLocalData('products', updated);
    return updated.find((p) => p.id === product.id)!;
  },

  async deleteProduct(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (!error) return true;
      } catch (err) {
        console.warn('Supabase delete product error:', err);
      }
    }

    const current = getLocalData<Product>('products', fallbackProducts);
    const updated = current.filter((p) => p.id !== id);
    setLocalData('products', updated);
    return true;
  },

  // GALLERY
  async getGallery(): Promise<GalleryItem[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch gallery error:', err);
      }
    }
    return getLocalData<GalleryItem>('gallery', fallbackGallery);
  },

  async addGalleryItem(item: { title: string; image_url: string; category: string }): Promise<GalleryItem> {
    const newItem: GalleryItem = {
      id: `g-${Date.now()}`,
      title: item.title || 'New Installation',
      image_url: item.image_url,
      category: item.category,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('gallery').insert([newItem]).select();
        if (!error && data?.[0]) return data[0];
      } catch (err) {
        console.warn('Supabase insert gallery error:', err);
      }
    }

    const current = getLocalData<GalleryItem>('gallery', fallbackGallery);
    const updated = [newItem, ...current];
    setLocalData('gallery', updated);
    return newItem;
  },

  async deleteGalleryItem(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('gallery').delete().eq('id', id);
        if (!error) return true;
      } catch (err) {
        console.warn('Supabase delete gallery error:', err);
      }
    }

    const current = getLocalData<GalleryItem>('gallery', fallbackGallery);
    const updated = current.filter((g) => g.id !== id);
    setLocalData('gallery', updated);
    return true;
  },

  // ENQUIRIES
  async getEnquiries(): Promise<Enquiry[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch enquiries error:', err);
      }
    }
    return getLocalData<Enquiry>('enquiries', fallbackEnquiries);
  },

  async updateEnquiryReadStatus(id: string, is_read: boolean): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('enquiries').update({ is_read }).eq('id', id);
        if (!error) return true;
      } catch (err) {
        console.warn('Supabase update enquiry error:', err);
      }
    }

    const current = getLocalData<Enquiry>('enquiries', fallbackEnquiries);
    const updated = current.map((e) => (e.id === id ? { ...e, is_read } : e));
    setLocalData('enquiries', updated);
    return true;
  },

  async deleteEnquiry(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('enquiries').delete().eq('id', id);
        if (!error) return true;
      } catch (err) {
        console.warn('Supabase delete enquiry error:', err);
      }
    }

    const current = getLocalData<Enquiry>('enquiries', fallbackEnquiries);
    const updated = current.filter((e) => e.id !== id);
    setLocalData('enquiries', updated);
    return true;
  },

  // SUBMIT LEAD (SPRING BOOT REST API / SUPABASE)
  async submitLead(lead: { name: string; email: string; phone: string; company?: string | null; source: string; status: string }): Promise<{ success: boolean; message?: string }> {
    const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) || 'http://localhost:9098';
    
    // 1. Try Spring Boot REST API
    try {
      const res = await fetch(`${baseUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
      if (res.ok) {
        return { success: true };
      }
    } catch (error) {
      console.warn('REST API endpoint unreachable, falling back to local/supabase:', error);
    }

    // 2. Also save to Enquiries in Supabase or local storage so Admin can see it
    const newEnquiry: Enquiry = {
      id: `enq-${Date.now()}`,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company || null,
      product_interest: lead.source || 'Website Contact',
      message: `Submitted from website contact form`,
      is_read: false,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        await supabase.from('enquiries').insert([newEnquiry]);
      } catch (err) {
        console.warn('Supabase enquiry insert failed:', err);
      }
    }

    const current = getLocalData<Enquiry>('enquiries', fallbackEnquiries);
    setLocalData('enquiries', [newEnquiry, ...current]);
    return { success: true };
  }
};
