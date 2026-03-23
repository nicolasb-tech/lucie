import React from 'react';

type Variant = 'critical' | 'high' | 'medium' | 'low' | 'success' | 'warning' | 'info' | 'neutral';

const variantClasses: Record<Variant, string> = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-gray-100 text-gray-600 border-gray-200',
  success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-100 text-amber-700 border-amber-200',
  info: 'bg-blue-100 text-blue-700 border-blue-200',
  neutral: 'bg-gray-100 text-gray-600 border-gray-200',
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
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${variantClasses[variant]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            variant === 'critical'
              ? 'bg-red-500'
              : variant === 'high'
              ? 'bg-orange-500'
              : variant === 'medium'
              ? 'bg-yellow-500'
              : variant === 'success'
              ? 'bg-emerald-500'
              : 'bg-gray-400'
          }`}
        />
      )}
      {children}
    </span>
  );
}
