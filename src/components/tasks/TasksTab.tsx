'use client';
import React, { useState } from 'react';
import { tasks as initialTasks, teamMembers, getProject, projects } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';

type Priority = 'critical' | 'high' | 'medium' | 'low';
type TaskStatus = 'todo' | 'in-progress' | 'done' | 'delegated';

const priorityConfig: Record<Priority, { label: string; variant: 'critical' | 'high' | 'medium' | 'low' }> = {
  critical: { label: 'Critical', variant: 'critical' },
  high: { label: 'High', variant: 'high' },
  medium: { label: 'Medium', variant: 'medium' },
  low: { label: 'Low', variant: 'low' },
};

const statusConfig: Record<TaskStatus, { label: string; color: string }> = {
  todo: { label: 'To Do', color: 'bg-gray-100 text-gray-600' },
  'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
  done: { label: 'Done', color: 'bg-emerald-100 text-emerald-700' },
  delegated: { label: 'Delegated', color: 'bg-purple-100 text-purple-700' },
};

function TaskRow({
  task,
  onDone,
  onDefer,
  onDelegate,
}: {
  task: (typeof initialTasks)[0] & { status: TaskStatus };
  onDone: () => void;
  onDefer: () => void;
  onDelegate: () => void;
}) {
  const project = getProject(task.project);
  const pc = priorityConfig[task.priority as Priority];
  const sc = statusConfig[task.status];
  const delegatedMember = task.assignedTo !== 'me' ? teamMembers.find((m) => m.id === task.assignedTo) : null;

  const isDone = task.status === 'done';

  return (
    <div className={`group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-150 ${isDone ? 'opacity-50 bg-gray-50 border-gray-100' : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'}`}>
      {/* Checkbox */}
      <button
        onClick={onDone}
        className={`shrink-0 w-4.5 h-4.5 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-colors ${
          isDone ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 hover:border-emerald-500'
        }`}
      >
        {isDone && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* AI suggestion tag */}
      {task.aiSuggested && (
        <span className="shrink-0 text-[10px] font-semibold text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded-md">AI</span>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <span className={`text-sm font-medium ${isDone ? 'line-through text-gray-400' : 'text-gray-900'}`}>
          {task.title}
        </span>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 shrink-0">
        {project && (
          <span className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }} />
            <span className="max-w-[80px] truncate">{project.name}</span>
          </span>
        )}
        <Badge variant={pc.variant}>{pc.label}</Badge>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sc.color}`}>{sc.label}</span>
        <span className="text-xs text-gray-400 hidden md:block">{task.deadline}</span>
        {delegatedMember && (
          <Avatar initials={delegatedMember.avatar} color={delegatedMember.avatarColor} size="sm" />
        )}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {!isDone && (
            <>
              <Button size="xs" variant="ghost" onClick={onDefer}>Defer</Button>
              <Button size="xs" variant="ghost" onClick={onDelegate}>Delegate</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function TasksTab() {
  const [taskList, setTaskList] = useState(initialTasks.map((t) => ({ ...t })));
  const [delegateModal, setDelegateModal] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const markDone = (id: string) =>
    setTaskList((tl) => tl.map((t) => (t.id === id ? { ...t, status: 'done' as TaskStatus } : t)));

  const defer = (id: string) =>
    setTaskList((tl) =>
      tl.map((t) => (t.id === id ? { ...t, section: 'upcoming', deadline: 'Next week' } : t))
    );

  const delegate = (id: string, memberId: string) => {
    setTaskList((tl) =>
      tl.map((t) =>
        t.id === id ? { ...t, status: 'delegated' as TaskStatus, assignedTo: memberId, section: 'delegated' } : t
      )
    );
    setDelegateModal(null);
  };

  const filtered =
    filter === 'all'
      ? taskList
      : taskList.filter((t) => t.project === filter);

  const todayTasks = filtered.filter((t) => t.section === 'today');
  const upcomingTasks = filtered.filter((t) => t.section === 'upcoming');
  const delegatedTasks = filtered.filter((t) => t.section === 'delegated' || t.status === 'delegated');

  const totalMinutesToday = todayTasks.filter((t) => t.status !== 'done').reduce((acc, t) => acc + t.estimatedMinutes, 0);

  const aiPlan = todayTasks.filter((t) => t.status !== 'done' && t.aiSuggested);

  return (
    <div className="flex gap-6">
      {/* Main content */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* AI Plan Banner */}
        {aiPlan.length > 0 && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-indigo-800">Suggested plan for today</p>
                <p className="text-xs text-indigo-600 mt-0.5">
                  AI recommends starting with: <strong>{aiPlan[0]?.title}</strong>
                  {aiPlan[1] ? ` then ${aiPlan[1].title}` : ''}
                </p>
              </div>
              <span className="text-xs text-indigo-500 font-medium bg-indigo-100 px-2 py-1 rounded-lg">
                ~{Math.round(totalMinutesToday / 60)}h {totalMinutesToday % 60}m left
              </span>
            </div>
          </div>
        )}

        {/* Today */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              Today
              <span className="text-xs font-normal text-gray-400">
                {todayTasks.filter((t) => t.status === 'done').length}/{todayTasks.length} done
              </span>
            </h2>
          </div>
          <div className="space-y-1.5">
            {todayTasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task as typeof task & { status: TaskStatus }}
                onDone={() => markDone(task.id)}
                onDefer={() => defer(task.id)}
                onDelegate={() => setDelegateModal(task.id)}
              />
            ))}
          </div>
        </section>

        {/* Upcoming */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Upcoming</h2>
          <div className="space-y-1.5">
            {upcomingTasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task as typeof task & { status: TaskStatus }}
                onDone={() => markDone(task.id)}
                onDefer={() => {}}
                onDelegate={() => setDelegateModal(task.id)}
              />
            ))}
          </div>
        </section>

        {/* Delegated */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Delegated</h2>
          <div className="space-y-1.5">
            {delegatedTasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task as typeof task & { status: TaskStatus }}
                onDone={() => markDone(task.id)}
                onDefer={() => {}}
                onDelegate={() => setDelegateModal(task.id)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Right sidebar */}
      <div className="w-56 shrink-0 space-y-4">
        <Card padding="sm">
          <p className="text-xs font-semibold text-gray-600 mb-2">Filter by project</p>
          <div className="space-y-1">
            <button
              onClick={() => setFilter('all')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === 'all' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              All projects
            </button>
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => setFilter(p.id)}
                className={`w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === p.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                <span className="truncate">{p.name}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card padding="sm">
          <p className="text-xs font-semibold text-gray-600 mb-2">Today&apos;s summary</p>
          <div className="space-y-2 text-xs text-gray-500">
            <div className="flex justify-between">
              <span>Total tasks</span>
              <span className="font-medium text-gray-700">{todayTasks.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Completed</span>
              <span className="font-medium text-emerald-600">{todayTasks.filter((t) => t.status === 'done').length}</span>
            </div>
            <div className="flex justify-between">
              <span>Time left</span>
              <span className="font-medium text-gray-700">{Math.round(totalMinutesToday / 60)}h {totalMinutesToday % 60}m</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Delegate Modal */}
      <Modal open={!!delegateModal} onClose={() => setDelegateModal(null)} title="Delegate to" width="sm">
        <div className="space-y-2">
          {teamMembers.map((m) => (
            <button
              key={m.id}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
              onClick={() => delegateModal && delegate(delegateModal, m.id)}
            >
              <Avatar initials={m.avatar} color={m.avatarColor} size="md" status={m.status as 'online' | 'away' | 'offline'} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{m.name}</p>
                <p className="text-xs text-gray-400">{m.role}</p>
              </div>
              <span className={`text-xs font-semibold ${m.load >= 90 ? 'text-red-600' : m.load >= 75 ? 'text-orange-600' : 'text-emerald-600'}`}>
                {m.load}%
              </span>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
