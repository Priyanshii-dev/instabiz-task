'use client';

import Link from 'next/link';
import { Enquiry } from '@/lib/types';
import { StatusBadge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface EnquiryTableProps {
  enquiries: Enquiry[];
  onDelete: (id: number) => void;
  deletingId: number | null;
}

/** Reusable table for the admin enquiry list (Name, Email, Phone, Company, Service, Date, Actions). */
export function EnquiryTable({
  enquiries,
  onDelete,
  deletingId,
}: EnquiryTableProps) {
  if (enquiries.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center text-sm text-slate-500">
        No enquiries found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Service</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {enquiries.map((enquiry) => (
            <tr key={enquiry.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">
                {enquiry.full_name}
              </td>
              <td className="px-4 py-3 text-slate-600">{enquiry.email}</td>
              <td className="px-4 py-3 text-slate-600">{enquiry.phone}</td>
              <td className="px-4 py-3 text-slate-600">
                {enquiry.company_name}
              </td>
              <td className="px-4 py-3 text-slate-600">{enquiry.service}</td>
              <td className="px-4 py-3">
                <StatusBadge status={enquiry.status} />
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                {new Date(enquiry.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Link href={`/admin/dashboard/${enquiry.id}`}>
                    <Button size="sm" variant="outline">
                      View / Edit
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => onDelete(enquiry.id)}
                    disabled={deletingId === enquiry.id}
                  >
                    {deletingId === enquiry.id ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
