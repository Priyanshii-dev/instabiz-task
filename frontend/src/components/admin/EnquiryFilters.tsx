'use client';

import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import {
  ENQUIRY_SERVICE_OPTIONS,
  ENQUIRY_STATUS_OPTIONS,
} from '@/lib/constants';

export interface FilterValues {
  search: string;
  service: string;
  status: string;
}

export function EnquiryFilters({
  values,
  onChange,
}: {
  values: FilterValues;
  onChange: (values: FilterValues) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Input
        placeholder="Search by name, email, or company"
        value={values.search}
        onChange={(e) => onChange({ ...values, search: e.target.value })}
      />
      <Select
        placeholder="All services"
        value={values.service}
        onChange={(e) => onChange({ ...values, service: e.target.value })}
        options={ENQUIRY_SERVICE_OPTIONS as unknown as string[]}
      />
      <Select
        placeholder="All statuses"
        value={values.status}
        onChange={(e) => onChange({ ...values, status: e.target.value })}
        options={[
          { value: 'new', label: 'New' },
          { value: 'in_progress', label: 'In Progress' },
          { value: 'resolved', label: 'Resolved' },
        ]}
      />
    </div>
  );
}
