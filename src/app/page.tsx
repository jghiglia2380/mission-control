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
  { name: 'Active Tasks', value: '12', icon: ClipboardDocumentListIcon, change: '+3 this week', changeType: 'positive' },
  { name: 'Scheduled Jobs', value: '8', icon: CalendarDaysIcon, change: '2 today', changeType: 'neutral' },
  { name: 'Projects', value: '5', icon: FolderIcon, change: '1 near completion', changeType: 'positive' },
  { name: 'Documents', value: '47', icon: DocumentTextIcon, change: '+12 this month', changeType: 'positive' },
];

const recentActivity = [
  { id: 1, action: 'Completed task', description: 'Generated Q1 revenue report', time: '2 min ago', status: 'success' },
  { id: 2, action: 'New document', description: 'PFL Academy launch checklist', time: '15 min ago', status: 'info' },
  { id: 3, action: 'Scheduled job', description: 'Daily email digest at 9:00 AM', time: '1 hour ago', status: 'info' },
  { id: 4, action: 'Project update', description: 'Launchpad redesign - 75% complete', time: '2 hours ago', status: 'warning' },
  { id: 5, action: 'Memory saved', description: 'Captured meeting notes with Barry', time: '3 hours ago', status: 'success' },
];

const upcomingTasks = [
  { id: 1, title: 'Review landing page copy', project: 'PFL Academy', dueIn: '2 hours', priority: 'high' },
  { id: 2, title: 'Send weekly digest email', project: 'Operations', dueIn: '4 hours', priority: 'medium' },
  { id: 3, title: 'Update curriculum database', project: 'K-4 Curriculum', dueIn: 'Tomorrow', priority: 'low' },
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
          "Build an autonomous organization of AI agents that produce value 24/7, enabling freedom, travel, and the Italian lifestyle."
        </p>
      </div>
    </div>
  );
}
