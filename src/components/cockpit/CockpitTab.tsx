import React from 'react';
import { ImmediateAttention } from './ImmediateAttention';
import { AIRecommendations } from './AIRecommendations';
import { WeakSignals } from './WeakSignals';
import { TeamSnapshot } from './TeamSnapshot';

export function CockpitTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left column — critical items */}
      <div className="lg:col-span-2 space-y-6">
        <ImmediateAttention />
        <TeamSnapshot />
      </div>
      {/* Right column — AI + signals */}
      <div className="space-y-6">
        <AIRecommendations />
        <WeakSignals />
      </div>
    </div>
  );
}
