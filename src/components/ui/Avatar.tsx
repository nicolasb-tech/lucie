import React from 'react';

interface AvatarProps {
  initials: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'away' | 'offline';
}

const sizeClasses = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-base',
};

const statusColors = {
  online: 'bg-emerald-400',
  away: 'bg-yellow-400',
  offline: 'bg-gray-300',
};

export function Avatar({ initials, color = '#6366f1', size = 'md', status }: AvatarProps) {
  return (
    <div className="relative inline-flex shrink-0">
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-semibold text-white select-none`}
        style={{ backgroundColor: color }}
      >
        {initials}
      </div>
      {status && (
        <span
          className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white ${statusColors[status]}`}
        />
      )}
    </div>
  );
}
