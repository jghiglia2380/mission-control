'use client';

import { useState } from 'react';
import {
  PlusIcon,
  UserCircleIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: 'justin' | 'thomas';
  priority: 'high' | 'medium' | 'low';
  project?: string;
  dueDate?: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    tasks: [
      { id: '1', title: 'Research competitor pricing', description: 'Analyze PFL competitors', assignee: 'thomas', priority: 'medium', project: 'PFL Academy' },
      { id: '2', title: 'Update memory system docs', description: 'Document the memory architecture', assignee: 'thomas', priority: 'low' },
    ],
  },
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: '3', title: 'Design testimonials section', description: 'Create HeyGen placeholder clips', assignee: 'thomas', priority: 'high', project: 'PFL Academy' },
      { id: '4', title: 'Review Chapter 2 scripts', description: 'Season 1 script review', assignee: 'justin', priority: 'medium', project: 'K-4 Curriculum' },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      { id: '5', title: 'Build Mission Control dashboard', description: 'Next.js + Tailwind setup', assignee: 'thomas', priority: 'high', project: 'Operations' },
      { id: '6', title: 'Landing page iteration', description: 'Apply @rasmic bento layout', assignee: 'thomas', priority: 'high', project: 'PFL Academy' },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    tasks: [
      { id: '7', title: 'Email sequence draft', description: 'Pioneer onboarding flow', assignee: 'justin', priority: 'medium', project: 'Launchpad' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: '8', title: 'Q1 revenue projections', description: 'Completed financial model', assignee: 'thomas', priority: 'high', project: 'Operations' },
    ],
  },
];

const activityFeed = [
  { id: 1, action: 'Task moved to In Progress', task: 'Build Mission Control', time: '2 min ago', agent: 'Thomas' },
  { id: 2, action: 'New task created', task: 'Design testimonials section', time: '15 min ago', agent: 'Thomas' },
  { id: 3, action: 'Task completed', task: 'Q1 revenue projections', time: '1 hour ago', agent: 'Thomas' },
  { id: 4, action: 'Comment added', task: 'Landing page iteration', time: '2 hours ago', agent: 'Justin' },
];

export default function TasksPage() {
  const [columns, setColumns] = useState(initialColumns);

  return (
    <div className="p-8 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[--secondary]">Task Board</h1>
          <p className="text-[--text-muted] mt-1">Track everything Thomas is working on</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          New Task
        </button>
      </div>

      <div className="flex gap-6 flex-1 overflow-x-auto pb-4">
        {/* Kanban Columns */}
        <div className="flex gap-4 flex-1">
          {columns.map((column) => (
            <div key={column.id} className="kanban-column w-72 flex-shrink-0 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[--secondary]">{column.title}</h3>
                <span className="text-sm text-[--text-muted] bg-white px-2 py-0.5 rounded-full">
                  {column.tasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <div key={task.id} className="card p-4 card-hover cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <span className={`badge ${
                        task.priority === 'high' ? 'badge-error' :
                        task.priority === 'medium' ? 'badge-warning' : 'badge-info'
                      }`}>
                        {task.priority}
                      </span>
                      <button className="text-[--text-muted] hover:text-[--secondary]">
                        <EllipsisHorizontalIcon className="w-5 h-5" />
                      </button>
                    </div>
                    <h4 className="font-medium text-[--secondary] mb-1">{task.title}</h4>
                    <p className="text-sm text-[--text-muted] mb-3">{task.description}</p>
                    {task.project && (
                      <span className="text-xs bg-[--background] text-[--text-secondary] px-2 py-1 rounded">
                        {task.project}
                      </span>
                    )}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[--border]">
                      <div className="flex items-center gap-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          task.assignee === 'thomas' ? 'bg-[--primary-light] text-[--primary]' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {task.assignee === 'thomas' ? 'T' : 'J'}
                        </div>
                        <span className="text-xs text-[--text-muted] capitalize">{task.assignee}</span>
                      </div>
                      {task.dueDate && (
                        <div className="flex items-center gap-1 text-xs text-[--text-muted]">
                          <ClockIcon className="w-3 h-3" />
                          {task.dueDate}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <button className="w-full py-3 border-2 border-dashed border-[--border] rounded-lg text-sm text-[--text-muted] hover:border-[--primary] hover:text-[--primary] transition-colors">
                  + Add Task
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Feed */}
        <div className="w-80 flex-shrink-0">
          <div className="card h-full">
            <div className="p-4 border-b border-[--border]">
              <h3 className="font-semibold text-[--secondary]">Live Activity</h3>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto max-h-[600px]">
              {activityFeed.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="w-8 h-8 bg-[--primary-light] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-[--primary]">
                      {activity.agent[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[--secondary]">
                      <span className="font-medium">{activity.agent}</span>{' '}
                      <span className="text-[--text-muted]">{activity.action}</span>
                    </p>
                    <p className="text-sm text-[--text-secondary]">{activity.task}</p>
                    <p className="text-xs text-[--text-muted] mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
