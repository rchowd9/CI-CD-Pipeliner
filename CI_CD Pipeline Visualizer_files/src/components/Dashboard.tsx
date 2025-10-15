import  React from 'react';
import { Activity, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useGitHub } from '../hooks/useGitHub'; 

export  default function Dashboard() {
  const { repositories } = useGitHub();
  
  const successfulBuilds = repositories.filter(r => r.lastBuild === 'success').length;
  const failedBuilds = repositories.filter(r => r.lastBuild === 'failure').length;
  const activeRepos = repositories.filter(r => r.status === 'active').length;

  return ( 
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Pipeline Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Successful Builds</p>
                           <p className="text-2xl font-bold">{successfulBuilds}</p> 
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Failed Builds</p>
                           <p className="text-2xl font-bold">{failedBuilds}</p> 
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Avg Build Time</p>
              <p className="text-2xl font-bold">4.2m</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Pipelines</p>
                           <p className="text-2xl font-bold">{activeRepos}</p> 
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Pipeline Runs</h3>
        <div className="space-y-3">
          {[
            { name: 'frontend-app', status: 'success', time: '2m ago' },
            { name: 'api-service', status: 'running', time: '5m ago' },
            { name: 'database-migration', status: 'failed', time: '10m ago' },
          ].map((pipeline, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  pipeline.status === 'success' ? 'bg-green-500' :
                  pipeline.status === 'running' ? 'bg-blue-500' : 'bg-red-500'
                }`} />
                <span className="font-medium">{pipeline.name}</span>
              </div>
              <span className="text-sm text-gray-500">{pipeline.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 