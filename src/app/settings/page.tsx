'use client';

import {
  Cog6ToothIcon,
  BellIcon,
  PaintBrushIcon,
  KeyIcon,
  CloudArrowUpIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[--secondary]">Settings</h1>
        <p className="text-[--text-muted] mt-1">Configure your Mission Control</p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="card">
          <div className="p-5 border-b border-[--border]">
            <h2 className="font-semibold text-[--secondary] flex items-center gap-2">
              <Cog6ToothIcon className="w-5 h-5" />
              General
            </h2>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[--secondary]">Agent Name</p>
                <p className="text-sm text-[--text-muted]">Display name for your primary AI</p>
              </div>
              <input
                type="text"
                defaultValue="Thomas"
                className="px-4 py-2 border border-[--border] rounded-lg focus:outline-none focus:border-[--primary]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[--secondary]">Time Zone</p>
                <p className="text-sm text-[--text-muted]">For scheduling and calendar</p>
              </div>
              <select className="px-4 py-2 border border-[--border] rounded-lg focus:outline-none focus:border-[--primary]">
                <option>America/Los_Angeles (PST)</option>
                <option>America/New_York (EST)</option>
                <option>UTC</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card">
          <div className="p-5 border-b border-[--border]">
            <h2 className="font-semibold text-[--secondary] flex items-center gap-2">
              <BellIcon className="w-5 h-5" />
              Notifications
            </h2>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[--secondary]">Task Completions</p>
                <p className="text-sm text-[--text-muted]">Notify when tasks are completed</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[--primary]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[--secondary]">Daily Digest</p>
                <p className="text-sm text-[--text-muted]">Summary of daily activity</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[--primary]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="card">
          <div className="p-5 border-b border-[--border]">
            <h2 className="font-semibold text-[--secondary] flex items-center gap-2">
              <PaintBrushIcon className="w-5 h-5" />
              Appearance
            </h2>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[--secondary]">Theme</p>
                <p className="text-sm text-[--text-muted]">Choose your preferred theme</p>
              </div>
              <select className="px-4 py-2 border border-[--border] rounded-lg focus:outline-none focus:border-[--primary]">
                <option>Light (HubSpot)</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[--secondary]">Accent Color</p>
                <p className="text-sm text-[--text-muted]">Primary accent color</p>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-[--primary] ring-2 ring-offset-2 ring-[--primary]" />
                <button className="w-8 h-8 rounded-full bg-blue-500" />
                <button className="w-8 h-8 rounded-full bg-purple-500" />
                <button className="w-8 h-8 rounded-full bg-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="card">
          <div className="p-5 border-b border-[--border]">
            <h2 className="font-semibold text-[--secondary] flex items-center gap-2">
              <KeyIcon className="w-5 h-5" />
              Integrations
            </h2>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between p-4 bg-[--background] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[--accent-light] rounded-lg flex items-center justify-center">
                  <CloudArrowUpIcon className="w-5 h-5 text-[--accent]" />
                </div>
                <div>
                  <p className="font-medium text-[--secondary]">Clawdbot</p>
                  <p className="text-sm text-[--text-muted]">Primary AI connection</p>
                </div>
              </div>
              <span className="badge badge-success">Connected</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-[--background] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <ArrowPathIcon className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-[--secondary]">Calendar Sync</p>
                  <p className="text-sm text-[--text-muted]">Google Calendar integration</p>
                </div>
              </div>
              <button className="btn-secondary text-sm">Connect</button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
