import React from 'react';
import { tasks, meetings, emails, urgentItems, teamMembers } from '@/data/mockData';

function KpiTile({
  value,
  label,
  sub,
  accent,
}: {
  value: string | number;
  label: string;
  sub?: string;
  accent?: 'red' | 'orange' | 'indigo' | 'emerald';
}) {
  const bg: Record<string, string> = {
    red:     'bg-red-50',
    orange:  'bg-orange-50',
    indigo:  'bg-indigo-50',
    emerald: 'bg-emerald-50',
  };
  const val: Record<string, string> = {
    red:     'text-red-600',
    orange:  'text-orange-600',
    indigo:  'text-indigo-600',
    emerald: 'text-emerald-600',
  };
  const bg_ = accent ? bg[accent] : 'bg-white';
  const val_ = accent ? val[accent] : 'text-gray-900';

  return (
    <div className={`${bg_} rounded-2xl p-4 shadow-[var(--shadow-card)]`}>
      <p className={`text-3xl font-bold tracking-tight ${val_}`}>{value}</p>
      <p className="text-xs font-medium text-gray-700 mt-1 leading-snug">{label}</p>
      {sub && <p className="text-[11px] text-gray-400 mt-0.5 leading-snug truncate">{sub}</p>}
    </div>
  );
}

export function DaySummary() {
  const todayTasks    = tasks.filter((t) => t.section === 'today' && t.status !== 'done');
  const todayMeetings = meetings.filter((m) => m.day === 'today');
  const nextMeeting   = todayMeetings.find((m) => m.status === 'upcoming');
  const urgentUnread  = emails.filter((e) => !e.isRead && (e.priority === 'critical' || e.priority === 'high')).length;
  const criticalCount = urgentItems.filter((i) => i.priority === 'critical').length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <KpiTile
        value={criticalCount}
        label={criticalCount > 1 ? 'alertes critiques' : 'alerte critique'}
        accent={criticalCount > 0 ? 'red' : 'emerald'}
      />
      <KpiTile
        value={todayTasks.length}
        label={todayTasks.length > 1 ? 'tâches aujourd\'hui' : 'tâche aujourd\'hui'}
        accent="indigo"
      />
      <KpiTile
        value={nextMeeting ? nextMeeting.start : '—'}
        label="prochaine réunion"
        sub={nextMeeting?.title}
        accent="indigo"
      />
      <KpiTile
        value={urgentUnread}
        label={urgentUnread > 1 ? 'emails à traiter' : 'email à traiter'}
        accent={urgentUnread > 0 ? 'orange' : 'emerald'}
      />
    </div>
  );
}
