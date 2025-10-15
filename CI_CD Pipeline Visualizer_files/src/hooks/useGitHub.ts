import  { useState, useEffect } from 'react';

interface Repository {
  id: number;
  name: string;
  fullName: string;
  url: string;
  status: string;
  lastBuild: string;
  commits: number;
}

interface WorkflowRun {
  id: number;
  status: string;
  conclusion: string;
  created_at: string;
  workflow_id: number;
}

export function useGitHub() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [workflows, setWorkflows] = useState<WorkflowRun[]>([]);

  const fetchWorkflows = async (owner: string, repo: string) => {
    try {
      const response = await fetch(
        `https://hooks.jdoodle.net/proxy?url=https://api.github.com/repos/${owner}/${repo}/actions/runs`,
        {
          method: 'GET',
          headers: { 'Accept': 'application/vnd.github.v3+json' }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        return data.workflow_runs || [];
      }
    } catch (error) {
      console.error('Failed to fetch workflows:', error);
    }
    return [];
  };

  const addRepository = (repo: Repository) => {
    setRepositories(prev => [...prev, repo]);
  };

  const updateRepositoryStatus = async (repoId: number) => {
    const repo = repositories.find(r => r.id === repoId);
    if (!repo) return;

    const [owner, repoName] = repo.fullName.split('/');
    const runs = await fetchWorkflows(owner, repoName);
    
    if (runs.length > 0) {
      const latestRun = runs[0];
      const status = latestRun.conclusion || latestRun.status;
      
      setRepositories(prev =>
        prev.map(r =>
          r.id === repoId
            ? { ...r, lastBuild: status, commits: runs.length }
            : r
        )
      );
    }
  };

  return {
    repositories,
    workflows,
    addRepository,
    updateRepositoryStatus,
    fetchWorkflows
  };
}
 