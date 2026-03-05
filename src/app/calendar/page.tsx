'use client';

import { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  ArrowPathIcon,
  BoltIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const cronJobs = [
  {
    id: 1,
    name: 'Morning Digest',
    schedule: 'Every day at 8:00 AM',
    nextRun: 'Tomorrow, 8:00 AM',
    status: 'active',
    description: 'Check emails, calendar, and prepare daily briefing',
    lastRun: 'Today, 8:00 AM',
  },
  {
    id: 2,
    name: 'Email Inbox Check',
    schedule: 'Every 2 hours',
    nextRun: 'In 45 minutes',
    status: 'active',
    description: 'Scan for urgent emails and notify if action needed',
    lastRun: '1 hour ago',
  },
  {
    id: 3,
    name: 'Weekly Report',
    schedule: 'Every Friday at 5:00 PM',
    nextRun: 'Friday, 5:00 PM',
    status: 'active',
    description: 'Generate weekly progress report across all projects',
    lastRun: 'Last Friday',
  },
  {
    id: 4,
    name: 'Memory Maintenance',
    schedule: 'Every Sunday at 2:00 AM',
    nextRun: 'Sunday, 2:00 AM',
    status: 'active',
    description: 'Review daily memories and update MEMORY.md',
    lastRun: 'Last Sunday',
  },
  {
    id: 5,
    name: 'Social Media Check',
    schedule: 'Every 4 hours',
    nextRun: 'In 2 hours',
    status: 'paused',
    description: 'Check Twitter mentions and relevant discussions',
    lastRun: '2 days ago',
  },
];

const scheduledTasks = [
  { id: 1, title: 'Follow up with Barry on sales pipeline', date: 'Today', time: '3:00 PM', type: 'reminder' },
  { id: 2, title: 'Review Season 2 storyline draft', date: 'Tomorrow', time: '10:00 AM', type: 'task' },
  { id: 3, title: 'PFL Academy demo prep', date: 'Mar 7', time: '2:00 PM', type: 'meeting' },
  { id: 4, title: 'Submit Chapter 3 audio files', date: 'Mar 8', time: '5:00 PM', type: 'deadline' },
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const currentMonth = 'March 2026';

// Generate calendar days (simplified)
const calendarDays = Array.from({ length: 35 }, (_, i) => {
  const day = i - 5; // Start from previous month
  return {
    date: day < 1 ? 28 + day : day > 31 ? day - 31 : day,
    isCurrentMonth: day >= 1 && day <= 31,
    isToday: day === 5,
    hasEvents: [5, 7, 8, 12, 15, 20].includes(day),
  };
});

export default function CalendarPage() {
  const [view, setView] = useState<'calendar' | 'cron'>('cron');

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[--secondary]">Calendar</h1>
          <p className="text-[--text-muted] mt-1">Scheduled tasks and cron jobs</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView('cron')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'cron' ? 'bg-[--primary] text-white' : 'bg-white text-[--text-secondary] border border-[--border]'
            }`}
          >
            <ArrowPathIcon className="w-4 h-4 inline mr-2" />
            Cron Jobs
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'calendar' ? 'bg-[--primary] text-white' : 'bg-white text-[--text-secondary] border border-[--border]'
            }`}
          >
            <CalendarIcon className="w-4 h-4 inline mr-2" />
            Calendar
          </button>
        </div>
      </div>

      {view === 'cron' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cron Jobs List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-[--secondary] mb-4">Active Cron Jobs</h2>
            {cronJobs.map((job) => (
              <div key={job.id} className="card p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      job.status === 'active' ? 'bg-[--accent-light]' : 'bg-gray-100'
                    }`}>
                      <ArrowPathIcon className={`w-5 h-5 ${
                        job.status === 'active' ? 'text-[--accent]' : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[--secondary]">{job.name}</h3>
                        <span className={`badge ${job.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                          {job.status}
                        </span>
                      </div>
                      <p className="text-sm text-[--text-muted] mt-1">{job.description}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-[--text-secondary] flex items-center gap-1">
                          <ClockIcon className="w-3 h-3" />
                          {job.schedule}
                        </span>
                        <span className="text-xs text-[--text-muted]">
                          Last run: {job.lastRun}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[--primary]">Next run</p>
                    <p className="text-sm text-[--text-secondary]">{job.nextRun}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scheduled Tasks */}
          <div className="card">
            <div className="p-5 border-b border-[--border]">
              <h2 className="font-semibold text-[--secondary]">Upcoming Scheduled</h2>
            </div>
            <div className="divide-y divide-[--border]">
              {scheduledTasks.map((task) => (
                <div key={task.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      task.type === 'reminder' ? 'bg-blue-50' :
                      task.type === 'meeting' ? 'bg-purple-50' :
                      task.type === 'deadline' ? 'bg-red-50' : 'bg-[--accent-light]'
                    }`}>
                      <BoltIcon className={`w-4 h-4 ${
                        task.type === 'reminder' ? 'text-blue-500' :
                        task.type === 'meeting' ? 'text-purple-500' :
                        task.type === 'deadline' ? 'text-red-500' : 'text-[--accent]'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[--secondary]">{task.title}</p>
                      <p className="text-xs text-[--text-muted] mt-1">
                        {task.date} at {task.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[--secondary]">{currentMonth}</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronLeftIcon className="w-5 h-5 text-[--text-secondary]" />
              </button>
              <button className="px-4 py-2 text-sm font-medium text-[--primary]">Today</button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronRightIcon className="w-5 h-5 text-[--text-secondary]" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px bg-[--border] rounded-lg overflow-hidden">
            {/* Day headers */}
            {days.map((day) => (
              <div key={day} className="bg-[--background] p-3 text-center">
                <span className="text-sm font-medium text-[--text-muted]">{day}</span>
              </div>
            ))}
            {/* Calendar days */}
            {calendarDays.map((day, i) => (
              <div
                key={i}
                className={`bg-white p-3 min-h-[100px] ${
                  !day.isCurrentMonth ? 'opacity-40' : ''
                } ${day.isToday ? 'ring-2 ring-[--primary] ring-inset' : ''}`}
              >
                <span className={`text-sm font-medium ${
                  day.isToday ? 'text-[--primary]' : 'text-[--secondary]'
                }`}>
                  {day.date}
                </span>
                {day.hasEvents && day.isCurrentMonth && (
                  <div className="mt-2">
                    <div className="h-1.5 w-1.5 bg-[--primary] rounded-full" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
