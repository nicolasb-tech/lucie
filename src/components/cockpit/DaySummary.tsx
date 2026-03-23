import React from 'react';
import { tasks, meetings, emails, urgentItems, teamMembers } from '@/data/mockData';

function KpiTile({
  icon,
  value,
  label,
  accent,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  accent?: 'red' | 'orange' | 'indigo' | 'emerald';
}) {
  const colors: Record<string, string> = {
    red: 'bg-red-50 border-red-100 text-red-600',
    orange: 'bg-orange-50 border-orange-100 text-orange-600',
    indigo: 'bg-indigo-50 border-indigo-100 text-indigo-600',
    emerald: 'bg-emerald-50 border-emerald-100 text-emerald-600',
  };
  const cls = accent ? colors[accent] : 'bg-white border-gray-100 text-gray-600';
  return (
    <div className={`flex items-center gap-3 rounded-2xl border p-4 ${cls}`}>
      <div className="text-2xl shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-2xl font-bold leading-none">{value}</p>
        <p className="text-xs mt-1 leading-snug opacity-80">{label}</p>
      </div>
    </div>
  );
}

export function DaySummary() {
  const todayTasks = tasks.filter((t) => t.section === 'today' && t.status !== 'done');
  const todayMeetings = meetings.filter((m) => m.day === 'today');
  const nextMeeting = todayMeetings.find((m) => m.status === 'upcoming');
  const unreadCritical = emails.filter((e) => !e.isRead && (e.priority === 'critical' || e.priority === 'high')).length;
  const overloaded = teamMembers.filter((m) => m.availability === 'overloaded' || m.availability === 'busy').length;
  const criticalCount = urgentItems.filter((i) => i.priority === 'critical').length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <KpiTile
        icon="🔥"
        value={criticalCount}
        label={`alerte${criticalCount > 1 ? 's' : ''} critique${criticalCount > 1 ? 's' : ''}`}
        accent={criticalCount > 0 ? 'red' : 'emerald'}
      />
      <KpiTile
        icon="📋"
        value={todayTasks.length}
        label={`tâche${todayTasks.length > 1 ? 's' : ''} aujourd'hui`}
        accent={todayTasks.length >= 4 ? 'orange' : 'indigo'}
      />
      <KpiTile
        icon="📅"
        value={nextMeeting ? nextMeeting.start : '—'}
        label={nextMeeting ? nextMeeting.title : 'Aucune réunion à venir'}
        accent="indigo"
      />
      <KpiTile
        icon="📨"
        value={unreadCritical}
        label={`email${unreadCritical > 1 ? 's' : ''} prioritaire${unreadCritical > 1 ? 's' : ''} non lu${unreadCritical > 1 ? 's' : ''}`}
        accent={unreadCritical > 0 ? 'orange' : 'emerald'}
      />
    </div>
  );
}
