'use client';

import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  CalendarIcon,
  BookOpenIcon,
  TagIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

interface Memory {
  id: string;
  date: string;
  title: string;
  preview: string;
  tags: string[];
  type: 'conversation' | 'decision' | 'insight' | 'task';
}

const memories: Memory[] = [
  {
    id: '1',
    date: 'March 5, 2026',
    title: 'Mission Control Dashboard Planning',
    preview: 'Justin shared a YouTube video about building a Mission Control dashboard. Key features: Task board, Calendar (cron jobs), Projects, Memory, Docs, Team...',
    tags: ['operations', 'development'],
    type: 'decision',
  },
  {
    id: '2',
    date: 'March 4, 2026',
    title: 'PFL Academy Landing Page Iteration',
    preview: 'Discussed @rasmic bento box layouts for the academy showcase. Focus on light design, HubSpot-style architecture. Testimonials section with HeyGen placeholders...',
    tags: ['pfl-academy', 'design'],
    type: 'conversation',
  },
  {
    id: '3',
    date: 'March 4, 2026',
    title: 'Season 2 Storyline Brainstorm',
    preview: 'Journey to Wonder - magical travels to markets through time. Trade & cultural exchange themes. Building on Season 1 foundation...',
    tags: ['k-4-curriculum', 'creative'],
    type: 'insight',
  },
  {
    id: '4',
    date: 'March 3, 2026',
    title: 'Sales Pipeline Review with Barry',
    preview: 'Current leads: 12 schools in pipeline. 3 demos scheduled for next week. Focus on summer 2025 decisions. Barry handling outreach, 20% of revenue after costs...',
    tags: ['sales', 'barry'],
    type: 'conversation',
  },
  {
    id: '5',
    date: 'March 2, 2026',
    title: 'API Keys Migration',
    preview: 'Migrated all API keys from .bashrc to clawdbot.json for better security. HubSpot, Strapi, GitHub, Airtable, Supabase all configured...',
    tags: ['operations', 'security'],
    type: 'task',
  },
];

const longTermMemories = [
  { title: 'Justin\'s Italy Goal', content: '3 months/year in Italy (6 weeks spring, 6 weeks fall)' },
  { title: 'Revenue Targets', content: 'Immediate: $10k/month → Starting: $200-300k ARR → Ultimate: $3M+ ARR' },
  { title: 'Sales Cycle', content: 'Academic calendar driven - decisions in spring/summer for following year' },
  { title: 'Team Structure', content: 'Barry (Sales 20%), Sebastian + designers (Romania dev team)' },
  { title: 'Monthly Burn', content: '$5-6k/month' },
];

export default function MemoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filteredMemories = memories.filter(memory =>
    memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    memory.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
    memory.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[--secondary]">Memory</h1>
          <p className="text-[--text-muted] mt-1">Your AI's memory organized by day</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Memory Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[--text-muted]" />
            <input
              type="text"
              placeholder="Search memories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-[--border] rounded-lg focus:outline-none focus:border-[--primary] focus:ring-1 focus:ring-[--primary]"
            />
          </div>

          {/* Memories List */}
          <div className="space-y-4">
            {filteredMemories.map((memory) => (
              <div key={memory.id} className="card p-5 card-hover cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      memory.type === 'conversation' ? 'bg-blue-50' :
                      memory.type === 'decision' ? 'bg-purple-50' :
                      memory.type === 'insight' ? 'bg-amber-50' : 'bg-[--accent-light]'
                    }`}>
                      <BookOpenIcon className={`w-5 h-5 ${
                        memory.type === 'conversation' ? 'text-blue-500' :
                        memory.type === 'decision' ? 'text-purple-500' :
                        memory.type === 'insight' ? 'text-amber-500' : 'text-[--accent]'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[--secondary]">{memory.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <CalendarIcon className="w-3 h-3 text-[--text-muted]" />
                        <span className="text-xs text-[--text-muted]">{memory.date}</span>
                        <span className={`badge text-[10px] ${
                          memory.type === 'conversation' ? 'badge-info' :
                          memory.type === 'decision' ? 'bg-purple-100 text-purple-600' :
                          memory.type === 'insight' ? 'badge-warning' : 'badge-success'
                        }`}>
                          {memory.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-[--text-muted]" />
                </div>
                <p className="text-sm text-[--text-secondary] mb-3 line-clamp-2">{memory.preview}</p>
                <div className="flex items-center gap-2">
                  {memory.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-[--background] rounded text-xs text-[--text-secondary]">
                      <TagIcon className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Long-Term Memory Sidebar */}
        <div className="space-y-6">
          <div className="card">
            <div className="p-5 border-b border-[--border]">
              <h2 className="font-semibold text-[--secondary]">Long-Term Memory</h2>
              <p className="text-xs text-[--text-muted] mt-1">From MEMORY.md</p>
            </div>
            <div className="divide-y divide-[--border]">
              {longTermMemories.map((item, i) => (
                <div key={i} className="p-4">
                  <h4 className="text-sm font-medium text-[--secondary]">{item.title}</h4>
                  <p className="text-sm text-[--text-muted] mt-1">{item.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Memory Stats */}
          <div className="card p-5">
            <h3 className="font-semibold text-[--secondary] mb-4">Memory Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-[--text-muted]">Total Memories</span>
                <span className="text-sm font-medium text-[--secondary]">247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[--text-muted]">This Week</span>
                <span className="text-sm font-medium text-[--secondary]">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[--text-muted]">Conversations</span>
                <span className="text-sm font-medium text-[--secondary]">142</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[--text-muted]">Decisions</span>
                <span className="text-sm font-medium text-[--secondary]">58</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[--text-muted]">Insights</span>
                <span className="text-sm font-medium text-[--secondary]">47</span>
              </div>
            </div>
          </div>

          {/* Date Navigator */}
          <div className="card p-5">
            <h3 className="font-semibold text-[--secondary] mb-4">Browse by Date</h3>
            <div className="space-y-2">
              {['March 5, 2026', 'March 4, 2026', 'March 3, 2026', 'March 2, 2026', 'March 1, 2026'].map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedDate === date
                      ? 'bg-[--primary-light] text-[--primary]'
                      : 'hover:bg-gray-100 text-[--text-secondary]'
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
