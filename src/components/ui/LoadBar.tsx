import React from 'react';

interface LoadBarProps {
  value: number; // 0–100
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

function getColor(value: number) {
  if (value >= 90) return 'bg-red-500';
  if (value >= 75) return 'bg-orange-400';
  if (value >= 60) return 'bg-yellow-400';
  return 'bg-emerald-400';
}

export function LoadBar({ value, showLabel = true, size = 'sm' }: LoadBarProps) {
  const color = getColor(value);
  const h = size === 'sm' ? 'h-1.5' : 'h-2';
  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 bg-gray-100 rounded-full overflow-hidden ${h}`}>
        <div
          className={`${h} ${color} rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
      {showLabel && (
        <span className={`text-xs font-medium tabular-nums ${value >= 90 ? 'text-red-600' : value >= 75 ? 'text-orange-600' : 'text-gray-500'}`}>
          {value}%
        </span>
      )}
    </div>
  );
}
