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
  lg: 'p-6',
};

export function Card({ children, className = '', onClick, hover = false, padding = 'md' }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 shadow-sm ${paddingClasses[padding]} ${
        hover || onClick ? 'cursor-pointer hover:border-gray-200 hover:shadow-md transition-all duration-150' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
