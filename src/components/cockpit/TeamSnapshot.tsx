'use client';
import React from 'react';
import { teamMembers, getProject } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { LoadBar } from '@/components/ui/LoadBar';

const availabilityConfig: Record<string, { label: string; color: string }> = {
  overloaded: { label: 'Surchargé', color: 'text-red-600' },
  busy: { label: 'Occupé', color: 'text-orange-600' },
  available: { label: 'Disponible', color: 'text-emerald-600' },
};

export function TeamSnapshot() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-900">👥 État de l&apos;équipe</h2>
        <span className="text-xs text-gray-400">{teamMembers.length} membres</span>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => {
          const avail = availabilityConfig[member.availability] ?? availabilityConfig.available;
          const memberProjects = member.projects.map(getProject).filter(Boolean);
          return (
            <Card key={member.id} hover>
              <div className="flex items-start gap-3">
                <Avatar
                  initials={member.avatar}
                  color={member.avatarColor}
                  size="md"
                  status={member.status as 'online' | 'away' | 'offline'}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
                    <span className={`text-xs font-medium shrink-0 ${avail.color}`}>{avail.label}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{member.role}</p>
                  <div className="mt-2">
                    <LoadBar value={member.load} />
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {member.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-md font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {memberProjects.map((p) =>
                      p ? (
                        <span
                          key={p.id}
                          className="flex items-center gap-1 text-[10px] text-gray-500"
                        >
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                          {p.name}
                        </span>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
