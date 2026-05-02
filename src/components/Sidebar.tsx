'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  FolderIcon,
  BookOpenIcon,
  DocumentTextIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  SignalIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Tasks', href: '/tasks', icon: ClipboardDocumentListIcon },
  { name: 'Calendar', href: '/calendar', icon: CalendarDaysIcon },
  { name: 'Projects', href: '/projects', icon: FolderIcon },
  { name: 'Channels', href: '/channels', icon: SignalIcon },
  { name: 'Memory', href: '/memory', icon: BookOpenIcon },
  { name: 'Docs', href: '/docs', icon: DocumentTextIcon },
  { name: 'Team', href: '/team', icon: UserGroupIcon },
];

const bottomNavigation = [
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[--border]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[--primary] rounded-lg flex items-center justify-center">
            <CommandLineIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-[--secondary] text-lg">Mission Control</span>
        </div>
        {/* Close button - mobile only */}
        <button
          onClick={() => setMobileOpen(false)}
          className="ml-auto md:hidden p-1 rounded-lg hover:bg-gray-100"
        >
          <XMarkIcon className="w-5 h-5 text-[--text-secondary]" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[--primary-light] text-[--primary-dark]'
                      : 'text-[--text-secondary] hover:bg-gray-100 hover:text-[--secondary]'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-[--primary]' : ''}`} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="py-4 px-4 border-t border-[--border]">
        <ul className="space-y-1">
          {bottomNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[--primary-light] text-[--primary-dark]'
                      : 'text-[--text-secondary] hover:bg-gray-100 hover:text-[--secondary]'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-[--primary]' : ''}`} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Agent Status */}
        <div className="mt-4 p-3 bg-[--accent-light] rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[--accent] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[--secondary]">Thomas Online</span>
          </div>
          <p className="text-xs text-[--text-muted] mt-1">Ready to assist</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 p-2 bg-white rounded-lg shadow-md border border-[--border]"
      >
        <Bars3Icon className="w-6 h-6 text-[--secondary]" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[--border] flex flex-col transform transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-[--border] flex-col">
        {sidebarContent}
      </aside>
    </>
  );
}
