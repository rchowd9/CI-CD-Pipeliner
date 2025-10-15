export  interface Repository {
  id: string;
  name: string;
  platform: string;
  status: 'active' | 'inactive' | 'error';
  last_run: string;
  url: string;
  avg_duration: string;
  success_rate: number;
  created_at: string;
  updated_at: string;
}
 