'use client';
import React, { useState } from 'react';
import { aiRecommendations } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const typeConfig: Record<string, { icon: string; label: string; color: string }> = {
  staffing: { icon: '👥', label: 'Staffing', color: 'bg-blue-50 text-blue-700' },
  priority: { icon: '⚡', label: 'Priorité', color: 'bg-purple-50 text-purple-700' },
  risk: { icon: '⚠️', label: 'Risque', color: 'bg-amber-50 text-amber-700' },
};

const impactLabel: Record<string, string> = {
  high: 'impact élevé',
  medium: 'impact moyen',
  low: 'impact faible',
};

function ConfidenceBar({ value }: { value: number }) {
  const color = value >= 85 ? 'bg-emerald-500' : value >= 70 ? 'bg-yellow-400' : 'bg-gray-300';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-100 rounded-full h-1">
        <div className={`h-1 ${color} rounded-full transition-all`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-gray-500 tabular-nums">{value}%</span>
    </div>
  );
}

export function AIRecommendations() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [applied, setApplied] = useState<Set<string>>(new Set());

  const visible = aiRecommendations.filter((r) => !dismissed.has(r.id) && !applied.has(r.id));

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-sm font-semibold text-gray-900">🧠 L&apos;IA recommande</h2>
        <span className="text-xs text-gray-400">À l&apos;instant</span>
      </div>

      {visible.length === 0 ? (
        <Card className="text-center py-6">
          <p className="text-sm text-gray-400">Aucune recommandation en attente.</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {visible.map((rec) => {
            const config = typeConfig[rec.type] ?? { icon: '💡', label: rec.type, color: 'bg-gray-50 text-gray-600' };
            return (
              <Card key={rec.id}>
                <div className="flex items-start gap-3">
                  <span className="text-lg shrink-0 mt-0.5">{config.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900">{rec.title}</p>
                      <Badge variant={rec.impact === 'high' ? 'high' : 'medium'}>
                        {impactLabel[rec.impact] ?? rec.impact}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{rec.rationale}</p>
                    <div className="mt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-400">Confiance IA</span>
                      </div>
                      <ConfidenceBar value={rec.confidence} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1.5 mt-3 pt-3 border-t border-gray-50">
                  <Button size="xs" variant="ghost" onClick={() => setDismissed((s) => new Set([...s, rec.id]))}>
                    Ignorer
                  </Button>
                  <Button size="xs" variant="primary" onClick={() => setApplied((s) => new Set([...s, rec.id]))}>
                    {rec.action} →
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
