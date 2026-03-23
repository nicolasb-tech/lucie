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
  cockpit: { title: 'Cockpit', subtitle: 'Votre cerveau de remplacement' },
  tasks: { title: 'Tâches', subtitle: 'Gérez votre charge de travail' },
  agenda: { title: 'Agenda', subtitle: 'Réunions et calendrier' },
  emails: { title: 'Boîte de réception', subtitle: 'Emails importants seulement' },
  team: { title: 'Équipe', subtitle: 'Staffing et charge de travail' },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('cockpit');

  const unreadEmails = emails.filter((e) => !e.isRead).length;
  const urgentCount = urgentItems.filter((i) => i.priority === 'critical').length;
  const { title, subtitle } = tabTitles[activeTab];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unreadEmails={unreadEmails}
        urgentCount={urgentCount}
      />

      <main className="max-w-[1440px] mx-auto px-4 md:px-6 pt-6 pb-24 md:pb-8">
        {/* En-tête de page */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>
          </div>
          {activeTab === 'cockpit' && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-emerald-700">IA active · Mis à jour à l&apos;instant</span>
            </div>
          )}
        </div>

        {activeTab === 'cockpit' && <CockpitTab />}
        {activeTab === 'tasks' && <TasksTab />}
        {activeTab === 'agenda' && <AgendaTab />}
        {activeTab === 'emails' && <EmailsTab />}
        {activeTab === 'team' && <TeamTab />}
      </main>
    </div>
  );
}
