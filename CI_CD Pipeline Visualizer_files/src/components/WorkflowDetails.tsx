import  React, { useState, useEffect } from 'react';
import { Activity, Clock, CheckCircle, AlertCircle, Play } from 'lucide-react';

interface WorkflowDetailsProps {
  repository: any;
}

export default function WorkflowDetails({ repository }: WorkflowDetailsProps) {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (repository) {
      fetchWorkflows();
    }
  }, [repository]);

  const fetchWorkflows = async () => {
    if (!repository?.fullName) return;
    
    setLoading(true);
    try {
      const [owner, repo] = repository.fullName.split('/');
      const response = await fetch(
        `https://hooks.jdoodle.net/proxy?url=https://api.github.com/repos/${owner}/${repo}/actions/runs?per_page=10`,
        {
          method: 'GET',
          headers: { 'Accept': 'application/vnd.github.v3+json' }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setWorkflows(data.workflow_runs || []);
      }
    } catch (error) {
      console.error('Failed to fetch workflows:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string, conclusion: string) => {
    if (status === 'in_progress') return <Activity className="h-4 w-4 text-blue-500 animate-spin" />;
    if (conclusion === 'success') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (conclusion === 'failure') return <AlertCircle className="h-4 w-4 text-red-500" />;
    return <Clock className="h-4 w-4 text-gray-500" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Workflow Runs</h3>
        <button
          onClick={fetchWorkflows}
          className="text-blue-600 hover:text-blue-800"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {workflows.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No workflow runs found</p>
      ) : (
        <div className="space-y-3">
          {workflows.map((workflow: any) => (
            <div key={workflow.id} className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center">
                {getStatusIcon(workflow.status, workflow.conclusion)}
                <div className="ml-3">
                  <p className="font-medium">{workflow.name || 'Workflow'}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(workflow.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                workflow.conclusion === 'success' ? 'bg-green-100 text-green-800' :
                workflow.conclusion === 'failure' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {workflow.conclusion || workflow.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
 