// Channel configuration and types

export interface Channel {
  id: string;
  name: string;
  channelId: string;
  url: string;
  category: 'marketing' | 'ai' | 'startup' | 'sales' | 'design' | 'operations';
  agentRouting: string[];
  priority: 'high' | 'medium' | 'low';
  description: string;
}

export interface VideoItem {
  id: string;
  channelId: string;
  channelName: string;
  title: string;
  published: string;
  link: string;
  thumbnail: string;
  description: string;
  tags: string[];
  agentRelevance: string[];
}

export const channels: Channel[] = [
  {
    id: 'nate-b-jones',
    name: 'Nate B Jones',
    channelId: 'UC0C-17n9iuUQPylguM1d-lQ',
    url: 'https://www.youtube.com/@NateBJones',
    category: 'ai',
    agentRouting: ['Thomas', 'Justin'],
    priority: 'high',
    description: 'AI tools, automation, and tech strategy',
  },
  {
    id: 'ai-revolution',
    name: 'AI Revolution X',
    channelId: 'UCLs3jw5DEjJ-YMDT7H3B3OQ',
    url: 'https://www.youtube.com/@airevolutionx',
    category: 'ai',
    agentRouting: ['Thomas'],
    priority: 'medium',
    description: 'AI trends and breakthroughs',
  },
  {
    id: 'the-mit-monk',
    name: 'theMITmonk',
    channelId: 'UC4ZVkG3RQPzvZk7alIVjcCg',
    url: 'https://www.youtube.com/@theMITmonk',
    category: 'ai',
    agentRouting: ['Thomas', 'Justin'],
    priority: 'medium',
    description: 'AI engineering and product development',
  },
  {
    id: 'greg-isenberg',
    name: 'Greg Isenberg',
    channelId: 'UCPjNBjflYl0-HQtUvOx0Ibw',
    url: 'https://www.youtube.com/@GregIsenberg',
    category: 'startup',
    agentRouting: ['Steve', 'Justin'],
    priority: 'high',
    description: 'Community-led growth, startup strategy',
  },
  {
    id: 'my-first-million',
    name: 'My First Million',
    channelId: 'UCxoRKax_0vHaulMbceZtAwA',
    url: 'https://www.youtube.com/@MyFirstMillionPod',
    category: 'startup',
    agentRouting: ['Justin'],
    priority: 'high',
    description: 'Business ideas and entrepreneurship',
  },
  {
    id: 'ras-mic',
    name: 'Ras Mic',
    channelId: 'UCBX__dPYqDFqAN4QcWbnUbw',
    url: 'https://www.youtube.com/@rasmic',
    category: 'design',
    agentRouting: ['Steve', 'Justin'],
    priority: 'high',
    description: 'UI/UX design, Shadcn, modern web design — art/UI director reference',
  },
  {
    id: 'starter-story',
    name: 'Starter Story',
    channelId: 'UChhw6DlKKTQ9mYSpTfXUYqA',
    url: 'https://www.youtube.com/@StarterStory',
    category: 'startup',
    agentRouting: ['Justin'],
    priority: 'medium',
    description: 'Bootstrapped business case studies',
  },
  {
    id: 'the-koerner-office',
    name: 'The Koerner Office',
    channelId: 'UCzjpCGEXR7BU-_SJSl59CGQ',
    url: 'https://www.youtube.com/@TheKoernerOffice',
    category: 'marketing',
    agentRouting: ['Steve', 'Justin'],
    priority: 'medium',
    description: 'Marketing and brand strategy',
  },
  {
    id: 'stephen-pope',
    name: 'Stephen G Pope',
    channelId: 'UCIg2taLnC9X6LRP1k3kukOA',
    url: 'https://www.youtube.com/@stephengpope',
    category: 'operations',
    agentRouting: ['Thomas'],
    priority: 'medium',
    description: 'No-code automation and operations',
  },
  {
    id: 'diary-of-a-ceo',
    name: 'Diary of a CEO',
    channelId: 'UCnjgxChqYYnyoqO4k_Q1d6Q',
    url: 'https://www.youtube.com/@TheDiaryOfACEO',
    category: 'startup',
    agentRouting: ['Justin'],
    priority: 'medium',
    description: 'Leadership, mindset, business interviews',
  },
  {
    id: 'cody-schneider',
    name: 'Cody Schneider',
    channelId: 'UCjNrOMGm7_ODMMBS-71xBcA',
    url: 'https://www.youtube.com/@codyschneiderx',
    category: 'marketing',
    agentRouting: ['Steve'],
    priority: 'high',
    description: 'GTM strategy, growth hacking, AI marketing — Steve\'s north star',
  },
];

export const agentColors: Record<string, string> = {
  Justin: '#ff7a59',
  Thomas: '#00bda5',
  Steve: '#00a4bd',
  Scout: '#f5c26b',
  Sheila: '#7c4dff',
  Atlas: '#33475b',
};

export const categoryColors: Record<string, string> = {
  marketing: '#ff7a59',
  ai: '#00bda5',
  startup: '#f5c26b',
  sales: '#00a4bd',
  design: '#7c4dff',
  operations: '#516f90',
};

export const categoryLabels: Record<string, string> = {
  marketing: 'Marketing',
  ai: 'AI & Tech',
  startup: 'Startup',
  sales: 'Sales',
  design: 'Design',
  operations: 'Operations',
};
