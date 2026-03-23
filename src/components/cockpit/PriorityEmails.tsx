'use client';
import React, { useState } from 'react';
import { emails } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

type Priority = 'critical' | 'high' | 'medium' | 'low';

const priorityBadge: Record<Priority, React.ReactElement> = {
  critical: <Badge variant="critical" dot>Critique</Badge>,
  high: <Badge variant="high" dot>Haute</Badge>,
  medium: <Badge variant="medium" dot>Moyenne</Badge>,
  low: <Badge variant="low" dot>Basse</Badge>,
};

export function PriorityEmails() {
  const [replied, setReplied] = useState<Set<string>>(new Set());

  const priority = emails
    .filter((e) => !e.isRead && (e.priority === 'critical' || e.priority === 'high'))
    .slice(0, 3);

  if (priority.length === 0) {
    return (
      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Emails prioritaires</h2>
        <Card className="text-center py-6">
          <p className="text-sm text-gray-400">Boîte de réception à jour ✓</p>
        </Card>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-900">Emails prioritaires</h2>
        <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
          {priority.length} non lus
        </span>
      </div>
      <div className="space-y-2">
        {priority.map((email) => (
          <Card key={email.id}>
            <div className="flex items-start gap-3">
              <Avatar initials={email.senderAvatar} color={email.senderColor} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-900 truncate">{email.sender}</p>
                  {priorityBadge[email.priority as Priority]}
                </div>
                <p className="text-xs text-gray-600 mt-0.5 leading-snug line-clamp-2">{email.summary}</p>
              </div>
            </div>
            {!replied.has(email.id) && (
              <div className="flex justify-end mt-2 pt-2 border-t border-gray-50">
                <Button
                  size="xs"
                  variant="primary"
                  onClick={() => setReplied((s) => new Set([...s, email.id]))}
                >
                  Répondre →
                </Button>
              </div>
            )}
            {replied.has(email.id) && (
              <p className="text-[10px] text-emerald-600 mt-2 text-right font-medium">✓ Répondu</p>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
