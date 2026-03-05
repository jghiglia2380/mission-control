'use client';

import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  DocumentTextIcon,
  DocumentIcon,
  CodeBracketIcon,
  PresentationChartBarIcon,
  EnvelopeIcon,
  FolderIcon,
  ClockIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

interface Document {
  id: string;
  title: string;
  type: 'planning' | 'technical' | 'content' | 'report' | 'email';
  format: 'md' | 'pdf' | 'doc' | 'txt';
  project?: string;
  createdAt: string;
  preview: string;
  size: string;
}

const documents: Document[] = [
  {
    id: '1',
    title: 'Mission Control Architecture',
    type: 'technical',
    format: 'md',
    project: 'Operations',
    createdAt: 'Just now',
    preview: 'Next.js 14 + Tailwind CSS dashboard with HubSpot-style design. Core screens: Tasks, Calendar, Projects, Memory, Docs, Team...',
    size: '4.2 KB',
  },
  {
    id: '2',
    title: 'PFL Academy Launch Checklist',
    type: 'planning',
    format: 'md',
    project: 'PFL Academy',
    createdAt: '2 hours ago',
    preview: '1. Finalize landing page design 2. Set up demo environment 3. Prepare testimonial videos 4. Email sequence ready...',
    size: '2.8 KB',
  },
  {
    id: '3',
    title: 'Season 2 Story Bible',
    type: 'content',
    format: 'doc',
    project: 'K-4 Curriculum',
    createdAt: 'Yesterday',
    preview: 'Journey to Wonder - 12 chapters exploring markets through time. Characters return: Layla, Riley, Ellis, Benny. New setting: magical marketplace...',
    size: '18.4 KB',
  },
  {
    id: '4',
    title: 'Q1 Revenue Projections',
    type: 'report',
    format: 'pdf',
    project: 'Operations',
    createdAt: '2 days ago',
    preview: 'Financial model showing path to $10k/month. Key assumptions: 3 school pilots, 5 paid districts by Q2...',
    size: '156 KB',
  },
  {
    id: '5',
    title: 'Pioneer Onboarding Email Sequence',
    type: 'email',
    format: 'md',
    project: 'Launchpad',
    createdAt: '3 days ago',
    preview: 'Email 1: Welcome to Pioneer Email 2: Getting Started Guide Email 3: Your First Lesson...',
    size: '6.1 KB',
  },
  {
    id: '6',
    title: 'Chapter 3 Script - Level B',
    type: 'content',
    format: 'txt',
    project: 'K-4 Curriculum',
    createdAt: '4 days ago',
    preview: 'NARRATOR: Layla looked at the falling leaves. "Everything changes," she said. Riley nodded. "But some things stay the same..."',
    size: '1.2 KB',
  },
  {
    id: '7',
    title: 'Competitor Analysis',
    type: 'report',
    format: 'md',
    project: 'PFL Academy',
    createdAt: '1 week ago',
    preview: 'Key competitors: Everfi, NGPF, Banzai. Differentiation: animated storytelling, multi-level reading...',
    size: '8.9 KB',
  },
  {
    id: '8',
    title: 'API Integration Docs',
    type: 'technical',
    format: 'md',
    project: 'Launchpad',
    createdAt: '1 week ago',
    preview: 'Strapi CMS endpoints, Supabase auth flow, HubSpot contact sync...',
    size: '12.3 KB',
  },
];

const typeIcons = {
  planning: PresentationChartBarIcon,
  technical: CodeBracketIcon,
  content: DocumentTextIcon,
  report: DocumentIcon,
  email: EnvelopeIcon,
};

const typeColors = {
  planning: 'bg-purple-50 text-purple-500',
  technical: 'bg-blue-50 text-blue-500',
  content: 'bg-amber-50 text-amber-500',
  report: 'bg-green-50 text-green-500',
  email: 'bg-pink-50 text-pink-500',
};

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  const docCounts = {
    all: documents.length,
    planning: documents.filter(d => d.type === 'planning').length,
    technical: documents.filter(d => d.type === 'technical').length,
    content: documents.filter(d => d.type === 'content').length,
    report: documents.filter(d => d.type === 'report').length,
    email: documents.filter(d => d.type === 'email').length,
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[--secondary]">Documents</h1>
          <p className="text-[--text-muted] mt-1">All documents created by Thomas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          {/* Type Filters */}
          <div className="card p-5">
            <h3 className="font-semibold text-[--secondary] mb-4 flex items-center gap-2">
              <FunnelIcon className="w-4 h-4" />
              Filter by Type
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedType(null)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors ${
                  !selectedType ? 'bg-[--primary-light] text-[--primary]' : 'hover:bg-gray-100 text-[--text-secondary]'
                }`}
              >
                <span>All Documents</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{docCounts.all}</span>
              </button>
              {Object.entries(typeColors).map(([type, _]) => {
                const Icon = typeIcons[type as keyof typeof typeIcons];
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors ${
                      selectedType === type ? 'bg-[--primary-light] text-[--primary]' : 'hover:bg-gray-100 text-[--text-secondary]'
                    }`}
                  >
                    <span className="flex items-center gap-2 capitalize">
                      <Icon className="w-4 h-4" />
                      {type}
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                      {docCounts[type as keyof typeof docCounts]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects */}
          <div className="card p-5">
            <h3 className="font-semibold text-[--secondary] mb-4 flex items-center gap-2">
              <FolderIcon className="w-4 h-4" />
              By Project
            </h3>
            <div className="space-y-2">
              {['PFL Academy', 'K-4 Curriculum', 'Operations', 'Launchpad'].map((project) => (
                <button
                  key={project}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-100 text-[--text-secondary] flex items-center justify-between"
                >
                  <span>{project}</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                    {documents.filter(d => d.project === project).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="lg:col-span-3">
          {/* Search */}
          <div className="relative mb-6">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[--text-muted]" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-[--border] rounded-lg focus:outline-none focus:border-[--primary] focus:ring-1 focus:ring-[--primary]"
            />
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDocs.map((doc) => {
              const Icon = typeIcons[doc.type];
              const colorClass = typeColors[doc.type];
              return (
                <div key={doc.id} className="card p-5 card-hover cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass.split(' ')[0]}`}>
                      <Icon className={`w-6 h-6 ${colorClass.split(' ')[1]}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[--secondary] truncate">{doc.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs uppercase bg-gray-100 px-2 py-0.5 rounded text-[--text-muted]">
                          {doc.format}
                        </span>
                        {doc.project && (
                          <span className="text-xs text-[--text-muted]">{doc.project}</span>
                        )}
                      </div>
                      <p className="text-sm text-[--text-muted] mt-2 line-clamp-2">{doc.preview}</p>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[--border]">
                        <div className="flex items-center gap-1 text-xs text-[--text-muted]">
                          <ClockIcon className="w-3 h-3" />
                          {doc.createdAt}
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 hover:bg-gray-100 rounded text-[--text-muted] hover:text-[--secondary]">
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded text-[--text-muted] hover:text-[--secondary]">
                            <ArrowDownTrayIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
