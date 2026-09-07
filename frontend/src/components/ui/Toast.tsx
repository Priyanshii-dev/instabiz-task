'use client';

import { ReactNode } from 'react';
import { cn } from './cn';

type ToastVariant = 'success' | 'error';

const styles: Record<ToastVariant, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  error: 'border-red-200 bg-red-50 text-red-900',
};

export function Toast({
  variant,
  children,
}: {
  variant: ToastVariant;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'fixed right-4 top-4 z-50 max-w-sm rounded-lg border px-4 py-3 text-sm shadow-lg',
        styles[variant],
      )}
      role="status"
      aria-live="polite"
    >
      {children}
    </div>
  );
}
