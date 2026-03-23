import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
};

export function Card({ children, className = '', onClick, hover = false, padding = 'md' }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl ${paddingClasses[padding]} ${
        hover || onClick
          ? 'cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] shadow-[var(--shadow-card)]'
          : 'shadow-[var(--shadow-card)]'
      } ${className}`}
      style={{ boxShadow: hover || onClick ? undefined : 'var(--shadow-card)' }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
