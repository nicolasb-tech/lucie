'use client';
import React, { useState } from 'react';
import { TopNav, TabId } from '@/components/layout/TopNav';
import { CockpitTab } from '@/components/cockpit/CockpitTab';
import { TasksTab } from '@/components/tasks/TasksTab';
import { AgendaTab } from '@/components/agenda/AgendaTab';
import { EmailsTab } from '@/components/emails/EmailsTab';
import { TeamTab } from '@/components/team/TeamTab';
import { emails, urgentItems } from '@/data/mockData';

const tabTitles: Record<TabId, { title: string; subtitle: string }> = {
  cockpit:  { title: 'Cockpit',             subtitle: 'Votre second cerveau' },
  tasks:    { title: 'Tâches',              subtitle: 'Votre charge de travail' },
  agenda:   { title: 'Agenda',              subtitle: 'Réunions et calendrier' },
  emails:   { title: 'Boîte de réception',  subtitle: 'Emails importants uniquement' },
  team:     { title: 'Équipe',              subtitle: 'Staffing et charge' },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('cockpit');

  const unreadEmails = emails.filter((e) => !e.isRead).length;
  const urgentCount  = urgentItems.filter((i) => i.priority === 'critical').length;
  const { title, subtitle } = tabTitles[activeTab];

  return (
    <div className="min-h-dvh bg-[#f2f2f7]">
      <TopNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unreadEmails={unreadEmails}
        urgentCount={urgentCount}
      />

      <main className="max-w-[1440px] mx-auto px-4 md:px-6 pt-5 pb-24 md:pb-10">
        {/* Page header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h1>
            <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>
          </div>
          {activeTab === 'cockpit' && (
            <div className="flex items-center gap-1.5 bg-emerald-50 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-700">IA active</span>
            </div>
          )}
        </div>

        <div className="animate-fadein">
          {activeTab === 'cockpit' && <CockpitTab />}
          {activeTab === 'tasks'   && <TasksTab />}
          {activeTab === 'agenda'  && <AgendaTab />}
          {activeTab === 'emails'  && <EmailsTab />}
          {activeTab === 'team'    && <TeamTab />}
        </div>
      </main>
    </div>
  );
}
