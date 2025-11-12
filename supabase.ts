import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface CancerDetection {
  id: string;
  image_url: string;
  detected_cancer_type: string;
  confidence_score: number;
  additional_info: Record<string, unknown>;
  created_at: string;
  user_id: string | null;
}
