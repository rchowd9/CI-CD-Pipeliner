import  { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
 

export interface Repository {
  id: string;
  name: string;
  platform: string;
  status: string;
  last_run: string;
  url?: string;
  avg_duration: string;
  success_rate: number;
  created_at: string;
  updated_at: string;
}

export interface PipelineRun {
  id: string;
  repository_id: string;
  status: string;
  duration: number;
  started_at: string;
  completed_at: string;
  error_message?: string;
}

export interface BuildMetrics {
  id: string;
  date: string;
  total_builds: number;
  successful_builds: number;
  failed_builds: number;
  avg_duration: number;
}
 