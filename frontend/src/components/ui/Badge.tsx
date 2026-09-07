import { cn } from './cn';
import { EnquiryStatus } from '@/lib/types';

const statusStyles: Record<EnquiryStatus, string> = {
  new: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-amber-100 text-amber-700',
  resolved: 'bg-emerald-100 text-emerald-700',
};

const statusLabels: Record<EnquiryStatus, string> = {
  new: 'New',
  in_progress: 'In Progress',
  resolved: 'Resolved',
};

export function StatusBadge({ status }: { status: EnquiryStatus }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-1 text-xs font-medium',
        statusStyles[status],
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
