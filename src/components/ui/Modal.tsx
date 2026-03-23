'use client';
import React, { useEffect } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: 'sm' | 'md' | 'lg';
  /** sheet = bottom sheet on mobile, centered dialog on desktop */
  variant?: 'dialog' | 'sheet';
}

const widthClasses = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' };

export function Modal({ open, onClose, title, children, width = 'md', variant = 'dialog' }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  if (variant === 'sheet') {
    return (
      <div className="fixed inset-0 z-50 flex flex-col justify-end md:items-center md:justify-center md:p-4">
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-backdrop"
          onClick={onClose}
        />
        <div className={`relative bg-white w-full rounded-t-3xl md:rounded-3xl shadow-[var(--shadow-raised)] flex flex-col max-h-[92dvh] md:max-h-[85vh] ${widthClasses[width]} animate-sheet-up md:animate-fadein`}>
          {/* Drag handle (mobile only) */}
          <div className="flex justify-center pt-3 pb-1 md:hidden shrink-0">
            <div className="w-10 h-1 bg-black/10 rounded-full" />
          </div>
          <div className="flex items-center justify-between px-5 py-3 shrink-0">
            <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-black/[0.06] text-gray-500 hover:bg-black/[0.1] transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto flex-1 px-5 pb-6">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-backdrop"
        onClick={onClose}
      />
      <div className={`relative bg-white rounded-3xl shadow-[var(--shadow-raised)] w-full ${widthClasses[width]} max-h-[90vh] flex flex-col animate-fadein`}>
        <div className="flex items-center justify-between px-5 pt-5 pb-4 shrink-0">
          <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-black/[0.06] text-gray-500 hover:bg-black/[0.1] transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-5 pb-5">{children}</div>
      </div>
    </div>
  );
}
