'use client';
import React, { useState } from 'react';
import { tasks, meetings, teamMembers } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';

const priorityDot: Record<string, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-400',
  medium: 'bg-yellow-400',
  low: 'bg-gray-300',
};

export function TodayOverview() {
  const todayTasks = tasks.filter((t) => t.section === 'today');
  const todayMeetings = meetings.filter((m) => m.day === 'today');
  const [doneTasks, setDoneTasks] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setDoneTasks((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Réunions du jour */}
      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Réunions du jour</h2>
        <Card>
          <div className="space-y-0">
            {todayMeetings.map((meeting, i) => {
              const isLast = i === todayMeetings.length - 1;
              const isDone = meeting.status === 'done';
              const isNext = meeting.status === 'upcoming' && todayMeetings.findIndex((m) => m.status === 'upcoming') === i;
              const participants = meeting.participants
                .slice(0, 3)
                .map((id) => teamMembers.find((m) => m.id === id))
                .filter(Boolean);

              return (
                <div key={meeting.id} className="relative flex items-start gap-3 py-2.5">
                  {/* Timeline line */}
                  {!isLast && (
                    <div className="absolute left-[15px] top-8 bottom-0 w-px bg-gray-100" />
                  )}
                  {/* Dot */}
                  <div
                    className={`w-[10px] h-[10px] rounded-full shrink-0 mt-1.5 ring-2 ring-white ${
                      isDone ? 'bg-gray-300' : isNext ? 'bg-indigo-500' : 'bg-gray-200'
                    }`}
                    style={!isDone && !isNext ? { backgroundColor: meeting.color } : {}}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <p
                        className={`text-sm font-medium leading-snug truncate ${
                          isDone ? 'text-gray-400 line-through' : isNext ? 'text-indigo-700' : 'text-gray-800'
                        }`}
                      >
                        {meeting.title}
                      </p>
                      <span className="text-xs text-gray-400 shrink-0 tabular-nums">
                        {meeting.start}
                      </span>
                    </div>
                    {isNext && (
                      <span className="inline-block mt-0.5 px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-semibold rounded-full">
                        Prochaine
                      </span>
                    )}
                    <div className="flex items-center gap-1 mt-1">
                      {participants.map((p) =>
                        p ? (
                          <Avatar key={p.id} initials={p.avatar} color={p.avatarColor} size="sm" />
                        ) : null
                      )}
                      {meeting.participants.length > 3 && (
                        <span className="text-[10px] text-gray-400">+{meeting.participants.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      {/* Tâches du jour */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">Tâches du jour</h2>
          <span className="text-xs text-gray-400">
            {doneTasks.size}/{todayTasks.length} faites
          </span>
        </div>
        <Card>
          <div className="space-y-2">
            {todayTasks.map((task) => {
              const isDone = doneTasks.has(task.id) || task.status === 'done';
              return (
                <button
                  key={task.id}
                  onClick={() => toggle(task.id)}
                  className="w-full flex items-start gap-2.5 text-left group"
                >
                  <div
                    className={`w-4 h-4 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                      isDone
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-gray-300 group-hover:border-indigo-400'
                    }`}
                  >
                    {isDone && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${priorityDot[task.priority]}`} />
                      <p
                        className={`text-sm leading-snug ${
                          isDone ? 'line-through text-gray-400' : 'text-gray-800'
                        }`}
                      >
                        {task.title}
                      </p>
                    </div>
                    {task.aiSuggested && !isDone && (
                      <span className="ml-3.5 text-[10px] text-indigo-500 font-medium">✨ Suggérée par l'IA</span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400 shrink-0 mt-0.5">{task.deadline}</span>
                </button>
              );
            })}
          </div>
        </Card>
      </section>
    </div>
  );
}
