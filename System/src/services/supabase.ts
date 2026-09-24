import { createClient } from '@supabase/supabase-js';

const getEnv = (key: string): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return (import.meta.env[`VITE_${key}`] || import.meta.env[`NEXT_PUBLIC_${key}`] || import.meta.env[key] || '') as string;
  }
  return '';
};

const supabaseUrl = getEnv('SUPABASE_URL') || 'https://tygohaoqcldllcjxhejy.supabase.co';
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5Z2hhb3FjbGRsbGNqeGhlankiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcxOTIzNjIwMCwiZXhwIjoyMDM0ODEyMDAwfQ.placeholder';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseAnonKey.includes('placeholder')
);

// Client for Supabase operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
