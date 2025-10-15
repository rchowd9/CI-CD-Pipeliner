import  React, { useState } from 'react';
import { Home, Database, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">CI/CD Monitor</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => onTabChange('dashboard')}
          className={`w-full flex items-center px-3 py-2 text-left rounded-md transition-colors ${
            activeTab === 'dashboard'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Home className="mr-3 h-5 w-5" />
          Dashboard
        </button>
        
        <button
          onClick={() => onTabChange('repositories')}
          className={`w-full flex items-center px-3 py-2 text-left rounded-md transition-colors ${
            activeTab === 'repositories'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Database className="mr-3 h-5 w-5" />
          Repositories
        </button>
        
        <button
          onClick={() => onTabChange('settings')}
          className={`w-full flex items-center px-3 py-2 text-left rounded-md transition-colors ${
            activeTab === 'settings'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </button>
      </nav>
    </div>
  );
}
 