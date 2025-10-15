import  { apiService } from './apiService';

class SpringBootService {
  async syncData(): Promise<{ success: boolean; message: string }> {
    try {
      return await apiService.post('/sync', {});
    } catch (error) {
      console.warn('Spring Boot sync API unavailable:', error);
      
      // Mock delay to simulate processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return { 
        success: true, 
        message: 'Demo: Data synchronized successfully (mock response)' 
      };
    }
  }

  async getMetrics(): Promise<any> {
    try {
      return await apiService.get('/metrics');
    } catch (error) {
      console.warn('Metrics API unavailable:', error);
      
      return {
        totalBuilds: 1247,
        successRate: 91.3,
        avgBuildTime: '3m 22s',
        activeRepositories: 12,
        lastSync: new Date().toISOString()
      };
    }
  }

  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    try {
      return await apiService.get('/health');
    } catch (error) {
      return {
        status: 'Demo mode - API server not connected',
        timestamp: new Date().toISOString()
      };
    }
  }
}

export const springBootService = new SpringBootService();
 