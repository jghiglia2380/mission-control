'use client';

import {
  UserCircleIcon,
  CpuChipIcon,
  ComputerDesktopIcon,
  CloudIcon,
  SparklesIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';

interface Agent {
  id: string;
  name: string;
  role: string;
  type: 'primary' | 'human' | 'sub-agent';
  model?: string;
  device?: string;
  status: 'online' | 'offline' | 'idle';
  avatar: string;
  description: string;
  capabilities: string[];
}

const agents: Agent[] = [
  {
    id: '1',
    name: 'Thomas',
    role: 'Chief of Staff AI',
    type: 'primary',
    model: 'Claude Opus 4',
    device: 'Cloud (Anthropic)',
    status: 'online',
    avatar: '🎯',
    description: 'Primary AI assistant - consigliere, strategic advisor, and operator. Handles all main communication and coordination.',
    capabilities: ['Strategy', 'Operations', 'Research', 'Writing', 'Development', 'Memory'],
  },
  {
    id: '2',
    name: 'Justin',
    role: 'CEO / Founder',
    type: 'human',
    status: 'online',
    avatar: '👨‍💼',
    description: 'Solo founder handling strategy, UI/UX, and product vision. Goal: freedom, travel, Italy.',
    capabilities: ['Vision', 'Decisions', 'UI/UX', 'Sales', 'Relationships'],
  },
  {
    id: '3',
    name: 'Barry Schwartz',
    role: 'Sales (20% of revenue)',
    type: 'human',
    status: 'offline',
    avatar: '💼',
    description: 'Sales partner handling outreach and closing. 20% of revenue after costs.',
    capabilities: ['Outreach', 'Demos', 'Closing', 'Relationships'],
  },
  {
    id: '4',
    name: 'Sebastian & Team',
    role: 'Development (Romania)',
    type: 'human',
    status: 'offline',
    avatar: '👨‍💻',
    description: 'Romania-based dev team handling backend wiring and implementation.',
    capabilities: ['Backend', 'Integration', 'Deployment'],
  },
];

const missionStatement = {
  vision: "Build an autonomous organization of AI agents that produce value 24/7",
  goal: "Enable freedom, travel, and the Italian lifestyle - 3 months/year in Italy",
  targets: {
    immediate: "$10k/month",
    starting: "$200-300k ARR",
    ultimate: "$3M+ ARR",
  },
};

export default function TeamPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[--secondary]">Team</h1>
          <p className="text-[--text-muted] mt-1">Your organization structure and mission</p>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <PencilSquareIcon className="w-5 h-5" />
          Edit Mission
        </button>
      </div>

      {/* Mission Statement */}
      <div className="card mb-8 overflow-hidden">
        <div className="bg-gradient-to-r from-[--primary] to-[--primary-dark] p-6 text-white">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <SparklesIcon className="w-5 h-5" />
            Mission Statement
          </h2>
          <p className="text-xl font-medium opacity-95">{missionStatement.vision}</p>
          <p className="mt-2 opacity-80">{missionStatement.goal}</p>
        </div>
        <div className="p-6 bg-[--primary-light]">
          <h3 className="text-sm font-semibold text-[--secondary] mb-4">Revenue Targets</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-2xl font-bold text-[--primary]">{missionStatement.targets.immediate}</p>
              <p className="text-sm text-[--text-muted]">Immediate Goal</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[--primary]">{missionStatement.targets.starting}</p>
              <p className="text-sm text-[--text-muted]">Starting Target</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[--primary]">{missionStatement.targets.ultimate}</p>
              <p className="text-sm text-[--text-muted]">Ultimate Target</p>
            </div>
          </div>
        </div>
      </div>

      {/* Org Chart */}
      <h2 className="text-lg font-semibold text-[--secondary] mb-4">Organization</h2>

      {/* Primary Row - Justin & Thomas */}
      <div className="flex justify-center gap-8 mb-8">
        {agents.filter(a => a.type === 'primary' || a.id === '2').reverse().map((agent) => (
          <div key={agent.id} className="w-72">
            <div className={`card p-6 ${agent.type === 'primary' ? 'ring-2 ring-[--primary]' : ''}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                  agent.type === 'primary' ? 'bg-[--primary-light]' : 'bg-blue-50'
                }`}>
                  {agent.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[--secondary]">{agent.name}</h3>
                    <div className={`w-2 h-2 rounded-full ${
                      agent.status === 'online' ? 'bg-[--accent]' :
                      agent.status === 'idle' ? 'bg-amber-400' : 'bg-gray-300'
                    }`} />
                  </div>
                  <p className="text-sm text-[--text-muted]">{agent.role}</p>
                </div>
              </div>
              <p className="text-sm text-[--text-secondary] mb-4">{agent.description}</p>
              {agent.model && (
                <div className="flex items-center gap-2 text-xs text-[--text-muted] mb-2">
                  <CpuChipIcon className="w-4 h-4" />
                  {agent.model}
                </div>
              )}
              {agent.device && (
                <div className="flex items-center gap-2 text-xs text-[--text-muted] mb-4">
                  <CloudIcon className="w-4 h-4" />
                  {agent.device}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {agent.capabilities.map((cap) => (
                  <span key={cap} className="text-xs bg-[--background] text-[--text-secondary] px-2 py-1 rounded">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Connection Line */}
      <div className="flex justify-center mb-8">
        <div className="w-px h-8 bg-[--border]" />
      </div>

      {/* Team Row */}
      <h3 className="text-center text-sm font-medium text-[--text-muted] mb-4">Extended Team</h3>
      <div className="flex justify-center gap-6">
        {agents.filter(a => a.type === 'human' && a.id !== '2').map((agent) => (
          <div key={agent.id} className="w-64">
            <div className="card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-xl">
                  {agent.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[--secondary]">{agent.name}</h3>
                    <div className={`w-2 h-2 rounded-full ${
                      agent.status === 'online' ? 'bg-[--accent]' : 'bg-gray-300'
                    }`} />
                  </div>
                  <p className="text-xs text-[--text-muted]">{agent.role}</p>
                </div>
              </div>
              <p className="text-xs text-[--text-secondary] mb-3">{agent.description}</p>
              <div className="flex flex-wrap gap-1">
                {agent.capabilities.map((cap) => (
                  <span key={cap} className="text-[10px] bg-[--background] text-[--text-muted] px-2 py-0.5 rounded">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Future Sub-Agents */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-[--secondary] mb-4">Sub-Agents (Planned)</h2>
        <div className="card p-6 border-dashed border-2 border-[--border] bg-transparent">
          <div className="text-center text-[--text-muted]">
            <CpuChipIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-medium">No sub-agents configured yet</p>
            <p className="text-sm mt-1">Sub-agents can be spun up for specialized tasks like research, development, or content creation.</p>
            <button className="btn-secondary mt-4 text-sm">+ Add Sub-Agent</button>
          </div>
        </div>
      </div>

      {/* Reverse Prompt */}
      <div className="mt-8 card p-6 bg-gradient-to-r from-[--accent-light] to-white">
        <h3 className="font-semibold text-[--secondary] mb-2">💡 Reverse Prompt</h3>
        <p className="text-[--text-secondary] mb-4">
          "Based on everything you know about me, what should be our mission statement?"
        </p>
        <button className="btn-primary text-sm">Ask Thomas</button>
      </div>
    </div>
  );
}
