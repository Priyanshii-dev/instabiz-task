import { ReactNode } from 'react';
import { cn } from './cn';

type Variant = 'success' | 'error' | 'info';

const styles: Record<Variant, string> = {
  success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
};

export function Alert({
  variant = 'info',
  children,
}: {
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <div
      className={cn('rounded-lg border px-4 py-3 text-sm', styles[variant])}
      role="alert"
    >
      {children}
    </div>
  );
}
