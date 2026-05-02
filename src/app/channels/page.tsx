'use client';

import { useState } from 'react';
import { channels, agentColors, categoryColors, categoryLabels } from './channels-data';
import type { Channel } from './channels-data';
import {
  PlayIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowTopRightOnSquareIcon,
  SignalIcon,
  ClockIcon,
  DocumentTextIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

type FilterAgent = 'All' | 'Justin' | 'Thomas' | 'Steve' | 'Scout' | 'Sheila';
type FilterCategory = 'all' | 'marketing' | 'ai' | 'startup' | 'sales' | 'design' | 'operations';

export default function ChannelsPage() {
  const [agentFilter, setAgentFilter] = useState<FilterAgent>('All');
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChannels = channels.filter((ch) => {
    if (agentFilter !== 'All' && !ch.agentRouting.includes(agentFilter)) return false;
    if (categoryFilter !== 'all' && ch.category !== categoryFilter) return false;
    if (searchQuery && !ch.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const highPriority = filteredChannels.filter((ch) => ch.priority === 'high');
  const otherChannels = filteredChannels.filter((ch) => ch.priority !== 'high');

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[--secondary]">Channels</h1>
          <p className="text-sm text-[--text-muted] mt-1">
            Content intelligence — {channels.length} channels tracked
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[--accent-light] rounded-full">
            <div className="w-2 h-2 bg-[--accent] rounded-full animate-pulse" />
            <span className="text-xs font-medium text-[--success]">Digest Active</span>
          </div>
        </div>
      </div>

      {/* Today's Highlights Card */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <SparklesIcon className="w-5 h-5 text-[--primary]" />
          <h2 className="font-semibold text-[--secondary]">Today&apos;s Highlights</h2>
          <span className="badge badge-info ml-auto">Daily Digest @ 1 PM PST</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[--background] rounded-lg">
            <div className="text-xs text-[--text-muted] mb-1">New Videos</div>
            <div className="text-2xl font-semibold text-[--secondary]">—</div>
            <div className="text-xs text-[--text-muted] mt-1">Digest not yet running</div>
          </div>
          <div className="p-4 bg-[--background] rounded-lg">
            <div className="text-xs text-[--text-muted] mb-1">Action Items</div>
            <div className="text-2xl font-semibold text-[--secondary]">—</div>
            <div className="text-xs text-[--text-muted] mt-1">Configure RSS feeds first</div>
          </div>
          <div className="p-4 bg-[--background] rounded-lg">
            <div className="text-xs text-[--text-muted] mb-1">Weekly Trend</div>
            <div className="text-2xl font-semibold text-[--secondary]">—</div>
            <div className="text-xs text-[--text-muted] mt-1">Sunday 10 AM PST</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Agent filter */}
        <div className="flex items-center gap-2">
          <FunnelIcon className="w-4 h-4 text-[--text-muted]" />
          <div className="flex bg-white border border-[--border] rounded-lg overflow-hidden">
            {(['All', 'Justin', 'Thomas', 'Steve', 'Scout', 'Sheila'] as FilterAgent[]).map((agent) => (
              <button
                key={agent}
                onClick={() => setAgentFilter(agent)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  agentFilter === agent
                    ? 'bg-[--primary] text-white'
                    : 'text-[--text-secondary] hover:bg-gray-50'
                }`}
              >
                {agent}
              </button>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="flex bg-white border border-[--border] rounded-lg overflow-hidden">
          {(['all', 'marketing', 'ai', 'startup', 'design', 'operations'] as FilterCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                categoryFilter === cat
                  ? 'bg-[--secondary] text-white'
                  : 'text-[--text-secondary] hover:bg-gray-50'
              }`}
            >
              {cat === 'all' ? 'All' : categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative ml-auto">
          <MagnifyingGlassIcon className="w-4 h-4 text-[--text-muted] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search channels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-1.5 text-sm border border-[--border] rounded-lg focus:outline-none focus:border-[--primary] bg-white"
          />
        </div>
      </div>

      {/* Priority Channels */}
      {highPriority.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-[--text-muted] uppercase tracking-wider mb-3">
            Priority Channels
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {highPriority.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        </div>
      )}

      {/* Other Channels */}
      {otherChannels.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-[--text-muted] uppercase tracking-wider mb-3">
            All Channels
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherChannels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        </div>
      )}

      {filteredChannels.length === 0 && (
        <div className="text-center py-12 text-[--text-muted]">
          No channels match the current filters.
        </div>
      )}

      {/* Digest Schedule */}
      <div className="mt-8 card p-6">
        <h3 className="font-semibold text-[--secondary] mb-4 flex items-center gap-2">
          <ClockIcon className="w-5 h-5" />
          Digest Schedule
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-[--background] rounded-lg">
            <div className="w-10 h-10 bg-[--primary-light] rounded-lg flex items-center justify-center flex-shrink-0">
              <DocumentTextIcon className="w-5 h-5 text-[--primary]" />
            </div>
            <div>
              <div className="font-medium text-sm text-[--secondary]">Daily Digest</div>
              <div className="text-xs text-[--text-muted] mt-0.5">1:00 PM PST — Scan RSS, summarize, route to agents</div>
              <div className="text-xs text-[--text-muted]">Status: <span className="text-[--warning]">Not configured</span></div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[--background] rounded-lg">
            <div className="w-10 h-10 bg-[--accent-light] rounded-lg flex items-center justify-center flex-shrink-0">
              <SignalIcon className="w-5 h-5 text-[--accent]" />
            </div>
            <div>
              <div className="font-medium text-sm text-[--secondary]">Weekly Digest</div>
              <div className="text-xs text-[--text-muted] mt-0.5">Sunday 10:00 AM PST — Trends, insights, actions</div>
              <div className="text-xs text-[--text-muted]">Status: <span className="text-[--warning]">Not configured</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChannelCard({ channel }: { channel: Channel }) {
  const catColor = categoryColors[channel.category] || '#516f90';

  return (
    <div className="card card-hover p-5 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: catColor }}
          >
            {channel.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-medium text-sm text-[--secondary]">{channel.name}</h4>
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${catColor}20`, color: catColor }}
            >
              {categoryLabels[channel.category]}
            </span>
          </div>
        </div>
        <a
          href={channel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[--text-muted] hover:text-[--primary] transition-colors"
        >
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
        </a>
      </div>

      <p className="text-xs text-[--text-muted] mb-3 line-clamp-2">{channel.description}</p>

      {/* Agent routing tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {channel.agentRouting.map((agent) => (
          <span
            key={agent}
            className="text-[10px] font-medium px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: agentColors[agent] || '#516f90' }}
          >
            {agent}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-[--border]">
        <button className="flex items-center gap-1 text-xs text-[--text-muted] hover:text-[--primary] transition-colors">
          <PlayIcon className="w-3.5 h-3.5" />
          Latest
        </button>
        <button className="flex items-center gap-1 text-xs text-[--text-muted] hover:text-[--primary] transition-colors ml-auto">
          <DocumentTextIcon className="w-3.5 h-3.5" />
          Transcript
        </button>
        <button className="flex items-center gap-1 text-xs text-[--text-muted] hover:text-[--primary] transition-colors">
          <SparklesIcon className="w-3.5 h-3.5" />
          Summary
        </button>
      </div>
    </div>
  );
}
