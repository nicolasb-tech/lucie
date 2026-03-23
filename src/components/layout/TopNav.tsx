'use client';
import React from 'react';

export type TabId = 'cockpit' | 'tasks' | 'agenda' | 'emails' | 'team';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const icons: Record<TabId, React.ReactNode> = {
  cockpit: (
    <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  tasks: (
    <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  agenda: (
    <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  emails: (
    <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  team: (
    <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
};

const labels: Record<TabId, string> = {
  cockpit: 'Cockpit',
  tasks: 'Tâches',
  agenda: 'Agenda',
  emails: 'Emails',
  team: 'Équipe',
};

interface TopNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  unreadEmails: number;
  urgentCount: number;
}

export function TopNav({ activeTab, onTabChange, unreadEmails, urgentCount }: TopNavProps) {
  const badges: Partial<Record<TabId, number>> = {
    cockpit: urgentCount,
    emails: unreadEmails,
  };

  const tabIds: TabId[] = ['cockpit', 'tasks', 'agenda', 'emails', 'team'];

  return (
    <>
      {/* Header — backdrop blur, Apple-style */}
      <header className="h-14 bg-white/80 backdrop-blur-xl border-b border-black/[0.06] flex items-center justify-between px-4 md:px-6 shrink-0 sticky top-0 z-40">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-indigo-600 rounded-[10px] flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-semibold text-gray-900 text-sm tracking-tight">Lucie</span>
          <span className="hidden sm:inline text-black/20 text-sm">·</span>
          <span className="hidden sm:inline text-xs text-gray-400">Lundi 23 mars 2026</span>
        </div>

        {/* Desktop tabs */}
        <nav className="hidden md:flex items-center gap-0.5">
          {tabIds.map((id) => {
            const badge = badges[id];
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-150 [&_svg]:w-4 [&_svg]:h-4 ${
                  activeTab === id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-black/[0.04]'
                }`}
              >
                {icons[id]}
                {labels[id]}
                {badge !== undefined && badge > 0 && (
                  <span className={`absolute -top-1 -right-1 min-w-[16px] h-4 px-1 text-[10px] font-bold rounded-full flex items-center justify-center ${activeTab === id ? 'bg-white text-indigo-600' : 'bg-red-500 text-white'}`}>
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Avatar */}
        <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0">
          DO
        </div>
      </header>

      {/* Mobile bottom nav — frosted glass */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-xl border-t border-black/[0.06]">
        <div className="flex items-stretch h-[58px]">
          {tabIds.map((id) => {
            const badge = badges[id];
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`relative flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors duration-150 ${
                  isActive ? 'text-indigo-600' : 'text-gray-400'
                }`}
              >
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-indigo-600 rounded-b-full" />
                )}
                <span className="relative">
                  {icons[id]}
                  {badge !== undefined && badge > 0 && (
                    <span className="absolute -top-1 -right-2 min-w-[14px] h-3.5 px-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {badge}
                    </span>
                  )}
                </span>
                <span className={`text-[10px] leading-none font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>
                  {labels[id]}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
