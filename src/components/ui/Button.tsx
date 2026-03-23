import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type Size = 'xs' | 'sm' | 'md';

const variantClasses: Record<Variant, string> = {
  primary:   'bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700',
  secondary: 'bg-black/[0.06] text-gray-800 hover:bg-black/[0.09] active:bg-black/[0.12]',
  ghost:     'bg-transparent text-gray-500 hover:bg-black/[0.05] active:bg-black/[0.08]',
  danger:    'bg-red-500 text-white hover:bg-red-400 active:bg-red-600',
  success:   'bg-emerald-500 text-white hover:bg-emerald-400 active:bg-emerald-600',
};

const sizeClasses: Record<Size, string> = {
  xs: 'px-2.5 py-1 text-xs gap-1',
  sm: 'px-3.5 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
};

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'secondary',
  size = 'sm',
  onClick,
  disabled,
  className = '',
  icon,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 active:scale-[0.96] disabled:opacity-40 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
