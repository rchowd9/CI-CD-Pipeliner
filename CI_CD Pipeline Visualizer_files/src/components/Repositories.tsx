import  React from 'react';
import { Github, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import AddRepository from './AddRepository';
import { useGitHub } from '../hooks/useGitHub';

export default function Repositories() {
  const { repositories, addRepository, updateRepositoryStatus } = useGitHub(); 

   const handleRefresh = (repoId: number) => {
    updateRepositoryStatus(repoId);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Repositories</h2>
        <AddRepository onAdd={addRepository} />
      </div> 
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Repository</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Build</th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commits</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr> 
          </thead>
          <tbody className="divide-y divide-gray-200">
                       {repositories.map((repo, index) => (
              <tr key={repo.id || index}> 
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Github className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="font-medium">{repo.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    repo.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {repo.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {repo.lastBuild === 'success' ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    <span className="text-sm">{repo.lastBuild}</span>
                  </div>
                </td>
                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {repo.commits}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleRefresh(repo.id || index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </td>
              </tr> 
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
 