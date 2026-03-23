import React from 'react';
import { projects } from '@/data/mockData';

const statusConfig: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  'on-track': { label: 'En bonne voie', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400' },
  'at-risk': { label: 'À risque', bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-400' },
  'delayed': { label: 'En retard', bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-400' },
};

export function ProjectsStatus() {
  return (
    <section>
      <h2 className="text-sm font-semibold text-gray-900 mb-3">🗂 Projets en cours</h2>
      <div className="flex flex-wrap gap-2">
        {projects.map((project) => {
          const cfg = statusConfig[project.status] ?? statusConfig['on-track'];
          return (
            <div
              key={project.id}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${cfg.bg} border-transparent`}
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: project.color }} />
              <span className="text-sm font-medium text-gray-800">{project.name}</span>
              <div className={`flex items-center gap-1 ml-1 ${cfg.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                <span className="text-[11px] font-medium">{cfg.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
