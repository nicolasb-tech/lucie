import React from 'react';

type Variant = 'critical' | 'high' | 'medium' | 'low' | 'success' | 'warning' | 'info' | 'neutral';

const variantClasses: Record<Variant, string> = {
  critical: 'bg-red-50 text-red-600',
  high:     'bg-orange-50 text-orange-600',
  medium:   'bg-amber-50 text-amber-600',
  low:      'bg-gray-100 text-gray-500',
  success:  'bg-emerald-50 text-emerald-600',
  warning:  'bg-yellow-50 text-yellow-600',
  info:     'bg-blue-50 text-blue-600',
  neutral:  'bg-gray-100 text-gray-500',
};

const dotColors: Record<Variant, string> = {
  critical: 'bg-red-500',
  high:     'bg-orange-500',
  medium:   'bg-amber-500',
  low:      'bg-gray-400',
  success:  'bg-emerald-500',
  warning:  'bg-yellow-500',
  info:     'bg-blue-500',
  neutral:  'bg-gray-400',
};

interface BadgeProps {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({ variant = 'neutral', children, className = '', dot }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${variantClasses[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />}
      {children}
    </span>
  );
}
