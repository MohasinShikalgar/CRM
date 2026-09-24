export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description?: string;
  short_description?: string;
  specifications?: Record<string, string>;
  images?: string[];
  is_featured?: boolean;
  created_at?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
  created_at?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  product_interest: string | null;
  message: string | null;
  is_read: boolean;
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
