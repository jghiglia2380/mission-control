'use client';

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
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Tasks', href: '/tasks', icon: ClipboardDocumentListIcon },
  { name: 'Calendar', href: '/calendar', icon: CalendarDaysIcon },
  { name: 'Projects', href: '/projects', icon: FolderIcon },
  { name: 'Memory', href: '/memory', icon: BookOpenIcon },
  { name: 'Docs', href: '/docs', icon: DocumentTextIcon },
  { name: 'Team', href: '/team', icon: UserGroupIcon },
];

const bottomNavigation = [
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-[--border] flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[--border]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[--primary] rounded-lg flex items-center justify-center">
            <CommandLineIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-[--secondary] text-lg">Mission Control</span>
        </div>
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
    </aside>
  );
}
