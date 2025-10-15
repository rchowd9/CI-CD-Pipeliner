import  { supabase } from '../lib/supabase';

const SPRING_BOOT_API_URL = import.meta.env.VITE_SPRING_BOOT_API_URL;

export const repositoryService = {
  async getAll() {
    const { data, error } = await supabase
      .from('repositories')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(repo: Omit<any, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('repositories')
      .insert([repo])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async syncWithGitHub(repoUrl: string) {
    try {
      const response = await fetch(`${SPRING_BOOT_API_URL}/repositories/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl })
      });
      return await response.json();
    } catch (error) {
      console.error('Spring Boot sync failed:', error);
      throw error;
    }
  }
};

export const metricsService = {
  async getBuildMetrics() {
    const { data, error } = await supabase
      .from('build_metrics')
      .select('*')
      .order('date', { ascending: true })
      .limit(30);
    
    if (error) throw error;
    return data;
  },

  async getPipelineRuns(repositoryId?: string) {
    let query = supabase
      .from('pipeline_runs')
      .select('*, repositories(name)')
      .order('started_at', { ascending: false });
    
    if (repositoryId) {
      query = query.eq('repository_id', repositoryId);
    }
    
    const { data, error } = await query.limit(100);
    if (error) throw error;
    return data;
  },

  async getDoraMetrics() {
    try {
      const response = await fetch(`${SPRING_BOOT_API_URL}/metrics/dora`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch DORA metrics:', error);
      throw error;
    }
  }
};

export const alertService = {
  async getRecentAlerts() {
    const { data, error } = await supabase
      .from('alerts')
      .select('*, repositories(name)')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (error) throw error;
    return data;
  },

  async markAsRead(alertId: string) {
    const { error } = await supabase
      .from('alerts')
      .update({ read: true })
      .eq('id', alertId);
    
    if (error) throw error;
  }
};
 