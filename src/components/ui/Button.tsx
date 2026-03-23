import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type Size = 'xs' | 'sm' | 'md';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 border-transparent',
  secondary: 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 border-transparent',
  danger: 'bg-red-600 text-white hover:bg-red-700 border-transparent',
  success: 'bg-emerald-600 text-white hover:bg-emerald-700 border-transparent',
};

const sizeClasses: Record<Size, string> = {
  xs: 'px-2 py-1 text-xs gap-1',
  sm: 'px-3 py-1.5 text-sm gap-1.5',
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
      className={`inline-flex items-center justify-center font-medium rounded-lg border transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
