import {
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  FolderIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

const stats = [
  { name: 'Active Tasks', value: '9', icon: ClipboardDocumentListIcon, change: '5 Justin / 4 Thomas', changeType: 'neutral' },
  { name: 'AI Agents', value: '7', icon: CalendarDaysIcon, change: 'Thomas, Steve, Scout, Sheila, Atlas, Wall-E, Reed', changeType: 'positive' },
  { name: 'States Sales-Ready', value: '34/36', icon: FolderIcon, change: 'NY + OH need fixes', changeType: 'positive' },
  { name: 'Confirmed ARR', value: '$4K', icon: DocumentTextIcon, change: 'Dale + Clinton PS', changeType: 'neutral' },
];

const recentActivity = [
  { id: 1, action: 'Market scan', description: 'TX/CA/CO HOT for K-4 supplemental literacy (Explore daytime version)', time: '30 min ago', status: 'success' },
  { id: 2, action: 'CA deadline found', description: 'ELA/ELD adoption forms due Mar 11 — call CDE about late entry', time: '1 hour ago', status: 'warning' },
  { id: 3, action: 'FL research', description: 'Social Studies adoption opens June 1. PFL qualifies. 3 regional consortia mapped.', time: '1 hour ago', status: 'info' },
  { id: 4, action: 'Strategy pivot', description: 'Cold email dead. Distribution partner model replaces it. CO 35% bounce rate.', time: 'Yesterday', status: 'warning' },
  { id: 5, action: 'Wall-E operational', description: '25+ extractions stored, priority gate working, 9 pending corrections', time: 'Yesterday', status: 'success' },
];

const upcomingTasks = [
  { id: 1, title: '📞 Call CDE — late ELA/ELD submission', project: 'Project Explore', dueIn: 'Tomorrow AM', priority: 'high' },
  { id: 2, title: '📞 Call FL FDOE — Social Studies adoption', project: 'PFL Academy', dueIn: 'Tomorrow AM', priority: 'high' },
  { id: 3, title: 'Build daytime Explore demo', project: 'Project Explore', dueIn: 'This week', priority: 'high' },
  { id: 4, title: '📞 Call MCH Strategic Data', project: 'Distribution', dueIn: 'This week', priority: 'medium' },
];

export default function Dashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[--secondary]">Dashboard</h1>
        <p className="text-[--text-muted] mt-1">Welcome back, Justin. Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[--text-muted]">{stat.name}</p>
                <p className="text-3xl font-semibold text-[--secondary] mt-1">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-[--primary-light] rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-[--primary]" />
              </div>
            </div>
            <p className={`text-sm mt-3 ${stat.changeType === 'positive' ? 'text-[--success]' : 'text-[--text-muted]'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 card">
          <div className="p-6 border-b border-[--border]">
            <h2 className="text-lg font-semibold text-[--secondary]">Recent Activity</h2>
          </div>
          <div className="divide-y divide-[--border]">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-4 flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.status === 'success' ? 'bg-[--accent-light]' :
                  activity.status === 'warning' ? 'bg-amber-50' : 'bg-blue-50'
                }`}>
                  {activity.status === 'success' ? (
                    <CheckCircleIcon className="w-5 h-5 text-[--success]" />
                  ) : activity.status === 'warning' ? (
                    <ExclamationCircleIcon className="w-5 h-5 text-amber-500" />
                  ) : (
                    <ArrowTrendingUpIcon className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[--secondary]">{activity.action}</p>
                  <p className="text-sm text-[--text-muted]">{activity.description}</p>
                </div>
                <span className="text-xs text-[--text-muted] flex items-center gap-1">
                  <ClockIcon className="w-3 h-3" />
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="card">
          <div className="p-6 border-b border-[--border]">
            <h2 className="text-lg font-semibold text-[--secondary]">Upcoming Tasks</h2>
          </div>
          <div className="p-4 space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="p-4 bg-[--background] rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-medium text-[--secondary]">{task.title}</h3>
                  <span className={`badge ${
                    task.priority === 'high' ? 'badge-error' :
                    task.priority === 'medium' ? 'badge-warning' : 'badge-info'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-xs text-[--text-muted]">{task.project}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-[--text-secondary]">
                  <ClockIcon className="w-3 h-3" />
                  Due in {task.dueIn}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-[--border]">
            <button className="w-full btn-secondary text-sm">View All Tasks</button>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="mt-8 card p-6 bg-gradient-to-r from-[--primary-light] to-white">
        <h2 className="text-lg font-semibold text-[--secondary] mb-2">Mission Statement</h2>
        <p className="text-[--text-secondary] italic">
          "Build an autonomous organization of AI agents that produce value 24/7, enabling freedom, travel, and the Italian lifestyle. Target: $500K ARR."
        </p>
      </div>
    </div>
  );
}
