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
    role: 'Chief of Staff & Consigliere',
    type: 'primary',
    model: 'Claude Opus 4',
    device: 'DigitalOcean (thomas-server)',
    status: 'online',
    avatar: '🧠',
    description: 'Primary AI operator. Coordinates all agents, executes strategy, manages memory system. Named after Justin\'s uncle.',
    capabilities: ['Strategy', 'Operations', 'Research', 'Coordination', 'Memory', 'Development'],
  },
  {
    id: '2',
    name: 'Justin',
    role: 'CEO / Founder',
    type: 'human',
    status: 'online',
    avatar: '👨‍💼',
    description: 'Solo founder. Full-time. 40-50+ hrs/week. Handles vision, UI/UX, product, and key relationships.',
    capabilities: ['Vision', 'Decisions', 'UI/UX', 'Sales', 'Product'],
  },
  {
    id: '10',
    name: 'Steve',
    role: 'CMO',
    type: 'sub-agent',
    model: 'Claude Opus 4',
    status: 'idle',
    avatar: '📢',
    description: 'Marketing lead. Case studies, spotlight specs, brand voice. Two reference pillars loaded (Ras Mic + Cody Schneider).',
    capabilities: ['Marketing', 'Content', 'Brand', 'Case Studies'],
  },
  {
    id: '11',
    name: 'Scout',
    role: 'Sales Ops',
    type: 'sub-agent',
    model: 'Claude Opus 4',
    status: 'idle',
    avatar: '🔍',
    description: 'Sales operations. 250 contacts staged (201 CO, 49 KY). Nothing sent — cold email declared dead. Pivoting to distributor support.',
    capabilities: ['Prospecting', 'Contact Research', 'CRM', 'Outreach'],
  },
  {
    id: '12',
    name: 'Sheila',
    role: 'Startup Smartup Ops',
    type: 'sub-agent',
    model: 'Claude Opus 4',
    status: 'idle',
    avatar: '🚀',
    description: 'Startup Smartup operations. HubSpot recon done: 6,211 contacts, 1,158 warm/SS-relevant. Reconnect list staged.',
    capabilities: ['HubSpot', 'Outreach', 'Enrichment Programs', 'Contacts'],
  },
  {
    id: '13',
    name: 'Atlas',
    role: 'CDO (Chief Data Officer)',
    type: 'sub-agent',
    model: 'Claude Opus 4',
    status: 'idle',
    avatar: '📊',
    description: 'Data operations. Schema built (4 tables), 21 metric definitions, week 1 baseline captured. Sunday snapshots + Monday briefings.',
    capabilities: ['Analytics', 'Metrics', 'Reporting', 'Data'],
  },
  {
    id: '14',
    name: 'Wall-E',
    role: 'Organizational Memory',
    type: 'sub-agent',
    model: 'Claude Opus 4',
    status: 'online',
    avatar: '🤖',
    description: 'Cross-agent memory and alignment. Polls every 30 min, extracts decisions/facts/corrections, triages by priority (Red/Yellow/Blue).',
    capabilities: ['Memory', 'Alignment', 'Cross-Agent Sync', 'Corrections'],
  },
  {
    id: '15',
    name: 'Reed',
    role: 'Research Agent',
    type: 'sub-agent',
    model: 'Claude Opus 4',
    status: 'idle',
    avatar: '📚',
    description: 'Deep research. State adoption windows, market scans, competitive analysis. Spawned on-demand by Thomas.',
    capabilities: ['Research', 'Analysis', 'Web Scraping', 'Reports'],
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
    description: 'Romania-based dev team. Backend wiring, platform implementation, PFL Academy infrastructure.',
    capabilities: ['Backend', 'Integration', 'Deployment'],
  },
];

const missionStatement = {
  vision: "Build an autonomous organization of AI agents that produce value 24/7",
  goal: "Enable freedom, travel, and the Italian lifestyle - 3 months/year in Italy",
  targets: {
    immediate: "$500k ARR",
    starting: "$200-300k ARR (first milestone)",
    ultimate: "$1M ARR",
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

      {/* AI Sub-Agents */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-[--secondary] mb-4">AI Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.filter(a => a.type === 'sub-agent').map((agent) => (
            <div key={agent.id} className="card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-[--primary-light] flex items-center justify-center text-xl">
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
                  <p className="text-xs text-[--text-muted]">{agent.role}</p>
                </div>
              </div>
              <p className="text-xs text-[--text-secondary] mb-3">{agent.description}</p>
              {agent.model && (
                <div className="flex items-center gap-2 text-xs text-[--text-muted] mb-2">
                  <CpuChipIcon className="w-4 h-4" />
                  {agent.model}
                </div>
              )}
              <div className="flex flex-wrap gap-1">
                {agent.capabilities.map((cap) => (
                  <span key={cap} className="text-[10px] bg-[--background] text-[--text-muted] px-2 py-0.5 rounded">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          ))}
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
