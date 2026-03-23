'use client';
import React, { useState } from 'react';
import { urgentItems, teamMembers, getProject } from '@/data/mockData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Avatar } from '@/components/ui/Avatar';

type Priority = 'critical' | 'high' | 'medium' | 'low';

const priorityBadge: Record<Priority, React.ReactElement> = {
  critical: <Badge variant="critical" dot>Critique</Badge>,
  high: <Badge variant="high" dot>Haute</Badge>,
  medium: <Badge variant="medium" dot>Moyenne</Badge>,
  low: <Badge variant="low" dot>Basse</Badge>,
};

const typeIcon: Record<string, string> = {
  issue: '🐛',
  decision: '⚡',
  alert: '⚠️',
};

interface ItemState {
  dismissed: boolean;
  done: boolean;
  assignedTo: string | null;
}

export function ImmediateAttention() {
  const [itemStates, setItemStates] = useState<Record<string, ItemState>>(
    Object.fromEntries(urgentItems.map((i) => [i.id, { dismissed: false, done: false, assignedTo: i.assignedTo }]))
  );
  const [assignModal, setAssignModal] = useState<string | null>(null);

  const visible = urgentItems.filter((i) => !itemStates[i.id]?.done && !itemStates[i.id]?.dismissed);

  const setDone = (id: string) => setItemStates((s) => ({ ...s, [id]: { ...s[id], done: true } }));
  const setDeferred = (id: string) => setItemStates((s) => ({ ...s, [id]: { ...s[id], dismissed: true } }));
  const assign = (id: string, memberId: string) => {
    setItemStates((s) => ({ ...s, [id]: { ...s[id], assignedTo: memberId } }));
    setAssignModal(null);
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-gray-900">🔥 Attention immédiate</h2>
          {visible.length > 0 && (
            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
              {visible.length}
            </span>
          )}
        </div>
      </div>

      {visible.length === 0 ? (
        <Card className="text-center py-8">
          <div className="text-2xl mb-2">✅</div>
          <p className="text-sm text-gray-500 font-medium">Tout est sous contrôle — rien d&apos;urgent pour l&apos;instant.</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {visible.map((item) => {
            const project = getProject(item.project);
            const assignedMember = teamMembers.find((m) => m.id === itemStates[item.id]?.assignedTo);
            return (
              <Card key={item.id} className="group">
                <div className="flex items-start gap-3">
                  <span className="text-base mt-0.5 shrink-0">{typeIcon[item.type] ?? '📌'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-gray-900 leading-snug">{item.title}</p>
                      {priorityBadge[item.priority as Priority]}
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      {project && (
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: project.color }}
                          />
                          {project.name}
                        </span>
                      )}
                      <span className="text-xs text-gray-400">{item.dueDate}</span>
                    </div>
                    <p className="text-xs text-indigo-600 mt-1.5 font-medium">
                      💡 {item.suggestedAction}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-1">
                    {assignedMember ? (
                      <button
                        className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        onClick={() => setAssignModal(item.id)}
                      >
                        <Avatar initials={assignedMember.avatar} color={assignedMember.avatarColor} size="sm" />
                        <span className="text-xs text-gray-600">{assignedMember.name.split(' ')[0]}</span>
                      </button>
                    ) : (
                      <Button size="xs" variant="ghost" onClick={() => setAssignModal(item.id)}>
                        + Assigner
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button size="xs" variant="ghost" onClick={() => setDeferred(item.id)}>
                      Différer
                    </Button>
                    <Button size="xs" variant="success" onClick={() => setDone(item.id)}>
                      ✓ Fait
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Modal d'assignation */}
      <Modal open={!!assignModal} onClose={() => setAssignModal(null)} title="Assigner à un membre" width="sm">
        <div className="space-y-2">
          {teamMembers.map((m) => (
            <button
              key={m.id}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
              onClick={() => assignModal && assign(assignModal, m.id)}
            >
              <Avatar initials={m.avatar} color={m.avatarColor} size="md" status={m.status as 'online' | 'away' | 'offline'} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{m.name}</p>
                <p className="text-xs text-gray-500">{m.role}</p>
              </div>
              <span
                className={`text-xs font-semibold ${
                  m.load >= 90 ? 'text-red-600' : m.load >= 75 ? 'text-orange-600' : 'text-emerald-600'
                }`}
              >
                {m.load}% charge
              </span>
            </button>
          ))}
        </div>
      </Modal>
    </section>
  );
}
