import  { apiService } from './apiService';

export interface Repository {
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

class RepositoryService {
  private mockData: Repository[] = [
    {
      id: '1',
      name: 'my-awesome-app',
      platform: 'GitHub',
      status: 'active',
      last_run: new Date().toISOString(),
      url: 'https://github.com/user/my-awesome-app',
      avg_duration: '2m 34s',
      success_rate: 94.5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'web-dashboard',
      platform: 'GitLab',
      status: 'active',
      last_run: new Date(Date.now() - 3600000).toISOString(),
      url: 'https://gitlab.com/user/web-dashboard',
      avg_duration: '4m 12s',
      success_rate: 87.2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      name: 'OSM-quickstart',
      platform: 'GitHub',
      status: 'active',
      last_run: new Date(Date.now() - 1800000).toISOString(),
      url: 'https://github.com/howd9/OSM-quickstart',
      avg_duration: '3m 45s',
      success_rate: 96.3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  async getAll(): Promise<Repository[]> {
    try {
      return await apiService.get<Repository[]>('/repositories');
    } catch (error) {
      console.warn('API unavailable, using demo data:', error);
      return this.mockData;
    }
  }

  async add(repository: Omit<Repository, 'id' | 'created_at' | 'updated_at'>): Promise<Repository> {
    try {
      return await apiService.post<Repository>('/repositories', repository);
    } catch (error) {
      console.warn('API unavailable, using mock add:', error);
      
      const newRepo: Repository = {
        ...repository,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      this.mockData.unshift(newRepo);
      return newRepo;
    }
  }

  async uploadFile(file: File): Promise<{ success: boolean; message: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Upload failed');
    } catch (error) {
      console.warn('Upload API unavailable, using mock response');
      return { 
        success: true, 
        message: `Demo: ${file.name} would be processed by Spring Boot backend` 
      };
    }
  }
}

export const repositoryService = new RepositoryService();
 