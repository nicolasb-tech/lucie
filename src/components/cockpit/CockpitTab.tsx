import React from 'react';
import { DaySummary } from './DaySummary';
import { ImmediateAttention } from './ImmediateAttention';
import { TodayOverview } from './TodayOverview';
import { PriorityEmails } from './PriorityEmails';
import { AIRecommendations } from './AIRecommendations';
import { WeakSignals } from './WeakSignals';
import { ProjectsStatus } from './ProjectsStatus';
import { TeamSnapshot } from './TeamSnapshot';

export function CockpitTab() {
  return (
    <div className="space-y-6">
      {/* Résumé du jour en 4 chiffres */}
      <DaySummary />

      {/* Zone critique : alertes + agenda/tâches */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ImmediateAttention />
          <TodayOverview />
        </div>
        <div className="space-y-6">
          <PriorityEmails />
          <AIRecommendations />
          <WeakSignals />
        </div>
      </div>

      {/* Projets en cours */}
      <ProjectsStatus />

      {/* Équipe */}
      <TeamSnapshot />
    </div>
  );
}
