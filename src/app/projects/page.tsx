'use client';

import { useState } from 'react';
import {
  PlusIcon,
  FolderIcon,
  ChartBarIcon,
  ClockIcon,
  DocumentTextIcon,
  LinkIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'active' | 'on-hold' | 'completed';
  priority: 'high' | 'medium' | 'low';
  tasksTotal: number;
  tasksCompleted: number;
  docsCount: number;
  memoriesCount: number;
  lastActivity: string;
  color: string;
}

const projects: Project[] = [
  {
    id: '1',
    name: 'PFL Academy',
    description: 'K-12 financial literacy platform - landing pages, curriculum, marketing',
    progress: 45,
    status: 'active',
    priority: 'high',
    tasksTotal: 24,
    tasksCompleted: 11,
    docsCount: 18,
    memoriesCount: 42,
    lastActivity: '2 hours ago',
    color: 'bg-orange-500',
  },
  {
    id: '2',
    name: 'K-4 Curriculum',
    description: 'Animated financial literacy series - Layla, Riley, Ellis adventures',
    progress: 75,
    status: 'active',
    priority: 'high',
    tasksTotal: 48,
    tasksCompleted: 36,
    docsCount: 156,
    memoriesCount: 89,
    lastActivity: 'Yesterday',
    color: 'bg-purple-500',
  },
  {
    id: '3',
    name: 'Launchpad / Pioneer',
    description: 'Student and teacher portals - platform development',
    progress: 30,
    status: 'active',
    priority: 'medium',
    tasksTotal: 32,
    tasksCompleted: 10,
    docsCount: 24,
    memoriesCount: 31,
    lastActivity: '3 days ago',
    color: 'bg-blue-500',
  },
  {
    id: '4',
    name: 'Sales Pipeline',
    description: 'Outreach, demos, and closing - Barry collaboration',
    progress: 60,
    status: 'active',
    priority: 'high',
    tasksTotal: 15,
    tasksCompleted: 9,
    docsCount: 8,
    memoriesCount: 24,
    lastActivity: 'Today',
    color: 'bg-green-500',
  },
  {
    id: '5',
    name: 'Operations',
    description: 'Internal systems, Mission Control, AI workflows',
    progress: 20,
    status: 'active',
    priority: 'medium',
    tasksTotal: 12,
    tasksCompleted: 2,
    docsCount: 6,
    memoriesCount: 15,
    lastActivity: 'Just now',
    color: 'bg-teal-500',
  },
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[--secondary]">Projects</h1>
          <p className="text-[--text-muted] mt-1">Track progress across all major initiatives</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          New Project
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="card p-5">
          <p className="text-sm text-[--text-muted]">Total Projects</p>
          <p className="text-2xl font-semibold text-[--secondary] mt-1">{projects.length}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-[--text-muted]">Active</p>
          <p className="text-2xl font-semibold text-[--accent] mt-1">
            {projects.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-[--text-muted]">High Priority</p>
          <p className="text-2xl font-semibold text-[--primary] mt-1">
            {projects.filter(p => p.priority === 'high').length}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-[--text-muted]">Avg Progress</p>
          <p className="text-2xl font-semibold text-[--secondary] mt-1">
            {Math.round(projects.reduce((a, b) => a + b.progress, 0) / projects.length)}%
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="card card-hover p-6 cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${project.color} rounded-lg flex items-center justify-center`}>
                  <FolderIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[--secondary]">{project.name}</h3>
                  <span className={`badge ${
                    project.priority === 'high' ? 'badge-error' :
                    project.priority === 'medium' ? 'badge-warning' : 'badge-info'
                  }`}>
                    {project.priority} priority
                  </span>
                </div>
              </div>
              <button className="text-[--text-muted] hover:text-[--secondary]">
                <EllipsisHorizontalIcon className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-[--text-muted] mb-4">{project.description}</p>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[--text-secondary]">Progress</span>
                <span className="text-sm font-medium text-[--secondary]">{project.progress}%</span>
              </div>
              <div className="h-2 bg-[--background] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[--primary] rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-6 py-3 border-t border-[--border]">
              <div className="flex items-center gap-2 text-sm text-[--text-muted]">
                <ChartBarIcon className="w-4 h-4" />
                <span>{project.tasksCompleted}/{project.tasksTotal} tasks</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[--text-muted]">
                <DocumentTextIcon className="w-4 h-4" />
                <span>{project.docsCount} docs</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[--text-muted]">
                <LinkIcon className="w-4 h-4" />
                <span>{project.memoriesCount} memories</span>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-3 text-xs text-[--text-muted]">
              <ClockIcon className="w-3 h-3" />
              Last activity: {project.lastActivity}
            </div>
          </div>
        ))}
      </div>

      {/* Reverse Prompt Suggestion */}
      <div className="mt-8 card p-6 bg-gradient-to-r from-[--accent-light] to-white">
        <h3 className="font-semibold text-[--secondary] mb-2">💡 Reverse Prompt</h3>
        <p className="text-[--text-secondary] mb-4">
          "What's one task we can do right now that will help us progress in one of our major projects?"
        </p>
        <button className="btn-primary text-sm">Ask Thomas</button>
      </div>
    </div>
  );
}
