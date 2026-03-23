'use client';
import React, { useState } from 'react';
import { meetings, teamMembers, getProject } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

type DayFilter = 'today' | 'tomorrow';

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8am–8pm

function timeToMinutes(t: string) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function MeetingCard({
  meeting,
  onClick,
}: {
  meeting: (typeof meetings)[0];
  onClick: () => void;
}) {
  const project = getProject(meeting.project);
  const participants = meeting.participants.map((id) => teamMembers.find((m) => m.id === id)).filter(Boolean);
  const isDone = meeting.status === 'done';

  return (
    <div
      className={`rounded-xl border-l-4 p-3 cursor-pointer transition-all hover:shadow-md ${
        isDone ? 'bg-gray-50 border-l-gray-300 opacity-70' : 'bg-white border-gray-100 shadow-sm hover:border-gray-200'
      }`}
      style={{ borderLeftColor: meeting.color }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold leading-snug ${isDone ? 'text-gray-500' : 'text-gray-900'}`}>
            {meeting.title}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {meeting.start} – {meeting.end}
          </p>
        </div>
        {!isDone && meeting.prepPoints && meeting.prepPoints.length > 0 && (
          <span className="shrink-0 text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md">
            Prep needed
          </span>
        )}
        {isDone && <Badge variant="success">Done</Badge>}
      </div>
      {project && (
        <span className="flex items-center gap-1 text-[11px] text-gray-500 mt-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
          {project.name}
        </span>
      )}
      <div className="flex items-center gap-1 mt-2">
        {participants.slice(0, 4).map((p) =>
          p ? (
            <Avatar key={p.id} initials={p.avatar} color={p.avatarColor} size="sm" status={p.status as 'online' | 'away' | 'offline'} />
          ) : null
        )}
        {participants.length > 4 && (
          <span className="text-xs text-gray-400">+{participants.length - 4}</span>
        )}
      </div>
      {isDone && meeting.summary && (
        <p className="text-xs text-gray-500 mt-2 bg-gray-100 rounded-lg p-2 leading-relaxed">
          📋 {meeting.summary}
        </p>
      )}
    </div>
  );
}

export function AgendaTab() {
  const [day, setDay] = useState<DayFilter>('today');
  const [selected, setSelected] = useState<(typeof meetings)[0] | null>(null);

  const dayMeetings = meetings.filter((m) => m.day === day).sort(
    (a, b) => timeToMinutes(a.start) - timeToMinutes(b.start)
  );

  const now = 10 * 60 + 45; // 10:45am (simulated)

  return (
    <div className="flex gap-6">
      {/* Calendar column */}
      <div className="flex-1 min-w-0">
        {/* Day toggle */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
            {(['today', 'tomorrow'] as DayFilter[]).map((d) => (
              <button
                key={d}
                onClick={() => setDay(d)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  day === d ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {d === 'today' ? 'Today — Mon Mar 23' : 'Tomorrow — Tue Mar 24'}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <span className="text-xs text-gray-400">{dayMeetings.length} meetings</span>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Time axis */}
          <div className="space-y-0">
            {HOURS.map((hour) => {
              const hourMeetings = dayMeetings.filter((m) => {
                const start = timeToMinutes(m.start);
                return Math.floor(start / 60) === hour;
              });
              const isCurrentHour = day === 'today' && Math.floor(now / 60) === hour;

              return (
                <div key={hour} className="flex gap-4 min-h-[64px]">
                  <div className="w-14 shrink-0 text-right">
                    <span className="text-xs text-gray-300 font-medium">
                      {String(hour).padStart(2, '0')}:00
                    </span>
                  </div>
                  <div className="flex-1 border-t border-gray-100 pt-1 pb-1 relative">
                    {isCurrentHour && (
                      <div className="absolute -top-px left-0 right-0 flex items-center gap-2 z-10">
                        <div className="w-2 h-2 rounded-full bg-red-500 shrink-0 -mt-1" />
                        <div className="flex-1 h-px bg-red-400" />
                      </div>
                    )}
                    <div className="space-y-2">
                      {hourMeetings.map((m) => (
                        <MeetingCard key={m.id} meeting={m} onClick={() => setSelected(m)} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right info column */}
      <div className="w-64 shrink-0 space-y-4">
        {/* Next meeting */}
        {(() => {
          const next = day === 'today'
            ? dayMeetings.find((m) => m.status === 'upcoming')
            : dayMeetings[0];
          if (!next) return null;
          return (
            <Card className="bg-indigo-50 border-indigo-100">
              <p className="text-xs font-semibold text-indigo-700 mb-1">Next up</p>
              <p className="text-sm font-semibold text-indigo-900">{next.title}</p>
              <p className="text-xs text-indigo-600 mt-0.5">{next.start} — {next.end}</p>
              {next.prepPoints && next.prepPoints.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-indigo-700 mb-1">Prep checklist</p>
                  <ul className="space-y-1">
                    {next.prepPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-indigo-700">
                        <span className="mt-0.5 shrink-0">•</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          );
        })()}

        {/* Conflict alert */}
        {dayMeetings.some((m) => m.conflict) && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-3">
            <p className="text-xs font-semibold text-red-700">⚠️ Conflicts detected</p>
            <p className="text-xs text-red-600 mt-1">You have overlapping meetings.</p>
          </div>
        )}

        {/* Day summary */}
        <Card padding="sm">
          <p className="text-xs font-semibold text-gray-600 mb-2">Day overview</p>
          <div className="space-y-1.5 text-xs text-gray-500">
            <div className="flex justify-between">
              <span>Meetings</span>
              <span className="font-medium text-gray-700">{dayMeetings.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total time</span>
              <span className="font-medium text-gray-700">
                {Math.round(dayMeetings.reduce((acc, m) => acc + (timeToMinutes(m.end) - timeToMinutes(m.start)), 0) / 60)}h{' '}
                {dayMeetings.reduce((acc, m) => acc + (timeToMinutes(m.end) - timeToMinutes(m.start)), 0) % 60}m
              </span>
            </div>
            <div className="flex justify-between">
              <span>Prep needed</span>
              <span className="font-medium text-amber-600">
                {dayMeetings.filter((m) => m.prepPoints && m.prepPoints.length > 0 && m.status !== 'done').length}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Meeting Detail Modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title ?? ''}
        width="md"
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span>🕐 {selected.start} – {selected.end}</span>
              {selected.status === 'done' && <Badge variant="success">Completed</Badge>}
            </div>

            {getProject(selected.project) && (
              <div className="flex items-center gap-2 text-sm">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: getProject(selected.project)?.color }}
                />
                <span className="text-gray-600">{getProject(selected.project)?.name}</span>
              </div>
            )}

            {/* Participants */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Participants</p>
              <div className="flex flex-wrap gap-2">
                {selected.participants.map((id) => {
                  const m = teamMembers.find((t) => t.id === id);
                  return m ? (
                    <div key={id} className="flex items-center gap-2 bg-gray-50 rounded-lg px-2.5 py-1.5">
                      <Avatar initials={m.avatar} color={m.avatarColor} size="sm" />
                      <span className="text-xs text-gray-700 font-medium">{m.name}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Meeting summary */}
            {selected.summary && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">AI Summary</p>
                <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-700 leading-relaxed">
                  {selected.summary}
                </div>
              </div>
            )}

            {/* Prep points */}
            {selected.prepPoints && selected.prepPoints.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  AI Preparation Points
                </p>
                <ul className="space-y-2">
                  {selected.prepPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center shrink-0 mt-0.5 font-semibold">
                        {i + 1}
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <Button variant="primary" size="sm">Join meeting</Button>
              <Button variant="secondary" size="sm">Add notes</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
