'use client';
import React, { useState } from 'react';
import { weakSignals, getTeamMember } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';

const severityConfig: Record<string, { bg: string; border: string; dot: string }> = {
  high: { bg: 'bg-red-50', border: 'border-red-100', dot: 'bg-red-400' },
  medium: { bg: 'bg-amber-50', border: 'border-amber-100', dot: 'bg-amber-400' },
  low: { bg: 'bg-blue-50', border: 'border-blue-100', dot: 'bg-blue-400' },
};

const typeIcon: Record<string, string> = {
  'burnout-risk': '🔴',
  'client-frustration': '😤',
  'project-drift': '📉',
  overload: '⚡',
};

export function WeakSignals() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const visible = weakSignals.filter((s) => !dismissed.has(s.id));

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-sm font-semibold text-gray-900">⚠️ Signaux faibles</h2>
        <span className="text-xs text-gray-400">Détection automatique</span>
      </div>

      {visible.length === 0 ? (
        <Card className="text-center py-6">
          <p className="text-sm text-gray-400">Aucun signal détecté.</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {visible.map((signal) => {
            const config = severityConfig[signal.severity] ?? severityConfig.low;
            const member = 'member' in signal ? getTeamMember(signal.member as string) : null;
            return (
              <div
                key={signal.id}
                className={`rounded-xl border p-3.5 ${config.bg} ${config.border} group`}
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-sm shrink-0 mt-0.5">{typeIcon[signal.type] ?? '⚠️'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      {member && (
                        <Avatar
                          initials={member.avatar}
                          color={member.avatarColor}
                          size="sm"
                        />
                      )}
                      <p className="text-xs font-semibold text-gray-800 leading-snug">{signal.message}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      💡 {signal.hint}
                    </p>
                  </div>
                  <button
                    onClick={() => setDismissed((s) => new Set([...s, signal.id]))}
                    className="opacity-0 group-hover:opacity-100 w-5 h-5 flex items-center justify-center rounded text-gray-400 hover:text-gray-600 hover:bg-white/70 transition-all shrink-0"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
