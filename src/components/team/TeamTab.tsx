'use client';
import React, { useState } from 'react';
import { teamMembers, projects, getProject, tasks } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { LoadBar } from '@/components/ui/LoadBar';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

const availabilityVariant: Record<string, 'critical' | 'high' | 'success' | 'neutral'> = {
  overloaded: 'critical',
  busy: 'high',
  available: 'success',
};

export function TeamTab() {
  const [selectedMember, setSelectedMember] = useState<(typeof teamMembers)[0] | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const avgLoad = Math.round(teamMembers.reduce((acc, m) => acc + m.load, 0) / teamMembers.length);

  const memberTasks = selectedMember
    ? tasks.filter((t) => t.assignedTo === selectedMember.id)
    : [];

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Team size', value: teamMembers.length, color: 'text-gray-900' },
          { label: 'Avg load', value: `${avgLoad}%`, color: avgLoad >= 80 ? 'text-red-600' : 'text-emerald-600' },
          { label: 'Overloaded', value: teamMembers.filter((m) => m.availability === 'overloaded').length, color: 'text-red-600' },
          { label: 'Available', value: teamMembers.filter((m) => m.availability === 'available').length, color: 'text-emerald-600' },
        ].map((stat) => (
          <Card key={stat.label} padding="md">
            <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* AI staffing suggestion */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-start gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-indigo-900">AI Staffing Insight</p>
          <p className="text-xs text-indigo-700 mt-0.5">
            Sophie and Thomas are both above 85% load. Consider opening 2 new positions (Backend + Data Engineering)
            to protect Q2 delivery timelines.
          </p>
        </div>
        <Button size="sm" variant="primary" onClick={() => setShowSuggestion(true)}>
          View plan
        </Button>
      </div>

      {/* Team grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => {
          const memberProjects = member.projects.map(getProject).filter(Boolean);
          return (
            <Card
              key={member.id}
              hover
              onClick={() => setSelectedMember(member)}
              className="cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <Avatar
                  initials={member.avatar}
                  color={member.avatarColor}
                  size="lg"
                  status={member.status as 'online' | 'away' | 'offline'}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-400">{member.role}</p>
                    </div>
                    <Badge variant={availabilityVariant[member.availability] ?? 'neutral'}>
                      {member.availability}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-gray-500">Workload</span>
                  <span className={`text-xs font-semibold ${member.load >= 90 ? 'text-red-600' : member.load >= 75 ? 'text-orange-600' : 'text-emerald-600'}`}>
                    {member.load}%
                  </span>
                </div>
                <LoadBar value={member.load} showLabel={false} size="md" />
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                {member.skills.map((skill) => (
                  <span key={skill} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[11px] rounded-md font-medium">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-gray-50 flex flex-wrap gap-2">
                {memberProjects.map((p) =>
                  p ? (
                    <span key={p.id} className="flex items-center gap-1.5 text-xs text-gray-500">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                      {p.name}
                    </span>
                  ) : null
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Project workload overview */}
      <Card>
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Project Load Overview</h3>
        <div className="space-y-3">
          {projects.map((project) => {
            const assigned = teamMembers.filter((m) => m.projects.includes(project.id));
            const statusVariant =
              project.status === 'at-risk'
                ? 'high'
                : project.status === 'delayed'
                ? 'critical'
                : 'success';
            return (
              <div key={project.id} className="flex items-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: project.color }} />
                <span className="text-sm text-gray-700 w-40 shrink-0 truncate">{project.name}</span>
                <Badge variant={statusVariant}>{project.status}</Badge>
                <div className="flex items-center gap-1 ml-auto">
                  {assigned.map((m) => (
                    <Avatar key={m.id} initials={m.avatar} color={m.avatarColor} size="sm" />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">{assigned.length} members</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Member Detail Modal */}
      <Modal
        open={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        title={selectedMember?.name ?? ''}
        width="md"
      >
        {selectedMember && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar initials={selectedMember.avatar} color={selectedMember.avatarColor} size="lg" status={selectedMember.status as 'online' | 'away' | 'offline'} />
              <div>
                <p className="font-semibold text-gray-900">{selectedMember.name}</p>
                <p className="text-sm text-gray-500">{selectedMember.role}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={availabilityVariant[selectedMember.availability] ?? 'neutral'}>
                    {selectedMember.availability}
                  </Badge>
                  <span className={`text-sm font-semibold ${selectedMember.load >= 90 ? 'text-red-600' : selectedMember.load >= 75 ? 'text-orange-600' : 'text-emerald-600'}`}>
                    {selectedMember.load}% load
                  </span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Workload</p>
              <LoadBar value={selectedMember.load} size="md" />
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedMember.skills.map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg font-medium">{s}</span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Assigned Projects</p>
              <div className="space-y-1.5">
                {selectedMember.projects.map((pid) => {
                  const p = getProject(pid);
                  return p ? (
                    <div key={pid} className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                      <span className="text-sm text-gray-700">{p.name}</span>
                      <Badge variant={p.status === 'at-risk' ? 'high' : p.status === 'delayed' ? 'critical' : 'success'}>
                        {p.status}
                      </Badge>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {memberTasks.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Delegated Tasks</p>
                <div className="space-y-1.5">
                  {memberTasks.map((t) => (
                    <div key={t.id} className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                      <span className="flex-1 truncate">{t.title}</span>
                      <span className="text-xs text-gray-400 shrink-0">{t.deadline}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <Button variant="primary" size="sm">Send message</Button>
              <Button variant="secondary" size="sm">Reassign tasks</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Staffing Plan Modal */}
      <Modal open={showSuggestion} onClose={() => setShowSuggestion(false)} title="AI Staffing Plan" width="md">
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-sm font-semibold text-amber-800">⚠️ Current risk</p>
            <p className="text-xs text-amber-700 mt-1">
              3 team members are above 75% capacity. This creates delivery risk for Platform Relaunch and Enterprise Migration.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 mb-3">Recommended actions</p>
            <div className="space-y-3">
              {[
                { action: 'Open Backend Engineer position', urgency: 'This week', reason: 'Support Sophie — reduce her load by ~25%' },
                { action: 'Open Data Engineer position', urgency: 'Within 2 weeks', reason: 'Support Thomas on p5 Data Infrastructure' },
                { action: 'Reassign Julien Petit to Platform Relaunch full-time', urgency: 'Immediate', reason: 'He\'s at 50% — can absorb 40% more work' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.reason}</p>
                    <Badge variant="high" className="mt-1.5">{item.urgency}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button variant="primary" onClick={() => setShowSuggestion(false)}>
            Start hiring process →
          </Button>
        </div>
      </Modal>
    </div>
  );
}
